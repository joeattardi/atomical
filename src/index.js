import styles from '../css/atomical.css';

import { render } from 'mustache';

import calendarTemplate from './templates/calendar.mustache';

console.log(styles);

export default function atomical(el) {
  el.innerHTML = render(calendarTemplate, { name: 'Joe', classes: styles });
}
