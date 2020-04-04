import { useMemo, useCallback } from "react";
import Bot from "../../../core/Bot";
import { PoolProps } from "../../../types";

export function useBots({
  props,
  width,
  height,
}: {
  props: PoolProps;
  width: number;
  height: number;
}): [Bot[], Function] {
  const { transformInitialBot } = props;
  const bots = useMemo(() => [], []);
  const addBot = useCallback((quadTree, index: number) => {
    const bot = new Bot();
    transformInitialBot({ bot, index, props, width, height });
    quadTree.insert(bot);
    bots.push(bot);
  }, []);
  return [bots, addBot];
}
