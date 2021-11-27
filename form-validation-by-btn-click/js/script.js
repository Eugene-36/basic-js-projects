const form = document.getElementById('form'),
  allDivs = document.querySelectorAll('.form-control'),
  username = document.getElementById('username'),
  email = document.getElementById('email'),
  password = document.getElementById('Password'),
  password2 = document.getElementById('password2'),
  popup = document.querySelector('.modal-overlay');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkInputs();
});

function checkInputs() {
  //get the values from the inputs

  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

  if (usernameValue === '') {
    //show error
    //add error class
    setErrorFor(username, 'Username cannot be blank');
  } else if (!isLettersOnly(usernameValue)) {
    setErrorFor(username, 'Should be letters only');
  } else {
    //add success class
    setSuccessFor(username);
  }

  if (emailValue === '') {
    setErrorFor(email, 'Email cannot be blank');
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, 'Email is not valid');
  } else {
    setSuccessFor(email);
  }

  if (passwordValue === '') {
    //show error
    //add error class
    setErrorFor(password, 'Password cannot be blank');
  } else {
    //add success class
    setSuccessFor(password);
  }

  if (password2Value === '') {
    //show error
    //add error class
    setErrorFor(password2, 'Password2 cannot be blank');
  } else if (passwordValue !== password2Value) {
    setErrorFor(password2, 'Passwords does not match');
  } else {
    //add success class
    setSuccessFor(password2);
  }

  //*show a success message
  checkAllValidInputs(allDivs);
}

function setErrorFor(input, message) {
  const formControl = input.parentElement; //.form-control;
  const small = formControl.querySelector('small');

  //add error message inside small
  small.innerText = message;

  //add error class
  formControl.className = 'form-control error';
}

function setSuccessFor(input) {
  const formControl = input.parentElement;

  //add error succes
  formControl.className = 'form-control success';
}

function isEmail(email) {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}
function isLettersOnly(userName) {
  return /^[A-Za-z]+$/.test(userName);
}

function checkAllValidInputs(allInputs) {
  let zero = allInputs[0];
  let two = allInputs[1];
  let three = allInputs[2];
  let foughr = allInputs[3];

  if (
    zero.classList.contains('success') &&
    two.classList.contains('success') &&
    three.classList.contains('success') &&
    foughr.classList.contains('success')
  ) {
    popup.classList.add('open-modal');
    setTimeout(() => {
      popup.classList.remove('open-modal');
      form.reset();
      zero.classList.remove('success');
      two.classList.remove('success');
      three.classList.remove('success');
      foughr.classList.remove('success');
    }, 2000);
  }

  // allInputs.forEach((item) => {
  //   console.log(item);
  // if (item.classList.contains('success')) {
  //   //counter++;
  //   console.log('сюда зашёл');
  // } // popup.classList.add('open-modal');
  // });
}
