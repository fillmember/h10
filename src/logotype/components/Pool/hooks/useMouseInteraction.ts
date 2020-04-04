import { useState, useRef, useEffect } from "react";
import { PoolProps } from "../../../types";
import QuadTree from "../../../core/QuadTree";
import Rectangle from "../../../core/Rectangle";
import { distanceSquare } from "../../../core/Math";
import Bot from "../../../core/Bot";

function moveBotTo(bot: Bot, x: number, y: number): void {
  bot.x = x;
  bot.y = y;
}

function getSVGMouseEventPosition(
  svg: SVGSVGElement,
  point: DOMPoint,
  evt: MouseEvent
) {
  point.x = evt.clientX;
  point.y = evt.clientY;
  return point.matrixTransform(svg.getScreenCTM().inverse());
}

export function useMouseInteraction(
  { grabDistance }: PoolProps,
  { quadTree }: { quadTree: QuadTree }
) {
  const svg = useRef<SVGSVGElement>();
  const [point, setPoint] = useState<DOMPoint>(null);
  useEffect(() => {
    setPoint(svg.current?.createSVGPoint());
  }, [svg.current]);
  const [capturedBot, setCapturedBot] = useState<Bot>(null);
  function onMouseDown(evt) {
    const { x, y } = getSVGMouseEventPosition(svg.current, point, evt);
    const mouse = new Rectangle(x, y, 0, 0);
    const query = quadTree.retrieve([], mouse);
    let candidateDistance = grabDistance * grabDistance;
    let candidate = null;
    query.forEach((rect) => {
      const d = distanceSquare(mouse, rect);
      if (d < candidateDistance) {
        candidate = rect;
        candidateDistance = d;
      }
    });
    setCapturedBot(candidate);
    if (candidate) {
      candidate.immobile = true;
      moveBotTo(candidate, x, y);
    }
  }
  function onMouseUp(evt) {
    if (capturedBot) {
      capturedBot.immobile = false;
      setCapturedBot(null);
    }
  }
  function onMouseMove(evt) {
    if (capturedBot && point) {
      const { x, y } = getSVGMouseEventPosition(svg.current, point, evt);
      moveBotTo(capturedBot, x, y);
    }
  }
  return {
    eventHandlers: {
      onMouseMove,
      onMouseDown,
      onMouseUp,
      onMouseLeave: onMouseUp,
    },
    capturedBot,
    ref: svg,
  };
}
