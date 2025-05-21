// carousel.js
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  const nextBtn = document.querySelector('.carousel-btn.right');
  const prevBtn = document.querySelector('.carousel-btn.left');

  nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: 300, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -300, behavior: 'smooth' });
  });
});
