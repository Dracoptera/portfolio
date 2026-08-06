import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRef } from "react";

export default function Home() {
  const resumeRef = useRef();

  async function downloadPDF() {
    const html2pdf = (await import("html2pdf.js")).default;
    const element = resumeRef.current;
    const opt = {
      margin: 0.5,
      filename: "Alexa_Brito_Resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Alexa Brito — Resume</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.main}>
        <div className={styles.actions}>
          <button onClick={downloadPDF}>Download resume (PDF)</button>
        </div>

        <div className={styles.resume} ref={resumeRef}>
          <h1>Alexa Brito</h1>
          <p className={styles.role}>QA Engineer — Product Quality</p>

          <section>
            <h2>Summary</h2>
            <p>
              QA engineer with hands-on experience in end-to-end automation,
              cross-browser testing, and product delivery.
            </p>
          </section>

          <section>
            <h2>Experience</h2>
            <h3>QA Engineer — Halo Media LLC</h3>
            <p>Nov 2022 - Present · Montevideo, Uruguay · Remote</p>
            <ul>
              <li>
                Built and maintained a Playwright automation framework from the
                ground up.
              </li>
              <li>
                Designed and executed Web UI and API tests to improve regression
                coverage.
              </li>
            </ul>

            <h3>Test Automation Engineer — Globant</h3>
            <p>Oct 2021 - Nov 2022 · Montevideo, Uruguay</p>
            <ul>
              <li>
                Contributed to automation suites for Disney DTCI and Openbank
                accounts.
              </li>
              <li>
                Maintained tests using Selenium WebDriver, jUnit, and CI
                integrations.
              </li>
            </ul>
          </section>

          <section>
            <h2>Contact</h2>
            <p>GitHub: https://github.com/dracoptera</p>
            <p>LinkedIn: https://linkedin.com/in/alexabv</p>
            <p>Email: dracoptera@example.com</p>
          </section>
        </div>

        <div className={styles.formCard}>
          <h3>Contact me</h3>
          <ContactForm />
        </div>
      </main>
    </div>
  );
}

function ContactForm() {
  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = Object.fromEntries(fd.entries());
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    alert("Message sent — saved locally in the app folder (server only)");
    e.target.reset();
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        Name
        <br />
        <input name="name" required />
      </label>
      <br />
      <label>
        Email
        <br />
        <input name="email" type="email" required />
      </label>
      <br />
      <label>
        Message
        <br />
        <textarea name="message" rows="4" required />
      </label>
      <br />
      <button type="submit">Send</button>
    </form>
  );
}
