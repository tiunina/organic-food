import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const swiper = new Swiper('.swiper', {
  direction: 'vertical',
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

setTimeout(function tick() {
  swiper.slideNext(1500);
  setTimeout(tick, 3000);
}, 3000);
