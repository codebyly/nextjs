import Footer from "./Footer";
import Header from "./Header";
import Head from "next/head";

export default function Layout({ children, title }) {
  return (
    <div className="site-wrapper">
      <Head>
        <title>{title || "NextJs (Fallback-Titel)"}</title>
        {/* nimmt eineggeben titel OR Defaultwert */}
      </Head>

      <Header />
      <main className="site-main inner-width">
        {/* //falls titel existiert titel ausgeben sonst nichts */}
        {title && <h1>Titel: {title}</h1>}
        {children}
      </main>
      <Footer />
    </div>
  );
}
