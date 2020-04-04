import React from "react";
import clsx from "clsx";
import round from "lodash/round";
import clamp from "lodash/clamp";
import { radToDeg } from "../core/Math";
import styles from "./bot.module.css";
import BotModel from "../core/Bot";

const round1 = (v) => round(v, 1);
const translate = (arr: number[]): string => `translate(${arr.join(" ")})`;

export const Leg: React.FC<{ factor: any; leg: any; eyePosition: any }> = ({
  factor,
  leg: { length, rotation },
  eyePosition,
}) => (
  <line
    className="text-transparent fill-current"
    x1={0}
    x2={length}
    y1={0}
    y2={0}
    transform={`${translate(
      eyePosition.map((v) => v * factor)
    )} rotate(${round1(radToDeg(rotation))})`}
  />
);

const useEyePosition = ({ vx, vy, r }: BotModel): number[] => {
  const [x, y] = [vx, vy].map((v) => clamp(v, -r, r)).map(round1);
  return [x, y];
};

export const Bot: React.FC<{
  bot: BotModel;
  captured?: boolean;
  eyeWidth?: number;
  eyeHeight?: number;
}> = ({ bot, captured, eyeWidth, eyeHeight }) => {
  const eyePosition = useEyePosition(bot);
  return (
    <g
      className="cursor-pointer"
      transform={translate([bot.x, bot.y].map(round1))}
    >
      <circle cx="0" cy="0" />
      <g
        className={clsx("transition-transform duration-300 ease-in-out", {
          [styles.birth]: bot.age < 20,
          "transform scale-125": captured,
        })}
      >
        <Leg factor={-1} leg={bot.l1} eyePosition={eyePosition} />
        <circle className="stroke-0" r={bot.r} cx="0" cy="0" />
        <Leg factor={1} leg={bot.l2} eyePosition={eyePosition} />
        <g transform={translate(eyePosition)}>
          <circle className="stroke-0" r={eyeHeight * 2 + 1} cx="1" cy="0" />
          <line
            className="text-transparent fill-current"
            x1={-eyeWidth}
            x2={-eyeWidth}
            y1={-eyeHeight}
            y2={eyeHeight}
          />
          <circle
            className="text-transparent fill-current"
            cy="0"
            cx={eyeWidth}
            r={eyeHeight}
          />
        </g>
        <circle
          className="text-transparent fill-current"
          r={bot.r}
          cx="0"
          cy="0"
        />
      </g>
    </g>
  );
};
Bot.defaultProps = {
  captured: false,
  eyeWidth: 3,
  eyeHeight: 3,
};
