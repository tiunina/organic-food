document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.svg_btn_ourProduct');
  const products = document.querySelectorAll('.product_wrapper');

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const category = this.getAttribute('data-category');

      products.forEach(product => {
        if (
          category === 'all' ||
          product.getAttribute('data-category') === category
        ) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      });
    });
  });
});
