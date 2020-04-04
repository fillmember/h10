import { useMemo, useEffect } from "react";
import QuadTree from "../../../core/QuadTree";
import Rectangle from "../../../core/Rectangle";
import Bot from "../../../core/Bot";

export function updateQuadTree(qt: QuadTree, bots: Bot[] = []): void {
  qt.clear();
  bots.forEach((bot) => qt.insert(bot));
}

export function useQuadTree(width: number, height: number): QuadTree {
  return useMemo(() => new QuadTree(1, new Rectangle(0, 0, width, height)), []);
}
