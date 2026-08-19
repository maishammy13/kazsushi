document.addEventListener('DOMContentLoaded', () => {

  const catLinks = document.querySelectorAll('.cat-link');
  const menuSections = Array.from(catLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setActiveCategory = () => {
    let currentId = menuSections[0] ? menuSections[0].id : '';
    const scrollPos = window.scrollY + 140;
    menuSections.forEach(sec => {
      if (sec.offsetTop <= scrollPos) currentId = sec.id;
    });
    catLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };

  window.addEventListener('scroll', setActiveCategory);
  setActiveCategory();

});
