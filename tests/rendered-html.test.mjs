import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const publicSiteUrl =
  "https://kentaro-kawato.kentaro1358nohe.chatgpt.site";

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

test("server-renders the complete, simple academic homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Kentaro Kawato \| Econometrics &amp; Statistics<\/title>/i);
  assert.match(html, /川戸 健太竜/);
  assert.match(html, /Graduate School of Economics/);
  assert.match(html, /M\.A\. Student in Economics \(Statistics Course\)/);
  assert.match(html, /B\.A\. in Social Sciences/);
  assert.match(html, /University of Manchester/);
  assert.match(html, /Balancing Weights for Causal Mediation Analysis/);
  assert.match(html, /Prior-Free Sample Size Design for Test-and-Roll Experiments/);
  assert.match(html, /Nonlinear Difference in Difference for Manifold Data/);
  assert.match(html, /Adaptive Experiment for Estimating Long-term Treatment Effect/);
  assert.match(html, /Japanese Joint Statistical Meeting 2026/);
  assert.match(
    html,
    /Japanese Joint Statistical Meeting 2026[\s\S]{0,400}<span class="plain-translation" lang="ja">2026年度統計関連学会連合大会<\/span>/,
  );
  assert.match(html, /Summer Workshop on Economic Theory/);
  assert.match(
    html,
    /Teaching Assistant, Econometrics I \(Undergraduate\), The University of Tokyo, Fall 2025/,
  );
  assert.doesNotMatch(
    html,
    /<li>Econometrics I \(Undergraduate\), The University of Tokyo, Fall 2025<\/li>/,
  );
  assert.match(html, /Best Presentation Award/);
  assert.match(html, /Best Paper Award/);
  assert.match(
    html,
    /World-leading Innovative Graduate Study for Frontiers of Mathematical Sciences and Physics/,
  );
  assert.match(html, /Miura Foundation Scholarship/);
  assert.match(html, /kawato-kentaro380@g\.ecc\.u-tokyo\.ac\.jp/);
  assert.match(html, /https:\/\/arxiv\.org\/abs\/2512\.09337/);
  assert.match(html, /https:\/\/arxiv\.org\/abs\/2605\.02414v1/);
  assert.match(html, /https:\/\/pub\.confit\.atlas\.jp\/ja\/event\/jfssa2026\/session\/t2K1Gt85/);
  for (const eventUrl of [
    "https://sites.google.com/view/swetotaruhokudai/swet2026/%E8%A8%88%E9%87%8F%E7%B5%8C%E6%B8%88%E5%AD%A6",
    "https://conf.xmu.edu.cn/summerschool2026/Program.htm",
    "https://sites.google.com/g.ecc.u-tokyo.ac.jp/seta2026",
    "https://jss2026spring.ywstat.jp/",
    "https://sites.google.com/view/japan-econometrics/",
    "https://www.cirje.e.u-tokyo.ac.jp/research/conf/con2025.html",
    "https://sites.google.com/g.ecc.u-tokyo.ac.jp/ysg2025",
  ]) {
    assert.ok(html.includes(eventUrl), `missing presentation link: ${eventUrl}`);
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
    assert.match(html, new RegExp(location));
  }
  assert.doesNotMatch(
    html,
    /Summer Workshop on Economic Theory[\s\S]{0,200}Scheduled/,
  );
  assert.match(html, /https:\/\/www\.jss\.gr\.jp\/wp-content\/uploads\/20th-shunki-houkoku_0313\.pdf/);
  assert.match(html, /https:\/\/conf\.xmu\.edu\.cn\/summerschool2026\/Program\.htm/);
  assert.match(html, /https:\/\/www\.e\.u-tokyo\.ac\.jp\/news\/2026\/20260722Awards\.html/);
  assert.match(html, /https:\/\/www\.miurazaidan\.or\.jp\//);
  assert.match(html, /https:\/\/www\.ms\.u-tokyo\.ac\.jp\/wings-fmsp\//);
  assert.match(html, /<ol class="plain-publication-list numbered-list">/);
  assert.doesNotMatch(html, /コンペティション\(1\)|14:00(?:–|&ndash;)14:20/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /"@type":"Person"/);
  assert.ok(html.includes(`"url":"${publicSiteUrl}"`));
  assert.match(html, /og:image/i);
  assert.ok(
    html.includes(`<link rel="canonical" href="${publicSiteUrl}"`),
  );
  assert.ok(
    html.includes(
      `<meta property="og:image" content="${publicSiteUrl}/og.png"`,
    ),
  );
  assert.doesNotMatch(
    html,
    /paper-card|activity-card|award-chip|section-number|hero-actions|contact-section/,
  );
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("publishes crawlable robots and sitemap records for the Sites URL", async () => {
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
  assert.doesNotMatch(robots, /sites\.google\.com\/view\/kentaro-kawato/);
  assert.doesNotMatch(sitemap, /sites\.google\.com\/view\/kentaro-kawato/);
});

test("keeps SEO, visible numbering, and image assets in the committed project", async () => {
  const [page, styles, layout, robots, sitemap, packageJson, profile, socialCard] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/robots.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    access(new URL("../public/kentaro-kawato.jpg", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
  ]);

  assert.match(page, /https:\/\/schema\.org/);
  assert.match(page, /"@type": "Person"/);
  assert.equal(
    page.match(/<ol className="(?:plain-publication-list )?numbered-list">/g)
      ?.length,
    6,
  );
  assert.doesNotMatch(page, /コンペティション\(1\)|14:00–14:20/);
  const swetStart = page.indexOf('title: "Summer Workshop on Economic Theory"');
  const swetEnd = page.indexOf("},", swetStart);
  assert.ok(swetStart >= 0 && swetEnd > swetStart);
  assert.doesNotMatch(page.slice(swetStart, swetEnd), /Scheduled/);

  const secondPaperStart = page.indexOf(
    "Kentaro Kawato and Shosei Sakaguchi.",
  );
  const secondPaperEnd = page.indexOf("</li>", secondPaperStart);
  const secondPaper = page.slice(secondPaperStart, secondPaperEnd);
  assert.ok(secondPaper.includes("<strong>Keywords:</strong>"));
  assert.ok(secondPaper.includes("<strong>Awards:</strong>"));
  assert.ok(
    secondPaper.indexOf("<strong>Keywords:</strong>") <
      secondPaper.indexOf("<strong>Awards:</strong>"),
  );
  assert.match(
    styles,
    /\.plain-content ol\.numbered-list\s*\{[^}]*list-style-type:\s*decimal;/s,
  );
  assert.match(layout, /robots:/);
  assert.match(layout, /canonical:/);
  assert.ok(layout.includes(publicSiteUrl));
  assert.ok(page.includes(publicSiteUrl));
  assert.ok(robots.includes(publicSiteUrl));
  assert.ok(sitemap.includes(publicSiteUrl));
  assert.match(layout, /summary_large_image/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.equal(profile, undefined);
  assert.equal(socialCard, undefined);
});
