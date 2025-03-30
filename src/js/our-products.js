const products = [
  {
    name: 'Lettuce',
    price: '$5/kg',
    category: 'vegetables',
    image: '/images/our-products/green-oak.png',
    backgroundClass: 'wrapper_background_green',
  },
  {
    name: 'Pear',
    price: '$3/kg',
    category: 'fruits',
    image: '/images/our-products/pear.png',
    backgroundClass: 'wrapper_background_pink',
  },
  {
    name: 'Broccoli',
    price: '$8/kg',
    category: 'vegetables',
    image: '/images/our-products/broccoli.png',
    backgroundClass: 'wrapper_background_green',
  },
  {
    name: 'Tomatoes',
    price: '$10/kg',
    category: 'fruits',
    image: '/images/our-products/tomatoes.png',
    backgroundClass: 'wrapper_background_blue',
  },
  {
    name: 'Cucumbers',
    price: '$10/kg',
    category: 'vegetables',
    image: '/images/our-products/cucumber.png',
    backgroundClass: 'wrapper_background_orange',
  },
  {
    name: 'Cherries',
    price: '$20/kg',
    category: 'fruits',
    image: '/images/our-products/cherry.png',
    backgroundClass: 'wrapper_background_blue',
  },
  {
    name: 'Avocados',
    price: '$8/kg',
    category: 'fruits',
    image: '/images/our-products/avocado.png',
    backgroundClass: 'wrapper_background_green',
  },
  {
    name: 'Raspberries',
    price: '$20/kg',
    category: 'fruits',
    image: '/images/our-products/raspberry.png',
    backgroundClass: 'wrapper_background_pink',
  },
  {
    name: 'Cabbages',
    price: '$10/kg',
    category: 'vegetables',
    image: '/images/our-products/cabbage.png',
    backgroundClass: 'wrapper_background_green wrapper_background_cabbages',
  },
  // additional
  {
    name: 'Eggs',
    price: '$5/kg',
    category: 'eggs',
    image: '/images/our-products/our-product-additional/egg.png',
    backgroundClass: 'wrapper_background_blue  ',
  },
  {
    name: 'Porcini',
    price: '$10/kg',
    category: 'mushrooms',
    image: '/images/our-products/our-product-additional/mushroom.png',
    backgroundClass: 'wrapper_background_orange  ',
  },
  {
    name: 'Beans',
    price: '$8/kg',
    category: 'beans',
    image: '/images/our-products/our-product-additional/red-beans.png',
    backgroundClass: 'wrapper_background_blue ',
  },
  {
    name: 'Peas',
    price: '$8/kg',
    category: 'beans',
    image: '/images/our-products/our-product-additional/peas.png',
    backgroundClass: 'wrapper_background_green  ',
  },
];

document.addEventListener('DOMContentLoaded', () => {
  const showMoreBtn = document.querySelector('.showMore_btn_ourProduct');
  const buttons = document.querySelectorAll('.svg_btn_ourProduct');
  const productGallery = document.querySelector('.product_gallery');

  const productsPerPage = 3;
  let currentIndex = 9;
  let selectedCategory = 'all';

  generateProductGallery(products.slice(0, currentIndex));

  buttons.forEach(button => {
    button.addEventListener('click', handleCategoryClick);
  });

  productGallery.addEventListener('click', handleCardClick);

  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', handleClickToMore);
  }

  function handleCategoryClick() {
    selectedCategory = this.getAttribute('data-category');
    currentIndex = 9;
    productGallery.innerHTML = '';

    buttons.forEach(button => button.classList.remove('active'));
    this.classList.add('active');

    const filteredProducts =
      selectedCategory === 'all'
        ? products.slice(0, products.length)
        : products
            .filter(p => p.category === selectedCategory)
            .slice(0, currentIndex);

    generateProductGallery(filteredProducts);

    const remainingProducts =
      products.filter(p => p.category === selectedCategory).length -
      currentIndex;
    showMoreBtn.style.display = remainingProducts > 0 ? 'block' : 'none';
  }

  function generateProductGallery(products) {
    products.forEach(product => {
      const productHTML = `
      <div class="product_wrapper ${product.backgroundClass}" data-category="${product.category}">
        <img class="product_img" src="${product.image}" alt="${product.name}" />
        <div class="product_info_wrapper">
          <div class="product_info">
            <p class="product_name">${product.name}</p>
            <p class="product_price">${product.price}</p>
          </div>
          <div class="product_icon_wrapper">
            <svg class="stars-icon" width="36" height="28">
              <use href="/images/icons.svg#icon-stars"></use>
            </svg>
            <svg class="shopping-icon" width="20" height="18">
              <use href="/images/icons.svg#icon-shopping"></use>
            </svg>
          </div>
        </div>
      </div>
    `;

      productGallery.insertAdjacentHTML('beforeend', productHTML);
    });
  }

  function handleCardClick(event) {
    const clickedImage = event.target.closest('.product_img');

    if (!clickedImage) return;

    document.body.style.overflow = 'hidden';
    const largeImageSrc = clickedImage.src;

    const lightboxInstance = basicLightbox.create(
      `
      <img src="${largeImageSrc}" width="800" height="600">
    `,
      {
        onClose: () => {
          document.body.style.overflow = 'scroll';
        },
      }
    );

    lightboxInstance.show();
  }

  function handleClickToMore() {
    const nextProducts = products.slice(
      currentIndex,
      currentIndex + productsPerPage
    );
    generateProductGallery(nextProducts);
    currentIndex += productsPerPage;

    if (currentIndex >= products.length) {
      showMoreBtn.style.display = 'none';
    }
  }
});
