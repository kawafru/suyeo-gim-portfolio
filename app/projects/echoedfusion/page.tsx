import FabricCarousel from "../fabricresearch/fabric-carousel";

const images = Array.from(
  { length: 21 },
  (_, index) => `/projects/echoedfusion/echoed-fusion-${String(index + 1).padStart(2, "0")}.jpg`,
);

export default function EchoedFusionPage() {
  return (
    <main className="site project echoed-fusion-project">
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

      <section className="project-detail echoed-fusion-detail">
        <header className="project-detail-head">
          <div className="project-detail-identity">
            <h1 className="project-detail-title">ECHOED FUSION</h1>
            <div className="project-detail-year">Completed: 2024</div>
          </div>
          <a className="project-detail-back" href="/projects" aria-label="Back to projects">( Back )</a>
        </header>

        <FabricCarousel images={images} title="Echoed Fusion" />

        <section className="project-overview">
          <p>OVERVIEW:</p>
          <p className="project-overview-copy">ECHOED FUSION EXPLORES A DYNAMIC FASHION LANGUAGE THAT MERGES RETROFUTURISM WITH MYTHOLOGICAL REFERENCES. DRAWING ON THE DISTINCT AESTHETICS OF MULTIPLE ERAS, THE COLLECTION REINTERPRETS CLASSIC SILHOUETTES AND COLORS THROUGH FUTURISTIC MATERIALS, GRAPHIC DETAILS, AND SYMBOLIC CREATURES. THESE LAYERED ELEMENTS CREATE AN ENCHANTING VISUAL NARRATIVE THAT MOVES BEYOND A SINGLE MOMENT IN TIME, UNITING THE CHARM OF THE PAST WITH A FORWARD-LOOKING SENSE OF INNOVATION.</p>
        </section>

        <div className="project-detail-bottom-nav">
          <a className="project-detail-back" href="/projects" aria-label="Back to projects">( Back )</a>
        </div>
      </section>
    </main>
  );
}
