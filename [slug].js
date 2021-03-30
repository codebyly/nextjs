import { useRouter } from "next/router";
import Image from "next/image";

import Layout from "./../components/Layout";

const apiPath = "https://react.webworker.berlin/wp-json/wp/v2/";

/* Wenn man einen dynamischen Pfad hat, muss man Next mitteilen,
welche Pfade das System statisch generieren soll, hier also
eine Liste der vorhanden Blog-Slugs übergeben. */
export async function getStaticPaths() {
  let paths = [];

  try {
    const response = await fetch(`${apiPath}posts`);

    const posts = await response.json();

    /*    Die Einträge im paths-Array müssen den params entsprechen,
      die getStaticProps erhält. */
    paths = posts.map(({ slug }) => ({ params: { slug } }));
  } catch (e) {
    console.log(e);
  }

  /* fallback legt fest, dass ein neuer und noch nicht in paths
  enthaltene Slug frisch von WordPress geholt werden soll.
  Wenn man für paths einen leeren Array zurückgibt, werden
  also alle Blogbeiträge erst statisch generiert, wenn sie
  zum ersten Mal angefordert werden. Man könnte in paths
  auch nur z.B. die 20 neuesten Blogbeiträge übergeben. */

  return { paths, fallback: true };
  //false: 404 Meldung
}

//url pfade übergeben: { params: { slug } }
//für jede untersiete seite erzeugen

export async function getStaticProps({ params }) {
  console.log(params);

  //daten für einzelne beiträge holen
  // restapi anschauen:https://react.webworker.berlin/wp-json/wp/v2//posts?slug=react-rockt
  // infos zu einzelndne eintrag

  let post = {}; //einzelner beitrag

  try {
    const response = await fetch(`${apiPath}posts?slug=${params.slug}`);
    // gibt Array zurück mit 1 beirag (=post)
    //Anfrage gibt einen Array mit einem Eintrag, nicht den einzelnen Post zurück
    const postsArray = await response.json();

    post = postsArray[0];

    // In der Antwort ist nur die ID des Titelbildes enthalten,
    // nicht die Daten zum Bild selbst, deshalb ist hier eine zweite Anfrage nötig.
    if (post.featured_media) {
      post.titleImage = await getTitleImage(post.featured_media);
    }
  } catch (error) {
    console.log(error);
  }

  // an die sietenkompontente übergeben
  return {
    props: {
      post,
    },
    revalidate: 3600,
  };
}

//getTitleImage 2. Afrgae für das Bild,
//für Author wäre drittes getfuntion nötig = ÜBUNG!
async function getTitleImage(imageId) {
  try {
    const response = await fetch(`${apiPath}media/${imageId}`);
    const imageData = await response.json();

    return {
      src: imageData.guid.rendered,
      width: imageData.media_details.width,
      height: imageData.media_details.height,
      alt: imageData.alt_text,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

// async function getAuthor(imageId) {
//   try {
//     const response = await fetch(`${apiPath}media/${imageId}`);
//     const imageData = await response.json();

//     return {
//       src: imageData.guid.rendered,
//       width: imageData.media_details.width,
//       height: imageData.media_details.height,
//       alt: imageData.alt_text,
//     };
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }

//seitenkomponente
export default function BlogPost({ post }) {
  // neue Seite laden/generieren - Fallback
  // isFallback true/false >> siete beriets egalden?
  // https://nextjs.org/docs/basic-features/data-fetching#fallback-pages
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { title, content, titleImage, author } = post;

  return (
    <Layout title={title.rendered}>
      {titleImage && (
        <Image
          {...titleImage}
          layout="responsive"
          sizes="(max-width: 50rem) 100vw, 50rem"
        />
      )}
      <p>Author:{author}</p>

      <div dangerouslySetInnerHTML={{ __html: content.rendered }} />
      {/* sicherehietsfeature umeghen!
       html string wir dsonst cniht nagzeiegt!*/}
    </Layout>
  );
}
