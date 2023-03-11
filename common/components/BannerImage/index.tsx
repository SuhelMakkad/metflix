import Image from "next/image";

export type Props = {
  src: string;
  alt: string;
};

const BannerImage = ({ src, alt }: Props) => {
  return (
    <div
      className="
      absolute left-0 top-0 right-0 -z-50 max-h-[70rem] overflow-hidden
    "
    >
      <div className="relative">
        <Image
          className="w-full object-cover"
          src={src}
          alt={alt}
          height={1152}
          width={2048}
          property={"true"}
        />
        <div className="bt-overlay absolute"></div>
      </div>
    </div>
  );
};

export default BannerImage;
