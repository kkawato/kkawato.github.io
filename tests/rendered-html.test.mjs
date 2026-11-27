import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const publicSiteUrl =
  "https://kkawato.github.io";
const competitionAwardUrl =
  "https://pub.confit.atlas.jp/ja/event/jfssa2026/content/competition";
const googleScholarUrl =
  "https://scholar.google.com/citations?user=d3oQ8RAAAAAJ&hl=en";
const xTwitterUrl =
  "https://x.com/kkawatoo";
const ryoOkuiUrl =
  "https://sites.google.com/site/okuiryoeconomics/home?authuser=0";
const statisticsCourseUrl =
  "https://www.stat.e.u-tokyo.ac.jp/index.html";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

const paperUrls = [
  "https://arxiv.org/abs/2611.30599",
  "https://arxiv.org/abs/2611.30595",
  "https://arxiv.org/abs/2605.02414",
  "https://arxiv.org/abs/2512.09337",
];

// Listed top to bottom and numbered from the bottom (5 down to 1).
const paperTitles = [
  "What Should an Experiment Measure? Combining a Short-Term Experiment with Confounded Observational Data to Identify Long-Term Treatment Effects",
  "Adaptive Experiments with Observational Data: Efficient Experimental Design and Asymptotic Time-Uniform Inference for Long-Term Treatment Effects",
  "How Much to Experiment? Admissible Sample Sizes in Test-and-Roll Experiments",
  "Balancing Weights for Causal Mediation Analysis",
  "Nonlinear Difference-in-Differences for Manifold Data via Optimal Transport",
];

function sliceBetween(html, startMarker, endMarker) {
  const start = html.indexOf(startMarker);
  assert.ok(start >= 0, `missing marker: ${startMarker}`);
  const end = endMarker ? html.indexOf(endMarker, start) : html.length;
  assert.ok(end > start, `missing end marker: ${endMarker}`);
  return html.slice(start, end);
}

async function renderOk(path) {
  const response = await render(path);
  assert.equal(response.status, 200, `status for ${path}`);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  // React inserts empty comments between adjacent text nodes; drop them so
  // assertions can match the visible text.
  return (await response.text()).replace(/<!-- -->/g, "");
}

// Matches ways a birth date could be written; checked against fictitious
// strings below so the pattern itself stays meaningful.
const personalDatePattern = /birth|\bborn\b|\bDOB\b|生年月日|誕生日|登録名|戸籍/i;
for (const sample of ["Date of birth: 1 Jan 2000", "Born on 1 January 2000", "DOB: 2000-01-01", "生年月日 2000年1月1日", "誕生日 1月1日"]) {
  assert.match(sample, personalDatePattern);
}

function assertSharedChrome(html, currentHref) {
  assert.match(html, /<nav class="plain-nav" aria-label="Primary navigation">/);
  for (const href of ["/", "/research/", "/presentations/", "/awards/", "/cv/"]) {
    assert.ok(html.includes(`href="${href}"`), `missing nav link ${href}`);
  }
  assert.match(
    html,
    new RegExp(`href="${currentHref.replace(/\//g, "\\/")}" aria-current="page"`),
  );
  const navLinks = sliceBetween(html, '<span class="plain-nav-links">', "</span>");
  assert.deepEqual(
    [...navLinks.matchAll(/<a href="([^"]+)"( aria-current="page")?>([^<]+)<\/a>/g)].map(
      (match) => [match[3], match[1], Boolean(match[2])],
    ),
    [
      ["Home", "/", currentHref === "/"],
      ["Research", "/research/", currentHref === "/research/"],
      ["Presentations", "/presentations/", currentHref === "/presentations/"],
      ["Awards &amp; Grants", "/awards/", currentHref === "/awards/"],
      ["CV", "/cv/", currentHref === "/cv/"],
    ],
  );
  assert.equal(html.match(/aria-current="page"/g)?.length, 1);
  assert.doesNotMatch(html, /class="plain-site-name"[^>]*aria-current/);
  assert.doesNotMatch(html, personalDatePattern, "page must not show a birth date");
  assert.match(html, /© 2026 Kentaro Kawato/);
  assert.doesNotMatch(html, /\/_next\/image\?/);
  assert.doesNotMatch(
    html,
    /paper-card|activity-card|award-chip|section-number|hero-actions|contact-section/,
  );
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
}

