const mealsEl = document.getElementById('meals'),
  favContainer = document.getElementById('fav-meals'),
  searchTerm = document.getElementById('search-tearm'),
  searchBtn = document.getElementById('search'),
  mealPopup = document.getElementById('meal-popup'),
  mealInfoEl = document.getElementById('meal-info');

//popupCloseBtn = document.getElementById('close-popup'),
// console.log(popupCloseBtn);

async function getRandomMeal() {
  const resp = await fetch(
    'https://www.themealdb.com/api/json/v1/1/random.php'
  );

  const respData = await resp.json();
  const randomMeal = respData.meals[0];

  addMeal(randomMeal, true);
}

async function getMealById(id) {
  const resp = await fetch(
    'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id
  );

  const respData = await resp.json();
  const meal = respData.meals[0];

  return meal;
}
async function getMealsBySearch(term) {
  const respons = await fetch(
    'https://www.themealdb.com/api/json/v1/1/search.php?s=' + term
  );

  const respData = await respons.json();
  const meal = respData.meals;

  return meal;
}

function addMeal(mealData, random = false) {
  const meal = document.createElement('div');
  const { strMealThumb, strMeal, idMeal } = mealData;
  meal.classList.add('meal');

  meal.innerHTML = `
<div class="meal-header">
 ${random ? `<span class="random"> Random Recipe </span>` : ''}
  <img
    src=${strMealThumb}
    alt=${strMeal}
  />
</div>
<div class="meal-body">
  <h4>${strMeal}</h4>
  <button class="fav-btn">
    <i class="fas fa-heart"></i>
  </button>
</div>

  `;
  meals.appendChild(meal);

  //

  meal.addEventListener('click', (e) => {
    const elHeart = e.target.className.includes('fas fa-heart');
    mealPopup.style.display = 'initial';

    if (elHeart) {
      mealPopup.style.display = 'none';
    } else {
      mealPopup.style.display = 'initial';
    }
    console.log(elHeart);
    //.className = ''
    console.log('Рыганул клик');
  });

  const btn = meal.querySelector('.meal-body .fav-btn');
  btn.addEventListener('click', (e) => {
    if (btn.classList.contains('active')) {
      removeMealFromLS(idMeal);
      btn.classList.remove('active');
    } else {
      addMealsToLS(idMeal);
      btn.classList.add('active');
    }

    //clean the container

    fetchFaveMeals();
  });

  meal.addEventListener('click', () => {
    showMealInfo(mealData);
  });
}

function addMealsToLS(mealId) {
  const mealIds = getMealsFromLS();

  localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}

function removeMealFromLS(mealId) {
  const mealIds = getMealsFromLS();
  console.log(mealIds);
  localStorage.setItem(
    'mealIds',
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

function getMealsFromLS() {
  const mealIds = JSON.parse(localStorage.getItem('mealIds'));

  return mealIds === null ? [] : mealIds;
}

async function fetchFaveMeals() {
  //clean the container
  favContainer.innerHTML = '';

  const mealIds = getMealsFromLS();

  const meals = [];

  for (let i = 0; i < mealIds.length; i++) {
    const mealID = mealIds[i];

    meal = await getMealById(mealID);
    addMealFav(meal);
  }
  console.log(meals);

  //add them to the screen
}

//Обновляем в модалке информацию
function showMealInfo(mealData) {
  //clean it up
  mealInfoEl.innerHTML = '';

  const mealEl = document.createElement('div');
  const { strMealThumb, strMeal, idMeal, strInstructions } = mealData;

  const ingredienst = [];
  //get ungredients and measures
  for (let i = 1; i <= 20; i++) {
    if (mealData['strIngredient' + i]) {
      ingredienst.push(
        `${mealData['strIngredient' + i]} - ${mealData['strMeasure' + i]}`
      );
    } else {
      break;
    }
  }

  mealEl.innerHTML = `
  <button id="close-popup" class="close-popup">
  <i class="fas fa-times"></i>
</button>
 <h1>${strMeal}</h1>
<img
  src="${strMealThumb}"
  alt="${strMeal}"
/>
  <p>
${strInstructions}
  </p>
  <h3>Ingredients:</h3>
  <ul>
  ${ingredienst.map((ing) => `<li>${ing}</li>`).join('')}
  </ul>
`;

  mealInfoEl.appendChild(mealEl);

  //show the pop-up

  mealPopup.classList.remove('hidden');

  // Close the modal by click
  const btnCloseEl = document.querySelector('.close-popup');

  btnCloseEl.addEventListener('click', () => {
    mealPopup.classList.add('hidden');
  });
}

function addMealFav(mealData) {
  const favMeal = document.createElement('li');
  const { strMealThumb, strMeal, idMeal } = mealData;

  favMeal.innerHTML = `
  <img
    src="${strMealThumb}"
    alt="${strMeal}"
  /><span>${strMeal}</span>
  <button class='clear'><i class="fas fa-window-close"></i></button>
    `;

  const btn = favMeal.querySelector('.clear');

  btn.addEventListener('click', () => {
    removeMealFromLS(idMeal);
    fetchFaveMeals();
  });
  favMeal.addEventListener('click', () => {
    showMealInfo(mealData);
  });

  favContainer.appendChild(favMeal);
}

getRandomMeal();
fetchFaveMeals();

searchBtn.addEventListener('click', async () => {
  //clear container
  mealsEl.innerHTML = '';

  const search = searchTerm.value;

  const meals = await getMealsBySearch(search);

  if (meals) {
    meals.forEach((item) => {
      addMeal(item);
    });
  }
});
