'use strict';

loadItems()
  .then(items => {
    const listItems = items.map(createListItem);
    const list = document.querySelector('.list');
    list.append(...listItems);

    const btns = document.querySelector('.btns');
    btns.addEventListener('click', e => onBtnClick(e, listItems));
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', () => onLogoClick(listItems));
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

function createListItem(item) {
  const listItem = document.createElement('li');
  listItem.setAttribute('class', 'list__item');
  listItem.setAttribute('data-type', `${item.type}`);
  listItem.setAttribute('data-color', `${item.color}`);

  const itemImg = document.createElement('img');
  itemImg.setAttribute('class', 'item__img');
  itemImg.setAttribute('src', `${item.image}`);

  const itemDescription = document.createElement('span');
  itemDescription.textContent = `${item.season}, ${item.size} size`;

  listItem.appendChild(itemImg);
  listItem.appendChild(itemDescription);

  return listItem;
}

function onBtnClick(e, listItem) {
  const dataset = e.target.dataset;
  const key = dataset.key;
  const value = dataset.value;
  if (key == null || value == null) {
    return;
  }
  updateList(listItem, key, value);
}

function updateList(listItem, key, value) {
  listItem.forEach(item => {
    item.classList.remove('invisible');
    if (item.dataset[key] !== value) {
      item.classList.add('invisible');
    }
  });
}

function onLogoClick(listItem) {
  listItem.forEach(item => item.classList.remove('invisible'));
}
