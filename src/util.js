const SIZE_LARGE = 'large';
const SIZE_MEDIUM = 'medium';
const SIZE_SMALL = 'small';

export function createPlaceholder() {
  const placeholder = document.createElement('div');
  placeholder.className = 'placeholder';

  return placeholder;
}

export function createDay(day, month, year) {
  const dayEl = document.createElement('div');
  
  dayEl.classList.add('day');
  if (isToday(day, month, year)) {
    dayEl.classList.add('today');
  }

  dayEl.innerHTML = `<div>${day}</div>`;

  return dayEl;
}

export function isToday(date, month, year) {
  const today = new Date();
  return date === today.getDate() && month === today.getMonth() && year === today.getFullYear();
}

export function getSizeClass(width) {
  if (width > 650) {
    return SIZE_LARGE;
  } else if (width > 400) {
    return SIZE_MEDIUM;
  }

  return SIZE_SMALL;
}