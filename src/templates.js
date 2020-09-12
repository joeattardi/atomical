export function createMainTemplate(fullDays, shortDays, initialDays) {
  const markup = `
    <div class="calendar large">
      <div class="header">
        <h2><span class="month"></span> <span class="year"></span></h2>
      </div>
      <div class="days daysLarge">${createDays(fullDays)}</div>
      <div class="days daysMedium">${createDays(shortDays)}</div>
      <div class="days daysSmall">${createDays(initialDays)}</div>
      <div class="grid"></div>
    </div>
  `;

  const template = document.createElement('template');
  template.innerHTML = markup;
  return template;
}

function createDays(days) {
  return days.map(day => `<div class="dayHeader">${day}</div>`).join('');
}
