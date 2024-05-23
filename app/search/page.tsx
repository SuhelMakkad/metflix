import { Suspense } from "react";

import QueryProvider from "@/components/QueryProvider";
import SearchSection from "@/components/SearchSection";

import { getMetadata } from "@/utils/seo/metadata";

export const metadata = getMetadata({
  title: "Search",
  description:
    "Search and discover your next favorite movie or TV show on Metflix. Browse through an extensive collection of the latest and classic titles, complete with full cast details, season counts, and comprehensive show information. Dive into the world of entertainment with Metflix.",
  url: "/search",
});

export default async function SearchPage() {
  return (
    <div className="mt-20">
      <QueryProvider>
        <Suspense>
          <SearchSection />
        </Suspense>
      </QueryProvider>
    </div>
  );
}
