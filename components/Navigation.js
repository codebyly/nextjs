import Link from "next/link";
export default function Navigation() {
  return (
    <nav className="site-navigation">
      <Link href="/">
        <a>Start</a>
      </Link>
      <Link href="/news">
        <a>News</a>
      </Link>
      <Link href="/blog">
        <a>Blog</a>
      </Link>
      <Link href="/suche">
        <a>Suche</a>
      </Link>
      <Link href="/kontakt">
        <a>Kontakt</a>
      </Link>
      <Link href="/impressum">
        <a>Impressum</a>
      </Link>
      <Link href="/shuffle">
        <a>Shuffle</a>
      </Link>
    </nav>
  );
}
