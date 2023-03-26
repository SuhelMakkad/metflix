import QueryProvider from "@/components/QueryProvider";
import SearchSection from "@/components/SearchSection";

export async function generateMetadata() {
  const title = `Search - Metflix`;

  return {
    title,
    openGraph: {
      title,
      description: `Search Movies and TV Shows - Metflix`,
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
