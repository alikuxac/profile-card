import type { Metadata } from "next";
import { cvData } from "@/config/cv";

export const metadata: Metadata = {
  title: `CV | ${cvData.header.name} - ${cvData.header.title}`,
  description: `Curriculum Vitae of ${cvData.header.name} - ${cvData.header.title} based in ${cvData.header.location}.`,
  openGraph: {
    title: `CV | ${cvData.header.name} - ${cvData.header.title}`,
    description: `Curriculum Vitae of ${cvData.header.name} - ${cvData.header.title} based in ${cvData.header.location}.`,
    url: "https://alikuxac.xyz/cv",
  },
};

export default function CvPage() {
  const { header, skills, experiences, projects, education } = cvData;

  return (
    <div style={{ padding: "2rem 1rem", display: "flex", justifyContent: "center" }}>
      <style>{`
        .cv-container {
          background-color: #ffffff;
          color: #111111;
          width: 100%;
          max-width: 850px;
          padding: 3rem 3.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          font-family: 'Times New Roman', Times, Georgia, serif;
          line-height: 1.45;
          font-size: 10.5pt;
        }

        .cv-header {
          text-align: center;
          margin-bottom: 1.25rem;
        }

        .cv-name {
          font-size: 24pt;
          font-weight: bold;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 0.35rem;
          color: #000000;
          font-family: 'Times New Roman', Times, Georgia, serif;
        }

        .cv-subtitle {
          font-size: 11pt;
          font-weight: bold;
          margin-bottom: 0.35rem;
          color: #222222;
        }

        .cv-contact-info {
          font-size: 10pt;
          color: #333333;
        }

        .cv-contact-info a {
          color: #000000;
          text-decoration: underline;
        }

        .cv-section-title {
          font-size: 11pt;
          font-weight: bold;
          text-transform: uppercase;
          border-bottom: 1px solid #000000;
          padding-bottom: 2px;
          margin-top: 1.25rem;
          margin-bottom: 0.65rem;
          letter-spacing: 0.5px;
          color: #000000;
        }

        .cv-item {
          margin-bottom: 0.75rem;
        }

        .cv-item-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-weight: bold;
        }

        .cv-item-title {
          font-size: 10.5pt;
        }

        .cv-item-date {
          font-size: 10pt;
          font-style: italic;
          font-weight: normal;
        }

        .cv-item-sub {
          font-style: italic;
          margin-bottom: 0.25rem;
        }

        .cv-bullets {
          list-style-type: disc;
          margin-left: 1.25rem;
          padding-left: 0;
          margin-top: 0.2rem;
          margin-bottom: 0.35rem;
        }

        .cv-bullets li {
          margin-bottom: 0.2rem;
        }

        .cv-skills-list {
          list-style-type: none;
          padding-left: 0;
          margin: 0;
        }

        .cv-skills-list li {
          margin-bottom: 0.35rem;
        }

        .cv-skills-label {
          font-weight: bold;
        }

        @media (max-width: 640px) {
          .cv-container {
            padding: 1.5rem 1.25rem;
          }
          .cv-name {
            font-size: 20pt;
          }
          .cv-item-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .cv-item-date {
            margin-top: 0.1rem;
          }
        }

        @media print {
          body {
            background: white !important;
          }
          .cv-container {
            box-shadow: none !important;
            padding: 0 !important;
            max-width: 100% !important;
          }
          header, footer, nav, .theme-overlay {
            display: none !important;
          }
        }
      `}</style>

      <div className="cv-container">
        {/* Header */}
        <header className="cv-header">
          <h1 className="cv-name">{header.name}</h1>
          <div className="cv-subtitle">
            {header.title} • {header.location}
          </div>
          <div className="cv-contact-info">
            Email: <a href={`mailto:${header.email}`}>{header.email}</a> • GitHub:{" "}
            <a href={`https://${header.github}`} target="_blank" rel="noopener noreferrer">
              {header.github}
            </a>{" "}
            • LinkedIn:{" "}
            <a href={`https://${header.linkedin}`} target="_blank" rel="noopener noreferrer">
              {header.linkedin}
            </a>
            <br />
            Phone: {header.phone}
          </div>
        </header>

        {/* Technical Skills */}
        <section>
          <h2 className="cv-section-title">Technical Skills</h2>
          <ul className="cv-skills-list">
            {skills.map((skill, idx) => (
              <li key={idx}>
                <span className="cv-skills-label">{skill.label}:</span> {skill.items}
              </li>
            ))}
          </ul>
        </section>

        {/* Experience */}
        <section>
          <h2 className="cv-section-title">Experience</h2>
          {experiences.map((exp, idx) => (
            <div className="cv-item" key={idx}>
              <div className="cv-item-header">
                <span className="cv-item-title">
                  {exp.title} — {exp.company}
                </span>
                <span className="cv-item-date">{exp.period}</span>
              </div>
              <ul className="cv-bullets">
                {exp.bullets.map((bullet, bulletIdx) => (
                  <li key={bulletIdx}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Technical Projects */}
        <section>
          <h2 className="cv-section-title">Technical Projects (Selected)</h2>
          {projects.map((proj, idx) => (
            <div className="cv-item" key={idx}>
              <div className="cv-item-header">
                <span className="cv-item-title">{proj.title}</span>
                {proj.period && <span className="cv-item-date">{proj.period}</span>}
              </div>
              <ul className="cv-bullets">
                {proj.bullets.map((bullet, bulletIdx) => (
                  <li key={bulletIdx}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Education */}
        <section>
          <h2 className="cv-section-title">Education</h2>
          {education.map((edu, idx) => (
            <div className="cv-item" key={idx}>
              <div className="cv-item-header">
                <span className="cv-item-title">{edu.institution}</span>
                <span className="cv-item-date">{edu.period}</span>
              </div>
              <div className="cv-item-sub">{edu.degree}</div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
