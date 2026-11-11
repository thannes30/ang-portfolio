# ang-portfolio

One-page art portfolio: bio on top, 10 pieces below, click a piece to open a modal.
Next.js (static export) + Tailwind CSS. Content lives in markdown.

## Edit content

- `content/bio.md`: name, tagline (frontmatter) and bio text (body)
- `content/art/*.md`: one file per piece. Frontmatter: `title`, `year`, `medium`, `image`, `width`, `height`. Body: description (markdown). Files are sorted by filename.
- Images go in `public/art/`. Set `width`/`height` to the real pixel size to avoid layout shift. Export them already resized (about 1600px on the long edge) and compressed (WebP or JPEG), because the static export does not optimize images.

## Commands

```bash
npm run dev     # local dev server
npm run build   # static export to ./out
npm run lint
```

## Deploy (free)

- **Cloudflare Pages / Netlify**: connect the repo, build command `npm run build`, output directory `out`.
- **GitHub Pages**: Settings > Pages > Source: GitHub Actions. `.github/workflows/deploy.yml` builds on push to `main` and sets `NEXT_PUBLIC_BASE_PATH` to the repo name automatically.
