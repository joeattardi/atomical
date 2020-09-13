const SIZE_LARGE = 'large';
const SIZE_MEDIUM = 'medium';
const SIZE_SMALL = 'small';

export function createPlaceholder(row, column) {
  const placeholder = document.createElement('div');
  placeholder.className = 'placeholder';

  placeholder.style.gridRow = row.toString();
  placeholder.style.gridColumn = column.toString();

  return placeholder;
}

export function createDay(day, month, year, row, column) {
  const dayEl = document.createElement('div');

  dayEl.classList.add('day');
  if (isToday(day, month, year)) {
    dayEl.classList.add('today');
  }

  dayEl.innerHTML = `<div>${day}</div>`;
  dayEl.dataset.date = `${year}-${zeroPad(month + 1, 2)}-${zeroPad(day, 2)}`;

  dayEl.style.gridRow = row.toString();
  dayEl.style.gridColumn = column.toString();

  return dayEl;
}

export function createEvent(event, index, row, column) {
  const startTime = event.start.getHours();
  const startTimeString =
    startTime > 12 ? `${startTime - 12}p` : `${startTime}a`;

  const eventEl = document.createElement('div');
  eventEl.className = 'event';
  eventEl.innerHTML = `
    <div class="dot"></div>
    <div class="time">${startTimeString}</div>
    <div class="name">${event.name}</div>
  `;

  eventEl.style.gridRow = row.toString();
  eventEl.style.gridColumn = column.toString();

  const topOffset = 2 + index * 1.5;
  eventEl.style.top = `${topOffset}rem`;

  return eventEl;
}
export function isToday(date, month, year) {
  const today = new Date();
  return (
    date === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear()
  );
}

export function getSizeClass(width) {
  if (width > 650) {
    return SIZE_LARGE;
  } else if (width > 400) {
    return SIZE_MEDIUM;
  }

  return SIZE_SMALL;
}

export function zeroPad(value, minLength) {
  let result = value.toString();

  if (result.length < minLength) {
    const diff = minLength - result.length;
    for (let i = 0; i < diff; i++) {
      result = '0' + result;
    }
  }

  return result;
}

export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function increment(row, column) {
  let resultColumn = column + 1;
  let resultRow = row;

  if (resultColumn > 7) {
    resultRow++;
    resultColumn = 1;
  }

  return [resultRow, resultColumn];
}

export function getDateFormat(date) {
  return `${date.getFullYear()}-${zeroPad(date.getMonth() + 1, 2)}-${zeroPad(
    date.getDate(),
    2
  )}`;
}
