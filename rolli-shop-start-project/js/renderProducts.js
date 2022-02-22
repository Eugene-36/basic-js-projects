const productsContainer = document.querySelector('#products-container');
console.log('productsContainer', productsContainer);

getProducts();
async function getProducts() {
  // запрашиваем JSON с данными пользователя
  let response = await fetch('./js/products.json');
  let user = await response.json();

  renderProducts(user);
}

function renderProducts(array) {
  console.log('array', array);

  array.forEach(({ id, imgSrc, itemsInBox, price, title, weight }) => {
    console.log('title', title);

    const productHTML = `
      <div class="col-md-6">
      <div class="card mb-4" data-id="${id}">
          <img class="product-img" src="img/roll/${imgSrc}" alt="">
          <div class="card-body text-center">
              <h4 class="item-title">${title}</h4>
              <p><small data-items-in-box class="text-muted">${itemsInBox} шт.</small></p>

              <div class="details-wrapper">
                  <!--! Счётчик -->
                  <div class="items counter-wrapper">
                      <div class="items__control" data-action="minus">-</div>
                      <div class="items__current" data-counter>1</div>
                      <div class="items__control" data-action="plus">+</div>
                  </div>
                  <!--! // Счётчик -->

                  <div class="price">
                      <div class="price__weight">${weight}.</div>
                      <div class="price__currency">${price} ₽</div>
                  </div>
              </div>

              <button data-cart type="button" class="btn btn-block btn-outline-warning">+ в корзину</button>

          </div>
      </div>
  </div>
      `;

    productsContainer.insertAdjacentHTML('beforeend', productHTML);
  });
}
