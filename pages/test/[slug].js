import Layout from "../../components/Layout";

const apiPath = "https://react.webworker.berlin/wp-json/wp/v2/";

/* Wenn man einen dynamischen Pfad hat, muss man Next mitteilen,
welche Pfade das System statisch generieren soll, hier also
eine Liste der vorhanden Blog-Slugs übergeben. */
export async function getStaticPaths() {
  let paths = [];

  try {
    const response = await fetch(`${apiPath}posts`);

    const posts = await response.json();

    /*Die Einträge im paths-Array müssen den params entsprechen,
die getStaticProps erhält. */
    paths = posts.map(({ slug }) => ({ params: { slug } }));
  } catch (e) {
    console.log(e);
  }

  /* fallback legt fest, dass ein neuer und noch nicht in paths
enthaltene Slug frisch von WordPress geholt werden soll.
Wenn man für paths einen leeren Array zurückgibt, werden
also alle Blogbeiträge erst statisch generiert, wenn sie
zum ersten Mal angefordert werden. */
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  console.log(params);

  let post = {};
  try {
    const response = await fetch(`${apiPath}posts?slug=${params.slug}`);
    //Anfrage gibt einen Array mit einem Eintrag, nicht den einzelnen Post zurück
    const postsArray = await response.json();

    post = postsArray[0];
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
  const { title, content } = post;

  return (
    <Layout title={title.rendered}>
      <div dangerouslySetInnerHTML={{ __html: content.rendered }} />
    </Layout>
  );
}
