// import { useState, useEffect } from "react";
import { useToggle } from "../hooks/useToggle";
import React from "react";

export default function NewsItem({ title, description, url, urlToImage }) {
  const [expanded, toggleExpanded] = useToggle(false);

  return (
    <article className="news-item">
      <h3 className="news-item__title">
        <a href={url}>{title}</a>
      </h3>

      <button onClick={toggleExpanded}>{expanded ? "weniger" : "mehr"}</button>
      {expanded && (
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

// //eizelnder Beitrag
// export default function NewsItem() {
//   const [news, setNews] = useState("tst");
//   return (

//     //mit fetch die nes abrufen
//     useEffect(() => {
//         async function fetchNews() {
//           try {
//             const response = await fetch(`/api/uppercase?text=${eingabe}`); //auslesen der API zum suchbegriff eingabe

//             //Fehlermeldung
//             if (!response.ok) {
//               throw new Error("Fehler");
//             }

//             //response in json umwendlen: ausgabeData
//             const newsData = await response.json();

//             setNews(newsData);

//             return
//             <article className="news-item">
//               <h3 className="news-item__title">
//                 <a href="">Titel</a>
//               </h3>

//               <button>Weniger anzeigen / Mehr anzeigen</button>
//               <div className="news-item__content">
//                 <img className="news-item__image" src="" alt="" />
//                 <p className="news-item__description">{news}</p>
//               </div>
//             </article>
//           );

//           } catch (error) {
//             console.log(error);
//           }
//         }

//         fetchNews();
//       }, [news]);

// }

// /*
// Mit Hilfe des useToggle-Hooks, den wir in der
// Custom Hooks-Übung geschrieben haben, soll der Content-Bereich
// ein- und ausgeblendet werden, der Text im Button soll entsprechend
// wechseln. Anfangs soll der Content eingeklappt sein.
// Der description-Text ist für "description", nicht "content" des
// News-Objekts. Das Bild nur anzeigen, wenn eine Bildquelle vorhanden
// ist. Das alt-Attribut kann leer bleiben, weil es im Datensatz leider
// nicht enthalten ist.

//   <article class="news-item">
// <h3 class="news-item__title">
//   <a href="">Titel</a>
// </h3>
// <button>
//  Weniger anzeigen / Mehr anzeigen
// </button>
// <div class="news-item__content">
// <img class="news-item__image" src="" alt="" />
// <p class="news-item__description">Nachrichtentext</p>
// <div>
// </article> */
