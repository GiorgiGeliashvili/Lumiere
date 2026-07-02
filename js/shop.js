// მაღაზიის გვერდი - ფილტრი, ძებნა, სორტირება

let allProducts = [];

// ყველა კატეგორიის პროდუქტი
async function loadShop() {
  const grid = document.querySelector('#shop-grid');
  try {
    for (const cat of CATEGORIES) {
      const products = await getProducts(cat);
      allProducts = allProducts.concat(products);
    }
    showProducts();
  } catch (e) {
    grid.innerHTML = '<p class="grid-status">Could not load products.</p>';
  }
}

// ფილტრი + ძებნა + სორტი, მერე ჩვენება
function showProducts() {
  let list = allProducts;

  // რომელი კატეგორიებია მონიშნული (multiselect)
  const active = [];
  document.querySelectorAll('.filter-chip.active').forEach(function (chip) {
    if (chip.dataset.cat !== 'all') active.push(chip.dataset.cat);
  });
  if (active.length > 0) {
    list = list.filter(function (p) { return active.includes(p.slug); });
  }

  // ძებნა სახელით
  const term = document.querySelector('#search').value.toLowerCase();
  if (term) {
    list = list.filter(function (p) { return p.title.toLowerCase().includes(term); });
  }

  // სორტირება
  const sort = document.querySelector('#sort').value;
  if (sort === 'price-asc') list = list.slice().sort(function (a, b) { return a.price - b.price; });
  if (sort === 'price-desc') list = list.slice().sort(function (a, b) { return b.price - a.price; });
  if (sort === 'rating') list = list.slice().sort(function (a, b) { return b.rating - a.rating; });

  // ჩვენება
  document.querySelector('#result-count').textContent = list.length + ' products';
  document.querySelector('#shop-grid').innerHTML = list.map(cardHTML).join('');
}

// ფილტრის ღილაკები
document.querySelectorAll('.filter-chip').forEach(function (chip) {
  chip.addEventListener('click', function () {
    if (chip.dataset.cat === 'all') {
      document.querySelectorAll('.filter-chip').forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
    } else {
      chip.classList.toggle('active');
      document.querySelector('.filter-chip[data-cat="all"]').classList.remove('active');
    }
    showProducts();
  });
});

document.querySelector('#search').addEventListener('input', showProducts);
document.querySelector('#sort').addEventListener('change', showProducts);

loadShop();
