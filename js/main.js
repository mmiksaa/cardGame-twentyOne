"use strict";

document.addEventListener("DOMContentLoaded", function (event) {

  const btnMore = document.querySelector('.table__btn--more'),
    header = document.querySelector('.header'),
    btnFold = document.querySelector('.table__btn--fold'),
    tableListYou = document.querySelector('.table__list--you'),
    table = document.querySelector('.table'),
    tableListRival = document.querySelector('.table__list--rival'),
    tableCountYou = document.querySelector('.table__count--you'),
    tableCountRival = document.querySelector('.table__count--rival'),
    wrapp = document.querySelector('.wrapp'),
    bar = document.querySelector('.bar'),
    body = document.querySelector('body'),
    winrate = document.querySelector('.settings-popup__winrate'),

    endGamePopup = document.querySelector('.end-game-popup'),
    endGamePopupText = document.querySelector('.end-game-popup__text'),
    endGamePopupBtn = document.querySelector('.end-game-popup__btn'),

    instructionBtn = document.querySelector('.instruction'),
    instructionPopup = document.querySelector('.instruction-popup'),
    instructionClose = document.querySelector('.instruction-popup__close'),

    settingsBtn = document.querySelector('.settings-btn'),
    settingsPopup = document.querySelector('.settings-popup'),
    settingsPopupClose = document.querySelector('.settings-popup__close'),

    clearBarSetting = document.querySelector('.clear-bar'),
    moveGameCounter = document.querySelector('.move-game-counter'),
    clearCoutBar = document.querySelector('.clear-coutbar'),
    changeColor = document.querySelector('#chk'),
    hideDJK = document.querySelector('.hideDJK'),


    gameList = document.querySelector('.game__list'),
    gameItem = document.querySelectorAll('.game__item');

  let cardCounterYour = [], //массив из полученых карт
    cardCounterRival = [], //массив из полученных карт
    allCardNum = [],
    barCounter = (JSON.parse(localStorage.getItem('bar'))) || [], //история игр
    gameCount = (JSON.parse(localStorage.getItem('gameCount'))) || [0, 0, 0],
    flag = false, //флаг для избежания повторного вызова функций
    firstTime = false,
    Flag = false;

  moveGameCounter.checked = false || localStorage.getItem('removeGame');
  moveGameCounterFunc();

  changeColor.checked = false || localStorage.getItem('theme');
  changeColorFunc();

  hideDJK.checked = false || localStorage.getItem('showDJK');


  //начало игры
  for (let i = 0; i < 2; i++) {
    addCard(tableListYou, cardCounterYour, tableCountYou, 'you');
    addCard(tableListRival, cardCounterRival, tableCountRival, 'rival');
  }


  try {
    for (let i = 0; i < barCounter.length; i++) {
      localBar(barCounter[i]);
    }
  } catch (e) {
    console.log('array length == 0');
  }

  gameCount.forEach((e, i) => {
    if (e > 0) {
      if (i == 0) {
        gameItem[i].textContent = e;
        gameItem[i].style.color = '#01a29a9f';
      } else if (i == 1) {
        gameItem[i].textContent = e;
        gameItem[i].style.color = '#ccc';
      } else {
        gameItem[i].textContent = e;
        gameItem[i].style.color = '#b00020';
      }
    }
  });


  winrate.textContent = 'winrate: ' + (Math.floor(gameCount[0] * 100 / gameCount[2]) || 0) + '%';

  //функция по добавлению карт
  function addCard(tableSelector, cardArray, countSelector, countArrayClassList) {
    if (cardArray.length < 5 && countSelector.textContent <= 21) {
      let random = Math.floor((Math.random() * 9) + 2);
      cardArray.push(random); //пушим значение из карты в массив

      if (!hideDJK.checked) {
        if (random == 2) {
          random = 'J';
        } else if (random == 3) {
          random = 'D';
        } else if (random == 4) {
          random = 'K';
        }
      }

      const tableItem = document.createElement('li');
      tableItem.classList.add('table__item', 'fade-left');
      // if (random == 'T') {
      //   tableItem.innerHTML = `
      //   <div class ="card" style = "border: 1px solid rgb(255, 118, 0);" >
      //     <div div class = "card__name">${random}</div>
      //   </div>`;
      // }else {
      tableItem.innerHTML = `
      <div class="card">
        <div class="card__name">${random}</div>
      </div>`;
      // }

      tableSelector.append(tableItem);

      addArray(cardArray, countSelector);

      adaptiveCountArray(cardArray, countArrayClassList);

    }
  }

  hideDJK.addEventListener('change', () => {
    if (hideDJK.checked) {
      localStorage.setItem('showDJK', true);
    } else {
      localStorage.removeItem('showDJK');
    }
  });


  //считает элементы масива
  function addArray(array, countSelector) {
    let x = 0;
    array.forEach(element => {
      x += element;
      countSelector.textContent = x;
    });

    if (countSelector.textContent == 21) {
      countSelector.style.color = '#ff7600';
    } else if (countSelector.textContent > 21) {
      countSelector.style.color = 'rgb(176, 0, 32)';
    } else {
      countSelector.style.color = '';
    }

    if (tableCountYou.textContent > 21 && !flag) {
      flag = true;
      endGame('lose', '#b00020');
    }

    if (cardCounterYour.length == 5 && tableCountYou.textContent <= 21 || tableCountYou.textContent == 21) {
      firstTime = true;
      loseWinRival();
    }
  }

  btnFold.addEventListener('click', loseWinRival);

  function loseWinRival() {

    btnMore.disabled = true;
    btnFold.disabled = true;
    
    
    //если число диллера равно твоему ччислу и флаг не неправда
    if (+tableCountRival.textContent == +tableCountYou.textContent && !flag) {
      flag = true;
      endGame('draw', '#ccc');
    }
    
    if (+tableCountRival.textContent < 21 && +tableCountRival.textContent < +tableCountYou.textContent &&
      cardCounterRival.length < 5) {
      if (!firstTime) {
        firstTime = true;
        addCard(tableListRival, cardCounterRival, tableCountRival, 'rival');
        loseWinRival();
      } else {
        setTimeout(() => {
          addCard(tableListRival, cardCounterRival, tableCountRival, 'rival');
          loseWinRival();
        }, 1000);
      }
    }

    if (+tableCountRival.textContent > 21 && !flag) {
      flag = true;
      endGame('win', '#01a29a9f');
    }

    //если число диллера меньше/равно числу 21 и твое число меньше числа диллера и флаг не неправда
    if (+tableCountYou.textContent < +tableCountRival.textContent && !flag) {
      flag = true;
      endGame('lose', '#b00020');
    }

    if (+tableCountRival.textContent < 21 && +tableCountYou.textContent > +tableCountRival.textContent &&
      cardCounterRival.length == 5) {
      flag = true;
      endGame('win', '#01a29a9f');
    }
  }

  function winrateCounter() {
    winrate.textContent = 'winrate: ' + (Math.floor(gameCount[0] * 100 / gameCount[2]) || 0) + '%';

    if (winrate.textContent.replace(/[^0-9]/g, "") > 100 || winrate.textContent == 'winrate: Infinity%') {
      winrate.textContent = 'winrate: 100%';
    }
  }


  function endGame(text, color) {
    setTimeout(() => {
      body.classList.add('wrapp-popup');
      table.style.cssText = 'filter: blur(8px);';

      endGamePopup.style.display = 'flex';
      endGamePopup.style.boxShadow = `0px 0px 20px 0px ${color}`;
      endGamePopup.style.borderColor = color;
      endGamePopup.classList.add('fade');

      endGamePopupText.textContent = text;
      endGamePopupText.style.color = color;
      bar.classList.add('animate-bar');
    }, 500);

    allCardNum = [];

    localBar(text);
    barCounter.push(text);
    localStorage.setItem('bar', JSON.stringify(barCounter));

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        restartGame();
      }
    });

    body.addEventListener('click', (e) => {
      if (e.target === body && endGamePopup.style.display == 'flex') {
        restartGame();
      }
    });

    if (text == 'win') {
      gameItem[0].textContent = ++gameCount[0];
      gameItem[0].style.color = '#01a29a9f';
    } else if (text == 'draw') {
      gameItem[1].textContent = ++gameCount[1];
      gameItem[1].style.color = '#ccc';
    } else {
      gameItem[2].textContent = ++gameCount[2];
      gameItem[2].style.color = '#b00020';
    }

    localStorage.setItem('gameCount', JSON.stringify(gameCount));

    winrateCounter();

  }



  function localBar(text) {
    const barItem = document.createElement('li');
    barItem.classList.add('bar__item', 'bar__item-anim', `bar__item--${text}`);
    if (barCounter.length > 20) {
      barCounter.splice(1, 1);
      bar.removeChild(bar.lastChild);
    }
    bar.prepend(barItem);
  }


  function restartGame() {
    cardCounterYour = [];
    cardCounterRival = [];
    flag = false;
    firstTime = false;

    btnMore.disabled = false;
    btnFold.disabled = false;

    tableCountRival.textContent = '';
    tableCountYou.textContent = '';

    body.classList.remove('wrapp-popup');
    bar.classList.remove('animate-bar');
    table.style.cssText = '';

    endGamePopup.style.display = '';
    endGamePopup.style.borderColor = '';

    tableListYou.innerHTML = '';
    tableListRival.innerHTML = '';

    document.querySelectorAll('.table__count-list').forEach(e => e.textContent = '');


    for (let i = 0; i < 2; i++) {
      addCard(tableListYou, cardCounterYour, tableCountYou, 'you');
      addCard(tableListRival, cardCounterRival, tableCountRival, 'rival');
    }
  }


  function adaptiveCountArray(array, countArrayClassList) {
    const countArray = document.querySelector(`.table__count-list--${countArrayClassList}`);
    const countArrayItem = document.createElement('li');
    countArrayItem.classList.add('table__count-item');

    array.forEach(item => {
      countArrayItem.innerHTML = item;
      countArray.prepend(countArrayItem);
    });
  }

  function showRules() {
    if (instructionPopup.style.display == 'block') {
      body.classList.remove('wrapp-popup');
      table.style.cssText = '';
      instructionPopup.style.display = '';
      instructionPopup.classList.remove('fade');
    } else {
      body.classList.add('wrapp-popup');
      table.style.cssText = 'filter: blur(8px);';
      instructionPopup.style.display = 'block';
      instructionPopup.classList.add('fade');
    }

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        showRules();
      }
    });

    body.addEventListener('click', (e) => {
      if (e.target === body && instructionPopup.style.display == 'block') {
        showRules();
      }
    });
  }

  function showSettings() {
    if (settingsPopup.style.display == 'block') {
      body.classList.remove('wrapp-popup');
      table.style.cssText = '';
      settingsPopup.style.display = '';
      settingsPopup.classList.remove('fade');
      settingsBtn.classList.remove('settings-btn--active');
    } else {
      body.classList.add('wrapp-popup');
      table.style.cssText = 'filter: blur(8px);';
      settingsPopup.style.display = 'block';
      settingsPopup.classList.add('fade');
      settingsBtn.classList.remove('active');
      settingsBtn.classList.add('settings-btn--active');
    }

    settingsPopupClose.addEventListener('click', () => {
      showSettings();
    });

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        showSettings();
      }
    });

    body.addEventListener('click', (e) => {
      if (e.target === body && settingsPopup.style.display == 'block') {
        showSettings();
      }
    });
  }


  clearBarSetting.addEventListener('click', () => {
    localStorage.removeItem("bar");
    barCounter = [];
    bar.textContent = '';
  });

  clearCoutBar.addEventListener('click', () => {
    localStorage.removeItem("gameCount");
    gameCount = [0, 0, 0];
    winrateCounter();
    gameCount.forEach((e, i) => {
      gameItem[i].textContent = e;
      gameItem[i].style.color = 'rgb(119, 113, 113)';
    });
    // bar.textContent = '';
  });

  moveGameCounter.addEventListener('click', moveGameCounterFunc);

  function moveGameCounterFunc() {
    if (moveGameCounter.checked) {
      gameList.classList.add('game__list--active');
      header.append(gameList);
      localStorage.setItem('removeGame', true);
    } else {
      gameList.classList.remove('game__list--active');
      settingsPopup.append(gameList);
      localStorage.removeItem('removeGame');
    }
  }


  settingsBtn.addEventListener('click', showSettings);


  instructionBtn.addEventListener('click', showRules);
  instructionClose.addEventListener('click', showRules);


  btnMore.addEventListener('click', () => addCard(tableListYou, cardCounterYour, tableCountYou, 'you'));
  endGamePopupBtn.addEventListener('click', restartGame);


  function changeColorFunc() {
    if (!changeColor.checked) {
      document.querySelector('body').classList.remove('white-theme');
      localStorage.removeItem('theme');
    } else {
      document.querySelector('body').classList.add('white-theme');
      localStorage.setItem('theme', true);
    }
  }

  changeColor.addEventListener('change', changeColorFunc);
});