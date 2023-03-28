import { twitterUserName } from "./me";

export type SiteMetadataProps = {
  title: string;
  description?: string;
  images: { url: string; width: number; height: number }[];
};


export const generateSiteMetadata = ({
  title,
  description,
  images,
}: SiteMetadataProps) => {
  const croppedDescription = description?.slice(0, 200) ?? "";
  return {
    title,
    openGraph: {
      title,
      description: croppedDescription,
      siteName: "Metflix",
      locale: "en-US",
      type: "website",
      images,
    },
    twitter: {
      card: "website",
      title,
      description: croppedDescription,
      creator: `@${twitterUserName}`,
      images,
    },
  };
};
