import Bot from "../core/Bot";

export type Vector = {
  x: number;
  y: number;
};
export type Range = {
  min: number;
  max: number;
};

export interface IBotTransformFunction {
  props: PoolProps;
  bot: Bot;
  index: number;
  width: number;
  height: number;
}

export enum BoundingMode {
  Destroy = "destroy",
  Bounce = "bounce",
  Warp = "warp",
}

export type PoolProps = {
  backgroundColor: string;
  foregroundColor: string;
  strokeWidth: number;
  bleed?: number;
  zoom?: number;
  count?: number;
  speed?: number;
  grabDistance?: number;
  birthStagger?: number;
  pause?: boolean;
  transformInitialBot?: (arg: IBotTransformFunction) => void;
  boundingMode?: BoundingMode;
};
