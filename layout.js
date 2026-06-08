// ── Shared Layout — nav + footer for all pages ──

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
    </ul>
  `;
  document.body.prepend(nav);
}

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
  injectNav();
  injectFooter();
});
