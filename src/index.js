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

const dayNames = {
  [SIZE_LARGE]: fullDayNames,
  [SIZE_MEDIUM]: shortDayNames,
  [SIZE_SMALL]: initialDayNames
};

const defaultOptions = {
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
  const actualOptions = { ...defaultOptions, ...options };

  const now = new Date();
  const month = actualOptions.month || now.getMonth();
  const year = actualOptions.year || now.getFullYear();

  render(el, month, year, actualOptions.size);

  const resizeObserver = new ResizeObserver(entries => {
    const container = entries.find(entry => entry.target === el);
    const { width } = container.contentRect;
    const calendarEl = el.querySelector(`.${styles.calendar}`);
    calendarEl.className = `${styles.calendar} ${getSizeClass(width)}`;
  });

  resizeObserver.observe(el);
}

function render(el, month, year, size) {
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

  el.innerHTML = Mustache.render(calendarTemplate, {
    classes: styles,
    month: months[month],
    year,
    dayNames: dayNames[size],
    fullDayNames,
    shortDayNames,
    initialDayNames,
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