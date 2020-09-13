import React from "react";
import mapValues from "lodash/mapValues";
import { BoundingMode, BotFeature, PoolProps } from "../logotype/types";
import { PoolWithContent, Layout } from "../components/PoolWithContent";
import { LazyIframe, Lazyload } from "../components/LazyIframe";
import clsx from "clsx";

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

const poolProps = (i: number): PoolProps =>
  mapValues(poolPropsSet, (arr) => arr[i]);

const clsSectionTitle = "text-3xl md:text-5xl pt-6 mb-6 text-center";

const Page = () => (
  <main>
    <PoolWithContent
      poolProps={poolProps(0)}
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
    <PoolWithContent poolProps={poolProps(1)} layout={Layout.Half}>
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
      <h2 className={clsSectionTitle}>Featured Projects</h2>
      <div className="grid md:grid-cols-2 text-2xl md:text-4xl">
        <div className="p-4 self-center">
          <h3 className="mb-2">Wurstgang / Yee Dog</h3>
          <p>
            I made a computer dog who can be your desktop companion. And you can
            feed him your files*.
          </p>
          <ul className="grid md:grid-cols-2">
            <li>
              <a
                className="a"
                href="https://yee.dog/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit The Dog
              </a>
            </li>
            <li>
              <a
                className="a"
                href="https://mutate.space/projects/wurstgang/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Case Study
              </a>
            </li>
          </ul>
          <p className="mt-8 text-xs">
            *drag & drop, no files are uploaded or deleted.
          </p>
        </div>
        <LazyIframe
          className="w-full"
          style={{ minHeight: "50vh" }}
          src="https://yee.dog/"
          fallback={
            <div className="w-full bg-gray-200" style={{ minHeight: "50vh" }} />
          }
        />
      </div>
    </section>
    <section className="grid md:grid-cols-2 text-2xl md:text-4xl">
      <Lazyload
        fallback={
          <div className="bg-gunsmoke-500 w-full" style={{ minHeight: 340 }} />
        }
      >
        <video
          autoPlay
          muted
          loop
          className="w-full"
          style={{ minHeight: 340 }}
        >
          <source src="/assets/dualai-demo.mp4" />
        </video>
      </Lazyload>
      <div className="p-4 self-center">
        <h3 className="mb-2">Website for Dualai Design Studio</h3>
        <p>
          I conceptualized and developed a website for Dualai Design Studio. I
          attempted to use 3D to demonstrate the tangibility of the studio's
          specialized editorial design.
        </p>
        <ul className="grid md:grid-cols-2">
          <li>
            <a
              className="a"
              href="https://dualai.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit the site
            </a>
          </li>
          <li>
            <a
              className="a"
              href="https://mutate.space/projects/dualai-design-studio"
              target="_blank"
              rel="noopener noreferrer"
            >
              Case Study
            </a>
          </li>
        </ul>
      </div>
    </section>
    <PoolWithContent layout={Layout.Full} poolProps={poolProps(2)}>
      <div className="flex items-center h-full my-8">
        <div className="w-full">
          <h2 className={clsx(clsSectionTitle, "text-white")}>More Projects</h2>
          <ul className="text-xl md:text-3xl max-w-lg mx-auto p-4 text-center text-white">
            <li className="my-4">A data-moshing like Unity effect</li>
            <li className="my-4">Reactive-diffusion web toy</li>
            <li className="my-4">
              Some fun GIFs I made when I was in university
            </li>
            <li className="my-4">Illustrations & drawings</li>
            <li className="my-4">...</li>
            <li className="my-4">
              <a
                className="px-2 hover:bg-white hover:text-black"
                href="https://mutate.space"
                target="_blank"
                rel="noopener noreferrer"
              >
                Check them out on mutate.space
              </a>
            </li>
          </ul>
        </div>
      </div>
    </PoolWithContent>
    <section className="mb-16">
      <div className="flex justify-center my-8">
        <div className="bg-blue-500 w-16 h-32 transform translate-x-2"></div>
        <div className="bg-blue-500 w-32 h-32 rounded-full"></div>
      </div>
      <div className="mt-8 grid grid-cols-4 text-xl md:text-2xl text-center">
        <span>
          <a className="a" href="https://www.linkedin.com/in/hytien/">
            LinkedIn
          </a>
        </span>
        <span>
          <a className="a" href="mailto:hytien.10@gmail.com">
            Email
          </a>
        </span>
        <span>
          <a className="a" href="https://github.com/fillmember">
            GitHub
          </a>
        </span>
        <span>
          <a className="a" href="https://twitter.com/fillmember">
            Twitter
          </a>
        </span>
      </div>
    </section>
  </main>
);

export default Page;
