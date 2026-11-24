import type { ReactNode } from "react";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://kkawato.github.io";

export const contact = {
  email: "kawato-kentaro380@g.ecc.u-tokyo.ac.jp",
  googleScholar: "https://scholar.google.com/citations?user=d3oQ8RAAAAAJ&hl=en",
  arxiv:
    "https://arxiv.org/search/?query=Kawato%2C+Kentaro&searchtype=author",
  x: "https://x.com/kkawatoo",
  github: "https://github.com/kkawato",
};

export const people = {
  ryoOkui: {
    name: "Ryo Okui",
    href: "https://sites.google.com/site/okuiryoeconomics/home?authuser=0",
  },
  shoseiSakaguchi: {
    name: "Shosei Sakaguchi",
    href: "https://sites.google.com/view/shoseisakaguchi/",
  },
  daisukeKurisu: {
    name: "Daisuke Kurisu",
    href: "https://sites.google.com/site/daisukekurisu/home",
  },
};

const ogImages = [
  {
    url: "/og.png",
    width: 1200,
    height: 630,
    alt: "Kentaro Kawato — Econometrics & Statistics",
  },
];

// Subpages override openGraph, which replaces the layout's object, so every
// page spreads these shared fields.
export const sharedOpenGraph = {
  type: "website" as const,
  siteName: "Kentaro Kawato",
  locale: "en_US",
  alternateLocale: ["ja_JP"],
  images: ogImages,
};

export const statisticsCourseUrl =
  "https://www.stat.e.u-tokyo.ac.jp/index.html";

export const researchFields = ["Econometrics", "Statistics"];

export const researchInterests = ["Causal Inference", "Experimental Design"];

type Person = { name: string; href: string };

type PaperLink = { label: string; href: string };

export type Paper = {
  id: string;
  title: string;
  coauthors: Person[];
  year: string;
  status: string;
  links: PaperLink[];
  previousTitle?: string;
  awards?: string[];
  keywords: string[];
  summary: ReactNode[];
  // Shown after the links, e.g. what is still to come.
  note?: string;
  // Papers that are not being actively worked on are listed separately.
  dormant?: boolean;
};

