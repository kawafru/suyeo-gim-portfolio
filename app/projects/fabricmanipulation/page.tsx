import FabricCarousel from "../fabricresearch/fabric-carousel";

const images = Array.from(
  { length: 20 },
  (_, index) => `/projects/fabricmanipulation/fabric-manipulation-${String(index + 1).padStart(2, "0")}.jpg`,
);

export default function FabricManipulationPage() {
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
            <h1 className="project-detail-title">FABRIC MANIPULATION</h1>
            <div className="project-detail-year">Completed: 2024</div>
          </div>
          <a className="project-detail-back" href="/projects" aria-label="Back to projects">( Back )</a>
        </header>

        <FabricCarousel images={images} title="Fabric Manipulation" />

        <div className="project-overview fabric-research-overview">
          <h2>Overview:</h2>
          <p>A material-led exploration of fabric manipulation as a medium for expressing ideas and thought through clothing. Through a series of surface, structural, and dimensional experiments, the project investigates how fabric can be folded, gathered, layered, distorted, textured, and transformed to create visual language, movement, volume, and meaning. Each study considers the relationship between technique, material behavior, garment construction, and the body, revealing how experimental textile processes can develop into purposeful design concepts.</p>
        </div>

        <div className="project-detail-bottom-nav">
          <a className="project-detail-back" href="/projects" aria-label="Back to projects">( Back )</a>
        </div>
      </section>
    </main>
  );
}
