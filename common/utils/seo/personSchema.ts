export type PersonType = {
  name: string;
  title: string;
  birthDate: string;
  imageUrl?: string;
  birthPlace?: string;
  gender?: string;
  url?: string;
  deathDate?: string;
};

export const getPersonSchema = ({
  name,
  title,
  birthDate,
  birthPlace,
  deathDate,
  url,
  gender,
  imageUrl,
}: PersonType) => {
  return {
    "@context": "http://schema.org",
    "@type": "Person",
    birthDate,
    birthPlace,
    deathDate,
    gender,
    url,
    givenName: name,
    jobTitle: title,
    image: imageUrl,
  };
};
