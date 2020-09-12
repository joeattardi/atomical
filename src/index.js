import styles from '../css/atomical.css';

import { createMainTemplate } from './templates';
import { createDay, createPlaceholder } from './util';

const SIZE_LARGE = 'large';
const SIZE_MEDIUM = 'medium';
const SIZE_SMALL = 'small';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const fullDayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const shortDayNames = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
];

const initialDayNames = [
  'S',
  'M',
  'T',
  'W',
  'T',
  'F',
  'S'
];

const mainTemplate = createMainTemplate(fullDayNames, shortDayNames, initialDayNames);

function isToday(date, month, year) {
  const today = new Date();
  return date === today.getDate() && month === today.getMonth() && year === today.getFullYear();
}

function getSizeClass(width) {
  if (width > 650) {
    return SIZE_LARGE;
  } else if (width > 400) {
    return SIZE_MEDIUM;
  }

  return SIZE_SMALL;
}

class Calendar extends HTMLElement {
  connectedCallback() {
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

    const beginPlaceholders = [];
    beginPlaceholders.length = firstWeekday;

    const endPlaceholders = [];
    endPlaceholders.length = fullDayNames.length - 1 - lastWeekday;

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        classes: isToday(i, month, year) ? 'day today' : 'day'
      });
    }

    const styleEl = document.createElement('style');
    styleEl.textContent = styles;

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(styleEl);
    shadow.appendChild(mainTemplate.content.cloneNode(true));

    this.calendarEl = shadow.querySelector('.calendar');

    this.monthEl = shadow.querySelector('.month');
    this.monthEl.textContent = months[month];

    this.yearEl = shadow.querySelector('.year');
    this.yearEl.textContent = year;

    this.gridEl = shadow.querySelector('.grid');

    for (let i = 0; i < firstWeekday; i++) {
      this.gridEl.appendChild(createPlaceholder());
    }

    for (let i = 1; i <= daysInMonth; i++) {
      this.gridEl.appendChild(createDay(i, isToday(i, month, year)));
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

  disconnectedCallback() {
    this.resizeObserver.disconnect();
  }
}

customElements.define('atomical-calendar', Calendar);
