import type { Metadata } from "next";
import { PresentationItem, SiteFooter, SiteHeader } from "../site-chrome";
import { pastPresentations, upcomingPresentations, sharedOpenGraph } from "../site-data";

export const metadata: Metadata = {
  title: "Presentations",
  description:
    "Conference and workshop presentations by Kentaro Kawato, a Master's student in economics at the University of Tokyo.",
  alternates: {
    canonical: "/presentations/",
  },
  openGraph: {
    ...sharedOpenGraph,
    url: "/presentations/",
    title: "Presentations | Kentaro Kawato",
  },
};

export default function PresentationsPage() {
  return (
    <>
      <SiteHeader current="presentations" />

      <main id="main-content" className="plain-page plain-single-column">
        <article className="plain-content">
          <section id="presentations" className="plain-intro">
            <h1>Presentations</h1>
          </section>

          {upcomingPresentations.length ? (
            <section id="upcoming">
              <h2>Upcoming</h2>
              <ol className="numbered-list">
                {upcomingPresentations.map((item) => (
                  <PresentationItem key={item.href} item={item} />
                ))}
              </ol>
            </section>
          ) : null}

          <section id="past">
            <h2>Past</h2>
            <ol className="numbered-list">
              {pastPresentations.map((item) => (
                <PresentationItem key={item.href} item={item} />
              ))}
            </ol>
          </section>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
