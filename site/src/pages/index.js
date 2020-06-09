import React, { useEffect, useRef } from 'react';

import atomical from 'atomical';

import hero from '../images/hero.png';

import styles from './index.module.css';

export default function Home() {
  const calendarRef = useRef();

  useEffect(() => {
    if (calendarRef.current) {
      atomical(calendarRef.current);
    }
  }, [calendarRef])

  return (
    <div>
      <div className={styles.hero}>
        <img src={hero} />
        <h2>JavaScript Calendar Component</h2>
      </div>
      <div className={styles.main}>
        <div ref={calendarRef} className={styles.calendar} id="calendar"></div>
        <div className={styles.codeExample}>
          code
        </div>
      </div>
    </div>
  );
}
