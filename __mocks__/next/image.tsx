type ImgLike = {
  src: string | { src: string };
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  // Next-specific (discarded):
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: string;
  blurDataURL?: string;
  onLoadingComplete?: Function;
  loader?: Function;
  unoptimized?: boolean;
  [key: string]: any;
};

export default function NextImageMock({
  src,
  alt = "",
  width,
  height,
  className,
  style,
  fill,
  // discard Next-only props to avoid DOM warnings
  priority: _priority,
  sizes: _sizes,
  quality: _quality,
  placeholder: _placeholder,
  blurDataURL: _blur,
  onLoadingComplete: _onLoadingComplete,
  loader: _loader,
  unoptimized: _unoptimized,
  ..._rest
}: ImgLike) {
  const resolvedSrc = typeof src === "string" ? src : src?.src || "";
  const finalStyle = (fill ? { position: "absolute", inset: 0, ...(style as any) } : style) as any;
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={resolvedSrc}
      alt={alt}
      width={width as any}
      height={height as any}
      className={className}
      style={finalStyle}
      // no spreading of rest to prevent unknown prop warnings
    />
  );
}
