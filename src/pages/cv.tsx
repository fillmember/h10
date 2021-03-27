import styles from "../style/cv.module.css";

const email = "fillmember@gmail.com";
const obfuscated = email
  .split("")
  .map((char) => `&#${char.charCodeAt(0)};`)
  .join("");
const print = () => window.print();

export default function CV() {
  return (
    <main className={styles.cv}>
      <button className="p-2 absolute top-4 right-4 border border-gunsmoke-500 print:hidden" onClick={print}>
        download as pdf
      </button>
      <section>
        <h1>Hui-Yuan Tien</h1>
        <p className="grid grid-cols-2 max-w-lg">
          <a href={`mailto:${obfuscated}`} dangerouslySetInnerHTML={{ __html: obfuscated }}></a>
          <a href="//github.com/fillmember">github.com/fillmember</a>
        </p>
      </section>
      <div className="grid grid-cols-2 gap-8 mt-8">
        <section>
          <h2>Experience</h2>
          <h3>
            <span>Front-end tech lead</span>
            <span> @ </span>
            <span>Tinka</span>
          </h3>
          <p>
            <span>2019 ~ present</span>
            <span>Zwolle, NL</span>
            <span className={styles.text}>
              Working on streamlining the development and design process to unify the UI/UX offers and wrangle for clarity in Tinka's
              various products.
            </span>
          </p>
          <h3>
            <span>Front-end developer</span>
            <span> @ </span>
            <span>hyam Studios</span>
          </h3>
          <p>
            <span>2018 ~ 2019</span>
            <span>Berlin, DE</span>
            <span className={styles.text}>
              Consult clients and outline technical solutions, shaping the design studio's digitial offers.
            </span>
          </p>
          <h3>
            <span>Creative developer</span>
            <span> @ </span>
            <span>Artificial Rome</span>
          </h3>
          <p>
            <span>2016 ~ 2018</span>
            <span>Berlin, DE</span>
            <span className={styles.text}>explore while building epic landscape using edge-cutting technologies</span>
          </p>
        </section>
        <section>
          <h2>Skills</h2>
          <h3>Tech</h3>
          <ul className="grid grid-cols-2">
            <li>TypeScript</li>
            <li>React</li>
            <li>Vue</li>
            <li>Tailwind CSS</li>
            <li>Three</li>
            <li>react-fiber-three</li>
            <li>C#</li>
            <li>Unity</li>
            <li>GLSL</li>
            <li>API Design</li>
          </ul>
          <h3>Design</h3>
          <ul className="grid grid-cols-2">
            <li>Sketch</li>
            <li>User Experience</li>
            <li>User Interface</li>
            <li>Animation</li>
          </ul>
        </section>
        <section>
          <h2>Projects</h2>
          <h3>
            <span>Yee Dog</span> <a href="https://yee.dog">yee.dog</a>
          </h3>
          <p>
            <span className="col-span-2">Virtual dog companion available 24/7.</span>
          </p>
          <h3>
            <span>Dualai</span> <a href="https://dualai.com">dualai.com</a>
          </h3>
          <p>
            <span className="col-span-2">3D portfolio for TW-based design studio.</span>
          </p>
        </section>
        <section>
          <h2>Education</h2>
          <h3>Master of Animation</h3>
          <p>
            <span>2014 ~ 2015</span>
            <span>Avans Hogeschool</span>
          </p>
          <h3>Bachelor of Design</h3>
          <p>
            <span>2009 ~ 2013</span>
            <span>National Taiwan University of Science and Technology</span>
          </p>
        </section>
      </div>
    </main>
  );
}
