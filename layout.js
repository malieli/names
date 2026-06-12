// ── Shared Layout — nav + footer + accessibility bar for all pages ──

// ── Accessibility ──
const A11Y_KEY = 'a11y_prefs';
const A11Y_DEF = { fontSize: 0, contrast: false, grayscale: false, underline: false };
let a11yState   = JSON.parse(localStorage.getItem(A11Y_KEY) || 'null') || { ...A11Y_DEF };

function applyA11y() {
  const html = document.documentElement;
  html.style.fontSize = a11yState.fontSize === 0 ? '' : (100 + a11yState.fontSize * 10) + '%';
  html.classList.toggle('a11y-contrast',  a11yState.contrast);
  html.classList.toggle('a11y-grayscale', a11yState.grayscale);
  html.classList.toggle('a11y-underline', a11yState.underline);
  localStorage.setItem(A11Y_KEY, JSON.stringify(a11yState));

  // update button active states
  const bar = document.getElementById('a11yBar');
  if (!bar) return;
  bar.querySelector('[data-a11y="contrast"]') .classList.toggle('active', a11yState.contrast);
  bar.querySelector('[data-a11y="grayscale"]').classList.toggle('active', a11yState.grayscale);
  bar.querySelector('[data-a11y="underline"]').classList.toggle('active', a11yState.underline);
}

function a11y(action) {
  switch (action) {
    case 'font-up':   a11yState.fontSize = Math.min(a11yState.fontSize + 1, 3);  break;
    case 'font-down': a11yState.fontSize = Math.max(a11yState.fontSize - 1, -1); break;
    case 'contrast':  a11yState.contrast  = !a11yState.contrast;  break;
    case 'grayscale': a11yState.grayscale = !a11yState.grayscale; break;
    case 'underline': a11yState.underline = !a11yState.underline; break;
    case 'reset':     a11yState = { ...A11Y_DEF }; break;
    case 'close':     document.getElementById('a11yBar').classList.remove('a11y-open'); return;
  }
  applyA11y();
}

function toggleA11yBar() {
  const bar = document.getElementById('a11yBar');
  bar.classList.toggle('a11y-open');
}

function injectA11yBar() {
  const bar = document.createElement('div');
  bar.id = 'a11yBar';
  bar.className = 'a11y-bar';
  bar.setAttribute('role', 'toolbar');
  bar.setAttribute('aria-label', 'סרגל נגישות');
  bar.innerHTML = `
    <span class="a11y-label">נגישות</span>
    <button onclick="a11y('font-up')"   title="הגדל טקסט"       aria-label="הגדל טקסט">A+</button>
    <button onclick="a11y('font-down')" title="הקטן טקסט"       aria-label="הקטן טקסט">A−</button>
    <button onclick="a11y('contrast')"  title="ניגודיות גבוהה"  aria-label="ניגודיות גבוהה"  data-a11y="contrast">◑</button>
    <button onclick="a11y('grayscale')" title="גווני אפור"       aria-label="גווני אפור"       data-a11y="grayscale">◐</button>
    <button onclick="a11y('underline')" title="הדגש קישורים"    aria-label="הדגש קישורים"    data-a11y="underline"><u>A</u></button>
    <button onclick="a11y('close')"     title="סגור"             aria-label="סגור סרגל נגישות" class="a11y-reset">✕</button>
  `;
  document.body.prepend(bar);
  applyA11y();
}

// ── Nav ──
function injectNav() {
  const nav = document.createElement('nav');
  nav.innerHTML = `
    <a class="nav-logo" href="index.html">מוצאים שם ✨</a>
    <button class="hamburger" id="hamburger" onclick="toggleMenu()" aria-label="תפריט">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-links" id="navLinks">
      <li><a href="index.html" onclick="closeMenu()">דף הבית</a></li>
      <li><span class="nav-sep">|</span></li>
      <li><a href="boys.html" onclick="closeMenu()">שמות לבנים</a></li>
      <li><span class="nav-sep">|</span></li>
      <li><a href="girls.html" onclick="closeMenu()">שמות לבנות</a></li>
      <li><span class="nav-sep">|</span></li>
      <li><a href="unisex.html" onclick="closeMenu()">יוניסקס</a></li>
      <li><span class="nav-sep">|</span></li>
      <li><a href="index.html#form-section" onclick="closeMenu()">שם בהפתעה</a></li>
      <li><span class="nav-sep">|</span></li>
      <li><a href="mailto:mali.aroesti@gmail.com" class="nav-cta" onclick="closeMenu()">צור קשר</a></li>
      <li><span class="nav-sep">|</span></li>
      <li><button class="a11y-toggle" onclick="toggleA11yBar()" aria-label="פתח סרגל נגישות" title="נגישות">♿</button></li>
    </ul>
  `;
  document.body.prepend(nav);
}

// ── Footer ──
function injectFooter() {
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <div class="footer-links">
      <a href="index.html">דף הבית</a>
      <a href="boys.html">שמות לבנים</a>
      <a href="girls.html">שמות לבנות</a>
      <a href="index.html#form-section">שם בהפתעה</a>
      <a href="mailto:mali.aroesti@gmail.com">צור קשר</a>
    </div>
    <div>מוצאים שם · 2026</div>
  `;
  document.body.appendChild(footer);
}

function toggleMenu() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('navLinks').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('navLinks').classList.remove('open');
}

// Auto-inject on load
document.addEventListener('DOMContentLoaded', () => {
  injectA11yBar();
  injectNav();
  injectFooter();
});
