import { HTMLAttributes, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { withSize } from "react-sizeme";
import clsx from "clsx";
import { Bot as BotComponent } from "../bot";
import { PoolProps, BoundingMode } from "../../types";
import {
  useQuadTree,
  useSize,
  usePoolStyle,
  useMouseInteraction,
  useBots,
  useFrame,
} from "./hooks";
import { randomize } from "../../fnBotInit";
import styles from "./pool.module.css";

function mergeRefs(refs, element) {
  refs.forEach((ref) => {
    if (typeof ref === "function") ref(element);
    else if (ref != null) ref.current = element;
  });
}

export const Pool = withSize({
  monitorWidth: true,
  monitorHeight: true,
})((props: PoolProps & HTMLAttributes<SVGSVGElement> & { size: any }) => {
  const { count, className, size, zoom } = props;
  const { width, height } = useSize(size.width, size.height, zoom);
  const [bots, addBot] = useBots({ props, width, height });
  const quadTree = useQuadTree(width, height);
  const { ref: ref1, eventHandlers, capturedBot } = useMouseInteraction(props, {
    quadTree,
  });
  const [ref2, visible] = useInView();
  useEffect(() => {
    for (let i = 0; i < count; i++) {
      addBot(quadTree, i);
    }
  }, []);
  const refMerged = useCallback((e) => mergeRefs([ref1, ref2], e), [ref2]);
  const { pause } = useFrame({ props, bots, quadTree, width, height });
  useEffect(() => {
    pause(!visible);
  }, [visible]);
  return (
    <div className={clsx("pool", styles.svg, className)}>
      <svg
        className="w-full h-full"
        ref={refMerged}
        viewBox={`0 0 ${width} ${height}`}
        style={usePoolStyle(props)}
        {...eventHandlers}
      >
        {bots.map((bot) => (
          <BotComponent key={bot.id} bot={bot} captured={capturedBot === bot} />
        ))}
      </svg>
    </div>
  );
});
Pool.defaultProps = {
  bleed: 36,
  zoom: 1,
  count: 5,
  speed: 1,
  grabDistance: 15,
  birthStagger: 600,
  pause: false,
  transformInitialBot: randomize,
  boundingMode: BoundingMode.Bounce,
};