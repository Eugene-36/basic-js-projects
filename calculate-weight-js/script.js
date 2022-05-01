const age = document.getElementById('age');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const male = document.getElementById('m');
const female = document.getElementById('f');
const form = document.getElementById('form');

let result = '';

function validateForm() {
  if (
    age.value === '' ||
    height.value === '' ||
    weight.value === '' ||
    (male.checked === false && female.checked === false)
  ) {
    alert('All field are required');
    document.getElementById('submit').removeEventListener('click', countBmi);
  } else {
    countBmi();
  }
}

document.getElementById('submit').addEventListener('click', validateForm);

function countBmi() {
  const valuesArray = [age.value, height.value, weight.value];

  if (male.checked) {
    valuesArray.push('male');
  } else if (female.checked) {
    valuesArray.push('female');
  }

  form.reset();
  const bmi = Number(
    valuesArray[2] /
      Number(((valuesArray[1] / 100) * Number(valuesArray[1])) / 100)
  );

  if (bmi < 18.5) {
    result = 'Underweight';
  } else if (18.5 <= bmi && bmi <= 24.9) {
    result = 'Healthy';
  } else if (25 <= bmi && bmi <= 29.9) {
    result = 'Overweight';
  } else if (30 <= bmi && bmi <= 34.9) {
    result = 'Obese';
  } else if (35 <= bmi) {
    result = 'Extremely obese';
  }

  addeTextBody(bmi);
}

function addeTextBody(bmi) {
  const h1 = document.createElement('h1');
  const h2 = document.createElement('h2');
  const text = document.createTextNode(result);
  const indexOfMass = document.createTextNode('BMI: ');
  const finalResault = document.createTextNode(parseFloat(bmi).toFixed(2));
  h1.appendChild(text);
  h2.appendChild(indexOfMass);
  h2.appendChild(finalResault);

  h1.classList.add('center');
  h2.classList.add('center');

  document.body.appendChild(h1);
  document.body.appendChild(h2);
  document.getElementById('submit').removeEventListener('click', countBmi);
  document.getElementById('submit').removeEventListener('click', validateForm);
}

document.getElementById('submit').addEventListener('click', countBmi);
