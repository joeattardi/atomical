import styles from '../css/atomical.css';

import Mustache from 'mustache';

import calendarTemplate from './templates/calendar.mustache';

import previousIcon from '../icons/chevron-left.svg';
import nextIcon from '../icons/chevron-right.svg';

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

const colorVariables = {
  headerBackground: '--header-background',
  headerColor: '--header-color',
  todayBackground: '--today-background',
  placeholderBackground: '--placeholder-background',
  dayBorderColor: '--day-border-color',
  calendarBackground: '--calendar-background'
};

const defaultOptions = {
  i18n: {
    months,
    fullDayNames,
    shortDayNames,
    initialDayNames
  }
};

function getSizeClass(width) {
  if (width > 650) {
    return styles[SIZE_LARGE];
  } else if (width > 400) {
    return styles[SIZE_MEDIUM];
  }

  return styles[SIZE_SMALL];
}

export default function atomical(el, options = {}) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }

  const calendarEl = document.createElement('div');
  calendarEl.className = styles.calendar;

  if (options.colors) {
    applyColors(calendarEl, options.colors);
  }

  el.appendChild(calendarEl);

  render(calendarEl, { ...defaultOptions, ...options });

  const resizeObserver = new ResizeObserver(entries => {
    const container = entries.find(entry => entry.target === el);
    const { width } = container.contentRect;
    const calendarEl = el.querySelector(`.${styles.calendar}`);
    calendarEl.className = `${styles.calendar} ${getSizeClass(width)}`;
  });

  resizeObserver.observe(el);
}

function render(calendarEl, options) {
  const now = new Date();
  const month = typeof options.month === 'undefined' ? now.getMonth() : options.month;
  const year = options.year || now.getFullYear();

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
      classes: isToday(i, month, year) ? `${styles.day} ${styles.today}` : styles.day
    });
  }

  calendarEl.innerHTML = Mustache.render(calendarTemplate, {
    classes: styles,
    month: options.i18n.months[month],
    year,
    fullDayNames: options.i18n.fullDayNames,
    shortDayNames: options.i18n.shortDayNames,
    initialDayNames: options.i18n.initialDayNames,
    days,
    daysInMonth,
    beginPlaceholders,
    endPlaceholders,
    icons: {
      previous: previousIcon,
      next: nextIcon
    }
  });
}

function isToday(date, month, year) {
  const today = new Date();
  return date === today.getDate() && month === today.getMonth() && year === today.getFullYear();
}

function applyColors(calendarEl, colors) {
  Object.keys(colors).forEach(color => {
    calendarEl.style.setProperty(colorVariables[color], colors[color]);
  });
}
