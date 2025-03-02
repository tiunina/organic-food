const burger = document.querySelector('.burger-btn');
const closeBtn = document.querySelector('.modal-close-btn');
const orderModalBtn = document.querySelector('#mobile-order-btn');
const mobileMenu = document.querySelector('.modal-overley');

burger.addEventListener('click', toggleMobileMenu);
closeBtn.addEventListener('click', toggleMobileMenu);
orderModalBtn.addEventListener('click', toggleMobileMenu);

function toggleMobileMenu() {
  const isOpen = mobileMenu.classList.toggle('is-open');

  if (isOpen) {
    document.body.style.overflow = 'hidden';
    document.querySelector('.section_hero').style.display = 'none'; // Hide hero section
  } else {
    document.body.style.overflow = '';
    document.querySelector('.section_hero').style.display = 'block'; // Show hero section again
  }
}

// Close mobile menu on "Escape" key press
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
    toggleMobileMenu();
  }
});
