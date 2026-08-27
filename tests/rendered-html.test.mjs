import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

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
  assert.match(html, /2026年度統計関連学会連合大会/);
  assert.match(html, /Summer Workshop on Economic Theory/);
  assert.match(html, /Econometrics I \(Undergraduate\)/);
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
  assert.match(html, /https:\/\/www\.jss\.gr\.jp\/wp-content\/uploads\/20th-shunki-houkoku_0313\.pdf/);
  assert.match(html, /https:\/\/conf\.xmu\.edu\.cn\/summerschool2026\/Program\.htm/);
  assert.match(html, /https:\/\/www\.e\.u-tokyo\.ac\.jp\/news\/2026\/20260722Awards\.html/);
  assert.match(html, /https:\/\/www\.miurazaidan\.or\.jp\//);
  assert.match(html, /https:\/\/www\.ms\.u-tokyo\.ac\.jp\/wings-fmsp\//);
  assert.match(html, /<ol class="plain-publication-list numbered-list">/);
  assert.doesNotMatch(html, /コンペティション\(1\)|14:00(?:–|&ndash;)14:20/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /"@type":"Person"/);
  assert.match(html, /og:image/i);
  assert.match(html, /rel="canonical"/i);
  assert.doesNotMatch(
    html,
    /paper-card|activity-card|award-chip|section-number|hero-actions|contact-section/,
  );
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("keeps SEO and image assets in the committed project", async () => {
  const [page, layout, packageJson, profile, socialCard] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
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
  assert.match(layout, /robots:/);
  assert.match(layout, /canonical:/);
  assert.match(layout, /summary_large_image/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.equal(profile, undefined);
  assert.equal(socialCard, undefined);
});
