// მთავარი გვერდი

// რჩეული პროდუქტები
async function loadFeatured() {
  const grid = document.querySelector('#featured-grid');
  try {
    let products = await getProducts('beauty');
    const more = await getProducts('skin-care');
    products = products.concat(more).slice(0, 8);

    let html = '';
    products.forEach(function (p) { html += cardHTML(p); });
    grid.innerHTML = html;
  } catch (e) {
    grid.innerHTML = '<p class="grid-status">Could not load products.</p>';
  }
}
loadFeatured();

// კატეგორიის ბარათებში სურათი API-დან
async function loadCatImages() {
  const cards = document.querySelectorAll('.cat-card[data-cat]');
  for (const card of cards) {
    const products = await getProducts(card.dataset.cat);
    const img = card.querySelector('.cat-card__product');
    img.src = products[0].thumbnail;
  }
}
loadCatImages();
