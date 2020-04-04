import React from "react";
import { BoundingMode, BotFeature } from "../logotype/types";
import { Pool } from "../logotype/components/Pool";

export default () => (
  <main>
    <Pool
      className="h-66vh w-full"
      backgroundColor="#CDCEDF"
      foregroundColor="#339"
      strokeWidth={3}
      speed={1}
      zoom={2}
      bleed={30}
      count={10}
      birthStagger={100}
      boundingMode={BoundingMode.Warp}
    />
    <Pool
      className="h-66vh w-full"
      backgroundColor="#00F"
      foregroundColor="#0F0"
      strokeWidth={2.5}
      speed={0.33}
      zoom={8}
      bleed={80}
      count={1}
      birthStagger={100}
      boundingMode={BoundingMode.Bounce}
      botFeatures={[BotFeature.Legs, BotFeature.Solid]}
    />
  </main>
);
