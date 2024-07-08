import { Viewport } from "next";
import { Open_Sans } from "next/font/google";

import SchemaScripts from "@/components/SchemaScripts";
import QueryProvider from "@/components/QueryProvider";
import FaviconLinks from "@/components/FaviconLinks";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { githubUrl, name } from "@/utils/me";
import { indexPageSchemas } from "@/utils/seo/schemaData";
import { getMetadata } from "@/utils/seo/metadata";

import "@/css/globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "black",
  colorScheme: "dark",
};

export const metadata = {
  ...getMetadata({
    title: "Home",
  }),
  manifest: "/assets/favicon/manifest.json",
  authors: [{ name, url: githubUrl }],
  creator: name,
  robots: {
    index: false,
    follow: false,
    nocache: false,
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
    </html>
  );
}
