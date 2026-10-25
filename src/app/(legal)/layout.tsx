import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import "./legal.css";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="legal-container">
      <div className="legal-header">
        <Link className="legal-back-link" href="/">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
      <article className="legal-prose">{children}</article>
    </div>
  );
}
