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
    <Image {...rest} src={imgSrc} onError={() => setImgSrc(fallbackSrc)} />
  );
};

export default ImageWithFallback;
