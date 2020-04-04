import React from "react";
import clsx from "clsx";
import round from "lodash/round";
import clamp from "lodash/clamp";
import includes from "lodash/includes";
import { radToDeg } from "../core/Math";
import styles from "./bot.module.css";
import BotModel from "../core/Bot";
import { BotFeature } from "../types";

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

export type FaceProps = {
  eyeWidth?: number;
  eyeHeight?: number;
  eyePosition: number[];
};
export const Face: React.FC<FaceProps> = ({
  eyeWidth,
  eyeHeight,
  eyePosition,
}) => {
  return (
    <g transform={translate(eyePosition)}>
      <circle className="stroke-0" r={eyeHeight * 2 + 1} cx={1} cy={0} />
      <line
        className="text-transparent fill-current"
        x1={-eyeWidth}
        x2={-eyeWidth}
        y1={-eyeHeight}
        y2={eyeHeight}
      />
      <circle
        className="text-transparent fill-current"
        cy={0}
        cx={eyeWidth}
        r={eyeHeight}
      />
    </g>
  );
};
Face.defaultProps = {
  eyeWidth: 3,
  eyeHeight: 3,
};

const useEyePosition = ({ vx, vy, r }: BotModel): number[] => {
  const [x, y] = [vx, vy].map((v) => clamp(v, -r, r)).map(round1);
  return [x, y];
};
export type BotProps = {
  bot: BotModel;
  captured?: boolean;
  features?: BotFeature[];
} & Pick<FaceProps, "eyeHeight" | "eyeWidth">;
export const Bot: React.FC<BotProps> = ({ bot, features, captured }) => {
  const eyePosition = useEyePosition(bot);
  const hasLeg = includes(features, BotFeature.Legs);
  return (
    <g
      className="cursor-pointer"
      transform={translate([bot.x, bot.y].map(round1))}
    >
      <circle cx={0} cy={0} />
      <g
        className={clsx("transition-transform duration-300 ease-in-out", {
          [styles.birth]: bot.age < 20,
          "transform scale-125": captured,
        })}
      >
        {hasLeg && <Leg factor={-1} leg={bot.l1} eyePosition={eyePosition} />}
        <circle className="stroke-0" r={bot.r} cx={0} cy={0} />
        {hasLeg && <Leg factor={1} leg={bot.l2} eyePosition={eyePosition} />}
        {includes(features, BotFeature.Face) && (
          <Face eyePosition={eyePosition} />
        )}
        <circle
          className={clsx(
            "fill-current",
            !includes(features, BotFeature.Solid) && "text-transparent"
          )}
          r={bot.r}
          cx={0}
          cy={0}
        />
      </g>
    </g>
  );
};
Bot.defaultProps = {
  captured: false,
  features: [BotFeature.Face, BotFeature.Legs],
};
