// პროდუქტების საერთო კოდი (home.js და shop.js იყენებენ)

const API = 'https://dummyjson.com/products/category';
const CATEGORIES = ['beauty', 'fragrances', 'skin-care'];
const LABELS = { 'beauty': 'Makeup', 'fragrances': 'Fragrance', 'skin-care': 'Skincare' };

// ერთი კატეგორიის პროდუქტების წამოღება API-დან (GET)
async function getProducts(slug) {
  const res = await fetch(API + '/' + slug);
  const data = await res.json();
  data.products.forEach(function (p) { p.slug = slug; });
  return data.products;
}

// ერთი პროდუქტის HTML ბარათი
function cardHTML(p) {
  return `
    <article class="product-card">
      <div class="product-card__media">
        <img src="${p.thumbnail}" alt="${p.title}">
      </div>
      <div class="product-card__body">
        <p class="product-card__brand">${p.brand || LABELS[p.slug]}</p>
        <h3 class="product-card__name">${p.title}</h3>
        <p class="product-card__rating">⭐ ${p.rating}</p>
        <div class="product-card__foot">
          <span class="product-card__price">$${p.price}</span>
          <button class="add-btn" data-id="${p.id}">Add</button>
        </div>
      </div>
    </article>`;
}
