const countdown = () => {
  const countDate = new Date('May 17, 2022 00:00:00').getTime();
  const now = new Date().getTime();

  const gap = countDate - now;

  //====================
  const second = 1000;
  const minute = second * 60; // тут узнали минуты
  const hour = minute * 60; // тут узнали часы
  const day = hour * 24;

  //========================
  const textDay = Math.floor(gap / day);
  const textHour = Math.floor((gap % day) / hour);
  const textMinute = Math.floor((gap % hour) / minute);
  const textSeconds = Math.floor((gap % minute) / second);
  console.log('textSeconds', textSeconds);

  document.querySelector('.day').innerText = textDay;
  document.querySelector('.hour').innerText = textHour;

  document.querySelector('.minute').innerText = textMinute;

  document.querySelector('.second').innerText = textSeconds;
};

setInterval(countdown, 1000);
