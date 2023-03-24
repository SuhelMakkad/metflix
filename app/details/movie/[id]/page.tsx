export const metadata = {
  title: "Movie - Metflix",
  description: "Generated by create next app",
};

export type Props = {
  params: {
    id: string;
  };
};

export default async function MoviesPage({ params }: Props) {
  const { id } = params;

  return <div className="mt-20">movie id: {id}</div>;
}

export const dynamicParams = true;
export const revalidate = 86400;

export async function generateStaticParams() {
  const tempIds = [603692, 4, 5];
  return tempIds.map((id) => ({
    id,
  }));
}