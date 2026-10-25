import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Alikuxac",
  description: "Unified Terms of Service for open-source tools, software, and services by Alikuxac.",
  alternates: {
    canonical: "https://alikuxac.xyz/terms",
  },
  openGraph: {
    title: "Terms of Service | Alikuxac",
    description: "Unified Terms of Service for open-source tools, software, and services by Alikuxac.",
    url: "https://alikuxac.xyz/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      <h1>Terms of Service</h1>
      <p className="legal-timestamp">Last Updated: October 2026</p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By downloading, installing, running, or accessing any application, Discord bot, 
        Minecraft mod, or website under <code>*.alikuxac.xyz</code>, you agree to be bound 
        by these terms. If you disagree, do not use the software or web endpoints.
      </p>

      <h2>2. Licensing &amp; &quot;AS-IS&quot; Disclaimer</h2>
      <p>
        Unless otherwise specified, source code is distributed under permissive or copyleft 
        open-source licenses (MIT, AGPL-3.0, or All Rights Reserved for proprietary configurations).
      </p>
      <div className="legal-callout">
        <strong>DISCLAIMER OF WARRANTY &amp; LIABILITY:</strong>
        <p>
          ALL SOFTWARE AND SERVICES ARE PROVIDED STRICTLY <em>&quot;AS-IS&quot;</em> WITHOUT WARRANTIES 
          OF ANY KIND. UNDER NO CIRCUMSTANCES SHALL THE AUTHOR BE HELD LIABLE FOR:
        </p>
        <ul>
          <li>Server crashes, downtime, or world save corruption resulting from mod installation.</li>
          <li>Financial or ledger simulation calculation discrepancies in local-first tools (e.g., Branchy).</li>
          <li>Account suspension or rate limiting by third-party platforms (Mojang, Microsoft, Discord).</li>
        </ul>
      </div>

      <h2>3. Acceptable Use Policy</h2>
      <p>When interacting with public API endpoints, edge proxies, or bot gateways, you agree NOT to:</p>
      <ul>
        <li>Launch Denial of Service (DoS/DDoS) attacks or deliberately exhaust Edge Worker quotas.</li>
        <li>Bypass authentication mechanisms, abuse webhooks, or compromise private API tokens.</li>
        <li>Redistribute binaries without retaining original copyright and license notices.</li>
      </ul>

      <h2>4. Service Lifecycle &amp; Modifications</h2>
      <p>
        As personal, hobbyist, and community-driven initiatives, I reserve the right to modify, 
        archive, deprecate, or take down any public web portal, bot instance, or documentation route 
        at any time without prior notice.
      </p>
    </>
  );
}
