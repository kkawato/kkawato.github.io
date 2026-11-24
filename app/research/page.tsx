import type { Metadata } from "next";
import { PaperEntry, SiteFooter, SiteHeader } from "../site-chrome";
import { activePapers, dormantPapers, sharedOpenGraph } from "../site-data";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Working papers by Kentaro Kawato on causal inference, experimental design, long-term treatment effects, difference-in-differences, and causal mediation analysis.",
  alternates: {
    canonical: "/research/",
  },
  openGraph: {
    ...sharedOpenGraph,
    url: "/research/",
    title: "Research | Kentaro Kawato",
  },
};

export default function ResearchPage() {
  return (
    <>
      <SiteHeader current="research" />

      <main id="main-content" className="plain-page plain-single-column">
        <article className="plain-content">
          <section id="research" className="plain-intro">
            <h1>Research</h1>
          </section>

          <section id="working-papers">
            <h2>Working Papers</h2>
            <ol className="plain-publication-list">
              {activePapers.map((paper) => (
                <PaperEntry key={paper.id} paper={paper} />
              ))}
            </ol>
          </section>

          {dormantPapers.length ? (
            <section id="dormant-papers">
              <h2>Dormant Papers</h2>
              <ol className="plain-publication-list">
                {dormantPapers.map((paper) => (
                  <PaperEntry key={paper.id} paper={paper} />
                ))}
              </ol>
            </section>
          ) : null}
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
