import { IBotTransformFunction } from "../types";

export function bounce({ bot, width, height }: IBotTransformFunction) {
  if (bot.x >= width - bot.r) {
    bot.x = width - bot.r - 1;
    bot.vx *= -1;
  } else if (bot.y >= height - bot.r) {
    bot.y = height - bot.r - 1;
    bot.vy *= -1;
  } else if (bot.x <= bot.r) {
    bot.x = bot.r + 1;
    bot.vx *= -1;
  } else if (bot.y <= bot.r) {
    bot.y = bot.r + 1;
    bot.vy *= -1;
  }
}
