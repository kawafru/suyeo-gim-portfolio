import FabricCarousel from "./fabric-carousel";

const images = Array.from(
  { length: 131 },
  (_, index) => `/projects/fabricresearch/fabric-research-${String(index + 1).padStart(3, "0")}.jpg`,
);

export default function FabricResearchPage() {
  return (
    <main className="site project fabric-research-project">
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

      <section className="project-detail fabric-research-detail">
        <header className="project-detail-head">
          <div className="project-detail-identity">
            <h1 className="project-detail-title">FABRIC RESEARCH</h1>
            <div className="project-detail-year">Completed: 2024</div>
          </div>
          <a className="project-detail-back" href="/projects" aria-label="Back to projects">( Back )</a>
        </header>

        <FabricCarousel images={images} title="Fabric Research" />

        <div className="project-overview fabric-research-overview">
          <h2>Overview:</h2>
          <p>An in-depth study of selected textile materials, tracing visual and technical references and examining how each fabric was used within its season. The research considers composition, hand, structure, performance, suitable applications, and the advantages and limitations of each material across different seasonal conditions. It connects fabric properties with garment function, silhouette, and informed design decision-making.</p>
        </div>

        <div className="project-detail-bottom-nav">
          <a className="project-detail-back" href="/projects" aria-label="Back to projects">( Back )</a>
        </div>
      </section>
    </main>
  );
}
