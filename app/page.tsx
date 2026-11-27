import Image from "next/image";
import { SiteFooter, SiteHeader } from "./site-chrome";
import {
  contact,
  news,
  people,
  researchFields,
  researchInterests,
  statisticsCourseUrl,
  upcomingPresentations,
} from "./site-data";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://kkawato.github.io";

// Used only by LegacyHomepage below, which is not rendered.
const presentations = [
  {
    date: "Sep. 7, 2026",
    title: "Japanese Joint Statistical Meeting 2026",
    location: "Japan, Yokohama",
    href: "https://pub.confit.atlas.jp/ja/event/jfssa2026/session/t2K1Gt85",
  },
  {
    date: "Aug. 2026",
    title: "Summer Workshop on Economic Theory",
    location: "Japan, Otaru",
    href: "https://sites.google.com/view/swetotaruhokudai/swet2026/%E8%A8%88%E9%87%8F%E7%B5%8C%E6%B8%88%E5%AD%A6",
  },
  {
    date: "Jul. 2026",
    title: "2026 Asian Summer School in Econometrics and Statistics",
    location: "China, Beijing",
    href: "https://conf.xmu.edu.cn/summerschool2026/Program.htm",
  },
  {
    date: "Jun. 2026",
    title: "20th International Symposium on Econometric Theory and Applications",
    location: "Japan, Tokyo",
    href: "https://sites.google.com/g.ecc.u-tokyo.ac.jp/seta2026",
  },
  {
    date: "Mar. 2026",
    title: "20th Spring Meeting of the Japan Statistical Society",
    note: "Poster Session",
    location: "Japan, Kyoto",
    href: "https://jss2026spring.ywstat.jp/",
  },
  {
    date: "Jan. 2026",
    title: "Kansai Econometrics Workshop",
    location: "Japan, Miyazaki",
    href: "https://sites.google.com/view/japan-econometrics/",
  },
  {
    date: "Sep. 2025",
    title: "LMU–Todai Econometrics Workshop",
    location: "Japan, Tokyo",
    href: "https://www.cirje.e.u-tokyo.ac.jp/research/conf/con2025.html",
  },
  {
    date: "Aug. 2025",
    title: "Summer Seminar on Statistics",
    location: "Japan, Kotohira",
    href: "https://sites.google.com/g.ecc.u-tokyo.ac.jp/ysg2025",
  },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kentaro Kawato",
  alternateName: "川戸 健太竜",
  url: siteUrl,
  image: `${siteUrl}/kentaro-kawato.jpg`,
  email: `mailto:${contact.email}`,
  jobTitle: "Master's Student in Economics (Statistics Course)",
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "The University of Tokyo",
    url: "https://www.u-tokyo.ac.jp/en/",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "The University of Tokyo",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "The University of Manchester",
    },
  ],
  knowsAbout: [
    "Econometrics",
    "Statistics",
    "Causal inference",
    "Experimental design",
    "Causal mediation analysis",
    "Difference-in-differences",
  ],
  sameAs: [
    contact.github,
    "https://sites.google.com/view/kentaro-kawato",
    contact.googleScholar,
    contact.x,
    "https://arxiv.org/abs/2611.30599",
    "https://arxiv.org/abs/2611.30595",
    "https://arxiv.org/abs/2605.02414",
    "https://arxiv.org/abs/2512.09337",
  ],
};

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <>
      <SiteHeader current="home" />

      <main id="main-content" className="plain-page">
        <div className="plain-profile-layout">
          <aside className="plain-profile-photo">
            <Image
              src="/kentaro-kawato.jpg"
              alt="Kentaro Kawato"
              width={240}
              height={240}
              priority
              unoptimized
              sizes="(max-width: 720px) 180px, 210px"
            />
          </aside>

          <article className="plain-content">
            <section id="about" className="plain-intro">
              <h1>Kentaro Kawato</h1>
              <p className="plain-japanese-name" lang="ja">
                <strong>川戸 健太竜</strong>
              </p>
              <p>
                Master&apos;s Student in Economics (
                <a
                  href={statisticsCourseUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Statistics Course
                </a>
                )
              </p>
              <p>Graduate School of Economics, The University of Tokyo</p>
              <p>
                <strong>Fields:</strong> {researchFields.join(", ")}
              </p>
              <p>
                <strong>Research Interests:</strong>{" "}
                {researchInterests.join(", ")}
              </p>
              <p>
                <strong>Advisor:</strong>{" "}
                <a
                  href={people.ryoOkui.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {people.ryoOkui.name}
                </a>
              </p>
              <p className="plain-link-row">
                <a href={`mailto:${contact.email}`}>Email</a>
                <a href="/cv/">CV</a>
                <a href={contact.googleScholar} target="_blank" rel="noreferrer">
                  Google Scholar
                </a>
                <a href={contact.arxiv} target="_blank" rel="noreferrer">
                  arXiv
                </a>
                <a href={contact.x} target="_blank" rel="noreferrer">
                  X / Twitter
                </a>
              </p>
            </section>

            <section id="bio">
              <h2>About</h2>
              <p>
                Hello! I&apos;m Kentaro Kawato. Kentaro is my given name and
                Kawato is my family name. You can call me Kentaro (
                <span className="plain-pronunciation">ken-tah-roh</span>), Ken,
                or Kawato (
                <span className="plain-pronunciation">kah-wah-toh</span>).
              </p>
            </section>

            {upcomingPresentations.length ? (
              <section id="upcoming">
                <h2>Upcoming Presentations</h2>
                <ul className="plain-news-list">
                  {upcomingPresentations.map((item) => (
                    <li key={item.href}>
                      <span className="plain-news-date">
                        {item.shortDate ?? item.date}
                      </span>
                      <span className="plain-news-body">
                        <a href={item.href} target="_blank" rel="noreferrer">
                          {item.title}
                        </a>
                        {item.note ? `, ${item.note}` : null}. {item.location}.
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section id="news">
              <h2>News</h2>
              <ul className="plain-news-list">
                {news.map((item, index) => (
                  <li key={index}>
                    <span className="plain-news-date">{item.date}</span>
                    <span className="plain-news-body">{item.body}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="contact">
              <h2>Contact</h2>
              <p>
                Email:{" "}
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
              <p>Graduate School of Economics, The University of Tokyo</p>
            </section>
          </article>
        </div>
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}

export function LegacyHomepage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Kentaro Kawato — Home">
          <span className="wordmark-mark" aria-hidden="true">
            KK
          </span>
          <span className="wordmark-name">Kentaro Kawato</span>
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#research">Research</a>
          <a href="#profile">Profile</a>
          <a href="#activity">Activity</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Econometrics · Statistics</p>
            <h1 id="hero-title">Kentaro Kawato</h1>
            <p className="japanese-name" lang="ja">
              川戸 健太竜
            </p>
            <p className="hero-lede">
              I am a Master&apos;s student in the Statistics Course at the Graduate
              School of Economics, The University of Tokyo. My research lies
              at the intersection of econometrics, statistics, causal
              inference, and experimental design.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#research">
                View research <span aria-hidden="true">↓</span>
              </a>
              <a
                className="button button-secondary"
                href="mailto:kawato-kentaro380@g.ecc.u-tokyo.ac.jp"
              >
                Email me <Arrow />
              </a>
            </div>

            <dl className="hero-facts">
              <div>
                <dt>Based in</dt>
                <dd>Tokyo, Japan</dd>
              </div>
              <div>
                <dt>Affiliation</dt>
                <dd>The University of Tokyo</dd>
              </div>
            </dl>
          </div>

          <figure className="portrait-wrap">
            <div className="portrait-frame">
              <Image
                src="/kentaro-kawato.jpg"
                alt="Kentaro Kawato standing beside cherry blossoms in Tokyo"
                width={1108}
                height={838}
                priority
                sizes="(max-width: 760px) 92vw, 42vw"
              />
            </div>
            <figcaption>
              <span>東京大学大学院 経済学研究科</span>
              <span>Graduate School of Economics</span>
            </figcaption>
          </figure>
        </section>

        <section className="section research-section" id="research">
          <div className="section-heading">
            <p className="section-number">01</p>
            <div>
              <p className="eyebrow">Selected work</p>
              <h2>Research</h2>
            </div>
            <p className="section-intro">
              Current work develops practical statistical tools for causal
              mediation and welfare-aware experimentation.
            </p>
          </div>

          <div className="paper-list">
            <article className="paper-card">
              <div className="paper-index" aria-hidden="true">
                01
              </div>
              <div className="paper-body">
                <p className="paper-meta">Working paper · 2025</p>
                <h3>Balancing Weights for Causal Mediation Analysis</h3>
                <p className="paper-authors">Kentaro Kawato</p>
                <p className="paper-abstract">
                  Develops balancing-weight estimators for natural direct and
                  indirect effects, designed to reduce propensity-score
                  instability and finite-sample covariate imbalance.
                </p>
                <ul className="tag-list" aria-label="Research keywords">
                  <li>Causal mediation</li>
                  <li>Balancing weights</li>
                  <li>Semiparametric efficiency</li>
                </ul>
              </div>
              <div className="paper-links">
                <a
                  href="https://arxiv.org/abs/2512.09337"
                  target="_blank"
                  rel="noreferrer"
                >
                  arXiv <Arrow />
                </a>
                <a
                  href="https://arxiv.org/pdf/2512.09337"
                  target="_blank"
                  rel="noreferrer"
                >
                  PDF <Arrow />
                </a>
              </div>
            </article>

            <article className="paper-card featured-paper">
              <div className="paper-index" aria-hidden="true">
                02
              </div>
              <div className="paper-body">
                <div className="paper-kicker-row">
                  <p className="paper-meta">Working paper · 2026</p>
                  <span className="award-chip">Best Paper Award</span>
                </div>
                <h3>Prior-Free Sample Size Design for Test-and-Roll Experiments</h3>
                <p className="paper-authors">
                  Kentaro Kawato and Shosei Sakaguchi
                </p>
                <p className="paper-abstract">
                  Studies prior-free sample-size design for finite-population
                  test-and-roll experiments and proposes a welfare-aware rule
                  for balancing exploration with rollout performance.
                </p>
                <ul className="tag-list" aria-label="Research keywords">
                  <li>Experimental design</li>
                  <li>Minimax regret</li>
                  <li>Test-and-roll</li>
                </ul>
              </div>
              <div className="paper-links">
                <a
                  href="https://arxiv.org/abs/2605.02414"
                  target="_blank"
                  rel="noreferrer"
                >
                  arXiv <Arrow />
                </a>
                <a
                  href="https://arxiv.org/pdf/2605.02414"
                  target="_blank"
                  rel="noreferrer"
                >
                  PDF <Arrow />
                </a>
              </div>
            </article>
          </div>

          <div className="work-in-progress">
            <div>
              <p className="eyebrow">In progress</p>
              <h3>Projects on nonlinear DiD and adaptive experiments</h3>
            </div>
            <ul>
              <li>
                Nonlinear Difference in Difference for Manifold Data
                <span>with Daisuke Kurisu</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="section profile-section" id="profile">
          <div className="section-heading compact-heading">
            <p className="section-number">02</p>
            <div>
              <p className="eyebrow">Background</p>
              <h2>Profile</h2>
            </div>
          </div>

          <div className="profile-grid">
            <div className="profile-statement">
              <p>
                My interests center on econometric and statistical methods
                that make causal and experimental decisions more stable,
                transparent, and useful in finite samples.
              </p>
              <div className="interest-row">
                <span>Econometrics</span>
                <span>Statistics</span>
                <span>Causal inference</span>
                <span>Experimental design</span>
              </div>
            </div>

            <div className="education-block">
              <h3>Education</h3>
              <ol className="timeline">
                <li>
                  <p className="timeline-date">2025 — Present</p>
                  <p className="timeline-title">M.A. in Economics</p>
                  <p>The University of Tokyo · Statistics Course</p>
                </li>
                <li>
                  <p className="timeline-date">2020 — 2025</p>
                  <p className="timeline-title">B.A. in Social Sciences</p>
                  <p>The University of Tokyo</p>
                </li>
                <li>
                  <p className="timeline-date">2022 — 2023</p>
                  <p className="timeline-title">Exchange Program</p>
                  <p>The University of Manchester, UK</p>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section className="section activity-section" id="activity">
          <div className="section-heading">
            <p className="section-number">03</p>
            <div>
              <p className="eyebrow">Academic record</p>
              <h2>Activity</h2>
            </div>
            <p className="section-intro">
              Presentations, teaching, awards, and support for ongoing work.
            </p>
          </div>

          <div className="activity-grid">
            <article className="activity-card presentations-card">
              <p className="activity-label">Talks & workshops</p>
              <h3>Presentations</h3>
              <ol className="presentation-list">
                {presentations.map((presentation) => (
                  <li key={`${presentation.date}-${presentation.title}`}>
                    <time>{presentation.date}</time>
                    <div>
                      <p>
                        {presentation.href ? (
                          <a
                            href={presentation.href}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {presentation.title} <Arrow />
                          </a>
                        ) : (
                          presentation.title
                        )}
                      </p>
                      {presentation.note ? <span>{presentation.note}</span> : null}
                      <span>{presentation.location}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </article>

            <div className="activity-stack">
              <article className="activity-card highlight-card">
                <p className="activity-label">Recognition</p>
                <h3>Awards</h3>
                <ul className="detail-list">
                  <li>
                    <strong>Best Paper Award</strong>
                    <span>
                      2026 Asian Summer School in Econometrics and Statistics
                    </span>
                    <span className="inline-links">
                      <a
                        href="https://conf.xmu.edu.cn/summerschool2026/Program.htm"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Program <Arrow />
                      </a>
                      <a
                        href="https://www.e.u-tokyo.ac.jp/news/2026/20260722Awards.html"
                        target="_blank"
                        rel="noreferrer"
                      >
                        UTokyo news <Arrow />
                      </a>
                    </span>
                  </li>
                  <li>
                    <strong>Best Presentation Award</strong>
                    <span>
                      20th Spring Meeting of the Japan Statistical Society
                    </span>
                    <a
                      href="https://www.jss.gr.jp/wp-content/uploads/20th-shunki-houkoku_0313.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      受賞のことば <Arrow />
                    </a>
                  </li>
                </ul>
              </article>

              <article className="activity-card">
                <p className="activity-label">Teaching</p>
                <h3>Econometrics I</h3>
                <p className="activity-copy">
                  Teaching Assistant · Undergraduate course, The University of
                  Tokyo · Fall 2025
                </p>
              </article>

              <article className="activity-card">
                <p className="activity-label">Grants & scholarships</p>
                <h3>Research support</h3>
                <ul className="detail-list compact-list">
                  <li>
                    <strong>
                      World-leading Innovative Graduate Study for Frontiers of
                      Mathematical Sciences and Physics
                    </strong>
                    <span>The University of Tokyo · 2025 — Present</span>
                    <a
                      href="https://www.ms.u-tokyo.ac.jp/wings-fmsp/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Program website <Arrow />
                    </a>
                  </li>
                  <li>
                    <strong>Miura Foundation Scholarship</strong>
                    <span>2020 — 2024</span>
                    <a
                      href="https://www.miurazaidan.or.jp/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Foundation website <Arrow />
                    </a>
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <p className="eyebrow">Get in touch</p>
          <h2>Questions, ideas, or collaboration?</h2>
          <p>
            I welcome conversations about econometrics, statistics, causal
            inference, and experimental design.
          </p>
          <div className="contact-links">
            <a href="mailto:kawato-kentaro380@g.ecc.u-tokyo.ac.jp">
              kawato-kentaro380@g.ecc.u-tokyo.ac.jp <Arrow />
            </a>
            <a href="https://github.com/kkawato" target="_blank" rel="noreferrer">
              GitHub <Arrow />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© 2026 Kentaro Kawato</p>
        <a href="#top">Back to top ↑</a>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}
