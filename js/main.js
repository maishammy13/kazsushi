document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- Mobile nav ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  const closeMobileNav = () => {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-link, .mobile-cta').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  /* ---------- Active nav link on scroll ---------- */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = Array.from(navLinks)
    .map(link => link.getAttribute('href'))
    .filter(href => href && href.startsWith('#'))
    .map(href => document.querySelector(href))
    .filter(Boolean);

  const setActiveLink = () => {
    if (!sections.length) return;
    let currentId = sections[0].id;
    const scrollPos = window.scrollY + window.innerHeight * 0.35;
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos) currentId = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };
  window.addEventListener('scroll', setActiveLink);
  setActiveLink();

  /* ---------- Logo kanji spin on click ---------- */
  const logoMark = document.getElementById('logoMark');
  if (logoMark) {
    logoMark.addEventListener('click', () => {
      const kanji = logoMark.querySelector('.logo-kanji');
      kanji.style.transition = 'transform 0.6s cubic-bezier(0.65,0,0.35,1)';
      kanji.style.transform = 'rotate(360deg)';
      setTimeout(() => { kanji.style.transform = ''; }, 650);
    });
  }

  /* ---------- Menu tabs ---------- */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.category;
      menuCards.forEach(card => {
        card.style.display = card.dataset.category === category ? '' : 'none';
      });
    });
  });

  /* ---------- Review carousel (mobile swipe dots) ---------- */
  const reviewTrack = document.getElementById('reviewTrack');
  const reviewDots = document.getElementById('reviewDots');
  const reviewCards = reviewTrack ? Array.from(reviewTrack.children) : [];

  const initReviewDots = () => {
    if (!reviewDots) return;
    reviewDots.innerHTML = '';
    reviewCards.forEach((_, i) => {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        reviewCards[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
      reviewDots.appendChild(dot);
    });
  };

  const updateCarouselMode = () => {
    if (!reviewTrack) return;
    if (window.innerWidth <= 992) {
      reviewTrack.style.display = 'flex';
      reviewTrack.style.overflowX = 'auto';
      reviewTrack.style.scrollSnapType = 'x mandatory';
      reviewCards.forEach(card => {
        card.style.minWidth = '85%';
        card.style.scrollSnapAlign = 'center';
      });
      reviewDots.style.display = 'flex';
    } else {
      reviewTrack.style.display = 'grid';
      reviewTrack.style.overflowX = 'visible';
      reviewCards.forEach(card => { card.style.minWidth = ''; });
      reviewDots.style.display = 'none';
    }
  };

  if (reviewTrack) {
    initReviewDots();
    updateCarouselMode();
    window.addEventListener('resize', updateCarouselMode);

    reviewTrack.addEventListener('scroll', () => {
      const dots = reviewDots.children;
      let closestIndex = 0;
      let closestDist = Infinity;
      reviewCards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft - reviewTrack.scrollLeft);
        if (dist < closestDist) { closestDist = dist; closestIndex = i; }
      });
      Array.from(dots).forEach((d, i) => d.classList.toggle('active', i === closestIndex));
    });
  }

  /* ---------- Reservation form ---------- */
  const reservationForm = document.getElementById('reservationForm');
  const formNote = document.getElementById('formNote');

  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('resName').value.trim();
      formNote.textContent = `Thank you, ${name || 'guest'}! Your reservation request has been received. We'll confirm shortly by phone.`;
      reservationForm.reset();
    });
  }

});
