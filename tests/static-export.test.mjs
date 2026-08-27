import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const publicSiteUrl = "https://kkawato.github.io";

test("exports a complete GitHub Pages artifact", async () => {
  const [html, robots, sitemap] = await Promise.all([
    readFile(new URL("../out/index.html", import.meta.url), "utf8"),
    readFile(new URL("../out/robots.txt", import.meta.url), "utf8"),
    readFile(new URL("../out/sitemap.xml", import.meta.url), "utf8"),
    access(new URL("../out/.nojekyll", import.meta.url)),
    access(new URL("../out/kentaro-kawato.jpg", import.meta.url)),
    access(new URL("../out/og.png", import.meta.url)),
  ]);

  assert.ok(html.includes(`<link rel="canonical" href="${publicSiteUrl}"`));
  assert.ok(
    html.includes(
      `<meta property="og:image" content="${publicSiteUrl}/og.png"`,
    ),
  );
  assert.match(html, /src="\/kentaro-kawato\.jpg"/);
  assert.doesNotMatch(html, /\/_next\/image\?/);
  assert.match(html, /<ol class="plain-publication-list numbered-list">/);
  assert.ok(robots.includes(`Sitemap: ${publicSiteUrl}/sitemap.xml`));
  assert.ok(sitemap.includes(`<loc>${publicSiteUrl}</loc>`));

  const stylesheet = html.match(/href="(\/_next\/static\/css\/[^"]+\.css)"/);
  assert.ok(stylesheet, "rendered homepage should reference its stylesheet");
  await access(new URL(`../out${stylesheet[1]}`, import.meta.url));
});
