import random from "lodash/random";
import { IBotTransformFunction } from "../types";

export function randomize({
  bot,
  index,
  props: { bleed },
  width,
  height,
}: IBotTransformFunction): void {
  bot.age = 0;
  bot.r = random(10, 14);
  bot.l1.length = random(30, 40);
  bot.l2.length = random(16, 28);
  if (index % 2 === 0) {
    bot.x = random(bot.r, width - bot.r);
    bot.vx = random(-2, 2, true);
    bot.vy = random(-4, 4, true);
    bot.y = bot.vy > 0 ? -bleed + bot.r : height + bleed - bot.r;
  } else {
    bot.vx = random(-4, 4, true);
    bot.vy = random(-2, 2, true);
    bot.x = bot.vx > 0 ? -bleed + bot.r : width + bleed - bot.r;
    bot.y = random(bot.r, height - bot.r);
  }
}
