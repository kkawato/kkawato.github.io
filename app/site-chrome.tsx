import type { Honor, Paper, Presentation } from "./site-data";

type PageKey = "home" | "research" | "presentations" | "awards" | "cv";

const navItems: { key: PageKey; label: string; href: string }[] = [
  { key: "home", label: "Home", href: "/" },
  { key: "research", label: "Research", href: "/research/" },
  { key: "presentations", label: "Presentations", href: "/presentations/" },
  { key: "awards", label: "Awards & Grants", href: "/awards/" },
  { key: "cv", label: "CV", href: "/cv/" },
];

export function SiteHeader({ current }: { current: PageKey }) {
  return (
    <>
      <a className="plain-skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="plain-header">
        <nav className="plain-nav" aria-label="Primary navigation">
          {/* Plain anchors: the GitHub Pages export has no RSC payloads for client-side navigation. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            className="plain-site-name"
            href="/"
          >
            Kentaro Kawato
          </a>
          <span className="plain-nav-links">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                aria-current={current === item.key ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </span>
        </nav>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="plain-footer">
      <p>© 2026 Kentaro Kawato · Last updated November 2026</p>
    </footer>
  );
}

export function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

export function PaperAuthors({ paper }: { paper: Paper }) {
  if (paper.coauthors.length === 0) {
    return null;
  }
  return (
    <p className="plain-paper-authors">
      with{" "}
      {paper.coauthors.map((person, index) => (
        <span key={person.name}>
          {index === 0
            ? null
            : index === paper.coauthors.length - 1
              ? paper.coauthors.length > 2
                ? ", and "
                : " and "
              : ", "}
          <ExternalLink href={person.href}>{person.name}</ExternalLink>
        </span>
      ))}
    </p>
  );
}

export function PaperEntry({
  paper,
  number,
}: {
  paper: Paper;
  number?: number;
}) {
  const titleHref = paper.links[0]?.href;
  return (
    <li id={paper.id} className="plain-paper">
      <p className="plain-paper-title">
        {number !== undefined ? (
          <span className="plain-paper-number">{`${number}. `}</span>
        ) : null}
        {titleHref ? (
          <ExternalLink href={titleHref}>{paper.title}</ExternalLink>
        ) : (
          paper.title
        )}
      </p>
      <PaperAuthors paper={paper} />
      <p className="plain-paper-meta">
        {paper.status}, {paper.year}
        {paper.previousTitle ? (
          <>
            . Previously circulated as &ldquo;{paper.previousTitle}.&rdquo;
          </>
        ) : null}
      </p>
      {paper.awards?.length ? (
        <p className="plain-paper-awards">
          <strong>{paper.awards.length > 1 ? "Awards" : "Award"}:</strong>{" "}
          {paper.awards.join("; ")}.
        </p>
      ) : null}
      <details className="plain-paper-details">
        <summary>Summary</summary>
        <ul className="plain-paper-summary">
          {paper.summary.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </details>
      <p className="plain-paper-keywords">
        <strong>Keywords:</strong> {paper.keywords.join(", ")}
      </p>
      <p className="plain-paper-links">
        {paper.links.map((link, index) => (
          <span key={link.label}>
            {index > 0 ? " · " : null}
            <ExternalLink href={link.href}>{link.label}</ExternalLink>
          </span>
        ))}
        {paper.note ? (
          <span className="plain-paper-note">
            {paper.links.length ? " · " : null}
            {paper.note}
          </span>
        ) : null}
      </p>
    </li>
  );
}

export function PresentationItem({ item }: { item: Presentation }) {
  return (
    <li>
      <ExternalLink href={item.href}>{item.title}</ExternalLink>
      {item.note ? `, ${item.note}` : null}, {item.date}. {item.location}.
      {item.japanese ? (
        <span className="plain-translation" lang="ja">
          {item.japanese}
        </span>
      ) : null}
    </li>
  );
}

export function HonorItem({ honor }: { honor: Honor }) {
  return (
    <li>
      {honor.english}
      {honor.japanese || honor.links?.length ? (
        <span className="plain-translation">
          {honor.japanese ? <span lang="ja">{honor.japanese}</span> : null}
          {honor.links?.length ? (
            <>
              {honor.japanese ? " " : null}[
              {honor.links.map((link, index) => (
                <span key={link.href}>
                  {index > 0 ? ", " : null}
                  <ExternalLink href={link.href}>{link.label}</ExternalLink>
                </span>
              ))}
              ]
            </>
          ) : null}
        </span>
      ) : null}
    </li>
  );
}
