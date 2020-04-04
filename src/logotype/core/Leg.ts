import random from "lodash/random";
import clamp from "lodash/clamp";
import { PI, PI2, angleBetween, normalizeAngle, degToRad } from "./Math";
import Bot from "./Bot";

const MAX_R_PER_STEP = degToRad(3);
const computeDelta = (
  target: number,
  current: number,
  alpha: number
): number => {
  return clamp((target - current) * alpha, -MAX_R_PER_STEP, MAX_R_PER_STEP);
};
const lerpToTargetRotation = (
  target: number,
  current: number,
  alpha: number
): number => {
  if (target > current) {
    if (Math.abs(target - current) > PI) {
      current += PI2;
    }
    current += computeDelta(target, current, alpha);
  } else if (target < current) {
    if (Math.abs(target - current) > PI) {
      current -= PI2;
    }
    current += computeDelta(target, current, alpha);
  }
  return current;
};

export default class Leg {
  bot: Bot;
  length: number;
  rotation: number;
  constructor({ bot, length }: { bot: Bot; length: number }) {
    this.bot = bot;
    this.length = length;
    this.rotation = random(0, PI2, true);
  }
  update(dt: number): void {
    if (this.bot.speed < 0.01) {
      return;
    }
    const targetRotation = normalizeAngle(
      this.bot.cycle(1) * (PI / 8) + this.bot.heading - PI
    );
    this.rotation = lerpToTargetRotation(
      targetRotation,
      this.rotation,
      0.3 * dt
    );
  }
  follow(other: Leg, dt: number): void {
    const targetRotation = normalizeAngle(
      this.bot.cycle(0.2) * (PI / 2) + other.rotation
    );
    this.rotation = lerpToTargetRotation(
      targetRotation,
      this.rotation,
      0.1 * dt
    );
  }
}
