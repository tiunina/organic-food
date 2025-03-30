import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const formSubscribe = document.querySelector('#subscribe-form_footer');

function handleSubscribe(event) {
  event.preventDefault();

  const email = document.querySelector('#email-footer').value;

  if (!email) {
    showToast('Please fill in the field!', 'error');
    return;
  }

  console.log({ email });

  showToast('Form submitted successfully! 🎉', 'success');

  formSubscribe.reset();
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

formSubscribe.addEventListener('submit', handleSubscribe);
