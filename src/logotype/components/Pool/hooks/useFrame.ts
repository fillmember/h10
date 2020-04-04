import lodashNow from "lodash/now";
import clamp from "lodash/clamp";
import { PoolProps } from "../../../types";
import QuadTree from "../../../core/QuadTree";
import Bot from "../../../core/Bot";
import { useEffect, useState, useCallback, useMemo } from "react";
import { updateQuadTree } from "./useQuadTree";
import * as boundaryHandlingFunctions from "../../../fnPoolBounding";

export function useFrame({
  props,
  bots,
  quadTree,
  width,
  height,
}: {
  props: PoolProps;
  bots: Bot[];
  quadTree: QuadTree;
  width: number;
  height: number;
}) {
  const state = useMemo(() => ({ age: 0, t: lodashNow() }), []);
  const [, render] = useState();
  const { speed, boundingMode } = props;
  const [interval, setInterval] = useState(20);
  const [paused, pause] = useState(false);
  const onFrame: FrameRequestCallback = useCallback((t1) => {
    if (paused) {
      return;
    }
    const { age, t: t0 } = state;
    const dt = clamp((t1 - t0) / 30, 0, 1);
    if (age % interval === interval - 1) {
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
    state.age = age + 1;
    state.t = t1;
    render(t1);
    requestAnimationFrame(onFrame);
  }, []);
  useEffect(() => {
    const handle = requestAnimationFrame(onFrame);
    return () => cancelAnimationFrame(handle);
  }, [paused]);
  return { setQuadTreeUpdateInterval: setInterval, pause };
}
