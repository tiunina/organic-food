document.addEventListener('DOMContentLoaded', () => {
  const productGallery = document.querySelector('.salad_gallery');

  productGallery.addEventListener('click', event => {
    const clickedImage = event.target.closest('.salad_img');

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
  });
});
