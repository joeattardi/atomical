import React, { useEffect } from 'react';
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
        <h2>Vanilla JavaScript Calendar Component</h2>
        <div className={styles.badges}>
          <a href="https://npmjs.com/package/atomical"><img src="https://img.shields.io/npm/v/atomical" /></a>
          <a href="https://github.com/joeattardi/atomical"><img src="https://img.shields.io/github/stars/joeattardi/atomical?style=social" /></a>
        </div>
      </div>
      <div className={styles.header}>
        <code className={styles.installationCode}>npm install atomical</code>
      </div>

      <div className={styles.main}>
        <atomical-calendar class={styles.calendar}></atomical-calendar>
        <div className={styles.codeExample}>
          <h3>Basic usage</h3>
          <p>
            Import the <code>atomical</code> module somewhere in your site or app, then you can create calendars in your HTML markup by using the <code>&lt;atomical-calendar&gt;</code> custom element.
          </p>
          <pre>
            <code className="language-html">
              {`<atomical-calendar></atomical-calendar>`}
            </code>
          </pre>
        </div>
      </div>

      <div className={styles.main}>
        <atomical-calendar class={styles.calendar} month="0" year="2021" id={styles.calendar2}></atomical-calendar>
        <div className={styles.codeExample}>
          <h3>Customize</h3>
          <p>
            You can customize the month shown with attributes, as well as override colors by defining CSS variables.
          </p>
          <pre>
            <code className="language-html">
              {`<style>
  atomical-calendar {
    --header-background: blue;
  }
</style>

<atomical-calendar month="0" year="2021"></atomical-calendar>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
