const APIURL = 'https://api.github.com/users/';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getUser('florinpop17');

async function getUser(username) {
  const resp = await fetch(APIURL + username);
  const respData = await resp.json();

  console.log('respData', respData);
  createUserCard(respData);

  getRepos(username);
}

async function getRepos(username) {
  const resp = await fetch(APIURL + username + '/repos');
  const respData = await resp.json();

  addReposToCard(respData);
}

function createUserCard(user) {
  const { avatar_url, name, bio, followers, following, public_repos } = user;

  const cardHTML = `
  <div class="card">
  <div class="img-container">
  <img class="avatar" src="${avatar_url}" alt="${name}">
  </div>
  <div class="user-info">
     <h2>${name}</h2>
     <p>${bio}</p>
     <ul class="info">
     <li>${followers}<strong>Followers</strong></li>
     <li>${following}<strong>Following</strong></li>
     <li>${public_repos}<strong>Public Repos</strong></li>
     </ul>

     <ul class="repos" id="repos"></ul>
  </div>
  </div>
  
  `;
  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById('repos');
  console.log('repos', repos);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);

    search.value = '';
  }
});
