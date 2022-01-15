document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.querySelector('.beer-button'),
    randomBeer = document.querySelector('.random-beer'),
    descriptionDisplay = document.querySelector('.description');

  console.log('randomBeer', startBtn);

  function getData(e) {
    e.preventDefault();

    fetch('https://api.punkapi.com/v2/beers/random')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data[0]);
        const { name, description, volume } = data[0];
        const volumeValue = volume.value;
        const volumeUnit = volume.unit;

        console.log('volumeUnit', volumeUnit);
        randomBeer.innerHTML = name + ' ' + volumeValue + volumeUnit;
        descriptionDisplay.innerHTML = description;
        console.log('volumeValue', volumeValue);
      });
  }

  startBtn.addEventListener('click', getData);
});
