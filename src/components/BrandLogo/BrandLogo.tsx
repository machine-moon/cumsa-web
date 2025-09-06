// ...existing code from BrandLogo.tsx...
"use client";
import Image from "next/image";
import { useState } from "react";
import { LOGOS } from "@/lib/constants";

type Props = { size?: number; className?: string };

export default function BrandLogo({ size = 44, className = "" }: Props) {
  const [src, setSrc] = useState<string>(LOGOS.main);
  const dim = { width: size, height: size } as const;

  return (
    <Image
      src={src}
      alt="CUMSA logo"
      width={size}
      height={size}
      priority
      sizes={`${size}px`}
      onError={() => setSrc(LOGOS.fallback)}
      className={`object-contain rounded-sm ${className}`}
      style={dim}
    />
  );
}
