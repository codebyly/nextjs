import { useRouter } from "next/router";
import Image from "next/image";

import Layout from "../../components/Layout";

const apiPath = "https://react.webworker.berlin/wp-json/wp/v2/";
const graphqlPath = "https://react.webworker.berlin/graphql";

/* Wenn man einen dynamischen Pfad hat, muss man Next mitteilen,
welche Pfade das System statisch generieren soll, hier also
eine Liste der vorhanden Blog-Slugs übergeben. */
export async function getStaticPaths() {
  let paths = [];

  const query = `{
    posts {
      nodes {
        slug
      }
    }
  }`;

  try {
    const response = await fetch(`${graphqlPath}?query=${query}`);

    const postsData = await response.json();

    /*    Die Einträge im paths-Array müssen den params entsprechen,
      die getStaticProps erhält. */
    paths = postsData.data.posts.nodes.map(({ slug }) => ({
      params: { slug },
    }));
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
}

export async function getStaticProps({ params }) {
  console.log(params);

  let post = {};

  const query = `{
    post(id: "${params.slug}", idType: SLUG) {
      title
      content
      featuredImage {
        node {
          altText
          guid
          mediaDetails {
            height
            width
          }
        }
      }
    }
  }
  `;

  try {
    const response = await fetch(`${graphqlPath}?query=${query}`);

    const responseObject = await response.json();

    post = responseObject.data.post;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      post,
    },
    revalidate: 3600,
  };
}

export default function BlogPost({ post }) {
  // https://nextjs.org/docs/basic-features/data-fetching#fallback-pages
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { title, content, featuredImage } = post;

  return (
    <Layout title={title}>
      {featuredImage && (
        <Image
          src={featuredImage.node.guid}
          alt={featuredImage.node.altText}
          width={featuredImage.node.mediaDetails.width}
          height={featuredImage.node.mediaDetails.height}
          layout="responsive"
          sizes="(max-width: 50rem) 100vw, 50rem"
        />
      )}

      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
}

// import { useRouter } from "next/router";
// import Image from "next/image";

// import Layout from "../../components/Layout";

// const apiPath = "https://react.webworker.berlin/wp-json/wp/v2/";

// const graphqlPath = "https://react.webworker.berlin/graphql";
// //pfad für alle anfragen

// /* Wenn man einen dynamischen Pfad hat, muss man Next mitteilen,
// welche Pfade das System statisch generieren soll, hier also
// eine Liste der vorhanden Blog-Slugs übergeben. */
// export async function getStaticPaths() {
//   let paths = [];
//   const query = {
//     posts {
//       nodes {
//         slug
//       }
//     }
//   }

//   try {
//     const response = await fetch(`${graphqlPath}?query=${query}`);
//     //nur der query ändert sich

//     const postsData = await response.json();
//     // Antwort : obj siehe rechet Seite graphQL(SS):
//     // wo muss ich hin? postsData.data.posts.nodes

//     /*    Die Einträge im paths-Array müssen den params entsprechen,
//       die getStaticProps erhält. */
//     paths = postsData.data.posts.nodes.map(({ slug }) => ({
//       params: { slug },
//     }));
//   } catch (e) {
//     console.log(e);
//   }

//   /* fallback legt fest, dass ein neuer und noch nicht in paths
//   enthaltene Slug frisch von WordPress geholt werden soll.
//   Wenn man für paths einen leeren Array zurückgibt, werden
//   also alle Blogbeiträge erst statisch generiert, wenn sie
//   zum ersten Mal angefordert werden. Man könnte in paths
//   auch nur z.B. die 20 neuesten Blogbeiträge übergeben. */

//   return { paths, fallback: true };
//   //false: 404 Meldung
// }

// //url pfade übergeben: { params: { slug } }
// //für jede untersiete seite erzeugen

// export async function getStaticProps({ params }) {
//   console.log(params);

//   //daten für einzelne beiträge holen
//   // restapi anschauen:https://react.webworker.berlin/wp-json/wp/v2//posts?slug=react-rockt
//   // infos zu einzelndne eintrag

//   let post = {}; //einzelner beitrag

// const query= `{
//   post(id: "${params.slug}", idType: SLUG) {
//     title
//     content
//     featuredImage {
//       node {
//         altText
//         guid
//         mediaDetails {
//           height
//           width
//         }
//       }
//     }
//   }
// }`;

//   try {
//     const response = await fetch(`${graphqlPath}?query=${query}`);
//     const responseObj = await response.json();
//     // responseObj = Ergbenis der Anfregae
//     // format s.GraphQL

//     post = responseObj.data.post;

//   } catch (error) {
//     console.log(error);
//   }

//   // an die sietenkompontente übergeben
//   return {
//     props: {
//       post,
//     },
//     revalidate: 3600,
//   };
// }

// //getTitleImage 2. Afrgae für das Bild nicht emhr nötig ! YAY

// //seitenkomponente
// export default function BlogPost({ post }) {
//   // https://nextjs.org/docs/basic-features/data-fetching#fallback-pages
//   const router = useRouter();
//   if (router.isFallback) {
//     return <div>Loading...</div>;
//   }

//   const { title, content, featuredImage } = post;

//   return (
//     <Layout title={title}>
//       {featuredImage && (
//         <Image
//           src = {featuredImage.node.guid}
//           alt={featuredImage.nod.altText}
//           height={featuredImage.node.mediaDetails.height}
//           width={featuredImage.node.mediaDetails.width}
//           layout="responsive"
//           sizes="(max-width: 50rem) 100vw, 50rem"
//         />
//       )}
//       <p>Author:{author}</p>

//       <div dangerouslySetInnerHTML={{ __html: content }} />
//       {/* sicherehietsfeature umeghen!
//        html string wird sonst nicht angzeiegt!*/}
//     </Layout>
//   );
// }
