import ResizeObserver from 'resize-observer-polyfill';

import { Calendar } from './calendar';
import { months } from './strings';

window.ResizeObserver = ResizeObserver;

describe('Atomical Calendar', () => {
  test('should display the current month and year', () => {
    const calendar = new Calendar();
    document.body.appendChild(calendar);

    const today = new Date();
    expect(calendar.monthEl.textContent).toEqual(months[today.getMonth()]);
    expect(calendar.yearEl.textContent).toEqual(today.getFullYear().toString());
    expect(calendar.shadowRoot.innerHTML).toMatchSnapshot();
  });

  test('should display the specified month and year', () => {
    const calendar = new Calendar();
    calendar.setAttribute('month', 5);
    calendar.setAttribute('year', 2020);

    document.body.appendChild(calendar);

    expect(calendar.monthEl.textContent).toEqual(months[5]);
    expect(calendar.yearEl.textContent).toEqual('2020');
    expect(calendar.shadowRoot.innerHTML).toMatchSnapshot();
  });
});
