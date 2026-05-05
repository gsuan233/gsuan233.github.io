// ── 類別名稱對照 ──────────────────────────────────────
const categoryLabels = {
  pixel:      '偽像素 Q 頭',
  lightcolor: '淡彩半身塗鴉',
  composite:  '組合頁',
  cover:      '包兩天',
  halfbody:   '正比半身',
  fullbody:   '正比全身',
  vertical:   '立繪',
  polaroid:   '拍立得',
  chibi:      'Q插',
  watercolor: '水彩'
};

// ── 內嵌作品瀏覽 ──────────────────────────────────────
const inlineGallery  = document.getElementById('inlineGallery');
const galleryTitle   = document.getElementById('inlineGalleryTitle');
const galleryTrack   = document.getElementById('inlineGalleryTrack');
const galleryClose   = inlineGallery.querySelector('.inline-gallery__close');
const galleryBackdrop = document.getElementById('galleryBackdrop');
const allCards       = Array.from(galleryTrack.querySelectorAll('.gallery-card'));
const browseButtons  = document.querySelectorAll('.price-card__browse');
const priceCards     = document.querySelectorAll('.price-card');

let activeCategory = null;

function isMobile() {
  return window.matchMedia('(max-width: 600px)').matches;
}

function showCategory(category) {
  // 切換類別篩選
  allCards.forEach(card => {
    card.hidden = card.dataset.category !== category;
  });

  galleryTitle.textContent = categoryLabels[category] || category;
  inlineGallery.classList.add('is-open');
  galleryBackdrop.classList.add('is-open');

  // 高亮對應的價目卡
  priceCards.forEach(pc => pc.classList.toggle('is-active', pc.dataset.category === category));

  activeCategory = category;

  if (isMobile()) {
    // 底部面板模式：鎖住背景捲動
    document.body.style.overflow = 'hidden';
  } else {
    // 桌面模式：捲動到作品區
    inlineGallery.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function closeGallery() {
  inlineGallery.classList.remove('is-open');
  galleryBackdrop.classList.remove('is-open');
  priceCards.forEach(pc => pc.classList.remove('is-active'));
  activeCategory = null;
  document.body.style.overflow = '';
}

browseButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const cat = btn.dataset.category;
    if (activeCategory === cat) {
      closeGallery();
    } else {
      showCategory(cat);
    }
  });
});

galleryClose.addEventListener('click', closeGallery);
galleryBackdrop.addEventListener('click', closeGallery);

// ── Lightbox ──────────────────────────────────────────
const lightbox    = document.getElementById('lightbox');
const backdrop    = document.getElementById('lightboxBackdrop');
const lbImg       = lightbox.querySelector('.lightbox__img');
const lbCaption   = lightbox.querySelector('.lightbox__caption');
const btnClose    = lightbox.querySelector('.lightbox__close');
const btnPrev     = lightbox.querySelector('.lightbox__prev');
const btnNext     = lightbox.querySelector('.lightbox__next');

let visibleCards = [];
let current = 0;

function getVisibleCards() {
  return allCards.filter(c => !c.hidden);
}

function openLightbox(card) {
  visibleCards = getVisibleCards();
  current = visibleCards.indexOf(card);
  if (current === -1) current = 0;
  showSlide();
  lightbox.classList.add('is-open');
  backdrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  btnClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  backdrop.classList.remove('is-open');
  document.body.style.overflow = '';
  if (visibleCards[current]) visibleCards[current].focus();
}

function showSlide() {
  const card = visibleCards[current];
  if (!card) return;
  lbImg.src = card.dataset.src;
  lbImg.alt = card.dataset.title;
  lbCaption.textContent = card.dataset.title;
}

function prevSlide() {
  current = (current - 1 + visibleCards.length) % visibleCards.length;
  showSlide();
}

function nextSlide() {
  current = (current + 1) % visibleCards.length;
  showSlide();
}

// 綁定卡片點擊 → 開啟 Lightbox
allCards.forEach(card => {
  card.setAttribute('tabindex', '0');
  card.addEventListener('click', () => openLightbox(card));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(card); }
  });
});

btnClose.addEventListener('click', closeLightbox);
backdrop.addEventListener('click', closeLightbox);
btnPrev.addEventListener('click', prevSlide);
btnNext.addEventListener('click', nextSlide);

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('is-open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   prevSlide();
  if (e.key === 'ArrowRight')  nextSlide();
});

// ── 手機滑動手勢（Lightbox） ──────────────────────────
let touchStartX = 0;
lightbox.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) dx > 0 ? prevSlide() : nextSlide();
});

// ── 注意事項收合 ─────────────────────────────────────
const noticeToggle = document.querySelector('.notice__toggle');
const noticeBody   = document.getElementById('noticeBody');

noticeToggle.addEventListener('click', () => {
  const expanded = noticeToggle.getAttribute('aria-expanded') === 'true';
  noticeToggle.setAttribute('aria-expanded', String(!expanded));
  noticeBody.hidden = expanded;
});

// ── 漢堡選單 ─────────────────────────────────────────
const nav    = document.querySelector('.nav');
const burger = document.querySelector('.nav__burger');

burger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('nav--open');
  burger.setAttribute('aria-expanded', String(isOpen));
});

// 點外側關閉
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target)) {
    nav.classList.remove('nav--open');
    burger.setAttribute('aria-expanded', 'false');
  }
});

// ── 星空背景 ─────────────────────────────────────────
(function initStarfield() {
  const container = document.getElementById('starfield');
  if (!container) return;
  const COUNT = 120;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < COUNT; i++) {
    const star = document.createElement('span');
    star.className = 'starfield__star';
    const size = Math.random() * 3 + 1;          // 1–4 px
    star.style.width  = size + 'px';
    star.style.height = size + 'px';
    star.style.left   = Math.random() * 100 + '%';
    star.style.top    = Math.random() * 100 + '%';
    // 隨機顏色：基於主色調的變化
    const hue = 170 + Math.random() * 20 - 10; // 160-180 (藍綠色系)
    const saturation = 70 + Math.random() * 20; // 70-90%
    const lightness = 50 + Math.random() * 20; // 50-70%
    star.style.background = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    star.style.setProperty('--dur',   (Math.random() * 6 + 4) + 's');   // 4–10 s
    star.style.setProperty('--delay', (Math.random() * 8) + 's');       // 0–8 s
    frag.appendChild(star);
  }
  container.appendChild(frag);
})();
