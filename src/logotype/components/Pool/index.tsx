import clsx from "clsx";
import { HTMLAttributes, useEffect } from "react";
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

export const Pool: React.FC<PoolProps & HTMLAttributes<SVGSVGElement>> = (
  props
) => {
  const { count, unit, className } = props;
  const { ref, viewBox, width, height } = useSize(unit);
  const [bots, addBot] = useBots({ props, width, height });
  const [quadTree] = useQuadTree(width, height);
  useFrame({ props, bots, quadTree, width, height });
  const { refSvg, eventHandlers, capturedBot } = useMouseInteraction(props, {
    quadTree,
  });
  useEffect(() => {
    for (let i = 0; i < count; i++) {
      addBot(quadTree, i);
    }
  }, []);
  return (
    <svg
      className={clsx(styles.svg, className)}
      ref={(element) => mergeRefs([ref, refSvg], element)}
      viewBox={viewBox}
      style={usePoolStyle(props)}
      {...eventHandlers}
    >
      {bots.map((bot) => (
        <BotComponent key={bot.id} bot={bot} captured={capturedBot === bot} />
      ))}
    </svg>
  );
};
Pool.defaultProps = {
  bleed: 36,
  unit: 150,
  count: 5,
  speed: 1,
  grabDistance: 15,
  birthStagger: 600,
  pause: false,
  transformInitialBot: randomize,
  boundingMode: BoundingMode.Bounce,
};
