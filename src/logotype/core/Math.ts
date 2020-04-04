import { Vector } from "../types/index";

export const RAD_TO_DEG = 57.2958;
export const radToDeg = (v: number): number => v * RAD_TO_DEG;
export const degToRad = (v: number): number => v / RAD_TO_DEG;
export const PI = Math.PI;
export const PI2 = Math.PI * 2;

export function angleBetween(from: number, to: number): number {
  const delta = to - from;
  const delta2 = delta > 0 ? delta + PI2 : delta - PI2;
  return Math.abs(delta) < Math.abs(delta2) ? delta : delta2;
}

export function normalizeAngle(value: number): number {
  if (value < 0) {
    return normalizeAngle(value + PI2);
  }
  if (value > PI2) {
    return normalizeAngle(value - PI2);
  }
  return value;
}

export function distanceSquare(a: Vector, b: Vector): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

export function map(
  x: number,
  x0: number,
  x1: number,
  y0: number,
  y1: number
): number {
  return y0 + ((x - x0) / (x1 - x0)) * (y1 - y0);
}

export function normalize1(value: number): number {
  return value / Math.abs(value);
}
