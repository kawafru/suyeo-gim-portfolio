import PageLoader from "../page-loader";

export default function CollectionPage() {
  return (
    <main className="site collection-page-shell">
      <PageLoader />
      <header className="nav">
        <a className="wordmark" href="/" aria-label="Home"><span>suyeo</span> gim</a>
        <nav className="nav-groups" aria-label="Portfolio navigation">
          <div className="nav-group">
            <a href="/works">works</a>
            <a href="/projects">projects</a>
            <a className="active" href="/collection">collection</a>
          </div>
          <div className="nav-group secondary"><a href="/about">about</a><a href="/cv">cv</a></div>
        </nav>
        <div className="index">collection</div>
      </header>
      <section className="collection-development">
        <div className="collection-development-copy" aria-label="Under development">
          <div className="collection-development-title">
            <span>UNDER DEVELOPMEN</span><span className="collection-final-t">T</span><span className="collection-caret" aria-hidden="true">|</span>
          </div>
          <a href="/">( BACK )</a>
        </div>
      </section>
    </main>
  );
}
