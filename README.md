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
Hero (with a NEOM as-built photo behind it) and programme ribbon, Executive profile, How I govern project information (with COBie handover evidence),
Expertise, NEOM Highway 55 case study (banner, design-to-as-built flow, outcomes, project evidence), Programme delivery (Diriyah Gate II, SILZ, AMAALA),
Process improvement and automation, Credentials and education, Skills in action, Platforms and standards, Career timeline (with programme pictures), CV and Contact.

## Add your project pictures (the site is built for them)
The pages already point at your 21 pictures using the exact file names from your Google Drive folder "Claude AI". Until you upload them, every picture slot hides itself, so nothing looks broken.

**How to add them**
1. In Google Drive, right-click the folder **Claude AI**, choose **Download**, and unzip it.
2. Make a new folder on your computer called `projects`. Put the four sub-folders **NEOM**, **Amala**, **Diriyah** and **SILZ** inside it. Keep every file name exactly as it is, including capital letters and spaces.
3. On GitHub open your repository, go to the folders `assets` then `img`, click **Add file > Upload files**, drag in the whole `projects` folder, and click **Commit changes**.
4. Wait two minutes and open your site in a private window.

**Where each picture is used** (you can change any of this in `index.html`)

| Picture | Where it appears |
|---|---|
| NEOM / AS BUILT .png | Hero background, programme ribbon, design-to-as-built flow, outcomes, timeline |
| NEOM / C3-c3d.png, c3 as built.png | About, design-to-as-built flow |
| NEOM / Neom Int.png | NEOM case study banner, outcomes, Skills in action |
| NEOM / COBIE.png, COBIE 1.png | Handover evidence, outcomes, Skills in action (shown blurred, see below) |
| NEOM / C3.png | Skills in action, project evidence |
| NEOM / 02, C3-P1, ic-06, neom, NEOM_01, NEOM_02 | Project evidence gallery |
| Diriyah / Diriyah_01, Diriyah_02 | Diriyah card, ribbon, timeline |
| SILZ / SILZ Roundabout, SILZ _02 | SILZ card, ribbon, timeline |
| Amala / Amala_01, 2Amala_01, Amala_Building_01, Amala_Building_02 | AMAALA card, ribbon, timeline |

**Check each picture before you publish**
- **Shrink them first.** Your 21 pictures total about 23 MB, and some are 2 to 3 MB each. Drag them into tinypng.com (free, 20 at a time) and download the smaller versions. File names stay the same.
- **Privacy.** The two COBie pictures are shown **blurred on purpose**, because COBie sheets usually contain colleagues' names, emails and project codes. To show one clearly, blur those cells in the picture, replace the file, then remove the word `redacted` from that picture's tag in `index.html`.
- **Permission.** NEOM, Diriyah, SILZ and AMAALA are client projects. Check with Al-Ayuni that you may show them publicly.
- **Your own work only.** If any picture is a stock or AI-generated scenic image, not your own project picture, remove it. Recruiters notice, and it weakens everything else.
- **AMAALA** is not on your CV. Add it there, or take the AMAALA tile and card out of `index.html`.
- **Captions.** Captions were written from the file names only, because the pictures could not be viewed while building. Read each caption against its picture and correct any that do not match.


## Add your Prime Engineering pictures
The Pakistan projects section, the four project cards, a "Design evidence" row and the career timeline all have picture slots, waiting for files in `assets/img/projects/Prime/`.
Use the exact file names listed in `assets/img/projects/Prime/README.md` (for example `Kashmir-Highway_01.png` and `Design_01.png`). Slots without a file stay hidden.
Upload them the same way as the Saudi pictures: GitHub > `assets/img/projects` > Add file > Upload files. Compress them first at tinypng.com, and blur client names and title blocks on drawings.

## Certificate pictures (already included)
`assets/img/certs/` holds your PMP, CanBIM S4 and two BSI certificates, with certificate numbers and QR codes masked. They show in the "Verified credentials" row and open full-size when clicked.
To add another certificate (for example SCE or Plannerly), save a cleaned picture in that folder and copy one of the four `cert-shot` figures in `index.html`.

## Before you publish: five checks
1. **CV file.** `assets/cv/Raja_Qamar_Ilyas_CV.pdf` is your latest CV exactly as supplied. It still shows your phone number and the line "6 interchanges delivered". Correct the CV (4 interchanges, 6 road corridors, your new title) and remove the phone number if you do not want it public, then replace the file with the same name.
2. **PMP date.** Your new PMP certificate shows expiry 12 July 2030, which matches the site. Keep the certificate and the site in step when you renew.
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
