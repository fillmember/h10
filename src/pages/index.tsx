import React from "react";
import dynamic from "next/dynamic";
import { BoundingMode } from "../logotype/types";

const DynamicPool = dynamic(() =>
  import("../logotype/components/Pool").then((mod) => mod.Pool)
);

export default () => (
  <main>
    <DynamicPool
      backgroundColor="#CDCECF"
      foregroundColor="#332"
      strokeWidth={2}
      bleed={30}
      boundingMode={BoundingMode.Warp}
    />
  </main>
);
