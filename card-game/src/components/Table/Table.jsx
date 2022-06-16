import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { CardBlock, Button, GithubSvg } from '../';
import { removeCard, setEndGame } from '../../redux/cardsSlice';
import './table.scss'; 

window.dEnd = () => {
  document.body.classList.remove('wrapp-popup');
  document.querySelector('.end-game-popup').classList.remove('popup--show');
  document.querySelector('.table').classList.remove('table--blur');
};

function Table() {
  const dispatch = useDispatch();
  const { allCards, endGame, restartGame, tableBlur } = useSelector((state) => state.cards);
  const { hideJDK } = useSelector((state) => state.cards.settings);
  const [currentCards, setCurrentCards] = useState({
    dealer: [],
    you: [],
    totalDealer: 0,
    totalYou: 0,
  });

  const [flagStartGame, setFlagStartGame] = useState(1);
  const [disableBtnFold, setDisableBtnFold] = useState(false);
  const [disableBtnMore, setDisableBtnMore] = useState(false);
  const [giveDealerCart, setGiveDealerCart] = useState(false);

  useEffect(() => {
    //restart the game (puts state on them first pos)

    setFlagStartGame(1);
    setCurrentCards({ dealer: [], you: [], totalDealer: 0, totalYou: 0 });
    setGiveDealerCart(false);
    // eslint-disable-next-line
  }, [restartGame]);

  useEffect(() => {
    if (flagStartGame <= 4) {
      flagStartGame <= 2 ? createCard('dealer') : createCard('you');
      setFlagStartGame((state) => state + 1);
    }
    // eslint-disable-next-line
  }, [flagStartGame]);

  useEffect(() => {
    let flag = false;
    const dealer = currentCards.totalDealer;
    const you = currentCards.totalYou;

    const loseCond =
      you > 21 ||
      (dealer <= 21 && dealer > you && giveDealerCart) ||
      (you < dealer && currentCards.you.length === 5);

    const drawCond = (giveDealerCart && dealer === you) || (dealer === 21 && dealer === you);
    const giveMoreCond =
      (giveDealerCart && !flag) || you === 21 || (you < 21 && currentCards.you.length === 5);

    function setСondition(condition, endGame) {
      if (condition) {
        flag = true;
        setTimeout(() => dispatch(setEndGame(endGame)), 500);
      }
    }

    setСondition(loseCond, 'lose');
    setСondition(dealer > 21 || (dealer < you && currentCards.dealer.length === 5), 'win');
    setСondition(drawCond, 'draw');
    if (giveMoreCond && !flag) {
      giveCardToDealer();
    }

    // eslint-disable-next-line
  }, [currentCards, giveDealerCart]);

  function createCard(key) {
    const totalKey = 'total' + key[0].toUpperCase() + key.slice(1);
    if (currentCards[key].length < 5 && currentCards[totalKey] < 21) {
      const obj = { ...currentCards };
      let random = Math.floor(Math.random() * allCards.length);

      obj[key].push(allCards[random]);
      obj[totalKey] = obj[key].reduce((total, current) => total + current[0], 0);

      dispatch(removeCard(random));
      setCurrentCards(obj);

      setDisableBtnFold(obj.totalYou < obj.totalDealer || obj.totalYou >= 21);
      setDisableBtnMore(obj.totalDealer > 21 || obj.totalYou >= 21 || obj.you.length === 5);
      return { random, obj };
    }
  }

  const onGiveCard = () => {
    createCard('you');
  };

  const giveCardToDealer = (withTimeOut = true) => {
    if (withTimeOut) {
      setTimeout(() => createCard('dealer'), 800);
    } else {
      createCard('dealer');
      setGiveDealerCart(true);
    }
    
    setDisableBtnFold(true);
  };

  const createCardBlock = (key) => {
    return currentCards[key] &&
      currentCards[key].map((item) => {
        return (
          <li key={`${item[0]}_${item[1]}`} className="table__item fade-left">
            <CardBlock hideJDK={hideJDK}>{item[0]}</CardBlock>
          </li>
        );
      });
  }

  return (
    <div className={classNames('table', { 'table--blur': endGame || tableBlur })}>
      <div className="table__inner">
        <ul className="table__count-list"></ul>
        <ul className="table__list">
          {createCardBlock('dealer')}
        </ul>
        <span
          className={classNames('table__count', {
            'table__count--gold': currentCards.totalDealer === 21,
            'table__count--lose': currentCards.totalDealer > 21,
          })}>
          {currentCards.totalDealer}
        </span>
      </div>

      <div className="table__inner">
        <ul className="table__count-list"></ul>
        <ul className="table__list">
          {createCardBlock('you')}
        </ul>
        <span
          className={classNames('table__count', {
            'table__count--gold': currentCards.totalYou === 21,
            'table__count--lose': currentCards.totalYou > 21,
          })}>
          {currentCards.totalYou}
        </span>
      </div>

      <div className="table__adaptive">
        <div className="table__btns">
          <Button
            className="table__btn table__btn--more"
            onClickFunc={onGiveCard}
            disabled={disableBtnMore}>
            more
          </Button>
          <Button
            className="table__btn table__btn--fold"
            onClickFunc={() => giveCardToDealer(false)}
            disabled={disableBtnFold}>
            fold
          </Button>
        </div>

        <GithubSvg className="github github__adaptive" />
      </div>
    </div>
  );
}

export default Table;
