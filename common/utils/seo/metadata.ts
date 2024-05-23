import type { Metadata } from "next";
import { BASE_URL } from "@/utils/index";
import { name } from "@/utils/me";

const metaTitle = "Metflix";
const defaultImage = `${BASE_URL}/assets/images/logo/logo.png`;

export type GetMetadataParams = {
  title?: string;
  description?: string;
  url?: string;
  images?: string[];
  keywords?: string;
};

export const getMetadata = ({
  title,
  description,
  url,
  images,
  keywords,
}: GetMetadataParams = {}): Metadata => {
  const titleWithName = title ? `${title} | ${metaTitle}` : metaTitle;

  return {
    title: titleWithName,
    description,
    keywords,

    openGraph: {
      siteName: metaTitle,
      title: titleWithName,
      description,
      images: [
        {
          url: images ? images[0] : defaultImage,
          height: 500,
          width: 1100,
          type: "image/jpg",
        },
      ],
      url: `${BASE_URL}${url || ""}`,
      locale: "en_US",
      type: "website",
    },

    twitter: {
      creator: metaTitle,
      card: "summary",
      site: url,
      title: titleWithName,
      description,
      images,
    },

    authors: [{ name }],
  };
};
