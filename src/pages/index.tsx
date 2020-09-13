import React from "react";
import mapValues from "lodash/mapValues";
import { BoundingMode, BotFeature, PoolProps } from "../logotype/types";
import { PoolWithContent, Layout } from "../components/PoolWithContent";
import { LazyIframe } from "../components/LazyIframe";

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

const Page = () => (
  <main>
    <PoolWithContent
      poolProps={usePoolPropAtIndex(0)}
      layout={Layout.Full}
      classNames={{ content: "pointer-events-none" }}
    >
      <div className="flex justify-center items-center w-full h-full">
        <div className="w-2/3">
          <h1 className="text-5xl -ml-px">H10</h1>
          <p>{"= ten"}</p>
          <p>{"= hui-yuan tien"}</p>
          <p>{"= creative web developer"}</p>
        </div>
      </div>
    </PoolWithContent>
    <PoolWithContent poolProps={usePoolPropAtIndex(1)} layout={Layout.Half}>
      <p className="text-2xl mb-6">
        I am an experienced web developer who is passionate about design on the
        web as a multi-media medium.
      </p>
      <p className="text-2xl">
        I have professional experiences in both artistic and commercial
        projects, where I lead the team to strive for the perfect combination of
        technology and design.
      </p>
    </PoolWithContent>
    <section>
      <h2 className="text-5xl pt-6 mb-6 text-center">Featured Projects</h2>
      <div className="grid grid-cols-2">
        <div className="p-4 text-4xl self-center">
          <p>
            I made a computer dog who can be your desktop companion. And you can
            feed him your files*.
          </p>
          <a
            className="a text-3xl"
            href="https://yee.dog/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit The Dog
          </a>
          <p className="mt-8 text-xs">
            *drag & drop, no files are uploaded or deleted.
          </p>
        </div>
        <LazyIframe
          className="w-full"
          style={{ minHeight: "50vh" }}
          src="https://yee.dog/"
          fallback={
            <div className="w-full bg-gray-300" style={{ minHeight: "50vh" }} />
          }
        />
      </div>
    </section>
    <section className="grid grid-cols-2">
      <LazyIframe
        className="w-full"
        style={{ minHeight: "50vh" }}
        src="https://dualai.com/"
        fallback={
          <div className="w-full bg-gray-300" style={{ minHeight: "50vh" }} />
        }
      />
      <div className="p-4 text-4xl self-center">
        <p>
          I conceptualized and developed a website for Dualai Design Studio. I
          attempted to use 3D to demonstrate the tangibility of the studio's
          specialized editorial design.
        </p>
        <a
          className="a text-3xl"
          href="https://dualai.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit the site
        </a>
      </div>
    </section>
    <section>
      <h2 className="text-5xl pt-6 mb-6 text-center">Experiences</h2>
    </section>
  </main>
);

export default Page;
