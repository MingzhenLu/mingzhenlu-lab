# mingzhenlu-lab.com

Source for the Lu Lab website (`https://mingzhenlu-lab.com/`).

Built with [Hugo](https://gohugo.io/) and deployed to GitHub Pages on every push to `main`.

## Edit content

All content lives in `content/` as Markdown:

- `content/_index.md` — home
- `content/people.md` — lab members
- `content/research.md` — research themes
- `content/publications.md` — publication list
- `content/news.md` — news + media
- `content/resources.md` — opportunities, writing, links
- `content/gallery.md` — photo gallery

To add an image, drop the file into `static/images/` and reference it as `/images/filename.jpg`.

## Edit theme / layout

- `themes/lulab/static/css/main.css` — all styles (~300 lines, hand-written)
- `themes/lulab/layouts/partials/header.html` — hero + nav
- `themes/lulab/layouts/partials/footer.html` — footer
- `themes/lulab/layouts/_default/baseof.html` — HTML shell

To change the **hero image**: replace `static/images/hero.jpg`.
To change **navigation labels**: edit `[[menu.main]]` blocks in `hugo.toml`.

## Local preview

```bash
brew install hugo  # one-time
hugo serve         # opens http://127.0.0.1:1313
```

## Deploy

```bash
git add . && git commit -m "Update content" && git push
```

GitHub Actions builds and deploys automatically. Live within ~60 seconds.

## Custom domain

`mingzhenlu-lab.com` is configured via `static/CNAME`. DNS A records at the domain registrar point to GitHub Pages IPs:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

CNAME `www` → `mingzhenlu.github.io`.
