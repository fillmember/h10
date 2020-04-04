import { IBotTransformFunction } from "../types";

export function warp({
  bot,
  width,
  height,
  props: { bleed },
}: IBotTransformFunction) {
  if (bot.x >= width + bleed) {
    bot.x = -bleed + 1;
  } else if (bot.y >= height + bleed) {
    bot.y = -bleed + 1;
  } else if (bot.x <= -bleed) {
    bot.x = width + bleed - 1;
  } else if (bot.y <= -bleed) {
    bot.y = height + bleed - 1;
  }
}
