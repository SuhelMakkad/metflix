export type Props = {
  heading: string;
};

const SectionHeading = ({ children }: { children: React.ReactNode }) => {
  return <h3 className="mb-5 text-2xl font-semibold">{children}</h3>;
};

export default SectionHeading;