// Papers are ordered by date of first circulation, most recent first;
// dormant papers are listed in their own section at the bottom.
// Keywords follow the keyword line of each paper (capitalization unified).
export const workingPapers: Paper[] = [
  {
    id: "experiment-measure",
    title:
      "What Should an Experiment Measure? Combining a Short-Term Experiment with Confounded Observational Data to Identify Long-Term Treatment Effects",
    coauthors: [],
    year: "2026",
    status: "arXiv:2611.30599",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2611.30599" },
      { label: "PDF", href: "https://arxiv.org/pdf/2611.30599" },
    ],
    keywords: [
      "Long-term treatment effects",
      "Data combination",
      "Experimental design",
      "Measurement error",
      "Proxy",
      "Inverse problem",
    ],
    summary: [
      <>
        Asks what a short-term experiment should measure so that, combined with
        confounded observational data, it identifies the average long-term
        treatment effect in the observational population.
      </>,
      <>
        Shows that when the observational data contain a coarse post-treatment
        measurement of unrecorded characteristics but not a detailed
        measurement that would remove confounding, the experiment should (1)
        collect the same coarse measurement, (2) measure the characteristics in
        enough detail that conditioning on this detailed measurement and
        recorded covariates removes confounding and leaves the coarse
        measurement uninformative about selection and the treatment-specific
        long-term outcome mean, and (3) distinguish no more levels of the
        characteristics than the coarse measurement can separate.
      </>,
    ],
    note: "Supplementary material and replication code forthcoming.",
  },
  {
    id: "adaptive-observational",
    title:
      "Adaptive Experiments with Observational Data: Efficient Experimental Design and Asymptotic Time-Uniform Inference for Long-Term Treatment Effects",
    coauthors: [],
    year: "2026",
    status: "arXiv:2611.30595",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2611.30595" },
      { label: "PDF", href: "https://arxiv.org/pdf/2611.30595" },
    ],
    awards: [
      "Excellent Paper Award, Competition Session, Japanese Joint Statistical Meeting 2026",
    ],
    keywords: [
      "Adaptive experimental design",
      "Neyman allocation",
      "Long-term treatment effects",
      "Surrogate index",
      "Data combination",
      "Asymptotic time-uniform inference",
    ],
    summary: [
      <>
        Uses observational data available before an experiment begins not only
        to identify long-term treatment effects but also to design an adaptive
        experiment.
      </>,
      <>
        Characterizes the covariate sampling and treatment assignment rules
        that minimize the semiparametric efficiency bound.
      </>,
    ],
    note: "Supplementary material and replication code forthcoming.",
  },
  {
    id: "manifold-did",
    title:
      "Nonlinear Difference-in-Differences for Manifold Data via Optimal Transport",
    coauthors: [people.daisukeKurisu],
    year: "2026",
    status: "Working paper",
    links: [{ label: "PDF", href: "/papers/kawato-kurisu-manifold-did.pdf" }],
    keywords: [
      "Nonlinear difference-in-differences",
      "Changes-in-changes",
      "Optimal transport",
      "Fréchet mean",
      "Manifold data",
      "Compositional data",
    ],
    summary: [
      <>
        Develops manifold changes-in-changes, a difference-in-differences
        method for outcomes on a Riemannian manifold, such as vote-share
        compositions, that targets the untreated counterfactual distribution of
        the treated group.
      </>,
    ],
    dormant: true,
  },
  {
    id: "test-and-roll",
    title:
      "How Much to Experiment? Admissible Sample Sizes in Test-and-Roll Experiments",
    coauthors: [people.shoseiSakaguchi],
    year: "2026",
    status: "arXiv:2605.02414",
    previousTitle: "Prior-Free Sample Size Design for Test-and-Roll Experiments",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2605.02414" },
      { label: "PDF", href: "https://arxiv.org/pdf/2605.02414" },
    ],
    awards: [
      "Best Presentation Award, 20th Spring Meeting of the Japan Statistical Society",
      "Best Paper Award, 2026 Asian Summer School in Econometrics and Statistics",
    ],
    keywords: [
      "Experimental design",
      "Test-and-roll experiments",
      "Sample-size design",
      "Admissibility",
      "Minimax regret",
      "Exploration–exploitation tradeoff",
    ],
    summary: [
      <>
        Studies how many of <i>N</i> units to include in a test-and-roll
        experiment, in which the remaining units receive the treatment with the
        higher sample mean and regret combines the cost of experimentation with
        the risk of rolling out the inferior treatment.
      </>,
      <>
        Shows that, under this rollout rule with two treatments, balanced
        assignment, a Gaussian approximation, and a continuous relaxation of
        the sample size, the admissible sample sizes are exactly (0,&nbsp;<i>N</i>/3], without a
        prior or bounds on the parameters.
      </>,
      <>
        Extends the analysis to covariate targeting, where under a plug-in rule
        the largest admissible sample size depends on the convergence rate of
        the conditional average treatment effect estimator, and to three or
        more treatments.
      </>,
    ],
    note: "Replication code forthcoming.",
  },
  {
    id: "balancing-mediation",
    title: "Balancing Weights for Causal Mediation Analysis",
    coauthors: [],
    year: "2025",
    status: "arXiv:2512.09337",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2512.09337" },
      { label: "PDF", href: "https://arxiv.org/pdf/2512.09337" },
    ],
    keywords: [
      "Causal mediation analysis",
      "Natural direct and indirect effects",
      "Propensity score instability",
      "Balancing weights",
      "Finite-sample covariate imbalance",
      "Multiple mediators",
    ],
    summary: [
      <>
        Proposes sequential balancing weights for generalized mediation
        functionals, whose contrasts include natural direct and indirect
        effects, with any fixed number of causally ordered mediators.
      </>,
      <>
        Minimizes weight dispersion and imposes exact balance on covariates and
        mediators, addressing the instability of products of estimated
        probability ratios and finite-sample imbalance, and relaxes the balance
        conditions within tolerances chosen without the outcome when exact
        balance cannot be attained.
      </>,
    ],
    note: "Replication code forthcoming.",
  },
];

