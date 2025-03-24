import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const swiper2 = new Swiper('.swiper_slider', {
  direction: 'horizontal',
  loop: true,
  speed: 1100,
  freeMode: true,
  slidesPerView: 'auto',
  spaceBetween: 24,
  breakpoints: {
    768: {
      spaceBetween: 24,
    },
  },
  pagination: {
    el: '.swiper-pagination_slider',
    clickable: true,
  },
  wrapperClass: 'swiper-wrapper_slider',
  slideClass: 'swiper-slide_slider',
  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
  },
});
