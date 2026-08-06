Resume App

This small Next.js app serves a printable resume and provides a `/api/contact` endpoint that saves submissions to `data/` as JSON files.

Quick start:

```bash
cd resume-app
npm install
npm run dev
```

Visit `http://localhost:3000` to view the resume and test the contact form.

Notes:

- PDF generation uses `html2pdf.js` in the browser. It triggers the browser's save dialog.
- The `/api/contact` route writes files to `resume-app/data` — this works when running the app locally or on a Node server, but won't persist on some serverless hosts unless configured.
