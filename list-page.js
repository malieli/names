// ── Shared List Page Logic ──
// Each page sets window.LIST_CONFIG before this script runs:
// window.LIST_CONFIG = { gender: 'boy'|'girl'|'unisex', title: '...', emoji: '...' }

let allNames = [];      // כל השמות לפי מגדר (המאגר המלא — לחיפוש)
let randomHundred = []; // 100 רנדומליים — ברירת מחדל בלי חיפוש
let activeFilter = 'all';

function hasAHVY(name) { return /[אהוי]/.test(name); }

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

window.addEventListener('DOMContentLoaded', () => {
  const cfg = window.LIST_CONFIG;

  // Set page title
  const titleEl = document.getElementById('pageTitle');
  if (titleEl) titleEl.textContent = cfg.emoji + ' ' + cfg.title;

  // Load full pool by gender
  if (typeof namesData === 'undefined') { console.error('namesData not loaded'); return; }
  if (cfg.gender === 'unisex') {
    allNames = namesData.filter(n => n.unisex);
  } else {
    allNames = namesData.filter(n => n.gender === cfg.gender);
  }

  // Sort A-Z (full list for search)
  allNames.sort((a, b) => a.name.localeCompare(b.name, 'he'));

  // Pick 100 random for default display, sorted A-Z
  randomHundred = shuffle(allNames).slice(0, 100);
  randomHundred.sort((a, b) => a.name.localeCompare(b.name, 'he'));

  renderList();
});

function setFilter(btn) {
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  activeFilter = btn.dataset.filter;
  renderList();
}

function renderList() {
  const q = (document.getElementById('searchInput').value || '').trim();

  // Without search — show the 100 random names; with search — search entire pool
  let list = q ? [...allNames] : [...randomHundred];

  // Apply text search over full list
  if (q) list = list.filter(n =>
    n.name.includes(q) || (n.meaning && n.meaning.includes(q)) ||
    (n.transliteration && n.transliteration.toLowerCase().includes(q.toLowerCase()))
  );

  // Apply chip filter
  if      (activeFilter === 'unisex')        list = list.filter(n => n.unisex);
  else if (activeFilter === 'sources')       list = list.filter(n => n.sources);
  else if (activeFilter === 'international') list = list.filter(n => n.international);
  else if (activeFilter === 'nature')        list = list.filter(n => n.nature);

  const total = list.length;

  // Show up to 100
  const display = list.slice(0, 100);

  document.getElementById('listCount').textContent =
    q && total > 100 ? `מציג 100 מתוך ${total} שמות` : `${total} שמות`;

  const grid = document.getElementById('namesGrid');
  if (display.length === 0) {
    grid.innerHTML = '<div class="no-results">לא נמצאו שמות</div>';
    return;
  }

  grid.innerHTML = display.map(n => {
    const badges = [];
    if (n.unisex)        badges.push(`<span class="badge badge-unisex">יוניסקס</span>`);
    if (n.sources)       badges.push(`<span class="badge badge-sources">מקורות</span>`);
    if (n.international) badges.push(`<span class="badge badge-intl">מוכר בחו"ל</span>`);
    if (hasAHVY(n.name)) badges.push(`<span class="badge badge-ahvy">אהו"י</span>`);
    if (n.nature)        badges.push(`<span class="badge badge-nature">טבע</span>`);
    return `
      <div class="name-tile">
        <div class="tile-name">${n.name}</div>
        ${n.transliteration ? `<div class="tile-translit">${n.transliteration}</div>` : ''}
        ${n.short_text      ? `<div class="tile-short-text">${n.short_text}</div>` : ''}
        <div class="tile-attrs">
          ${n.meaning ? `<div class="tile-attr"><strong>משמעות:</strong> ${n.meaning}</div>` : ''}
          ${n.famous  ? `<div class="tile-attr"><strong>מפורסמים:</strong> ${n.famous}</div>` : ''}
        </div>
        <div class="tile-badges">${badges.join('')}</div>
      </div>`;
  }).join('');
}
