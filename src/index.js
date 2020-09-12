import styles from '../css/atomical.css';

import { months, fullDayNames, shortDayNames, initialDayNames } from './strings';
import { createMainTemplate } from './templates';
import { getSizeClass, createDay, createPlaceholder } from './util';

const mainTemplate = createMainTemplate(fullDayNames, shortDayNames, initialDayNames);

class Calendar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const monthAttr = this.getAttribute('month');
    const yearAttr = this.getAttribute('year');
    
    const now = new Date();
    const month = monthAttr !== null ? parseInt(monthAttr, 10) : now.getMonth();
    const year = yearAttr !== null ? parseInt(yearAttr, 10) : now.getFullYear();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const firstWeekday = firstDay.getDay();
    const lastWeekday = lastDay.getDay();

    const styleEl = document.createElement('style');
    styleEl.textContent = styles;

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(styleEl);
    shadow.appendChild(mainTemplate.content.cloneNode(true));

    this.findElements();

    this.monthEl.textContent = months[month];
    this.yearEl.textContent = year;

    for (let i = 0; i < firstWeekday; i++) {
      this.gridEl.appendChild(createPlaceholder());
    }

    for (let i = 1; i <= daysInMonth; i++) {
      this.gridEl.appendChild(createDay(i, month, year));
    }

    for (let i = 0; i < fullDayNames.length - 1 - lastWeekday; i++) {
      this.gridEl.appendChild(createPlaceholder());
    }

    this.resizeObserver = new ResizeObserver(entries => {
      const container = entries.find(entry => entry.target === this.calendarEl);
      const { width } = container.contentRect;
      this.calendarEl.className = `calendar ${getSizeClass(width)}`;
    });
    this.resizeObserver.observe(this.calendarEl);
  }

  findElements() {
    this.calendarEl = this.shadowRoot.querySelector('.calendar');
    this.monthEl = this.shadowRoot.querySelector('.month');
    this.yearEl = this.shadowRoot.querySelector('.year');
    this.gridEl = this.shadowRoot.querySelector('.grid');
  }

  disconnectedCallback() {
    this.resizeObserver.disconnect();
  }
}

customElements.define('atomical-calendar', Calendar);
