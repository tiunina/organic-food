import axios from 'axios';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const getReviews = async () => {
  try {
    const response = await axios.get(
      'https://portfolio-js.b.goit.study/api/reviews'
    );

    const reviewsList = document.querySelector('.reviews-list');

    if (response.status === 200 && response.data.length > 0) {
      const reviewCardTemplate = response.data
        .map(reviewDetails => createReviewCard(reviewDetails))
        .join('');

      reviewsList.innerHTML = reviewCardTemplate;

      return true;
    } else {
      return handleEmptyReviews();
    }
  } catch (err) {
    console.error('Error fetching reviews:', err);

    handleEmptyReviews({
      message: 'Failed to load reviews. Please try again later.',
    });
  }
};

const createSlider = () => {
  const reviewsSwiperContainer = document.querySelector(
    '.reviews-swiper-container'
  );

  new Swiper(reviewsSwiperContainer, {
    modules: [Pagination],
    spaceBetween: 16,
    speed: 1100,
    slidesPerView: 1,
    loop: true,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1280: {
        slidesPerView: 3,
      },
    },
    pagination: {
      el: '.swiper-pagination_review',
      clickable: true,
      bulletActiveClass: 'my-custom-active-bullet',
    },
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
  });
};

const createReviewCard = reviewInfo => {
  return `
        <li class="review-item swiper-slide">
          <img src="${reviewInfo.avatar_url}" loading="lazy" alt="${reviewInfo.author}" class="review-img">
          <div class="review_descroption_wrapper">
          <h3 class="review-name">${reviewInfo.author}</h3>
          <p class="review-desc">${reviewInfo.review}</p>
           <svg class="stars-icon_review" width="36" height="28">
              <use href="/images/icons.svg#icon-stars"></use>
            </svg>
            </div>
        </li>`;
};

const handleEmptyReviews = ({ message = 'No reviews found' }) => {
  const reviewsList = document.querySelector('.reviews-list');

  iziToast.error({
    message,
    position: 'topCenter',
  });
  reviewsList.innerHTML = `<li class="review-item review-item-not-found">Not found</li>`;
  return false;
};

const initReviews = async () => {
  try {
    const success = await getReviews();
    if (success) createSlider();
  } catch (err) {
    console.log(err);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initReviews();
});
