document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.querySelector('.beer-button'),
    randomBeer = document.querySelector('.random-beer'),
    descriptionDisplay = document.querySelector('.description'),
    beerImg = document.querySelector('.beer-img');

  console.log('beerImg', beerImg);

  function getData(e) {
    e.preventDefault();

    fetch('https://api.punkapi.com/v2/beers/random')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data[0]);
        const { name, description, volume, image_url } = data[0];
        const volumeValue = volume.value;
        const volumeUnit = volume.unit;

        console.log('image_url', image_url);
        randomBeer.innerHTML = name + ' ' + volumeValue + volumeUnit;
        descriptionDisplay.innerHTML = description;
        beerImg.src =
          image_url === null
            ? 'https://raw.githubusercontent.com/Eugene-36/team-project-js-filmoteka/main/src/images/noPoster.jpg'
            : image_url;

        console.log('volumeValue', volumeValue);
      });
  }

  startBtn.addEventListener('click', getData);
});
