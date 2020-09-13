import React from "react";
import { useInView } from "react-intersection-observer";
export const LazyIframe: React.FC<
  { fallback?: React.ReactNode } & React.HTMLProps<HTMLIFrameElement>
> = (props) => {
  const { fallback, className, ...iframeProps } = props;

  const [ref, visible] = useInView();

  if (!visible) {
    return <div ref={ref}>{fallback}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <iframe className="w-full h-full" {...iframeProps} />
    </div>
  );
};
LazyIframe.defaultProps = {
  fallback: () => null,
};

export const Lazyload: React.FC<{
  fallback?: React.ReactNode;
  children?: React.ReactNode;
}> = ({ fallback, children }) => {
  const [ref, visible] = useInView();
  if (!visible) {
    return <div ref={ref}>{fallback}</div>;
  }
  return <div ref={ref}>{children}</div>;
};
