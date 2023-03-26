"use client";

import { useState, useEffect } from "react";

import type { ImageProps } from "next/image";

export type Props = {
  fallbackSrc?: string;
} & ImageProps;

const ImageWithFallback = (props: Props) => {
  const {
    src,
    className,
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
      className={`${className} bg-stone-900`}
      src={imgSrc as string}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
};

export default ImageWithFallback;
