import React from "react";
import dynamic from "next/dynamic";
import { BoundingMode } from "../logotype/types";
import { Pool } from "../logotype/components/Pool";

export default () => (
  <main>
    <Pool
      className="h-screen w-full"
      backgroundColor="#CDCECF"
      foregroundColor="#332"
      strokeWidth={3}
      speed={1}
      zoom={2}
      bleed={30}
      count={10}
      birthStagger={100}
      boundingMode={BoundingMode.Warp}
    />
    <Pool
      className="h-screen w-full"
      backgroundColor="#00F"
      foregroundColor="#000"
      strokeWidth={3}
      speed={1}
      zoom={2}
      bleed={30}
      count={10}
      birthStagger={100}
      boundingMode={BoundingMode.Warp}
    />
  </main>
);
