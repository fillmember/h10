import random from "lodash/random";
import id from "lodash/uniqueId";
import isNumber from "lodash/isNumber";
import { normalizeAngle, map, normalize1 } from "./Math";
import Rectangle from "./Rectangle";
import Leg from "./Leg";
import { Range } from "../types/index";

const applyMomentum = (v0: number, v1: number): number => {
  return Math.min(2, v0 * 0.5 + v1);
};

export default class Bot {
  id: string;
  parent: any;
  immobile: boolean;
  age: number;
  dna: number;
  heartbeat: number;
  r: number;
  x: number;
  y: number;
  lastx: number;
  lasty: number;
  vx: number;
  vy: number;
  l1: Leg;
  l2: Leg;
  avoidingRange: number;
  speedLimit: Range;
  speedDecay: number;
  constructor() {
    this.id = id("bot");
    this.parent = undefined;
    this.immobile = false;
    this.age = 0;
    this.dna = Math.random();
    this.heartbeat = random(0.05, 0.15, true);

    this.r = 12;
    this.x = 0;
    this.y = 0;
    this.lastx = 0;
    this.lasty = 0;
    this.vx = 0;
    this.vy = 0;

    this.l1 = new Leg({ bot: this, length: 36 });
    this.l2 = new Leg({ bot: this, length: 24 });

    this.avoidingRange = 48;
    this.speedLimit = { min: 2, max: 4 };
    this.speedDecay = 0.85;
  }
  get speed() {
    return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
  }
  get heading() {
    return normalizeAngle(Math.atan2(this.vy, this.vx));
  }
  get width() {
    return this.r;
  }
  get height() {
    return this.r;
  }
  get reference() {
    return this;
  }
  cycle(freq = 1) {
    return Math.cos(
      this.dna +
        this.age *
          this.heartbeat *
          freq *
          map(this.speed, 0, this.speedLimit.max, 0.2, 1)
    );
  }

  update(dt: number, quadtree = this.parent.quadtree): void {
    const { l1, l2 } = this;
    if (this.immobile) {
      this.vx = dt * -applyMomentum(this.vx, this.x - this.lastx);
      this.vy = dt * -applyMomentum(this.vy, this.y - this.lasty);
      this.lastx = this.x;
      this.lasty = this.y;
    }

    if (!this.immobile) {
      // Detect other bots
      const others = quadtree.retrieve([], this);
      const { avoidingRange } = this;
      const arsquare = avoidingRange * avoidingRange;
      others
        .map((obj: Rectangle) => obj.reference)
        .filter((other: Bot) => other !== this)
        .forEach((other: Bot) => {
          const v = { x: other.x - this.x, y: other.y - this.y };
          const d = v.x * v.x + v.y * v.y;
          if (d < arsquare) {
            this.vx -= (0.35 * dt * v.x) / avoidingRange;
            this.vy -= (0.35 * dt * v.y) / avoidingRange;
          }
        });
    }

    // Slow down
    if (this.speed > this.speedLimit.max * dt) {
      this.vx *= this.speedDecay;
      this.vy *= this.speedDecay;
    }

    // Speed Up
    if (this.speed < this.speedLimit.min * dt) {
      this.vx += normalize1(this.vx) * 0.03 * this.dna * dt;
      this.vy += normalize1(this.vy) * 0.03 * this.dna * dt;
    }

    if (!this.immobile) {
      // Move the bot
      this.x += this.vx * dt;
      this.y += this.vy * dt;
    }

    // Legs
    l1.update(dt);
    l2.follow(l1, dt);

    // Aging
    this.age += dt;
  }
}
