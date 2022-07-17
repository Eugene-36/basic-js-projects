//Это вся форма мульти
const multiStepForm = document.querySelector('[data-multi-step]');
const formSteps = [...multiStepForm.querySelectorAll('[data-step]')];

console.log('formSteps', formSteps);
console.log('multiStepForm', multiStepForm);

let currentStep = formSteps.findIndex((step) => {
  return step.classList.contains('active');
});

if (currentStep < 0) {
  currentStep = 0;
  showCurrentStep();
}

// console.log('currentStep', currentStep);
// console.log('currentStep', currentStep);

multiStepForm.addEventListener('click', (e) => {
  let incrementor;

  if (e.target.matches('[data-next]')) {
    incrementor = 1;
  } else if (e.target.matches('[data-previous]')) {
    incrementor = -1;
  }
  if (incrementor == null) return;

  const inputs = [...formSteps[currentStep].querySelectorAll('input')];

  const allValid = inputs.every((input) => input.reportValidity());

  if (allValid) {
    currentStep += incrementor;
    showCurrentStep();
  }
  //console.log('inputs', inputs);
});

formSteps.forEach((step) => {
  step.addEventListener('animationend', (e) => {
    formSteps[currentStep].classList.remove('hide');
    e.target.classList.toggle('hide', !e.target.classList.contains('active'));
  });
});

function showCurrentStep() {
  formSteps.forEach((step, index) => {
    console.log('step', step);
    console.log('index', index);

    step.classList.toggle('active', index === currentStep);
  });
}
