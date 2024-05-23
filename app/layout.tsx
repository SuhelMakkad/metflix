import { Open_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import SchemaScripts from "@/components/SchemaScripts";
import QueryProvider from "@/components/QueryProvider";
import FaviconLinks from "@/components/FaviconLinks";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { githubUrl, name } from "@/utils/me";
import { indexPageSchemas } from "@/utils/seo/schemaData";
import { getMetadata } from "@/utils/seo/metadata";
import { GOOGLE_ANALYTICS_ID } from "@/utils/constants";

import "@/css/globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
});

export const metadata = {
  ...getMetadata({
    title: "Home",
  }),
  manifest: "/assets/favicon/manifest.json",
  authors: [{ name, url: githubUrl }],
  colorScheme: "dark",
  creator: name,
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <SchemaScripts schemas={indexPageSchemas} />
        <FaviconLinks />
      </head>

      <body
        className={`bg-black text-slate-100 antialiased ${openSans.className} overflow-x-hidden`}
      >
        <Navbar />

        <QueryProvider>
          <main className="px-3 md:px-4 lg:px-6 2xl:px-8">{children}</main>
        </QueryProvider>

        <Footer />
      </body>

      <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
    </html>
  );
}
