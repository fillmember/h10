import { HTMLAttributes, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { withSize, SizeMeProps } from "react-sizeme";
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

export const Pool = withSize({
  monitorWidth: true,
  monitorHeight: true,
})(function Pool(
  props: PoolProps & HTMLAttributes<SVGSVGElement> & SizeMeProps
) {
  const { count, className, size, zoom, birthStagger, botFeatures } = props;
  const { width, height } = useSize(size.width, size.height, zoom);
  const [bots, addBot] = useBots({ props, width, height });
  const quadTree = useQuadTree(width, height);
  const {
    ref: refMouseInteraction,
    eventHandlers,
    capturedBot,
  } = useMouseInteraction(props, {
    quadTree,
  });
  const [refInView, visible] = useInView();
  useEffect(() => {
    new Array(count)
      .fill(birthStagger)
      .map((v, i) => v * i)
      .forEach((delay, index) => {
        setTimeout(() => {
          addBot(quadTree, index);
        }, delay);
      });
  }, []);
  const { pause, setQuadTreeUpdateInterval } = useFrame({
    props,
    bots,
    quadTree,
    width,
    height,
  });
  useEffect(() => {
    pause(!visible);
  }, [visible]);
  useEffect(() => {
    setQuadTreeUpdateInterval(!!capturedBot ? 20 : 80);
  }, [capturedBot]);
  return (
    <div ref={refInView} className={clsx(styles.svg, className)}>
      <svg
        className="w-full h-full"
        ref={refMouseInteraction}
        viewBox={`0 0 ${width} ${height}`}
        style={usePoolStyle(props)}
        {...eventHandlers}
      >
        {bots.map((bot) => (
          <BotComponent
            key={bot.id}
            bot={bot}
            captured={capturedBot === bot}
            features={botFeatures}
          />
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
