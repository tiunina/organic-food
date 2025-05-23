import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const burger = document.querySelector('.burger-btn');
const closeBtn = document.querySelector('.modal-close-btn');
const mobileMenu = document.querySelector('.modal-overley');

const orderModalBtn = document.querySelector('#mobile-order-btn');
const contactModal = document.querySelector('.contact-modal');
const contactCloseBtn = document.querySelector('.contact-close-btn');

const contactHeader = document.querySelector('.contact-btn');

burger.addEventListener('click', toggleMobileMenu);
closeBtn.addEventListener('click', toggleMobileMenu);

if (orderModalBtn) {
  orderModalBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    contactModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });
}

if (contactHeader) {
  contactHeader.addEventListener('click', () => {
    contactModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });
}

if (contactCloseBtn) {
  contactCloseBtn.addEventListener('click', () => {
    contactModal.classList.remove('is-open');
    document.body.style.overflow = '';
    // document.body.style.overflow = 'hidden';
    // mobileMenu.classList.add('is-open');
  });
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && contactModal.classList.contains('is-open')) {
    contactModal.classList.remove('is-open');
    document.body.style.overflow = '';
  }
});

function toggleMobileMenu() {
  const isOpen = mobileMenu.classList.toggle('is-open');

  if (isOpen) {
    document.body.style.overflow = 'hidden';
    // document.querySelector('.section_hero').style.display = 'none';
  } else {
    document.body.style.overflow = '';
    // document.querySelector('.section_hero').style.display = 'block';
  }
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
    toggleMobileMenu();
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const menuLinks = document.querySelectorAll('.menu-link');

  menuLinks.forEach(link => {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('is-open');
    });
  });
});

//CONTACT FORM
const contactForm = document.querySelector('#contact-form');

function handleContact(event) {
  event.preventDefault();

  const name = document.querySelector('#contact-form_name').value;
  const email = document.querySelector('#contact-form_email').value;

  if (!name || !email) {
    showToast('Please fill in all fields!', 'error');
    return;
  }

  console.log({ name, email });

  showToast('Form submitted successfully! 🎉', 'success');

  contactForm.reset();
}

function showToast(message, type) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: 'top',
    position: 'center',
    style: {
      background: type === 'success' ? '#28a745' : '#dc3545',
    },
    stopOnFocus: true,
  }).showToast();
}

contactForm.addEventListener('submit', handleContact);
