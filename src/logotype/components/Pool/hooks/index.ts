import throttle from "lodash/throttle";
import { useMemo, useState, useEffect, useRef } from "react";
import { PoolProps } from "../../../types";

export function useSize(unit: number) {
  const ref = useRef<SVGSVGElement>(null);
  const [ratio, setRatio] = useState(1);
  const width = unit * ratio;
  const height = unit;
  const viewBox = useMemo(() => `0 0 ${width} ${height}`, [width, height]);
  useEffect(() => {
    const onResize = throttle(() => {
      if (ref.current) {
        const w = ref.current.clientWidth;
        const h = ref.current.clientHeight;
        setRatio(w / h);
      }
    }, 100);
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, [ref.current]);
  return { ref, viewBox, width, height };
}

export function usePoolStyle({
  foregroundColor,
  backgroundColor,
  strokeWidth,
}: PoolProps) {
  return {
    stroke: foregroundColor,
    fill: backgroundColor,
    backgroundColor,
    strokeWidth,
  };
}

export * from "./useFrame";
export * from "./useMouseInteraction";
export * from "./useQuadTree";
export * from "./useBots";
