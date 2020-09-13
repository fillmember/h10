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
  const refAniFrameReq = useRef<number>(0);
  const refAnimationParams = useRef<Record<string, number>>({ age: 0, t: 0 });
  const [, render] = useState<number>(0);
  const [qtUpdateInterval, setQuadTreeUpdateInterval] = useState(100);
  const [paused, setPause] = useState<boolean>(false);
  const onFrame: FrameRequestCallback = (t1) => {
    const {
      width,
      height,
      props,
      props: { speed, boundingMode },
    } = input;
    if (!paused) {
      const { age, t } = refAnimationParams.current;
      const dt = clamp((t1 - t) / 30, 0, 1);
      if (bots.length > 1 && age % qtUpdateInterval >= qtUpdateInterval - 1) {
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
      refAnimationParams.current.age = age + 1;
      refAnimationParams.current.t = t1;
      render(t1);
    }
    refAniFrameReq.current = requestAnimationFrame(onFrame);
  };
  useEffect(() => {
    refAniFrameReq.current = requestAnimationFrame(onFrame);
    return () => cancelAnimationFrame(refAniFrameReq.current);
  }, []);
  return { setQuadTreeUpdateInterval, pause: setPause };
}
