/*
NewsList:
Die h2 soll nur angezeigt werden, wenn eine Überschrift
mit dem prop title übergeben wird. Der Array mit den
Meldungen soll im prop news übergeben werden.
*/

import NeuesElement from "./NeuesElement";

export default function NeuesListe({ news, title = "" }) {
  //   console.log(news.news[0].description);
  //   console.log(news[0]); //Array mit Datensätzen>> map
  return (
    <section className="news-list">
      {title && <h2 className="news-list__title">{title}</h2>}
      {/* jedes ELemnt zeigen */}
      {news.map((item) => (
        <NeuesElement key={item.url} {...item} />
        //jedes Arrayelement in NewsElement ausgeben und alle Daten destruktureiren
      ))}
    </section>
  );
}
