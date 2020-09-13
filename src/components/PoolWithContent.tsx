import clsx from "clsx";
import mapValues from "lodash/mapValues";
import { Pool } from "../logotype/components/Pool";
import { PoolProps } from "../logotype/types";
import styles from "./PoolWithContent.module.css";
import { useInView } from "react-intersection-observer";

export enum Layout {
  Half,
  HalfReverse,
  Full,
}

const clsSet = mapValues(
  {
    [Layout.Half]: {
      section: "grid md:grid-cols-2",
      pool: "",
      content: "",
    },
    [Layout.HalfReverse]: {
      section: "grid md:grid-cols-2",
      pool: "row-start-1 col-start-2",
      content: "row-start-1 col-start-1",
    },
    [Layout.Full]: {
      section: "relative overflow-hidden",
      pool: "",
      content: "absolute inset-0",
    },
  },
  (o) => mapValues(o, (v, k) => clsx(v, styles[k]))
);

export const PoolWithContent: React.FC<{
  poolProps: PoolProps;
  children: React.ReactNode;
  layout: Layout;
}> = ({ poolProps, children, layout }) => {
  const [ref, visible] = useInView();
  return (
    <section ref={ref} className={clsSet[layout].section}>
      {visible && <Pool className={clsSet[layout].pool} {...poolProps} />}
      <div className={clsSet[layout].content}>{children}</div>
    </section>
  );
};
