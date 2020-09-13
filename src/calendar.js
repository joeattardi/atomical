import styles from '../css/atomical.css';

import {
  months,
  fullDayNames,
  shortDayNames,
  initialDayNames
} from './strings';
import { createMainTemplate } from './templates';
import {
  empty,
  getSizeClass,
  getDateFormat,
  createDay,
  createEvent,
  createPlaceholder,
  increment
} from './util';

const mainTemplate = createMainTemplate(
  fullDayNames,
  shortDayNames,
  initialDayNames
);

export class Calendar extends HTMLElement {
  constructor() {
    super();
    this.eventDays = {};
  }

  connectedCallback() {
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(styleEl);
    shadow.appendChild(mainTemplate.content.cloneNode(true));

    this.findElements();
    this.render();

    this.resizeObserver = new ResizeObserver(entries => {
      const container = entries.find(entry => entry.target === this.calendarEl);
      const { width } = container.contentRect;
      this.calendarEl.className = `calendar ${getSizeClass(width)}`;
    });
    this.resizeObserver.observe(this.calendarEl);
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

    const leadingPlaceholderCount = firstWeekday;
    const trailingPlaceholderCount = fullDayNames.length - 1 - lastWeekday;

    this.monthEl.textContent = months[month];
    this.yearEl.textContent = year;

    empty(this.gridEl);

    let row = 1;
    let column = 1;

    for (let i = 0; i < leadingPlaceholderCount; i++) {
      this.gridEl.appendChild(createPlaceholder(row, column));
      [row, column] = increment(row, column);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      this.gridEl.appendChild(createDay(i, month, year, row, column));

      const dateFormat = getDateFormat(new Date(year, month, i));
      const eventsInDay = this.eventDays[dateFormat];

      if (eventsInDay && eventsInDay.length) {
        eventsInDay.forEach((event, i) => {
          this.gridEl.appendChild(createEvent(event, i, row, column));
        });
      }

      [row, column] = increment(row, column);
    }

    for (let i = 0; i < trailingPlaceholderCount; i++) {
      this.gridEl.appendChild(createPlaceholder(row, column));
      [row, column] = increment(row, column);
    }

    this.isRendered = true;
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

  attributeChangedCallback() {
    if (this.isRendered) {
      this.render();
    }
  }

  addEvent(event) {
    const dateFormat = getDateFormat(event.start);
    if (!this.eventDays[dateFormat]) {
      this.eventDays[dateFormat] = [];
    }

    this.eventDays[dateFormat].push(event);

    this.render();
  }

  static get observedAttributes() {
    return ['month', 'year'];
  }
}

customElements.define('atomical-calendar', Calendar);
