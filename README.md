# Kentaro Kawato — Academic Homepage

Source for Kentaro Kawato's academic homepage. The site presents research,
education, presentations, awards, teaching, and contact information in a fast,
accessible single-page layout.

## Local preview

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal.

## Verification

```bash
npm run build
npm test
npm run lint
```

## Before publishing

Set `NEXT_PUBLIC_SITE_URL` to the final public origin. It controls the canonical
URL, sitemap, Open Graph links, and structured data. The private draft falls
back to the existing Google Sites address so it does not claim a public URL
that does not yet exist.

No public deployment is configured in this draft.
