import type { Metadata } from "next";
import {
  ExternalLink,
  HonorItem,
  PresentationItem,
  SiteFooter,
  SiteHeader,
} from "../site-chrome";
import {
  awards,
  contact,
  grants,
  pastPresentations,
  people,
  researchFields,
  researchInterests,
  siteUrl,
  statisticsCourseUrl,
  upcomingPresentations,
  workingPapers,
  type Paper,
  sharedOpenGraph,
} from "../site-data";

export const metadata: Metadata = {
  title: "CV",
  description:
    "Curriculum vitae of Kentaro Kawato, a Master's student in economics at the University of Tokyo.",
  alternates: {
    canonical: "/cv/",
  },
  openGraph: {
    ...sharedOpenGraph,
    url: "/cv/",
    title: "CV | Kentaro Kawato",
  },
};

function paperAuthors(coauthors: { name: string }[]) {
  const names = ["Kentaro Kawato", ...coauthors.map((person) => person.name)];
  if (names.length <= 2) {
    return names.join(" and ");
  }
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

function CvPaper({ paper }: { paper: Paper }) {
  return (
    <li>
      {paperAuthors(paper.coauthors)} ({paper.year}). &ldquo;
      <a href={`/research/#${paper.id}`}>{paper.title}</a>
      .&rdquo; {paper.status}.
      {paper.previousTitle ? (
        <> Previously circulated as &ldquo;{paper.previousTitle}.&rdquo;</>
      ) : null}
    </li>
  );
}

export default function CvPage() {
  return (
    <>
      <SiteHeader current="cv" />

      <main id="main-content" className="plain-page plain-single-column">
        <article className="plain-content plain-cv">
          <section id="cv" className="plain-intro">
            <h1>Curriculum Vitae</h1>
            <p>
              <strong>Kentaro Kawato</strong>{" "}
              <span lang="ja">(川戸 健太竜)</span>
            </p>
            <p>Graduate School of Economics, The University of Tokyo</p>
            <p>
              Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
            <p>
              Website:{" "}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/">{siteUrl.replace(/^https?:\/\//, "")}</a>
            </p>
            <p className="plain-cv-updated">Last updated: November 2026</p>
          </section>

          <section id="education">
            <h2>Education</h2>
            <ul>
              <li>
                Master&apos;s Program in Economics (
                <ExternalLink href={statisticsCourseUrl}>
                  Statistics Course
                </ExternalLink>
                ), Graduate School of Economics, The University of Tokyo (April
                2025 – Present)
                <span className="plain-translation">
                  Advisor:{" "}
                  <ExternalLink href={people.ryoOkui.href}>
                    {people.ryoOkui.name}
                  </ExternalLink>
                </span>
              </li>
              <li>
                B.A. in Social Sciences, The University of Tokyo (April 2020 –
                March 2025)
              </li>
              <li>
                Exchange Program, The University of Manchester, UK (September
                2022 – June 2023)
              </li>
            </ul>
          </section>

          <section id="interests">
            <h2>Fields and Research Interests</h2>
            <p>
              <strong>Fields:</strong> {researchFields.join(", ")}
            </p>
            <p>
              <strong>Research Interests:</strong>{" "}
              {researchInterests.join(", ")}
            </p>
          </section>

          <section id="papers">
            <h2>Working Papers</h2>
            <ol className="numbered-list" reversed>
              {workingPapers.map((paper) => (
                <CvPaper key={paper.id} paper={paper} />
              ))}
            </ol>
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

          <section id="presentations">
            <h2>Presentations</h2>
            {upcomingPresentations.length ? (
              <>
                <h3>Upcoming</h3>
                <ol className="numbered-list">
                  {upcomingPresentations.map((item) => (
                    <PresentationItem key={item.href} item={item} />
                  ))}
                </ol>
                <h3>Past</h3>
              </>
            ) : null}
            <ol className="numbered-list">
              {pastPresentations.map((item) => (
                <PresentationItem key={item.href} item={item} />
              ))}
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
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