test("server-renders the short academic homepage", async () => {
  const html = await renderOk("/");
  assertSharedChrome(html, "/");

  assert.match(html, /<title>Kentaro Kawato \| Econometrics &amp; Statistics<\/title>/i);
  assert.match(html, /川戸 健太竜/);
  assert.match(html, /Graduate School of Economics/);
  assert.match(
    html,
    /Master(?:&#x27;|&apos;|')s Student in Economics \(<a href="https:\/\/www\.stat\.e\.u-tokyo\.ac\.jp\/index\.html" target="_blank" rel="noreferrer">Statistics Course<\/a>\)/,
  );
  assert.doesNotMatch(html, /M\.A\. Student|M\.A\. student/);
  assert.match(
    html,
    /<strong>Advisor:<\/strong>[\s\S]{0,300}href="https:\/\/sites\.google\.com\/site\/okuiryoeconomics\/home\?authuser=0" target="_blank" rel="noreferrer">Ryo Okui<\/a>/,
  );
  assert.doesNotMatch(html, /Tokyo, Japan/);
  assert.match(html, /<strong>Fields:<\/strong> Econometrics, Statistics/);
  assert.match(
    html,
    /<strong>Research Interests:<\/strong> Causal Inference, Experimental Design/,
  );
  assert.match(html, /<section id="bio">/);
  const bio = sliceBetween(html, '<section id="bio">', '<section id="upcoming">');
  assert.match(bio, /Kentaro is my given name and\s+Kawato is my family name/);
  assert.match(bio, /<span class="plain-pronunciation">ken-tah-roh<\/span>/);
  assert.match(bio, /<span class="plain-pronunciation">kah-wah-toh<\/span>/);
  assert.match(bio, /Ken,/);
  assert.doesNotMatch(bio, /Thank you for visiting my homepage/);
  const upcoming = sliceBetween(html, '<section id="upcoming">', '<section id="news">');
  assert.match(upcoming, /Dec\. 4, 2026/);
  assert.match(upcoming, />LMU-Todai Econometrics Workshop<\/a>\. Germany, Munich\./);
  assert.ok(upcoming.includes("https://www.stat.lmu.de/stat-econ/en/latest-news/events-overview/event/lmu-todai-workshop-f58fb630.html"));
  assert.match(html, /<section id="news">/);
  const newsSection = sliceBetween(html, '<section id="news">', '<section id="contact">');
  assert.match(newsSection, /Two new papers on arXiv/);
  assert.ok(newsSection.includes('href="/research/#experiment-measure"'));
  assert.ok(newsSection.includes('href="/research/#adaptive-observational"'));
  for (const id of ["test-and-roll", "balancing-mediation", "manifold-did"]) {
    assert.ok(newsSection.includes(`href="/research/#${id}"`), `news link to ${id}`);
  }
  assert.doesNotMatch(newsSection, /&rdquo;<\/a>\.|”<\/a>\./);
  for (const [id, label] of [
    ["experiment-measure", "“What Should an Experiment Measure?”"],
    ["adaptive-observational", "“Adaptive Experiments with Observational Data.”"],
    ["test-and-roll", "“How Much to Experiment?”"],
    ["balancing-mediation", "“Balancing Weights for Causal Mediation Analysis”"],
    ["manifold-did", "“Nonlinear Difference-in-Differences for Manifold Data via Optimal Transport.”"],
  ]) {
    assert.ok(
      newsSection.replace(/\s+/g, " ").includes(`<a href="/research/#${id}">${label}</a>`),
      `news link text for ${id}`,
    );
  }
  assert.match(newsSection, /Excellent Paper Award/);
  assert.match(newsSection, /Best Paper Award/);
  assert.match(newsSection, /Best Presentation Award/);
  assert.match(newsSection, /JSPS Research Fellowship for Young Scientists \(DC1\)/);
  assert.ok(
    newsSection.indexOf("DC1") < newsSection.indexOf("Excellent Paper Award"),
    "DC1 news should precede the September award",
  );

  assert.match(html, /kawato-kentaro380@g\.ecc\.u-tokyo\.ac\.jp/);
  assert.ok(html.includes(googleScholarUrl.replace("&", "&amp;")));
  assert.match(
    html,
    /href="https:\/\/x\.com\/kkawatoo" target="_blank" rel="noreferrer">X \/ Twitter<\/a>/,
  );
  assert.ok(html.includes(xTwitterUrl));

  // Long lists live on the Research and CV pages, not on the homepage.
  assert.doesNotMatch(html, /<section id="presentations">|<section id="awards">|<section id="grants">/);
  assert.doesNotMatch(html, /<details/);
  assert.doesNotMatch(html, /Draft available soon/);
  assert.doesNotMatch(html, /<section id="academic-visits">/);
  assert.doesNotMatch(html, /Visiting Research Fellow, Brown University/);

  assert.match(html, /application\/ld\+json/);
  assert.match(html, /"@type":"Person"/);
  assert.ok(html.includes(`"url":"${publicSiteUrl}"`));
  assert.ok(html.includes(`"sameAs":[`));
  for (const url of paperUrls) {
    assert.ok(html.includes(url), `sameAs should list ${url}`);
  }
  assert.match(html, /src="\/kentaro-kawato\.jpg"/);
  assert.ok(html.includes(`<link rel="canonical" href="${publicSiteUrl}"`));
  assert.ok(
    html.includes(`<meta property="og:image" content="${publicSiteUrl}/og.png"`),
  );
});

test("server-renders the research page with current arXiv records", async () => {
  const html = await renderOk("/research");
  assertSharedChrome(html, "/research/");
  assert.match(html, /<title>Research \| Kentaro Kawato<\/title>/);
  assert.ok(html.includes(`<link rel="canonical" href="${publicSiteUrl}/research/"`));
  assert.match(html, /<h2>Working Papers<\/h2>/);
  assert.doesNotMatch(html, /Papers are listed by date of first circulation/);

  let previous = -1;
  for (const title of paperTitles) {
    const position = html.indexOf(title);
    assert.ok(position > previous, `paper order or presence: ${title}`);
    previous = position;
  }
  for (const url of paperUrls) {
    assert.ok(html.includes(`href="${url}"`), `missing arXiv link ${url}`);
    assert.ok(
      html.includes(`href="${url.replace("/abs/", "/pdf/")}"`),
      `missing PDF link for ${url}`,
    );
  }
  assert.doesNotMatch(html, /2605\.02414v1/);
  // Each summary is folded under a "Summary" toggle, closed by default.
  assert.equal(
    html.match(/<details class="plain-paper-details"><summary>Summary<\/summary><ul class="plain-paper-summary">/g)?.length,
    5,
  );
  assert.doesNotMatch(html, /<details[^>]* open/);
  assert.equal(html.match(/<li id="[^"]+" class="plain-paper">/g)?.length, 5);
  assert.equal(html.match(/<ul class="plain-paper-summary">/g)?.length, 5);
  const summaryCounts = html
    .split('class="plain-paper-summary"')
    .slice(1)
    .map((block) => block.slice(0, block.indexOf("</ul>")).match(/<li>/g)?.length);
  // experiment-measure, adaptive, test-and-roll, balancing, manifold
  assert.deepEqual(summaryCounts, [2, 2, 3, 2, 1]);
  assert.doesNotMatch(html, /Dormant Papers|dormant-papers/);
  const workingSection = sliceBetween(html, '<section id="working-papers">', "</article>");
  assert.match(workingSection, /<ol class="plain-publication-list" reversed="">/);
  const order = ["experiment-measure", "adaptive-observational", "test-and-roll", "balancing-mediation", "manifold-did"];
  const positions = order.map((id) => workingSection.indexOf(`id="${id}"`));
  assert.ok(positions.every((pos, i) => pos >= 0 && (i === 0 || pos > positions[i - 1])), "paper order");
  order.forEach((id, i) => {
    const entry = sliceBetween(workingSection, `id="${id}"`, "</p>");
    assert.ok(entry.includes(`<span class="plain-paper-number">${order.length - i}. </span>`), `number for ${id}`);
  });
  const expectedPapers = {
    "experiment-measure": {
      keywords: "Long-term treatment effects, Data combination, Experimental design, Measurement error, Proxy, Inverse problem",
      summary: ["Asks what a short-term experiment should measure", "but not a detailed measurement that would remove confounding", "should (1) collect the same coarse measurement", "(2) measure the characteristics", "and (3) distinguish", "this detailed measurement"],
    },
    "adaptive-observational": {
      keywords: "Adaptive experimental design, Neyman allocation, Long-term treatment effects, Surrogate index, Data combination, Asymptotic time-uniform inference",
      summary: ["not only to identify long-term treatment effects", "minimize the semiparametric efficiency bound."],
    },
    "test-and-roll": {
      keywords: "Experimental design, Test-and-roll experiments, Sample-size design, Admissibility, Minimax regret, Exploration–exploitation tradeoff",
      summary: ["how many of <i>N</i> units", "receive the treatment with the higher sample mean", "under this rollout rule with two treatments, balanced assignment, a Gaussian approximation", "continuous relaxation of the sample size", "<i>N</i>/3]", "under a plug-in rule"],
    },
    "balancing-mediation": {
      keywords: "Causal mediation analysis, Natural direct and indirect effects, Propensity score instability, Balancing weights, Finite-sample covariate imbalance, Multiple mediators",
      summary: ["whose contrasts include natural direct and indirect effects", "products of estimated probability ratios", "relaxes the balance conditions within tolerances chosen without the outcome"],
    },
    "manifold-did": {
      keywords: "Nonlinear difference-in-differences, Changes-in-changes, Optimal transport, Fréchet mean, Manifold data, Compositional data",
      summary: ["Develops manifold changes-in-changes"],
    },
  };
  for (const [id, expected] of Object.entries(expectedPapers)) {
    const entry = sliceBetween(html, `id="${id}"`, "</p></li>");
    assert.ok(
      entry.includes(`<strong>Keywords:</strong> ${expected.keywords}</p>`),
      `keywords for ${id}`,
    );
    const summary = sliceBetween(entry, 'class="plain-paper-summary"', "</ul>").replace(/\s+/g, " ");
    for (const phrase of expected.summary) {
      assert.ok(summary.includes(phrase), `summary of ${id}: ${phrase}`);
    }
  }
  const supplementNote = "Supplementary material and replication code forthcoming.";
  const codeNote = "Replication code forthcoming.";
  for (const [id, note] of [
    ["experiment-measure", supplementNote],
    ["adaptive-observational", supplementNote],
    ["test-and-roll", codeNote],
    ["balancing-mediation", codeNote],
  ]) {
    const links = sliceBetween(
      sliceBetween(html, `id="${id}"`, "</p></li>"),
      'class="plain-paper-links"',
    );
    assert.ok(
      links.includes(`<span class="plain-paper-note"> · ${note}</span>`),
      `missing note for ${id}`,
    );
  }
  assert.doesNotMatch(
    sliceBetween(html, 'id="manifold-did"', "</p></li>"),
    /plain-paper-note/,
  );
  assert.equal(html.match(/<strong>Keywords:<\/strong>/g)?.length, 5);

  const testAndRoll = sliceBetween(html, 'id="test-and-roll"', 'class="plain-paper-links"');
  assert.match(testAndRoll, /href="https:\/\/sites\.google\.com\/view\/shoseisakaguchi\/"[^>]*>Shosei Sakaguchi<\/a>/);
  assert.match(testAndRoll, /Previously circulated as “Prior-Free Sample Size Design for Test-and-Roll Experiments\.”/);
  assert.match(testAndRoll, /Best Presentation Award, 20th Spring Meeting of the Japan Statistical Society/);
  assert.match(testAndRoll, /Best Paper Award, 2026 Asian Summer School in Econometrics and Statistics/);

  const adaptive = sliceBetween(html, 'id="adaptive-observational"', 'class="plain-paper-links"');
  assert.match(adaptive, /arXiv:2611\.30595/);
  assert.match(
    adaptive,
    /Excellent Paper Award, Competition Session, Japanese Joint Statistical Meeting 2026/,
  );

  const manifold = sliceBetween(html, 'id="manifold-did"', "</article>");
  assert.match(
    manifold,
    /Keywords:<\/strong> Nonlinear difference-in-differences, Changes-in-changes, Optimal transport, Fréchet mean, Manifold data, Compositional data/,
  );
  assert.match(manifold, /href="https:\/\/sites\.google\.com\/site\/daisukekurisu\/home"[^>]*>Daisuke Kurisu<\/a>/);
  assert.match(
    manifold,
    /href="\/papers\/kawato-kurisu-manifold-did\.pdf" target="_blank" rel="noreferrer">PDF<\/a>/,
  );

  const experiment = sliceBetween(html, 'id="experiment-measure"', 'class="plain-paper-links"');
  assert.match(experiment, /arXiv:2611\.30599/);
  assert.match(experiment, /Keywords:<\/strong> Long-term treatment effects, Data combination/);
  assert.doesNotMatch(experiment, /plain-paper-authors/);
});

test("server-renders the CV page with education, awards, and presentations", async () => {
  const html = await renderOk("/cv");
  assertSharedChrome(html, "/cv/");
  assert.match(html, /<title>CV \| Kentaro Kawato<\/title>/);
  assert.ok(html.includes(`<link rel="canonical" href="${publicSiteUrl}/cv/"`));
  assert.match(html, /<h1>Curriculum Vitae<\/h1>/);
  assert.match(html, /B\.A\. in Social Sciences/);
  assert.match(html, /University of Manchester/);
  assert.doesNotMatch(html, /Tokyo, Japan|Manchester, Manchester/);
  assert.match(html, /<strong>Research Interests:<\/strong> Causal Inference, Experimental Design/);
  assert.match(html, /<h2>Fields and Research Interests<\/h2>/);
  assert.ok(html.includes(statisticsCourseUrl));
  assert.ok(html.includes(ryoOkuiUrl));

  const papers = sliceBetween(html, '<section id="papers">', '<section id="awards">');
  for (const title of paperTitles) {
    assert.ok(papers.includes(title), `CV should list ${title}`);
  }
  assert.match(papers, /Kentaro Kawato and Shosei Sakaguchi \(2026\)/);
  assert.match(papers, /Kentaro Kawato and Daisuke Kurisu \(2026\)/);
  assert.doesNotMatch(papers, /Dormant Papers/);
  assert.match(papers, /<ol class="numbered-list" reversed="">/);
  assert.equal(papers.match(/<ol /g)?.length, 1);
  assert.equal(papers.match(/<li>/g)?.length, 5);
  const cvPositions = paperTitles.map((title) => papers.indexOf(title));
  assert.ok(cvPositions.every((pos, i) => i === 0 || pos > cvPositions[i - 1]), "CV paper order");

  const awards = sliceBetween(html, '<section id="awards">', '<section id="grants">');
  assert.match(awards, /Competition Session, Japanese Joint Statistical Meeting 2026, September 2026\./);
  assert.match(awards, /優秀報告賞/);
  assert.ok(awards.includes(competitionAwardUrl));
  assert.match(awards, /https:\/\/www\.jss\.gr\.jp\/wp-content\/uploads\/20th-shunki-houkoku_0313\.pdf/);
  assert.match(awards, /https:\/\/www\.e\.u-tokyo\.ac\.jp\/news\/2026\/20260722Awards\.html/);
  assert.doesNotMatch(html, /JFSSA 2026/);

  const grants = sliceBetween(html, '<section id="grants">', '<section id="presentations">');
  assert.match(grants, /World-leading Innovative Graduate Study for Frontiers of Mathematical Sciences and Physics/);
  assert.match(grants, /Miura Foundation Scholarship/);
  assert.match(grants, />Research Fellowship for Young Scientists \(DC1\)<\/a>, Japan Society for the Promotion of Science \(JSPS\), April 2027 – March\s+2030/);
  assert.ok(grants.includes('href="https://www.jsps.go.jp/english/e-pd/"'));
  assert.match(grants, /日本学術振興会 特別研究員（DC1）/);
  assert.match(grants, /https:\/\/www\.miurazaidan\.or\.jp\//);
  assert.match(grants, /https:\/\/www\.ms\.u-tokyo\.ac\.jp\/wings-fmsp\//);

  const talks = sliceBetween(html, '<section id="presentations">', '<section id="teaching">');
  assert.match(
    talks,
    /Japanese Joint Statistical Meeting 2026[\s\S]{0,400}<span class="plain-translation" lang="ja">2026年度統計関連学会連合大会<\/span>/,
  );
  assert.doesNotMatch(talks, /Scheduled/);
  const upcomingHeading = talks.indexOf("<h3>Upcoming</h3>");
  assert.ok(upcomingHeading >= 0, "CV should have an Upcoming heading");
  assert.ok(upcomingHeading < talks.indexOf("LMU-Todai Econometrics Workshop"));
  assert.ok(talks.indexOf("LMU-Todai Econometrics Workshop") < talks.indexOf("<h3>Past</h3>"));
  assert.doesNotMatch(html, /コンペティション\(1\)|14:00(?:–|&ndash;)14:20/);
  for (const eventUrl of [
    "https://pub.confit.atlas.jp/ja/event/jfssa2026/session/t2K1Gt85",
    "https://sites.google.com/view/swetotaruhokudai/swet2026/%E8%A8%88%E9%87%8F%E7%B5%8C%E6%B8%88%E5%AD%A6",
    "https://conf.xmu.edu.cn/summerschool2026/Program.htm",
    "https://sites.google.com/g.ecc.u-tokyo.ac.jp/seta2026",
    "https://jss2026spring.ywstat.jp/",
    "https://sites.google.com/view/japan-econometrics/",
    "https://www.cirje.e.u-tokyo.ac.jp/research/conf/con2025.html",
    "https://sites.google.com/g.ecc.u-tokyo.ac.jp/ysg2025",
  ]) {
    assert.ok(talks.includes(eventUrl), `missing presentation link: ${eventUrl}`);
  }
  for (const location of [
    "Japan, Yokohama",
    "Japan, Otaru",
    "China, Beijing",
    "Japan, Tokyo",
    "Japan, Kyoto",
    "Japan, Miyazaki",
    "Japan, Kotohira",
  ]) {
    assert.ok(talks.includes(location), `missing location ${location}`);
  }
  assert.match(talks, /20th Spring Meeting of the Japan Statistical Society<\/a>, Poster Session, March 2026\./);

  assert.match(
    html,
    /Teaching Assistant, Econometrics I \(Undergraduate\), The University of Tokyo, Fall 2025/,
  );
});

test("server-renders the presentations page with upcoming and past talks", async () => {
  const html = await renderOk("/presentations");
  assertSharedChrome(html, "/presentations/");
  assert.match(html, /<title>Presentations \| Kentaro Kawato<\/title>/);
  assert.ok(html.includes(`<link rel="canonical" href="${publicSiteUrl}/presentations/"`));
  const upcoming = sliceBetween(html, '<section id="upcoming">', '<section id="past">');
  assert.match(upcoming, /LMU-Todai Econometrics Workshop<\/a>, December 4, 2026\. Germany, Munich\./);
  const past = sliceBetween(html, '<section id="past">', "</article>");
  assert.equal(past.match(/<li>/g)?.length, 8);
  assert.doesNotMatch(past, /December 4, 2026/);
  assert.match(past, /20th Spring Meeting of the Japan Statistical Society<\/a>, Poster Session, March 2026\. Japan, Kyoto\./);
  assert.match(past, /<span class="plain-translation" lang="ja">関西計量経済学研究会<\/span>/);
});

test("server-renders the awards and grants page", async () => {
  const html = await renderOk("/awards");
  assertSharedChrome(html, "/awards/");
  assert.match(html, /<title>Awards &amp; Grants \| Kentaro Kawato<\/title>/);
  assert.ok(html.includes(`<link rel="canonical" href="${publicSiteUrl}/awards/"`));
  const awards = sliceBetween(html, '<section id="awards">', '<section id="grants">');
  assert.equal(awards.match(/<li>/g)?.length, 3);
  assert.ok(awards.includes(competitionAwardUrl));
  assert.match(awards, /優秀発表賞/);
  const grants = sliceBetween(html, '<section id="grants">', "</article>");
  assert.equal(grants.match(/<li>/g)?.length, 3);
  assert.match(grants, /Research Fellowship for Young Scientists \(DC1\)<\/a>, Japan Society for the Promotion of Science \(JSPS\)/);
  assert.ok(
    grants.includes('<a href="https://www.jsps.go.jp/english/e-pd/" target="_blank" rel="noreferrer">Research Fellowship for Young Scientists (DC1)</a>'),
  );
  assert.ok(grants.indexOf("DC1") < grants.indexOf("World-leading"));
});

test("publishes crawlable robots and sitemap records for the GitHub Pages URL", async () => {
  const [robotsResponse, sitemapResponse] = await Promise.all([
    render("/robots.txt"),
    render("/sitemap.xml"),
  ]);

  assert.equal(robotsResponse.status, 200);
  assert.equal(sitemapResponse.status, 200);

  const [robots, sitemap] = await Promise.all([
    robotsResponse.text(),
    sitemapResponse.text(),
  ]);
  assert.match(robots, /Allow: \//);
  assert.ok(robots.includes(`Sitemap: ${publicSiteUrl}/sitemap.xml`));
  assert.ok(sitemap.includes(`<loc>${publicSiteUrl}</loc>`));
  assert.ok(sitemap.includes(`<loc>${publicSiteUrl}/research/</loc>`));
  assert.ok(sitemap.includes(`<loc>${publicSiteUrl}/cv/</loc>`));
  assert.ok(sitemap.includes(`<loc>${publicSiteUrl}/presentations/</loc>`));
  assert.ok(sitemap.includes(`<loc>${publicSiteUrl}/awards/</loc>`));
  assert.doesNotMatch(robots, /sites\.google\.com\/view\/kentaro-kawato/);
  assert.doesNotMatch(sitemap, /sites\.google\.com\/view\/kentaro-kawato/);
});

test("keeps SEO, visible numbering, and image assets in the committed project", async () => {
  const [page, research, cv, data, styles, layout, robots, sitemap, exportScript, packageJson, profile, socialCard] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/research/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/cv/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/site-data.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/robots.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
    readFile(new URL("../scripts/export-static.mjs", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    access(new URL("../public/kentaro-kawato.jpg", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
  ]);

  assert.match(page, /https:\/\/schema\.org/);
  assert.match(page, /"@type": "Person"/);
  assert.match(page, /Master&apos;s Student in Economics \(/);
  assert.doesNotMatch(page + cv, /M\.A\. Student|M\.A\. student/);
  assert.match(layout, /Master's student/);
  assert.doesNotMatch(layout, /M\.A\. Student|M\.A\. student/);
  for (const url of [statisticsCourseUrl, googleScholarUrl, xTwitterUrl, ryoOkuiUrl]) {
    assert.ok(data.includes(url), `site data should hold ${url}`);
  }
  assert.match(research, /canonical: "\/research\/"/);
  assert.match(cv, /canonical: "\/cv\/"/);
  assert.match(exportScript, /\["\/research", "research\/index\.html"\]/);
  assert.match(exportScript, /\["\/cv", "cv\/index\.html"\]/);
  assert.match(exportScript, /\["\/presentations", "presentations\/index\.html"\]/);
  assert.match(exportScript, /\["\/awards", "awards\/index\.html"\]/);
  // Personal identifiers from the fellowship notice must never be published.
  assert.doesNotMatch(data + page + cv, personalDatePattern);
  assert.ok(sitemap.includes("/research/"));
  assert.ok(sitemap.includes("/cv/"));

  const jfssaStart = data.indexOf('title: "Japanese Joint Statistical Meeting 2026"');
  const jfssaEnd = data.indexOf("},", jfssaStart);
  assert.ok(jfssaStart >= 0 && jfssaEnd > jfssaStart);
  assert.doesNotMatch(data.slice(jfssaStart, jfssaEnd), /Scheduled/);
  assert.doesNotMatch(data, /2605\.02414v1/);

  assert.match(
    styles,
    /\.plain-content ol\.numbered-list\s*\{[^}]*list-style-type:\s*decimal;/s,
  );
  assert.match(layout, /robots:/);
  assert.match(layout, /canonical:/);
  assert.ok(layout.includes(publicSiteUrl));
  assert.ok(data.includes(publicSiteUrl));
  assert.ok(robots.includes(publicSiteUrl));
  assert.ok(sitemap.includes(publicSiteUrl));
  assert.match(layout, /summary_large_image/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.equal(profile, undefined);
  assert.equal(socialCard, undefined);
});
