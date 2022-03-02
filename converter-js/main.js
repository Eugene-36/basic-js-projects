// Объект с курсами валют 3-х валют
const rates = {};

// Элемент для отображения курса валют
const usd = document.querySelector('[data-value="USD"]'),
  eur = document.querySelector('[data-value="EUR"]'),
  gbp = document.querySelector('[data-value="GBP"]');

// Элементы формы: ввод суммы, выбор валюты, поле с результатом
const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');

console.log('result', result.value);

// Асинхронное получение данных
getCurrency();
setInterval(getCurrency, 10000);

async function getCurrency() {
  const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
  const data = await response.json();
  const result = data['Valute'];
  console.log();
  insertData(result);
}

// Отображаем данные
function insertData(data) {
  rates.USD = data.USD;
  rates.EUR = data.EUR;
  rates.GBP = data.GBP;

  console.log(rates);
  usd.textContent = rates.USD.Value.toFixed(2);
  eur.textContent = rates.EUR.Value.toFixed(2);
  gbp.textContent = rates.GBP.Value.toFixed(2);

  //Цвет для информира USD
  if (rates.USD.Value > rates.USD.Previous) {
    usd.classList.add('top');
  } else {
    usd.classList.add('bottom');
  }

  //Цвет для информира EUR
  if (rates.EUR.Value > rates.EUR.Previous) {
    eur.classList.add('top');
  } else {
    eur.classList.add('bottom');
  }

  //Цвет для информира GBP
  if (rates.GBP.Value > rates.GBP.Previous) {
    gbp.classList.add('top');
  } else {
    gbp.classList.add('bottom');
  }
}

// Делает конвертацию
input.addEventListener('input', convertValue);
select.addEventListener('input', convertValue);

function convertValue() {
  console.log(rates);

  result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(
    2
  );
}
