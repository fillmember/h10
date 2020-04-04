import React from "react";
import dynamic from "next/dynamic";
import { BoundingMode } from "../logotype/types";
import { Pool } from "../logotype/components/Pool";

export default () => (
  <main>
    <Pool
      className="h-64 w-full"
      backgroundColor="#CDCECF"
      foregroundColor="#332"
      strokeWidth={3}
      zoom={2}
      bleed={30}
      count={8}
      boundingMode={BoundingMode.Bounce}
    />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </main>
);
