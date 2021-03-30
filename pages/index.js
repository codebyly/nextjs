import Layout from "../components/Layout";
import Image from "next/image";

export default function Home() {
  return (
    <Layout title="Start-Seite">
      <h2>Responsive Bilder</h2>

      <img
        className="logo"
        src="/img/logo@1x.jpg"
        srcSet="/img/logo@1x.jpg 1x, /img/logo@2x 2x"
        alt="logo"
        width="32"
        height="10"
        loading="lazy"
      />

      {/* pixum bild Foto #1047*, responsives Bild Größe abhängig vonn Bildschrimgröße*/}
      <img
        className="image"
        src="https://picsum.photos/id/1011/900/450"
        srcSet="https://picsum.photos/id/1011/450/225 450w, 
        https://picsum.photos/id/1011/900/450 900w, 
        https://picsum.photos/id/1011/1350/675 1350w, 
        https://picsum.photos/id/1011/1800/900 1800w"
        sizes="(max-width: 52rem) 90vw, 50rem"
        alt=""
        loading="lazy"
        width="2"
        height="1"
      />

      {/* Art Direction: unterschiedliche Motive /Auschnitte abhängig von Bildschirm/Layout */}
      <picture>
        <source
          media="(max-width: 30rem) and (orientation: portrait)"
          srcSet="/img/header-image-portrait.jpg"
        />
        <source
          media="(max-width: 40rem) and (orientation: portrait)"
          srcSet="/img/header-image-square.jpg"
        />
        <img
          className="image"
          src="/img/header-image-landscape@1000.jpg"
          srcSet="/img/header-image-landscape@1000.jpg 1000w,/img/header-image-landscape@1500.jpg 1500w,/img/header-image-landscape@2000.jpg 2000w"
          sizes="(max-width: 52rem) 90vw, 50rem"
          loading="lazy"
          alt=""
        />
      </picture>

      {/* webp ausliefern wenn möglich */}
      <picture>
        <source srcSet="/img/herbst.webp" type="image/webp" />
        <img
          className="image"
          src="/img/herbst.jpg"
          alt=""
          loading="lazy"
          width="4"
          height="3"
        />
      </picture>

      {/* bildkomponente von next, importiern  liefetr autaomtsich webp aus wenn möglcih source und set wird automatisch erzeugt*/}
      <Image
        src="/img/hong-kong.jpg"
        alt=""
        sizes="(max-width: 52rem) 90vw, 50rem"
        layout="responsive"
        // quality={70}
        width={5184} //als integerwert! eght auch string??
        height={3456} //muss nciht pixelgenau?
      />

      {/*  */}
    </Layout>
  );
  //title als prob mitgeben
}
