# Ayusatva Premium Ayurveda Website

Clinic: **Ayusatva Ayurved & Panchkarma Clinic**
Doctor: **Dr. Vaishnavi Maykarkar (Warghane)**

## Launch
Open `index.html` in a modern web browser or deploy the entire folder to a static host. Navigate to `therapies/` for twelve stand-alone, SEO-ready therapy pages.

## Features
- Two-column premium photograph gallery, touch-friendly responsive layout
- Subtle mouse hover 3D tilt and independent image parallax (no WebGL)
- Large optimized WebP images for faster loading
- Detailed therapy pages for Abhyanga, Shirodhara, Swedana, Nasya, Basti, Udvartana, Kati Basti and Janu Basti
- Existing clinic branding, consultations, dosha explorer, FAQ and Ayurvedic education pages
- Reduced-motion alternative and keyboard accessible links

## Important
AI-generated therapy pictures are illustrative and must not be presented as actual Ayusatva patients, therapists or premises. The site uses placeholders for clinic contact details and the doctor's professional credentials. Update `site-config.js` with verified details before deploying. The static appointment form does **not** confirm appointments.

## Hosting
Upload **the full folder structure**, including `assets/` and `therapies/`. For a single-file interactive homepage preview, open the separately supplied `Ayusatva_Premium_Interactive_Preview.html`. That preview displays therapy detail articles in overlays; the ZIP has separate dedicated HTML pages.

## Expanded therapy atlas (November 2026)
- Twelve individual therapy guides.
- Newly added: Greeva Basti, Netra Tarpana, Virechana and Vamana.
- Gallery and treatment guide headers no longer show 01/08 progress counters.
- New imagery is AI-generated illustrative material and not photography of the clinic.
- Vamana and Virechana are clinically significant procedures; content is educational and does not state the clinic offers them.

## Homepage update — November 10, 2026
The entire forest-green “07 / THE CLASSICAL TRADITION” section has been removed. The remaining homepage section numbering is sequential. Navbar and related calls to action now point to the full therapy gallery. All 12 separate therapy guides remain available.

## Doctor profile & contact page update
- Doctor: Dr. Vaishnavi Maykarkar (Warghane) — BAMS and MD (Ayu), both from Maharashtra University of Health Sciences (MUHS), Nashik.
- Maharashtra MD (Ayu) first-rank achievement is based solely on the information supplied by the clinic owner. Verify ranking evidence and any official publication requirements before public deployment. No graduation year, speciality, or council registration has been invented.
- New standalone Contact Us section includes postal address, phone/WhatsApp, email and clinic timings; those remain placeholders in `site-config.js` pending verified details.
- The appointment request workflow remains a draft-only flow unless a real WhatsApp number or email is configured; no booking confirmation is implied.


## Official doctor portrait update
- The clinic-supplied photograph of Dr. Vaishnavi Maykarkar (Warghane) replaces the botanical illustration in the About Doctor section.
- `assets/dr-vaishnavi-original.jpeg` preserves the original supplied landscape photo; optimized `assets/dr-vaishnavi-portrait.webp` and `assets/dr-vaishnavi-portrait-mobile.webp` are cropped for responsive portrait presentation.
- The standalone `OFFLINE_PREVIEW.html` embeds both portrait renditions, plus previous styling and assets.
- The photo is the supplied doctor photo; AI-generated therapy images remain illustrative only.


## Marathi official brand update
- Clinic brand wordmark: `आयुःसत्त्व आयुर्वेद व पंचकर्म चिकित्सालय`.
- The official logo appears larger beside the fully Marathi wordmark in the main header, footer, therapy pages and legal pages.
- `marathi-brand.css` contains the responsive branding overrides.
- The standalone `OFFLINE_PREVIEW.html` includes the branding styles and existing embedded website assets.
- English medical text and doctor name remain unchanged; only the clinic's brand lockup and full-name references are localized to Marathi.
