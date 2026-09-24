# Hairssentials — demo catalog

An original static catalog concept for a textured-hair care brand. The visual style, generated campaign/product imagery and UI were created for this demo; the reference storefront’s code and brand assets were not copied.

## Demo status

This is a portfolio preview, not an operating shop. Product names, descriptions, sample pricing and product images are illustrative. The bag is client-side only. There is no real inventory, payment, order history, checkout, email signup or customer data collection. The page does not invent customer reviews or “recent purchase” alerts.

Replace the sample products, prices, product claims, photography and brand story with approved real business information before launch. The source HTML currently includes `noindex,nofollow` metadata for preview use; review it before a public launch.

## Pages and interactions

`index.html` contains the editorial landing page and sample collection. `catalog.html` opens at the product collection. The catalog includes category filters, product search, quick view, saved-item toggles and a session-only demo bag. Checkout is deliberately disabled.

## GitHub Pages

The repository root contains the static production files. `CNAME` contains `hairssentials.com` as a domain marker only. This repository is private, GitHub Pages has not been enabled, and no DNS records or domain settings have been changed. Before making the site public or pointing a domain at it, confirm domain control and replace the demo content.

To use GitHub Pages later, first choose the repository’s visibility and Pages source in GitHub settings. The custom domain also requires the domain owner to configure the DNS records GitHub specifies and to complete its domain verification. The `CNAME` file alone does not connect a domain.

## Edit and rebuild

Editable React, TypeScript, CSS and HTML are in `source/`. The source package uses Vite. With Node.js and npm installed:

```sh
cd source
npm install
npm run build
cp -a dist/. ..
```

The build emits `index.html`, `catalog.html`, compiled assets, `images/` and `CNAME` into `source/dist`. Relative asset URLs are configured to support GitHub Pages subpaths as well as a root custom domain. The deployed files at the repository root are the checked-in production build; after editing the source, rebuild and copy `dist/` to the repository root before committing.

## Generated imagery

The four optimized JPEGs are in `images/` for the deployed build and `source/public/images/` for rebuilding. Each is 1200 × 1500 pixels. They depict original, unbranded sample product concepts; they are not photographs of real merchandise.
