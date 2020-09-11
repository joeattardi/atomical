import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

import 'atomical';

import hero from '../images/hero.png';

import styles from './index.module.css';

export default function Home() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div>
      <div className={styles.hero}>
        <img src={hero} className={styles.heroImage} />
        <h2>JavaScript Calendar Component</h2>
        <div className={styles.badges}>
          <a href="https://npmjs.com/package/atomical"><img src="https://img.shields.io/npm/v/atomical" /></a>
          <a href="https://github.com/joeattardi/atomical"><img src="https://img.shields.io/github/stars/joeattardi/atomical?style=social" /></a>
        </div>
      </div>
      <div className={styles.header}>
        <code className={styles.installationCode}>npm install --save atomical</code>
      </div>

      <div className={styles.main}>
        <atomical-calendar class={styles.calendar}></atomical-calendar>
        <div className={styles.codeExample}>
          <h3>Basic usage</h3>
          <p>
            Just call the <code>atomical</code> function on a container element, and a calendar 
            of the current month will be rendered.
          </p>
          <pre>
            <code className="language-javascript">
              {`import atomical from 'atomical';

const container = document.querySelector('#calendar-container');
atomical(container);`}
            </code>
          </pre>
        </div>
      </div>

      <div className={styles.main}>
        <atomical-calendar class={styles.calendar} month="0" year="2021" id={styles.calendar2}></atomical-calendar>
        <div className={styles.codeExample}>
          <h3>Customize</h3>
          <p>
            There are several customization options available.
          </p>
          <pre>
            <code className="language-javascript">
              {`import atomical from 'atomical';

const container = document.querySelector('#calendar-container');
atomical(container, {
  month: 0,
  year: 2021,
  colors: {
    headerBackground: 'blue'
  }
});`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
