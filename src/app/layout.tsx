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
  metadataBase: new URL("https://alikuxac.xyz"),
  title: "Alikuxac - Backend Engineer",
  description: "Backend engineer portfolio building APIs, real-time apps, and edge infrastructure.",
  keywords: ["Alikuxac", "Backend Engineer", "Fullstack Developer", "Portfolio", "Links", "Donate"],
  icons: {
    icon: "/pic.png",
    apple: "/pic.png",
  },
  openGraph: {
    title: "Alikuxac - Backend Engineer",
    description: "Backend engineer portfolio building APIs, real-time apps, and edge infrastructure.",
    url: "https://alikuxac.xyz",
    siteName: "Alikuxac Portfolio",
    images: [
      {
        url: "/pic.png",
        width: 400,
        height: 400,
        alt: "Alikuxac Profile Picture",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Alikuxac - Backend Engineer",
    description: "Backend engineer portfolio building APIs, real-time apps, and edge infrastructure.",
    images: ["/pic.png"],
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
      <head>
        {/* Preload hero background image to eliminate LCP delay */}
        <link rel="preload" as="image" href="/bg.jpg" fetchPriority="high" />
        {/* Preconnect to external API/CDN domains to reduce network roundtrips */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://img.vietqr.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://img.vietqr.io" />
      </head>
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
