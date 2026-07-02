// მთავარი სკრიპტი - ყველა გვერდზე მუშაობს
// (script-ები </body>-ის წინაა, ამიტომ DOM უკვე ჩატვირთულია)

// ბურგერ მენიუ
const burger = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-menu');
if (burger) {
  burger.addEventListener('click', function () {
    menu.classList.toggle('open');
    burger.classList.toggle('open');
  });
}

// header-ს ფონი შეეცვალოს სქროლზე
const header = document.querySelector('.site-header');
window.addEventListener('scroll', function () {
  if (window.scrollY > 40) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

// cookie notification - Accept-ის მერე ქრება და აღარ ჩნდება
const cookie = document.querySelector('.cookie');
if (cookie && !localStorage.getItem('cookieOk')) {
  cookie.classList.add('show');
}
const cookieBtn = document.querySelector('#cookie-accept');
if (cookieBtn) {
  cookieBtn.addEventListener('click', function () {
    localStorage.setItem('cookieOk', 'yes');
    cookie.classList.remove('show');
  });
}

// კალათა - localStorage-ში ვინახავ და badge-ს ვაჩვენებ
function updateCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const badge = document.querySelector('.cart-count');
  if (badge) badge.textContent = cart.length;
}
updateCart();

// Add ღილაკზე დაჭერა (ბარათები მოგვიანებით ემატება, ამიტომ document-ს ვუსმენ)
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('add-btn')) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(e.target.dataset.id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  }
});

// contact ფორმა
const form = document.querySelector('[data-form]');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.reset();
    const note = form.querySelector('.form-note');
    if (note) note.textContent = 'Thank you! Message sent.';
  });
}

// წელი ფუტერში
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
