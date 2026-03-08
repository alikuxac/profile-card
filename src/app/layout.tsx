import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alikuxac | Profile Card",
  description: "Explore the links, projects, and donation channels of Alikuxac - Fullstack Developer.",
  keywords: ["Alikuxac", "Fullstack Developer", "Portfolio", "Links", "Donate"],
  openGraph: {
    title: "Alikuxac | Profile Card",
    description: "Fullstack Developer & Creative Creator",
    url: "https://alikuxac.xyz",
    siteName: "Alikuxac Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import GoogleAnalytics from "@/components/google-analytics";
import Background from "@/components/background";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Background />
        <GoogleAnalytics ga_id="G-5V4SRB0GEQ" />
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="theme-overlay">
            <div className="app-container">
              <Header />
              <main>{children}</main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
