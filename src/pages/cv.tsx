import Head from "next/head";
import Link from "next/link";
import styles from "../style/cv.module.css";

const obfuscate = (str: string): string =>
  str
    .split("")
    .map((char) => `&#${char.charCodeAt(0)};`)
    .join("");
const email = obfuscate("fillmember@gmail.com");
const print = () => window.print();

export default function CV() {
  return (
    <main className={styles.cv}>
      <Head>
        <title>CV - H10</title>
      </Head>
      <img className="absolute top-6 right-4 h-12 w-12 hidden print:block" alt="logo" src="/favicon.svg" />
      <section>
        <h1>
          Hui-yuan Tien&nbsp;
          <wbr />
          (Ten)
        </h1>
        <button className="p-2 sm:absolute text-base mb-4 top-4 right-4 border border-black print:hidden" onClick={print}>
          download as pdf
        </button>
        <nav className="text-sm grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-1">
          <Link href="/">
            <a>ten10.netlify.app</a>
          </Link>
          <a href={`mailto:`} dangerouslySetInnerHTML={{ __html: email }}></a>
          <a href="https://github.com/fillmember">github.com/fillmember</a>
          <a href="https://linkedin.com/in/hytien">linkedin.com/in/hytien</a>
        </nav>
      </section>
      <div className="grid sm:grid-cols-2 gap-8 mt-8">
        <section>
          <h2>Experience</h2>
          <h3>
            <span>Front-end tech lead</span>
            <span> @ </span>
            <span>Tinka</span>
          </h3>
          <dl>
            <dt>2019 ~ present</dt>
            <dt>Zwolle, NL</dt>
          </dl>
          <p>
            Working on streamlining the development and design process to unify the UI/UX offers and wrangle for clarity in Tinka's various
            products.
          </p>
          <h3>
            <span>Front-end developer</span>
            <span> @ </span>
            <span>hyam Studios</span>
          </h3>
          <dl>
            <dt className="tabular-nums tracking-tighter">2018 ~ 2019</dt>
            <dt>Berlin, DE</dt>
          </dl>
          <p>Consult clients and outline technical solutions, shaping the design studio's digitial offers. </p>
          <h3>
            <span>Creative developer</span>
            <span> @ </span>
            <span>Artificial Rome</span>
          </h3>
          <dl>
            <dt className="tabular-nums tracking-tighter">2016 ~ 2018</dt>
            <dt>Berlin, DE</dt>
          </dl>
          <p>Explore epic landscapes using immersive technologies (AR & VR), Unity and Vue.</p>
        </section>
        <section>
          <div className="mb-3">
            <h2>Skills</h2>
            <h3>Tech</h3>
            <ul className="grid grid-cols-2">
              <span>TypeScript</span>
              <span>React</span>
              <span>Vue</span>
              <span>Tailwind CSS</span>
              <span>GraphQL</span>
              <span>CI/CD</span>
              <span>Three</span>
              <span>react-fiber-three</span>
              <span>C#</span>
              <span>Unity</span>
              <span>GLSL</span>
              <span>API Design</span>
            </ul>
            <h3>Design</h3>
            <ul className="grid grid-cols-2">
              <span>Sketch</span>
              <span>UX/UI</span>
              <span>3D</span>
              <span>Animation</span>
            </ul>
            <h3>Language</h3>
            <ul className="grid grid-cols-2">
              <li>Mandarin (native)</li>
              <li>English (fluent)</li>
              <li>German (B1)</li>
              <li>Dutch (A2)</li>
            </ul>
          </div>
          <p>Interested in constantly expanding my knowledge of design and innovative web technology. </p>
        </section>
        <section>
          <h2>Projects</h2>
          <h3>
            <a href="https://yee.dog">yee.dog</a>
          </h3>
          <p>Virtual dog companion available 24/7. </p>
          <h3>
            <a href="https://dualai.com">dualai.com</a>
          </h3>
          <p>3D portfolio for TW-based design studio. </p>
        </section>
        <section>
          <h2>Education</h2>
          <h3>Master of Animation</h3>
          <div className="grid grid-cols-3 gap-1">
            <span className="col-span-2">Avans Hogeschool</span>
            <span className="text-right tabular-nums tracking-tighter">2014 ~ 2015</span>
          </div>
          <h3>Bachelor of Design</h3>
          <div className="grid grid-cols-3 gap-1">
            <span className="col-span-2">National Taiwan University of Science and Technology</span>
            <span className="text-right tabular-nums tracking-tighter">2009 ~ 2013</span>
          </div>
        </section>
      </div>
    </main>
  );
}
