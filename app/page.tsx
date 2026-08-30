import Image from "next/image";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://kkawato.github.io";

const presentations = [
  {
    date: "Sep. 7, 2026",
    title: "Japanese Joint Statistical Meeting 2026",
    note: "Scheduled",
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
  email: "mailto:kawato-kentaro380@g.ecc.u-tokyo.ac.jp",
  jobTitle: "M.A. Student in Economics (Statistics Course)",
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
    "Causal mediation analysis",
    "Experimental design",
  ],
  sameAs: [
    "https://github.com/kkawato",
    "https://sites.google.com/view/kentaro-kawato",
    "https://arxiv.org/abs/2512.09337",
    "https://arxiv.org/abs/2605.02414",
  ],
};

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <>
      <a className="plain-skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="plain-header">
        <nav className="plain-nav" aria-label="Primary navigation">
          <a className="plain-site-name" href="#about">
            Kentaro Kawato
          </a>
          <a href="#papers">Papers</a>
          <a href="#presentations">Presentations</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

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
              <p>M.A. Student in Economics (Statistics Course)</p>
              <p>
                Graduate School of Economics, The University of Tokyo, Tokyo,
                Japan
              </p>
              <p>
                <strong>Research Interests:</strong> Econometrics, Statistics
              </p>
            </section>

            <section id="education">
              <h2>Education</h2>
              <ul>
                <li>
                  B.A. in Social Sciences, The University of Tokyo, Tokyo,
                  Japan (April 2020 – March 2025)
                </li>
                <li>
                  Exchange Program: University of Manchester, Manchester, UK
                  (September 2022 – June 2023)
                </li>
              </ul>
            </section>

            <section id="papers">
              <h2>Working Papers</h2>
              <ol className="plain-publication-list numbered-list">
                <li>
                  <p>
                    Kentaro Kawato. “Balancing Weights for Causal Mediation
                    Analysis.” <em>arXiv preprint arXiv:2512.09337</em> (2025).{" "}
                    [
                    <a
                      href="https://arxiv.org/abs/2512.09337"
                      target="_blank"
                      rel="noreferrer"
                    >
                      link
                    </a>
                    ]
                  </p>
                  <p className="plain-keywords">
                    <strong>Keywords:</strong> causal mediation analysis;
                    natural direct and indirect effects; propensity score
                    instability; balancing weights; finite-sample covariate
                    imbalance
                  </p>
                </li>
                <li>
                  <p>
                    Kentaro Kawato and Shosei Sakaguchi. “Prior-Free Sample
                    Size Design for Test-and-Roll Experiments.”{" "}
                    <em>arXiv preprint arXiv:2605.02414</em> (2026). [
                    <a
                      href="https://arxiv.org/abs/2605.02414v1"
                      target="_blank"
                      rel="noreferrer"
                    >
                      link
                    </a>
                    ]
                  </p>
                  <p className="plain-keywords">
                    <strong>Keywords:</strong> experimental design;
                    test-and-roll experiments; sample-size design; minimax
                    regret; exploration-exploitation tradeoff
                  </p>
                  <p>
                    <strong>Awards:</strong> Best Presentation Award, 20th
                    Spring Meeting of the Japan Statistical Society; Best Paper
                    Award, 2026 Asian Summer School in Econometrics and
                    Statistics.
                  </p>
                </li>
                <li>
                  <p>
                    Kentaro Kawato (2026). “Adaptive Experiments with
                    Observational Data: Efficient Experimental Design and
                    Anytime-Valid Inference for Long-Run Treatment Effects.”
                    Draft available soon.
                  </p>
                </li>
              </ol>
            </section>

            <section id="work-in-progress">
              <h2>Work in Progress</h2>
              <ol className="numbered-list">
                <li>
                  Nonlinear Difference in Difference for Manifold Data (with
                  Daisuke Kurisu)
                </li>
              </ol>
            </section>

            <section id="presentations">
              <h2>Presentations</h2>
              <ol className="numbered-list">
                <li>
                  <a
                    href="https://pub.confit.atlas.jp/ja/event/jfssa2026/session/t2K1Gt85"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Japanese Joint Statistical Meeting 2026
                  </a>
                  , September 7, 2026. Japan, Yokohama. Scheduled.
                  <span className="plain-translation" lang="ja">
                    2026年度統計関連学会連合大会
                  </span>
                </li>
                <li>
                  <a
                    href="https://sites.google.com/view/swetotaruhokudai/swet2026/%E8%A8%88%E9%87%8F%E7%B5%8C%E6%B8%88%E5%AD%A6"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Summer Workshop on Economic Theory
                  </a>
                  , August 2026. Japan, Otaru.
                </li>
                <li>
                  <a
                    href="https://conf.xmu.edu.cn/summerschool2026/Program.htm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    2026 Asian Summer School in Econometrics and Statistics
                  </a>
                  , July 2026. China, Beijing.
                </li>
                <li>
                  <a
                    href="https://sites.google.com/g.ecc.u-tokyo.ac.jp/seta2026"
                    target="_blank"
                    rel="noreferrer"
                  >
                    The 20th International Symposium on Econometric Theory and
                    Applications
                  </a>
                  , June 2026. Japan, Tokyo.
                </li>
                <li>
                  <a
                    href="https://jss2026spring.ywstat.jp/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    20th Spring Meeting of the Japan Statistical Society
                  </a>
                  , Poster Session, March 2026. Japan, Kyoto.
                  <span className="plain-translation" lang="ja">
                    第二十回日本統計学会春季集会ポスターセッション
                  </span>
                </li>
                <li>
                  <a
                    href="https://sites.google.com/view/japan-econometrics/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Kansai Econometrics Workshop
                  </a>
                  , January 2026. Japan, Miyazaki.
                  <span className="plain-translation" lang="ja">
                    関西計量経済学研究会
                  </span>
                </li>
                <li>
                  <a
                    href="https://www.cirje.e.u-tokyo.ac.jp/research/conf/con2025.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LMU-Todai Econometrics Workshop
                  </a>
                  , September 2025. Japan, Tokyo.
                </li>
                <li>
                  <a
                    href="https://sites.google.com/g.ecc.u-tokyo.ac.jp/ysg2025"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Summer Seminar on Statistics
                  </a>
                  , August 2025. Japan, Kotohira.
                  <span className="plain-translation" lang="ja">
                    統計サマーセミナー
                  </span>
                </li>
              </ol>
            </section>

            <section id="teaching">
              <h2>Teaching</h2>
              <ol className="numbered-list">
                <li>
                  Teaching Assistant, Econometrics I (Undergraduate), The
                  University of Tokyo, Fall 2025
                </li>
              </ol>
            </section>

            <section id="awards">
              <h2>Awards</h2>
              <ol className="numbered-list">
                <li>
                  Best Presentation Award, 20th Spring Meeting of the Japan
                  Statistical Society, Poster Session, March 2026.
                  <span className="plain-translation" lang="ja">
                    優秀発表賞（第二十回日本統計学会春季集会ポスターセッション）{" "}
                    <a
                      href="https://www.jss.gr.jp/wp-content/uploads/20th-shunki-houkoku_0313.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      受賞のことば
                    </a>
                  </span>
                </li>
                <li>
                  Best Paper Award, 2026 Asian Summer School in Econometrics and
                  Statistics, July 2026. [
                  <a
                    href="https://conf.xmu.edu.cn/summerschool2026/Program.htm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Program
                  </a>
                  ,{" "}
                  <a
                    href="https://www.e.u-tokyo.ac.jp/news/2026/20260722Awards.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    News from the Graduate School of Economics
                  </a>
                  ]
                </li>
              </ol>
            </section>

            <section id="grants">
              <h2>Grants</h2>
              <ol className="numbered-list">
                <li>
                  <a
                    href="https://www.ms.u-tokyo.ac.jp/wings-fmsp/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    World-leading Innovative Graduate Study for Frontiers of
                    Mathematical Sciences and Physics
                  </a>
                  , The University of Tokyo, October 2025 – Present
                  <span className="plain-translation" lang="ja">
                    数物フロンティア国際卓越大学院, 東京大学
                  </span>
                </li>
                <li>
                  <a
                    href="https://www.miurazaidan.or.jp/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Miura Foundation Scholarship
                  </a>
                  , April 2020 – March 2024
                  <span className="plain-translation" lang="ja">
                    公益財団法人三浦財団
                  </span>
                </li>
              </ol>
            </section>

            <section id="contact">
              <h2>Contact</h2>
              <p>
                Email:{" "}
                <a href="mailto:kawato-kentaro380@g.ecc.u-tokyo.ac.jp">
                  kawato-kentaro380@g.ecc.u-tokyo.ac.jp
                </a>
              </p>
            </section>
          </article>
        </div>
      </main>

      <footer className="plain-footer">
        <p>© 2026 Kentaro Kawato</p>
      </footer>

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
              I am an M.A. student in the Statistics Course at the Graduate
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
