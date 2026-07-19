type MuseGalleryProps = {
  title: string;
  year: string;
  images: string[];
};

export default function MuseGallery({ title, year, images }: MuseGalleryProps) {
  return (
    <main className="site project muse-project">
      <header className="nav">
        <a className="wordmark" href="/" aria-label="Home"><span>suyeo</span> gim</a>
        <nav className="nav-groups" aria-label="Portfolio navigation">
          <div className="nav-group">
            <a href="/works">works</a>
            <a className="active" href="/projects">projects</a>
            <a href="/collection">collection</a>
          </div>
          <div className="nav-group secondary">
            <a href="/about">about</a>
            <a href="/cv">cv</a>
          </div>
        </nav>
        <div className="index">projects</div>
      </header>

      <section className="project-detail muse-project-detail">
        <header className="project-detail-head">
          <div className="project-detail-identity">
            <h1 className="project-detail-title">{title}</h1>
            <div className="project-detail-year">Completed: {year}</div>
          </div>
          <a className="project-detail-back" href="/projects" aria-label="Back to projects">( Back )</a>
        </header>

        <div className="muse-project-images" aria-label={`${title} images`}>
          {images.map((src, index) => (
            <img key={src} src={src} alt={`${title} ${String(index + 1).padStart(2, "0")}`} draggable={false} loading={index < 2 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "auto"} decoding="async" />
          ))}
        </div>

        <div className="project-detail-bottom-nav muse-project-bottom-nav">
          <a className="project-detail-back" href="/projects" aria-label="Back to projects">( Back )</a>
        </div>
      </section>
    </main>
  );
}
