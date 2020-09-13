import React from "react";
import { useInView } from "react-intersection-observer";
export const LazyIframe: React.FC<
  { fallback?: React.ReactNode } & React.HTMLProps<HTMLIFrameElement>
> = (props) => {
  const { fallback, ...iframeProps } = props;

  const [ref, visible] = useInView();

  if (!visible) {
    return <div ref={ref}>{fallback}</div>;
  }

  return (
    <div ref={ref}>
      <iframe {...iframeProps} />
    </div>
  );
};
LazyIframe.defaultProps = {
  fallback: () => null,
};
