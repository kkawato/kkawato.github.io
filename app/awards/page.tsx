import type { Metadata } from "next";
import { HonorItem, SiteFooter, SiteHeader } from "../site-chrome";
import { awards, grants, sharedOpenGraph } from "../site-data";

export const metadata: Metadata = {
  title: "Awards & Grants",
  description:
    "Awards, grants, and scholarships received by Kentaro Kawato, a Master's student in economics at the University of Tokyo.",
  alternates: {
    canonical: "/awards/",
  },
  openGraph: {
    ...sharedOpenGraph,
    url: "/awards/",
    title: "Awards & Grants | Kentaro Kawato",
  },
};

export default function AwardsPage() {
  return (
    <>
      <SiteHeader current="awards" />

      <main id="main-content" className="plain-page plain-single-column">
        <article className="plain-content">
          <section id="awards-and-grants" className="plain-intro">
            <h1>Awards &amp; Grants</h1>
          </section>

          <section id="awards">
            <h2>Awards</h2>
            <ol className="numbered-list">
              {awards.map((honor) => (
                <HonorItem key={honor.key} honor={honor} />
              ))}
            </ol>
          </section>

          <section id="grants">
            <h2>Grants and Scholarships</h2>
            <ol className="numbered-list">
              {grants.map((honor) => (
                <HonorItem key={honor.key} honor={honor} />
              ))}
            </ol>
          </section>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
