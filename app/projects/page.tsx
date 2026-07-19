import PageLoader from "../page-loader";

const projectEntries = [
  { href: "/projects/muse-henryford", image: "/projects/muse-henryford/henry-ford-03.jpg", title: "PROJECT MUSE: HENRY FORD", year: "2025", showFullImage: true },
  { href: "/projects/muse-yayoikusama", image: "/projects/muse-yayoikusama/yayoi-kusama-07.jpg", title: "PROJECT MUSE: YAYOI KUSAMA", year: "2025", showFullImage: true },
  { href: "/projects/fabricresearch", image: "/projects/fabricresearch/fabric-research-001.jpg", title: "FABRIC RESEARCH", year: "2024" },
  { href: "/projects/fabricmanipulation", image: "/projects/fabricmanipulation/fabric-manipulation-thumbnail.png", title: "FABRIC MANIPULATION", year: "2024", showFullImage: true },
  { href: "/projects/echoedfusion", image: "/projects/echoedfusion/echoed-fusion-thumbnail.jpg", title: "ECHOED FUSION", year: "2024", showFullImage: true },
];

export default function ProjectsPage() {
  return (
    <main className="site projects-index">
      <PageLoader />
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

      <section className="projects-index-grid" aria-label="Projects">
        {projectEntries.map((project, index) => (
          <a className={`projects-index-card${project.showFullImage ? " is-full-image" : ""}`} href={project.href} key={project.href}>
            <div className="projects-index-image"><img src={project.image} alt="" loading="lazy" decoding="async" /></div>
            <div className="projects-index-meta"><span>{String(index + 1).padStart(2, "0")}</span><span>{project.title}</span><span>{project.year}</span></div>
          </a>
        ))}
      </section>
    </main>
  );
}
