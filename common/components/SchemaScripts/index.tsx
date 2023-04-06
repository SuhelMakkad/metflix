import Script from "next/script";

export type SchemaType = {
  id: string;
  value: { [key: string]: any };
};

export type Prop = {
  schemas: SchemaType[];
};
const SchemaScripts = ({ schemas }: Prop) => {
  return (
    <>
      {schemas.map(({ id, value }) => (
        <script
          id={id}
          key={id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(value) }}
        />
      ))}
    </>
  );
};

export default SchemaScripts;
