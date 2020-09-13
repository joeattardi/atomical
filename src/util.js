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
