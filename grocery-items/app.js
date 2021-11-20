// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert'),
  form = document.querySelector('.grocery-form'),
  grocery = document.getElementById('grocery'),
  submitBtn = document.querySelector('.submit-btn'),
  container = document.querySelector('.grocery-container'),
  list = document.querySelector('.grocery-list'),
  clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = '';
// ****** EVENT LISTENERS **********
//submit form
form.addEventListener('submit', addItem);
// clear items
clearBtn.addEventListener('click', clearItems);
// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  console.log(value);
  const id = new Date().getTime().toString();
  //console.log(id);

  if (value && !editFlag) {
    const element = document.createElement('article');
    //set the class
    element.classList.add('grocery-item');
    //set the id
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);

    element.innerHTML = `
    <p class="title">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
    `;
    //append chiled
    list.appendChild(element);
    //display alert
    displayAlert('alert added to the list', 'success');
    //show container
    container.classList.add('show-container');
    //add to local storage
    addToLocalStorage(id, value);
    //set back to default
    setBackToDefault();
  } else if (value && editFlag) {
    console.log('editing');
  } else {
    displayAlert('please enter value', 'danger');
  }
}

//display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  setTimeout(() => {
    alert.textContent = '';
    alert.classList.remove(`alert-${action}`);
  }, 2000);
}
//clear all items
function clearItems() {
  const items = document.querySelectorAll('.grocery-item');

  if (items.length > 0) {
    items.forEach((item) => {
      list.removeChild(item);
    });
  }
  container.classList.remove('show-container');
  setBackToDefault();
  displayAlert('empty list', 'danger');

  //localStorage.removeItem('list')
}
//set back to default
function setBackToDefault() {
  grocery.value = '';
  editFlag = false;
  editID = '';
  submitBtn.textContent = 'submit';
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  console.log('added to local storage');
}
// ****** SETUP ITEMS **********
