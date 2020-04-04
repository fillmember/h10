import { PoolProps } from "../../../types";

export function usePoolStyle({
  foregroundColor,
  backgroundColor,
  strokeWidth,
}: PoolProps) {
  return {
    color: foregroundColor,
    stroke: foregroundColor,
    fill: backgroundColor,
    backgroundColor,
    strokeWidth,
  };
}
