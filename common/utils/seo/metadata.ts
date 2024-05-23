import type { Metadata } from "next";
import { name, twitterUserName } from "@/utils/me";
import { BASE_URL } from "@/utils/constants";

const metaTitle = "Metflix";
const defaultImages = [
  { url: `${BASE_URL}/assets/images/logo/logo.png`, width: 310, height: 310 },
];

export type GetMetadataParams = {
  title?: string;
  description?: string;
  url?: string;
  images?: { url: string; width: number; height: number }[];
  keywords?: string;
};

export const getMetadata = ({
  title,
  description,
  url,
  keywords,
  images = defaultImages,
}: GetMetadataParams = {}): Metadata => {
  const titleWithName = title ? `${title} | ${metaTitle}` : metaTitle;

  return {
    title: titleWithName,
    description,
    keywords,
    metadataBase: new URL(BASE_URL),

    openGraph: {
      siteName: metaTitle,
      title: titleWithName,
      description,
      images,
      url: `${BASE_URL}${url || ""}`,
      locale: "en_US",
      type: "website",
    },

    twitter: {
      creator: `@${twitterUserName}`,
      card: "summary",
      site: url,
      title: titleWithName,
      description,
      images,
    },

    authors: [{ name }],
  };
};
