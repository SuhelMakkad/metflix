import QueryProvider from "@/components/QueryProvider";
import SearchSection from "@/components/SearchSection";

export async function generateMetadata() {
  const title = `Search | Metflix`;

  return {
    title,
    openGraph: {
      title,
      description: `Search and discover your next favorite movie or TV show on Metflix. Browse through an extensive collection of the latest and classic titles, complete with full cast details, season counts, and comprehensive show information. Dive into the world of entertainment with Metflix.`,
      siteName: "Metflix",
      locale: "en-US",
      type: "website",
    },
  };
}

export default async function SearchPage() {
  return (
    <div className="mt-20">
      <QueryProvider>
        <SearchSection />
      </QueryProvider>
    </div>
  );
}
