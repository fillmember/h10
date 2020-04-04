import { PoolProps } from "../../../types";
import { useCallback } from "react";

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

export function useMergedRef(...refs) {
  return useCallback(function (element) {
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(element);
      else if (ref != null) ref.current = element;
    });
  }, refs);
}

export * from "./useFrame";
export * from "./useMouseInteraction";
export * from "./useQuadTree";
export * from "./useBots";
export * from "./useSize";
