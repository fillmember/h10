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

type ClassNames = { section: string; pool: string; content: string };

const mergeWith = (x) => (o) => mapValues(o, (v, k) => clsx(v, x[k]));

const clsSet: ClassNames = mapValues(
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
  mergeWith(styles)
);

export const PoolWithContent: React.FC<{
  poolProps: PoolProps;
  children: React.ReactNode;
  layout: Layout;
  classNames?: Partial<ClassNames>;
}> = ({ poolProps, classNames = {}, children, layout }) => {
  const [ref, visible] = useInView();
  const { section, pool, content } = mergeWith(classNames)(clsSet[layout]);
  return (
    <section ref={ref} className={section}>
      {visible && <Pool className={pool} {...poolProps} />}
      <div className={content}>{children}</div>
    </section>
  );
};
