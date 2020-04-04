import { PoolProps } from "../../../types";

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
export * from "./useSize";
