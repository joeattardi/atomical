import styles from '../css/atomical.css';

import Mustache from 'mustache';

import calendarTemplate from './templates/calendar.mustache';

import previousIcon from '../icons/chevron-left.svg';
import nextIcon from '../icons/chevron-right.svg';

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

const dayLabels = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

export default function atomical(el, month, year) {
  const now = new Date();
  month = month || now.getMonth();
  year = year || now.getFullYear();

  render(el, month, year);
}

function render(el, month, year) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const firstWeekday = firstDay.getDay();
  const lastWeekday = lastDay.getDay();

  const beginPlaceholders = [];
  beginPlaceholders.length = firstWeekday;

  const endPlaceholders = [];
  endPlaceholders.length = dayLabels.length - 1 - lastWeekday;

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
    dayLabels,
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