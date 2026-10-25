import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Alikuxac",
  description: "Unified Privacy Policy for software, mods, bots, and services in the Alikuxac ecosystem.",
  alternates: {
    canonical: "https://alikuxac.xyz/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Alikuxac",
    description: "Unified Privacy Policy for software, mods, bots, and services in the Alikuxac ecosystem.",
    url: "https://alikuxac.xyz/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p className="legal-timestamp">Last Updated: October 2026</p>

      <h2>1. Overview &amp; Data Controller</h2>
      <p>
        This Privacy Policy outlines data handling practices for independent open-source software, 
        utilities, and web properties maintained by <strong>Alikuxac</strong> (&quot;I&quot;, &quot;me&quot;, 
        or &quot;my&quot;) under <code>*.alikuxac.xyz</code>. 
        Contact: <code>contact@alikuxac.xyz</code>.
      </p>
      <p>
        I adhere to a strict <strong>Zero PII (Personally Identifiable Information)</strong> principle: 
        no personal data is collected, sold, or shared with third parties for marketing or tracking purposes.
      </p>

      <h2>2. Minecraft Mods &amp; Game Utilities</h2>
      <p><em>Applicable to: Machine Metrics, Human Nature, and standalone JVM libraries.</em></p>
      <ul>
        <li><strong>Local Runtime:</strong> All game modifications execute locally within your client or server JVM.</li>
        <li><strong>Zero Remote Telemetry:</strong> Mods do not ship background telemetry, device tracking, or pingbacks to central servers.</li>
        <li><strong>User-Configured Endpoints:</strong> If telemetry exporters (e.g., Prometheus/OTLP) are active, metrics stream solely to your explicitly designated target endpoint.</li>
      </ul>

      <h2>3. Communication Gateways &amp; Automation Bots</h2>
      <p><em>Applicable to: Miruka Discord Bot, Zalo Assistant, and related connectors.</em></p>
      <ul>
        <li><strong>Essential Metadata Only:</strong> Services store only non-identifiable platform identifiers (Guild ID, Channel ID, User ID) strictly required for permissions, cooldown timers, and configuration state.</li>
        <li><strong>No Audio or Chat Logging:</strong> Voice streams and private chat payloads are processed ephemerally in volatile memory and never persisted or recorded.</li>
        <li><strong>Data Deletion:</strong> State metadata is automatically deleted when the bot is removed from a guild or server.</li>
      </ul>

      <h2>4. Web Applications &amp; Hosted Hubs</h2>
      <p><em>Applicable to: alikuxac.xyz, docs.alikuxac.xyz, and branchy.alikuxac.xyz.</em></p>
      <ul>
        <li><strong>No Third-Party Trackers:</strong> No tracking pixels or invasive tracking scripts are loaded on these utility services.</li>
        <li><strong>Local Storage Only:</strong> Browsing preferences (such as Dark Mode state or documentation filters) reside strictly in your browser&apos;s <code>localStorage</code>.</li>
        <li><strong>Infrastructure Edge Logs:</strong> Requests processed through Cloudflare Edge networks retain standard transient network logs for security and DDoS defense, expiring according to standard Cloudflare edge retention rules.</li>
      </ul>
    </>
  );
}
