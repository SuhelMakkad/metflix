import { useState, useEffect } from "react";

import Image from "next/image";
import type { ImageProps } from "next/image";

export type Props = {
  fallbackSrc?: string;
} & ImageProps;

const ImageWithFallback = (props: Props) => {
  const {
    src,
    fallbackSrc = "/assets/images/fallback/metflix.jpg",
    ...rest
  } = props;
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img
      {...rest}
      src={imgSrc as string}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
};

export default ImageWithFallback;
