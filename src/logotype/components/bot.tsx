import React from "react";
import clsx from "clsx";
import round from "lodash/round";
import clamp from "lodash/clamp";
import { radToDeg } from "../core/Math";
import styles from "./bot.module.css";

const toLocal = (str) =>
  str
    .split(" ")
    .map((str) => (styles[str] ? styles[str] : str))
    .join(" ");
const round1 = (v) => round(v, 1);
const arrToTranslate = (arr: number[]): string => `translate(${arr.join(" ")})`;

export const Leg: React.FC<{ factor: any; leg: any; eyePosition: any }> = ({
  factor,
  leg,
  eyePosition,
}) => {
  const pos = eyePosition.map((v) => v * factor);
  const r = round1(radToDeg(leg.rotation));
  const transform = `${arrToTranslate(pos)} rotate(${r})`;
  return (
    <line
      className={toLocal("leg stroke")}
      x1={0}
      x2={leg.length}
      y1={0}
      y2={0}
      transform={transform}
    />
  );
};

export const Bot: React.FC<{
  bot: any;
  captured?: boolean;
  eyeWidth?: number;
  eyeHeight?: number;
}> = ({ bot, captured = false, eyeWidth = 3, eyeHeight = 3 }) => {
  const eyePosition = [bot.vx, bot.vy]
    .map((v) => clamp(v, -bot.r, bot.r))
    .map(round1);
  return (
    <g
      className={toLocal(clsx("bot", { captured }))}
      transform={arrToTranslate([bot.x, bot.y].map(round1))}
    >
      <circle cx="0" cy="0" />
      <g className={toLocal(clsx("zoomer", { birth: bot.age < 20 }))}>
        <Leg factor={-1} leg={bot.l1} eyePosition={eyePosition} />
        <circle className={toLocal("bg")} r={bot.r} cx="0" cy="0" />
        <Leg factor={1} leg={bot.l2} eyePosition={eyePosition} />
        <g className={toLocal("eye")} transform={arrToTranslate(eyePosition)}>
          <circle
            className={toLocal("bg")}
            r={eyeHeight * 2 + 1}
            cx="1"
            cy="0"
          />
          <line
            className={toLocal("one stroke")}
            x1={-eyeWidth}
            x2={-eyeWidth}
            y1={-eyeHeight}
            y2={eyeHeight}
          />
          <circle
            className={toLocal("zero stroke")}
            cy="0"
            cx={eyeWidth}
            r={eyeHeight}
          />
        </g>
        <circle className={toLocal("circle stroke")} r={bot.r} cx="0" cy="0" />
      </g>
    </g>
  );
};
