import styles from '../css/atomical.css';

import { render } from 'mustache';

import calendarTemplate from './templates/calendar.mustache';

console.log(styles);

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

export default function atomical(el) {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const daysInMonth = lastDay.getDate();
  const firstWeekday = firstDay.getDay();
  
  const placeholders = [];
  placeholders.length = firstWeekday;

  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  el.innerHTML = render(calendarTemplate, {
    classes: styles,
    month: months[now.getMonth()],
    year: now.getFullYear(),
    date: now,
    dayLabels,
    days,
    daysInMonth,
    placeholders
  });
}