export const activePapers = workingPapers.filter((paper) => !paper.dormant);

export const dormantPapers = workingPapers.filter((paper) => paper.dormant);

export type NewsItem = { date: string; body: ReactNode };

export const news: NewsItem[] = [
  {
    date: "Nov. 2026",
    body: (
      <>
        Two new papers on arXiv:{" "}
        <a href="/research/#experiment-measure">
          &ldquo;What Should an Experiment Measure?&rdquo;
        </a>{" "}
        and{" "}
        <a href="/research/#adaptive-observational">
          &ldquo;Adaptive Experiments with Observational Data.&rdquo;
        </a>
      </>
    ),
  },
  {
    date: "Nov. 2026",
    body: (
      <>
        Revised versions of{" "}
        <a href="/research/#test-and-roll">
          &ldquo;How Much to Experiment?&rdquo;
        </a>{" "}
        (with Shosei Sakaguchi; previously &ldquo;Prior-Free Sample Size Design
        for Test-and-Roll Experiments&rdquo;) and{" "}
        <a href="/research/#balancing-mediation">
          &ldquo;Balancing Weights for Causal Mediation Analysis&rdquo;
        </a>{" "}
        are on arXiv.
      </>
    ),
  },
  {
    date: "Nov. 2026",
    body: (
      <>
        New working paper with Daisuke Kurisu:{" "}
        <a href="/research/#manifold-did">
          &ldquo;Nonlinear Difference-in-Differences for Manifold Data via
          Optimal Transport.&rdquo;
        </a>
      </>
    ),
  },
  {
    date: "Sep. 2026",
    body: (
      <>
        Selected for the JSPS Research Fellowship for Young Scientists (DC1),
        starting in April 2027.
      </>
    ),
  },
  {
    date: "Sep. 2026",
    body: (
      <>
        Received the Excellent Paper Award at the Competition Session of the
        Japanese Joint Statistical Meeting 2026.
      </>
    ),
  },
  {
    date: "Jul. 2026",
    body: (
      <>
        Received the Best Paper Award at the 2026 Asian Summer School in
        Econometrics and Statistics.
      </>
    ),
  },
  {
    date: "Mar. 2026",
    body: (
      <>
        Received the Best Presentation Award at the 20th Spring Meeting of the
        Japan Statistical Society.
      </>
    ),
  },
];

export type Presentation = {
  title: string;
  href: string;
  date: string;
  shortDate?: string;
  location: string;
  note?: string;
  japanese?: string;
  upcoming?: boolean;
};

export const presentations: Presentation[] = [
  {
    title: "LMU-Todai Econometrics Workshop",
    href: "https://www.stat.lmu.de/stat-econ/en/latest-news/events-overview/event/lmu-todai-workshop-f58fb630.html",
    date: "December 4, 2026",
    shortDate: "Dec. 4, 2026",
    location: "Germany, Munich",
    upcoming: true,
  },
  {
    title: "Japanese Joint Statistical Meeting 2026",
    href: "https://pub.confit.atlas.jp/ja/event/jfssa2026/session/t2K1Gt85",
    date: "September 7, 2026",
    location: "Japan, Yokohama",
    japanese: "2026年度統計関連学会連合大会",
  },
  {
    title: "Summer Workshop on Economic Theory",
    href: "https://sites.google.com/view/swetotaruhokudai/swet2026/%E8%A8%88%E9%87%8F%E7%B5%8C%E6%B8%88%E5%AD%A6",
    date: "August 2026",
    location: "Japan, Otaru",
  },
  {
    title: "2026 Asian Summer School in Econometrics and Statistics",
    href: "https://conf.xmu.edu.cn/summerschool2026/Program.htm",
    date: "July 2026",
    location: "China, Beijing",
  },
  {
    title:
      "The 20th International Symposium on Econometric Theory and Applications",
    href: "https://sites.google.com/g.ecc.u-tokyo.ac.jp/seta2026",
    date: "June 2026",
    location: "Japan, Tokyo",
  },
  {
    title: "20th Spring Meeting of the Japan Statistical Society",
    href: "https://jss2026spring.ywstat.jp/",
    date: "March 2026",
    location: "Japan, Kyoto",
    note: "Poster Session",
    japanese: "第二十回日本統計学会春季集会ポスターセッション",
  },
  {
    title: "Kansai Econometrics Workshop",
    href: "https://sites.google.com/view/japan-econometrics/",
    date: "January 2026",
    location: "Japan, Miyazaki",
    japanese: "関西計量経済学研究会",
  },
  {
    title: "LMU-Todai Econometrics Workshop",
    href: "https://www.cirje.e.u-tokyo.ac.jp/research/conf/con2025.html",
    date: "September 2025",
    location: "Japan, Tokyo",
  },
  {
    title: "Summer Seminar on Statistics",
    href: "https://sites.google.com/g.ecc.u-tokyo.ac.jp/ysg2025",
    date: "August 2025",
    location: "Japan, Kotohira",
    japanese: "統計サマーセミナー",
  },
];

