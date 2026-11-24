import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const publicSiteUrl = "https://kkawato.github.io";

test("exports a complete GitHub Pages artifact", async () => {
  const [html, research, cv, talks, awards, robots, sitemap] = await Promise.all([
    readFile(new URL("../out/index.html", import.meta.url), "utf8"),
    readFile(new URL("../out/research/index.html", import.meta.url), "utf8"),
    readFile(new URL("../out/cv/index.html", import.meta.url), "utf8"),
    readFile(new URL("../out/presentations/index.html", import.meta.url), "utf8"),
    readFile(new URL("../out/awards/index.html", import.meta.url), "utf8"),
    readFile(new URL("../out/robots.txt", import.meta.url), "utf8"),
    readFile(new URL("../out/sitemap.xml", import.meta.url), "utf8"),
    access(new URL("../out/.nojekyll", import.meta.url)),
    access(new URL("../out/kentaro-kawato.jpg", import.meta.url)),
    access(new URL("../out/og.png", import.meta.url)),
    access(
      new URL("../out/papers/kawato-kurisu-manifold-did.pdf", import.meta.url),
    ),
  ]);

  assert.match(
    research,
    /href="\/papers\/kawato-kurisu-manifold-did\.pdf" target="_blank" rel="noreferrer">PDF<\/a>/,
  );
  assert.ok(research.includes(`<link rel="canonical" href="${publicSiteUrl}/research/"`));
  assert.ok(cv.includes(`<link rel="canonical" href="${publicSiteUrl}/cv/"`));
  assert.ok(talks.includes(`<link rel="canonical" href="${publicSiteUrl}/presentations/"`));
  assert.ok(awards.includes(`<link rel="canonical" href="${publicSiteUrl}/awards/"`));
  assert.match(research, /<ol class="plain-publication-list">/);
  assert.match(cv, /<ol class="numbered-list">/);

  assert.ok(html.includes(`<link rel="canonical" href="${publicSiteUrl}"`));
  assert.ok(
    html.includes(
      `<meta property="og:image" content="${publicSiteUrl}/og.png"`,
    ),
  );
  assert.match(html, /src="\/kentaro-kawato\.jpg"/);
  assert.doesNotMatch(html, /\/_next\/image\?/);
  assert.ok(robots.includes(`Sitemap: ${publicSiteUrl}/sitemap.xml`));
  assert.ok(sitemap.includes(`<loc>${publicSiteUrl}</loc>`));

  for (const page of [research, cv, talks, awards]) {
    assert.ok(
      page.includes(`<meta property="og:image" content="${publicSiteUrl}/og.png"`),
      "each subpage should keep the shared preview image",
    );
  }

  for (const page of [html, research, cv, talks, awards]) {
    assert.ok(page.includes('<meta property="og:type" content="website"/>'));
    assert.ok(page.includes('<meta property="og:site_name" content="Kentaro Kawato"/>'));
    assert.ok(page.includes('<meta property="og:locale" content="en_US"/>'));
  }

  for (const page of [html, research, cv, talks, awards]) {
    const stylesheet = page.match(/href="(\/_next\/static\/css\/[^"]+\.css)"/);
    assert.ok(stylesheet, "each exported page should reference its stylesheet");
    await access(new URL(`../out${stylesheet[1]}`, import.meta.url));
  }
});
