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

test("server-renders the finished academic homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Kentaro Kawato \| Econometrics &amp; Statistics<\/title>/i);
  assert.match(html, /川戸 健太竜/);
  assert.match(html, /Graduate School of Economics/);
  assert.match(html, /Balancing Weights for Causal Mediation Analysis/);
  assert.match(html, /Prior-Free Sample Size Design for Test-and-Roll Experiments/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /"@type":"Person"/);
  assert.match(html, /og:image/i);
  assert.match(html, /rel="canonical"/i);
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
  assert.match(layout, /robots:/);
  assert.match(layout, /canonical:/);
  assert.match(layout, /summary_large_image/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.equal(profile, undefined);
  assert.equal(socialCard, undefined);
});
