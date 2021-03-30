import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="site-header">
      <div className="inner-width">
        <img
          className="site-header__logo"
          alt="Vercel "
          src="/img/vercel.svg"
        />

        <Navigation />
      </div>
    </header>
  );
}
