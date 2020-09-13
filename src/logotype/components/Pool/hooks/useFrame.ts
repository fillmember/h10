import clamp from "lodash/clamp";
import { PoolProps } from "../../../types";
import QuadTree from "../../../core/QuadTree";
import Bot from "../../../core/Bot";
import { useEffect, useState, useRef } from "react";
import { updateQuadTree } from "./useQuadTree";
import * as boundaryHandlingFunctions from "../../../fnPoolBounding";

export function useFrame(input: {
  props: PoolProps;
  bots: Bot[];
  quadTree: QuadTree;
  width: number;
  height: number;
}) {
  const { bots, quadTree } = input;
  const refAniFrameReq = useRef<number>();
  const refT0 = useRef<number>(0);
  const refAge = useRef<number>(0);
  const [, render] = useState<number>(0);
  const [qtUpdateInterval, setQuadTreeUpdateInterval] = useState(100);
  const refPause = useRef<boolean>(false);
  const pause = (value: boolean) => (refPause.current = value);
  const onFrame: FrameRequestCallback = (t1) => {
    const {
      width,
      height,
      props,
      props: { speed, boundingMode },
    } = input;
    const paused = refPause.current;
    if (!paused) {
      const age = refAge.current;
      const t0 = refT0.current || t1;
      const dt = clamp((t1 - t0) / 30, 0, 1);
      if (age % qtUpdateInterval === qtUpdateInterval - 1) {
        updateQuadTree(quadTree, bots);
      }
      bots.forEach((bot, index) => {
        bot.update(speed * dt, quadTree);
        boundaryHandlingFunctions[boundingMode]({
          props,
          width,
          height,
          bot,
          index,
        });
      });
      refAge.current = age + 1;
      refT0.current = t1;
      render(t1);
    }
    refAniFrameReq.current = requestAnimationFrame(onFrame);
  };
  useEffect(() => {
    refAniFrameReq.current = requestAnimationFrame(onFrame);
    return () => cancelAnimationFrame(refAniFrameReq.current);
  }, []);
  return { setQuadTreeUpdateInterval, pause };
}
