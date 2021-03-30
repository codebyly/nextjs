import Layout from "../components/Layout";
import NewsList from "../components/NewsList";

/* https://nextjs.org/docs/basic-features/environment-variables
Achtung: process.env ist kein normales Objekt, Destructuring
funktioniert nicht, immer process.env.KEY ausschreiben! */
// const apiKey = process.env.NEWS_API_KEY;

const testResults = {
  status: "ok",
  totalResults: 38,

  articles: [
    {
      source: {
        id: "cnn",
        name: "CNN",
      },
      author: "Chris Isidore, CNN Business",
      title: "Boeing's 737 Max gets approval to fly passengers again - CNN",
      description:
        "The Federal Aviation Administration Wednesday gave approval for the Boeing 737 Max to carry passengers again, ending the jet's 20-month grounding.",
      url:
        "https://www.cnn.com/2020/11/18/business/boeing-737-max-approval/index.html",
      urlToImage:
        "https://cdn.cnn.com/cnnnext/dam/assets/201116084430-boeing-737-max-southwest-restricted-super-tease.jpg",
      publishedAt: "2020-11-18T12:12:00Z",
      content: null,
    },

    {
      source: {
        id: null,
        name: "HuffPost",
      },
      author: "Yahoo Entertainment",
      title: "'MasterChef Junior' Star Ben Watkins Dies At Age 14 - HuffPost",
      description:
        '"MasterChef Junior" judge Gordon Ramsay hailed Watkins as "an incredibly talented home cook and even stronger young man."',
      url:
        "https://www.huffpost.com/entry/ben-watkins-dead_n_5fb508edc5b66cd4ad40820e",
      urlToImage:
        "https://img.huffingtonpost.com/asset/5fb5105e2400008630b047cf.png?ops=1778_1000",
      publishedAt: "2020-11-18T11:59:00Z",
      content:
        "Ben Watkins, a fan-favorite from MasterChef Junior, died on Monday after an 18-month battle with cancer. He was 14.\r\nWatkins was diagnosed with angiomatoid fibrous histiocytoma, an extremely rare for… [+2665 chars]",
    },
  ],
};

/*
getStaticProps kann nur in Page-Komponenten genutzt werden.
Die asynchrone Funktion dient dazu, an die Komponente (hier news) props
zu übergeben, die der Server erst holen bzw. erzeugen muss.
*/
/* Die Funktion muss ein Objekt zurückgeben, das wiederum
unter props ein Objekt mit den props enthält,
die dann in der Komponente auftauchen.
Im dev-Modus wird getStaticProps jedesmal neu ausgeführt,
im Produktionsmodus (wenn die Seite online ist) wird getStaticProps
nur einmal während des build-Prozesses ausgeführt, danach
hat jeder Seitenaufruf die zu diesem Zeitpunkt aktuellen Daten.
Möchte man eine Mischung aus statischen und aktuellen Daten haben,
kann man mit revalidate eine Anzahl an Sekunden angeben, nach
der getStaticProps erneut ausgeführt und der Inhalt der Seite
aktualisiert wird. So kann man eine zugleich sehr schnelle und
doch ausreichend aktuelle Seite haben, und kann z.B. auch
API-Anfragen drastisch reduzieren.
Möchte man auch im Live-Betrieb bei JEDEM Seitenaufruf neue
Props erzeugen, kann man statt getStaticProps einfach
getServerSideProps nutzen.
    */

export async function getStaticProps() {
  // let news = [];

  //auskommentiert um Limit zu schonen
  // try {
  //   const response = await fetch(
  //     `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&country=de&category=technology&pageSize=10`
  //   );

  //   const newsData = await response.json();

  //   news = newsData.articles;
  // } catch (error) {
  //   console.log(error);
  // }

  //RükcgabeObj mit props
  return {
    props: {
      test: "Guten Tag vom Server! 🥰",
      time: new Date().toTimeString(),
      news: testResults.articles,
      // news, //news:news in kurz //für relae news
    },
    revalidate: 600,
  };
}

export default function News({ news, time, test }) {
  return (
    <Layout title="News">
      <p>{test}</p>
      <p>{time}</p>
      <NewsList news={news} title="Die neuesten Meldungen" />
    </Layout>
  );
}

// export default function News({ test, news }) {
//   console.log(news); //ARry
//   console.log(news[0].description);
//   return (
//     <Layout title="News">
//       {/* <p>{news[0].description}</p> */}
//       <NewsList news={news} title="news" />
// {news} nciht direkt ausgebbar, muss erst in arras mit jsx konnvertiert werdne!
//     </Layout>
//   );
// }
