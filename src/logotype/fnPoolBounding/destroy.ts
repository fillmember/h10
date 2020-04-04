import { IBotTransformFunction } from "../types";

function contains(input: IBotTransformFunction) {
  const {
    bot,
    width,
    height,
    props: { bleed },
  } = input;
  return (
    bot.x < width + bleed &&
    bot.y < height + bleed &&
    bot.x > -bleed &&
    bot.y > -bleed
  );
}

export function destroy(input: IBotTransformFunction) {
  if (contains(input)) {
    input.props.transformInitialBot(input);
  }
}
