export function createPlaceholder() {
  const placeholder = document.createElement('div');
  placeholder.className = 'placeholder';

  return placeholder;
}

export function createDay(day, isToday) {
  const dayEl = document.createElement('div');
  
  dayEl.classList.add('day');
  if (isToday) {
    dayEl.classList.add('today');
  }

  dayEl.innerHTML = `<div>${day}</div>`;

  return dayEl;
}