export const upcomingPresentations = presentations.filter(
  (item) => item.upcoming,
);

export const pastPresentations = presentations.filter(
  (item) => !item.upcoming,
);

type SourceLink = { label: string; href: string };

export type Honor = {
  key: string;
  english: ReactNode;
  japanese?: string;
  links?: SourceLink[];
};

export const awards: Honor[] = [
  {
    key: "jjsm-2026",
    english:
      "Excellent Paper Award, Competition Session, Japanese Joint Statistical Meeting 2026, September 2026.",
    japanese:
      "優秀報告賞（2026年度統計関連学会連合大会 コンペティションセッション）",
    links: [
      {
        label: "コンペティション講演セッション受賞者",
        href: "https://pub.confit.atlas.jp/ja/event/jfssa2026/content/competition",
      },
      {
        label: "受賞のことば",
        href: "https://www.jfssa.jp/wp-content/uploads/2026/2026announceFinal_261022.pdf",
      },
    ],
  },
  {
    key: "asses-2026",
    english:
      "Best Paper Award, 2026 Asian Summer School in Econometrics and Statistics, July 2026.",
    links: [
      {
        label: "Program",
        href: "https://conf.xmu.edu.cn/summerschool2026/Program.htm",
      },
      {
        label: "News from the Graduate School of Economics",
        href: "https://www.e.u-tokyo.ac.jp/news/2026/20260722Awards.html",
      },
    ],
  },
  {
    key: "jss-spring-2026",
    english:
      "Best Presentation Award, 20th Spring Meeting of the Japan Statistical Society, Poster Session, March 2026.",
    japanese: "優秀発表賞（第二十回日本統計学会春季集会ポスターセッション）",
    links: [
      {
        label: "受賞のことば",
        href: "https://www.jss.gr.jp/wp-content/uploads/20th-shunki-houkoku_0313.pdf",
      },
    ],
  },
];

export const grants: Honor[] = [
  {
    key: "jsps-dc1",
    english: (
      <>
        <a href="https://www.jsps.go.jp/english/e-pd/" target="_blank" rel="noreferrer">
          Research Fellowship for Young Scientists (DC1)
        </a>
        , Japan Society for the Promotion of Science (JSPS), April 2027 – March
        2030 (selected in September 2026)
      </>
    ),
    japanese: "日本学術振興会 特別研究員（DC1）",
  },
  {
    key: "wings-fmsp",
    english: (
      <>
        <a href="https://www.ms.u-tokyo.ac.jp/wings-fmsp/" target="_blank" rel="noreferrer">
          World-leading Innovative Graduate Study for Frontiers of Mathematical
          Sciences and Physics
        </a>
        , The University of Tokyo, October 2025 – Present
      </>
    ),
    japanese: "数物フロンティア国際卓越大学院, 東京大学",
  },
  {
    key: "miura",
    english: (
      <>
        <a href="https://www.miurazaidan.or.jp/" target="_blank" rel="noreferrer">
          Miura Foundation Scholarship
        </a>
        , April 2020 – March 2024
      </>
    ),
    japanese: "公益財団法人三浦財団",
  },
];
