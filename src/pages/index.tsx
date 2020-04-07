import React from "react";
import Link from "next/link";
import mapValues from "lodash/mapValues";
import { GoDiffModified } from "react-icons/go";
import { BoundingMode, BotFeature, PoolProps } from "../logotype/types";
import { PoolWithContent, Layout } from "../components/PoolWithContent";

const poolPropsSet = {
  backgroundColor: ["#CDCEDF", "#00F", "#000", "#D0F"],
  foregroundColor: ["#333399", "#0F0", "#FFF", "#CFC"],
  strokeWidth: [3, 6, 3, 3],
  speed: [1, 0.3, 0.6, 1],
  zoom: [2, 8],
  bleed: [30, 80],
  count: [10, 1],
  birthStagger: [100, 100],
  boundingMode: [[BoundingMode.Warp], [BoundingMode.Bounce]],
  botFeatures: [undefined, [BotFeature.Legs, BotFeature.Solid]],
};

const usePoolPropAtIndex = (i: number): PoolProps =>
  mapValues(poolPropsSet, (arr) => arr[i]);

const content = [
  <div className="flex justify-center items-center w-full h-full">
    <div>
      <h1 className="text-5xl">H10</h1>
    </div>
  </div>,
  <>
    <h2 className="text-5xl">
      Creative <br />
      Frontend Developer
    </h2>
  </>,
  <>
    <h2 className="text-5xl">
      Multimedia
      <br />
      /
      <br />
      Experimental
    </h2>
  </>,
  <>
    <h2 className="text-5xl">
      Zwolle, NL
      <br />
      &
      <br />
      Virtual Space
    </h2>
  </>,
];
export default () => (
  <main>
    <PoolWithContent poolProps={usePoolPropAtIndex(0)} layout={Layout.Full}>
      <div className="flex justify-center items-center w-full h-full">
        <div>
          <h1 className="text-5xl">H10</h1>
        </div>
      </div>
    </PoolWithContent>
    <PoolWithContent poolProps={usePoolPropAtIndex(1)} layout={Layout.Half}>
      <h2 className="text-5xl">
        Creative <br />
        Frontend Developer
      </h2>
    </PoolWithContent>
    <section className="w-full bg-red-500 text-center">
      <h2 className="text-5xl pt-2 mb-2">Featured Project ––– Yee.Dog</h2>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 text-left p-4 text-4xl">
          WebGL
          <br />
          Computer Dog
          <br />
          <br />
          Desktop Companion
          <br />
          Feed It Your File
          <br />
          <br />
          <a
            className="a text-3xl"
            href="https://yee.dog/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://yee.dog/
          </a>
          <br />
          <a className="a text-3xl" href="/works/yeedog">
            details
          </a>
        </div>
        <iframe
          className="w-full md:w-1/2 h-screen min-h-64 overflow-hidden"
          src="https://yee.dog/"
        />
      </div>
    </section>
    <PoolWithContent
      poolProps={usePoolPropAtIndex(2)}
      layout={Layout.HalfReverse}
    >
      <h2 className="text-5xl">
        Web \
        <br />
        Multimedia \
        <br />
        Experiment
      </h2>
      <Link href="/works">
        <a className="a mt-4 text-3xl inline-flex items-center">
          <GoDiffModified className="mr-2" />
          See Works
        </a>
      </Link>
    </PoolWithContent>
    <section className="w-full bg-red-500 text-center px-4 py-8 text-4xl">
      Commercial Works | CV | Contact
    </section>
  </main>
);
