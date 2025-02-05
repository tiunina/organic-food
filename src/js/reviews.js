import axios from 'axios';
import Swiper from 'swiper';
import { Keyboard } from 'swiper/modules';
import 'swiper/css/bundle';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const reviewsList = document.querySelector('.reviews-list');
const reviewsSwiperContainer = document.querySelector(
  '.reviews-swiper-container'
);

const getReviews = async () => {
  try {
    const response = await axios.get(
      'https://portfolio-js.b.goit.study/api/reviews'
    );
    if (response.data.length === 0) {
      iziToast.error({
        message: 'No reviews found',
        position: 'topCenter',
      });
      reviewsList.innerHTML = `<li class="review-item review-item-not-found">Not found</li>`;
      return;
    }
    const createReviewCard = reviewInfo => {
      return `
        <li class="review-item swiper-slide">
          <img src="${reviewInfo.avatar_url}" loading="lazy" alt="${reviewInfo.author}" class="review-img">
          <h3 class="review-name">${reviewInfo.author}</h3>
          <p class="review-desc">${reviewInfo.review}</p>
        </li>`;
    };
    const reviewCardTemplate = response.data
      .map(reviewDetails => createReviewCard(reviewDetails))
      .join('');

    reviewsList.innerHTML = reviewCardTemplate;

    new Swiper(reviewsSwiperContainer, {
      modules: [Keyboard],
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      spaceBetween: 16,
      speed: 1100,
      slidesPerView: 1,
      breakpoints: {
        768: {
          slidesPerView: 3,
        },
        1440: {
          slidesPerView: 4,
        },
      },
    });
  } catch (err) {
    console.log('Error fetching reviews:', err);
    iziToast.error({
      message: 'Failed to load reviews. Please try again later.',
      position: 'topCenter',
    });
    reviewsList.innerHTML = `<li class="review-item review-item-not-found">Not found</li>`;
  }
};

getReviews();
