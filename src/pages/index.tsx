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

const Page = () => (
  <main>
    <PoolWithContent poolProps={usePoolPropAtIndex(0)} layout={Layout.Full}>
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
      <h2 className="text-5xl pt-4 mb-4 text-center">Featured Projects</h2>
      <div className="grid grid-cols-2">
        <div className="p-4 text-4xl self-center">
          <p>
            I made a computer dog, who can be your desktop companion. And you
            can feed him your files*.
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
        <iframe
          className="w-full"
          style={{ minHeight: "50vh" }}
          src="https://yee.dog/"
        />
      </div>
    </section>
    <PoolWithContent
      poolProps={usePoolPropAtIndex(2)}
      layout={Layout.HalfReverse}
    >
      <h2 className="text-5xl">
        Web &
        <br />
        Multimedia &
        <br />
        Experimental Design
      </h2>
      <Link href="/works">
        <a className="a mt-4 text-3xl inline-flex items-center">
          <GoDiffModified className="mr-2" />
          See Works
        </a>
      </Link>
    </PoolWithContent>
    <section className="w-full bg-red-500 text-center px-4 py-8 text-4xl">
      CV | Contact
    </section>
  </main>
);

export default Page;
