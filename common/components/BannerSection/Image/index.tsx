import Image from "next/image";

export type Props = {
  backdropUrl: string;
  posterUrl: string;
  alt: string;
};

const BannerImage = ({ backdropUrl, posterUrl, alt }: Props) => {
  return (
    <>
      <Image
        src={backdropUrl}
        alt={alt}
        className="-z-50 hidden min-h-[30rem] w-full object-cover md:block"
        height={1152}
        width={2048}
        property={"true"}
      />

      <Image
        src={posterUrl}
        alt={alt}
        className="-z-50 block min-h-[30rem] w-full object-cover md:hidden"
        height={1311}
        width={874}
        property={"true"}
      />
    </>
  );
};

export default BannerImage;
