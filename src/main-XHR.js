'use strict';

const request = new XMLHttpRequest();
request.open('GET', 'data/data.json');
request.responseType = 'json';
request.send();

request.addEventListener('load', () => {
  const items = request.response.items;
  const listItems = items.map(createListItem);
  const list = document.querySelector('.list');
  list.append(...listItems);

  const btns = document.querySelector('.btns');
  btns.addEventListener('click', e => onBtnClick(e, listItems));
  const logo = document.querySelector('.logo');
  logo.addEventListener('click', () => onLogoClick(listItems));
});

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

function onBtnClick(e, listItems) {
  const dataset = e.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }
  updateList(listItems, key, value);
}

function updateList(listItems, key, value) {
  listItems.forEach(item => {
    item.classList.remove('invisible');
    if (item.dataset[key] !== value) {
      item.classList.add('invisible');
    }
  });
}

function onLogoClick(listItems) {
  listItems.forEach(item => item.classList.remove('invisible'));
}
