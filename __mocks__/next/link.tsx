import * as React from "react";

const Link = React.forwardRef<HTMLAnchorElement, any>(function Link(
  { href, children, ...rest },
  ref,
) {
  return (
    <a href={href} ref={ref as any} {...rest}>
      {children}
    </a>
  );
});

export default Link;
