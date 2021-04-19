'use strict';

loadItems()
  .then(items => {
    createList(items);
    setEventListeners(items);
  })
  .catch(console.error);

async function loadItems() {
  const response = await fetch('data/data.json');
  const json = await setResponseType(response);
  return json.items;
}

function setResponseType(response) {
  return new Promise((resolve, reject) => {
    if (!response.ok) {
      reject(new Error(`HTTP error -- status: ${response.status}`));
    } else {
      resolve(response.json());
    }
  });
}

function createList(items) {
  const list = document.querySelector('.list');
  list.innerHTML = items.map(item => createHTMLString(item)).join('');
}

function createHTMLString(item) {
  return `
    <li class="list__item">
        <img src="${item.image}" alt="${item.color} ${item.type}" class="item__img" />
        <span>${item.season}, ${item.size} size</span>
    </li>
    `;
}

function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  const btns = document.querySelector('.btns');
  logo.addEventListener('click', () => createList(items));
  btns.addEventListener('click', e => onBtnClick(e, items));
}

function onBtnClick(e, items) {
  const dataset = e.target.dataset;
  const key = dataset.key;
  const value = dataset.value;
  if (key == null || value == null) {
    return;
  }
  createList(items.filter(item => item[key] === value));
}
