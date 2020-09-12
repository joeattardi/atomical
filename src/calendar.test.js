import ResizeObserver from 'resize-observer-polyfill';

import { Calendar } from './calendar';
import { months } from './strings';
import { zeroPad } from './util';

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

  test('should render one day for each day of the month', () => {
    const calendar = new Calendar();
    document.body.appendChild(calendar);

    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const dayEls = calendar.shadowRoot.querySelectorAll('.day');
    expect(dayEls).toHaveLength(lastDay.getDate());

    const month = today.getMonth();
    const year = today.getFullYear();
    for (let i = 0; i < dayEls.length; i++) {
      expect(dayEls[i].dataset.date).toEqual(
        `${year}-${zeroPad(month + 1, 2)}-${zeroPad(i + 1, 2)}`
      );
    }
  });

  test('should highlight the current day', () => {
    const calendar = new Calendar();
    document.body.appendChild(calendar);

    const today = new Date();
    const todayDateString = `${today.getFullYear()}-${zeroPad(
      today.getMonth() + 1,
      2
    )}-${zeroPad(today.getDate(), 2)}`;

    const todayEl = calendar.shadowRoot.querySelector('.day.today');
    expect(todayEl).toBeDefined();
    expect(todayEl.dataset.date).toEqual(todayDateString);
  });

  test('should re-render when the month or year is changed', () => {
    const calendar = new Calendar();
    calendar.setAttribute('month', 5);
    calendar.setAttribute('year', 1981);
    document.body.appendChild(calendar);

    expect(calendar.monthEl.textContent).toEqual(months[5]);
    expect(calendar.yearEl.textContent).toEqual('1981');

    calendar.setAttribute('month', 9);
    calendar.setAttribute('year', 1980);

    expect(calendar.monthEl.textContent).toEqual(months[9]);
    expect(calendar.yearEl.textContent).toEqual('1980');
  });
});
