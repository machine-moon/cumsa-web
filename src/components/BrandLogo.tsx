"use client";
import Image from "next/image";
import { useState } from "react";

type Props = { size?: number; className?: string };

export default function BrandLogo({ size = 44, className = "" }: Props) {
  const [src, setSrc] = useState("/CU-MSA-LOGO-blank-2.png");
  const dim = { width: size, height: size } as const;
  const isBlank = src.includes("CU-MSA-LOGO-blank-2.png");
  if (isBlank) {
    return <span aria-hidden className={`logo-mask-blue rounded-sm ${className}`} style={dim} />;
  }
  return (
    <Image
      src={src}
      alt="CUMSA logo"
      width={size}
      height={size}
      priority
      sizes={`${size}px`}
      onError={() => setSrc("/CU-MSA-LOGO-blank-2.png")}
      className={`object-contain rounded-sm ${className}`}
      style={dim}
    />
  );
}
