import { Pool } from "../logotype/components/Pool";
import { PoolProps } from "../logotype/types";

export enum Layout {
  Half,
  HalfReverse,
  Full,
}

const clsSet = {
  [Layout.Half]: {
    pool: "absolute md:static z-0 w-full md:w-1/2 h-full",
    content: "relative md:static z-10 w-full md:w-1/2 h-full p-4",
  },
  [Layout.HalfReverse]: {
    pool: "absolute md:static z-0 w-full md:w-1/2 h-full",
    content: "relative md:static z-10 w-full md:w-1/2 h-full p-4 order-first",
  },
  [Layout.Full]: {
    pool: "absolute z-10 w-full h-full",
    content: "static z-20 w-full p-4",
  },
};

export const PoolWithContent: React.FC<{
  poolProps: PoolProps;
  children: React.ReactNode;
  layout: Layout;
}> = ({ poolProps, children, layout }) => {
  return (
    <section className="relative w-full h-66vh flex flex-wrap min-h-64">
      <Pool className={clsSet[layout].pool} {...poolProps} />
      <div className={clsSet[layout].content}>{children}</div>
    </section>
  );
};
