# Raja Qamar Ilyas | Senior BIM Engineer and Information Management Professional

A fast, static, single-page portfolio. Plain HTML, CSS and JavaScript. No build step, no framework, no tracking.
It is ready for GitHub Pages as it stands. **Nothing has been published.** You review it first.

## How to preview it on your computer
Double-click `index.html`. It opens in your browser. Look through every section on a laptop and a phone before you publish.

## Folder structure

```
portfolio-website/
├── index.html                 All page content, SEO text, structured data, icon sprite
├── 404.html                   Branded "page not found" page
├── robots.txt                 Allows search engines
├── .nojekyll                  Tells GitHub Pages to serve the files exactly as they are
├── css/style.css              Styling: dark and light themes, layout, animation, responsive rules
├── js/main.js                 Theme, menu, scroll effects, counters, rotating focus line, contact form
└── assets/
    ├── cv/Raja_Qamar_Ilyas_CV.pdf     Download CV button (see the CV note below)
    └── img/
        ├── favicon.svg                Browser tab icon
        ├── og-image.png               1200x630 sharing preview
        ├── profile.jpg                OPTIONAL portrait (not included)
        └── README.md                  Image guide
```

## Sections (in order)
Hero with proof strip, Executive profile, How I govern project information (information delivery chain),
Expertise (six capabilities), NEOM Highway 55 case study, Major infrastructure projects (Pakistan),
Process improvement and automation, Credentials and education with platforms, Career timeline, CV and Contact.

## Before you publish: five checks
1. **CV file.** `assets/cv/Raja_Qamar_Ilyas_CV.pdf` is your latest CV exactly as supplied. It still shows your phone number and the line "6 interchanges delivered". Correct the CV (4 interchanges, 6 road corridors, your new title) and remove the phone number if you do not want it public, then replace the file with the same name.
2. **PMP date.** The site says valid through July 2030. The certificate in your portfolio PDF showed 12 July 2027. Confirm the PMI registry shows 2030.
3. **Pakistan project figures.** The site uses the lengths you supplied (113, 89, 8.7 and 126 km). Your CV and your Prime employment letter show different figures for some of these projects. Make all three documents agree.
4. **Autodesk credentials.** Add credential IDs or verification links so a recruiter can check them.
5. **SCE registration** is shown as valid through March 2027. Renew it and update the date.

## Deploy on GitHub Pages

**Option A: user site (shortest address)**
1. On github.com click **New repository**. Name it `qamarbim1-cm.github.io` and make it **Public**.
2. Click **uploading an existing file**, drag in everything inside `portfolio-website/` (not the folder itself), and **Commit changes**.
3. Open **Settings > Pages**. Under **Build and deployment** choose **Deploy from a branch**, branch **main**, folder **/(root)**, then **Save**.
4. After one to two minutes the site is live at `https://qamarbim1-cm.github.io/`.

**Option B: project site**
1. Create a public repository named `portfolio` and upload the files the same way.
2. Settings > Pages > Deploy from a branch > **main** and **/(root)** > Save.
3. The site appears at `https://qamarbim1-cm.github.io/portfolio/`.

**With Git**
```bash
cd portfolio-website
git init && git add . && git commit -m "Launch portfolio"
git branch -M main
git remote add origin https://github.com/qamarbim1-cm/<your-repo>.git
git push -u origin main
```

## After it is live
The address tags (canonical, sharing preview, structured data, sitemap) already use `https://qamarbim1-cm.github.io/`, so the repository must be named `qamarbim1-cm.github.io` (Option A above).
If you use a different repository name (Option B), the address becomes `https://qamarbim1-cm.github.io/<repo>/` and you must change the address in `index.html`, `sitemap.xml` and `robots.txt`.

Then:
1. Open the live address and click every button once, in both themes, on a phone and a laptop.
2. Run the **LinkedIn Post Inspector** once so the preview image appears when you share the link.
3. Submit the address in **Google Search Console** and add `sitemap.xml`.
4. Add the address to your LinkedIn profile (Contact info) and your CV.

## Customising
- **Colours:** variables at the top of `css/style.css` (`--accent`, `--accent-2`, `--bg`). Dark and light each have their own block.
- **Rotating focus line:** the `roles` list in `js/main.js`.
- **Email:** assembled in `js/main.js` (`EMAIL` at the top) and shown only after a click. Change it there.
- **Portrait:** add `assets/img/profile.jpg` (600 x 600). It replaces the RQ monogram automatically.
- **Theme:** follows the visitor's system setting and remembers their choice.
- **Browsers:** current Chrome, Edge, Safari and Firefox. Animations turn off for visitors who ask their device to reduce motion.

## Testing note
Checked by script for HTML structure, links, icons, file paths and JavaScript errors. It has **not** been viewed in a real browser by the person who built it, so look through it once yourself before publishing.
