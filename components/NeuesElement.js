import { useToggle } from "../hooks/useToggle";

export default function NeuesElement({ title, description, urlToImage, url }) {
  //news desturkturieren
  //Achtung new sist Array mit mehreren Einträgen

  //   console.log(news.news[0].description);
  //   console.log(news.news[0]);
  //   console.log(title);

  const [show, toggleShow] = useToggle(false);
  return (
    <article className="news-item">
      <h3 className="news-item__title">
        <a href={url}>{title}</a>
      </h3>
      <button onClick={toggleShow}>{show ? "weniger" : "mehr"}</button>
      {show && (
        <div className="news-item__content">
          {urlToImage && (
            <img className="news-item__image" src={urlToImage} alt="" />
          )}
          <p className="news-item__description">{description}</p>
        </div>
      )}
    </article>
  );
}
