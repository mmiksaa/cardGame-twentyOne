import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { CardBlock, Button, Github } from '..';
import { desicionType, removeCard, setEndGame } from '../../redux/slices/cardsSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import './table.scss';

type currentCards = {
  dealer: number[];
  you: number[];
  totalDealer: number;
  totalYou: number;
};

const Table: React.FC = () => {
  const dispatch = useAppDispatch();

  const { allCards, endGame, restartGame, tableBlur } = useSelector((state: RootState) => state.cards);
  const hideJDK = useSelector((state: RootState) => state.settings.hideJDK);
  const [currentCards, setCurrentCards] = useState<currentCards>({
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
    //restart the game (puts state on the first pos)

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

    const winCond =
      dealer > 21 || (dealer < you && currentCards.dealer.length === 5) || (dealer === 20 && you === 21);

    const loseCond =
      you > 21 ||
      (you < dealer && giveDealerCart) ||
      (you === 20 && dealer === 21) ||
      (you <= 21 && you < dealer && currentCards.you.length === 5);

    const drawCond = giveDealerCart && dealer === you && (dealer >= 16 || currentCards.dealer.length === 5);

    const giveMoreCond = giveDealerCart || you === 21 || (you <= 21 && currentCards.you.length === 5);

    const setСondition = (condition: boolean, endGame: desicionType) => {
      if (condition && !flag) {
        flag = true;
        setTimeout(() => dispatch(setEndGame(endGame)), 500);
      }
    };

    setСondition(winCond, 'win');
    setСondition(loseCond, 'lose');
    setСondition(drawCond, 'draw');
    if (giveMoreCond && !flag) giveCardToDealer();

    // eslint-disable-next-line
  }, [currentCards, giveDealerCart]);

  const createCard = (key: string) => {
    const totalKey = 'total' + key[0].toUpperCase() + key.slice(1);

    const obj = { ...currentCards };
    const arrayCards = obj[key as keyof currentCards];
    let totalCards = obj[totalKey as keyof currentCards];

    if (
      Array.isArray(arrayCards) &&
      arrayCards.length < 5 &&
      typeof totalCards === 'number' &&
      totalCards < 21
    ) {
      let random = Math.floor(Math.random() * allCards.length);

      arrayCards.push(allCards[random]);
      totalCards = arrayCards.reduce((total, current) => total + current, 0);

      (obj[totalKey as keyof currentCards] as number) = totalCards;

      dispatch(removeCard(random));
      setCurrentCards(obj);

      setDisableBtnFold(obj.totalYou < obj.totalDealer || obj.totalYou >= 21);
      setDisableBtnMore(obj.totalDealer > 21 || obj.totalYou >= 21 || obj.you.length === 5);

      return { random, obj };
    }
  };

  const giveCardToDealer = (withTimeOut = true) => {
    if (withTimeOut) {
      setTimeout(() => {
        createCard('dealer');
        setGiveDealerCart(true);
      }, 800);
    } else {
      if (currentCards.totalDealer === currentCards.totalYou && currentCards.totalDealer >= 15) {
        setGiveDealerCart(true);
      } else {
        setGiveDealerCart(true);
        createCard('dealer');
      }
    }

    setDisableBtnFold(true);
  };

  const createCardBlock = (key: string) => {
    const obj = currentCards[key as keyof currentCards];

    if (typeof obj === 'object') {
      return obj.map((item, index) => (
        <li key={index} className='table__item'>
          <CardBlock hideJDK={hideJDK}>{item}</CardBlock>
        </li>
      ));
    }
  };

  const createMiniCard = (key: string) => {
    const obj = currentCards[key as keyof currentCards];
    const arr = obj && typeof obj === 'object' ? [...obj].reverse() : false;
    return (
      arr &&
      arr.map((item, index) => (
        <li key={index} className='table__count-item'>
          {item}
        </li>
      ))
    );
  };

  return (
    <div className={classNames('table', { 'table--blur': endGame || tableBlur })}>
      <div className='table__inner'>
        <ul className='table__count-list'>{createMiniCard('you')}</ul>
        <ul className='table__list'>{createCardBlock('you')}</ul>
        <span
          className={classNames('table__count', {
            'table__count--gold': currentCards.totalYou === 21,
            'table__count--lose': currentCards.totalYou > 21,
          })}>
          {currentCards.totalYou}
        </span>
      </div>

      <div className='table__inner'>
        <ul className='table__count-list'>{createMiniCard('dealer')}</ul>
        <ul className='table__list'>{createCardBlock('dealer')}</ul>
        <span
          className={classNames('table__count', {
            'table__count--gold': currentCards.totalDealer === 21,
            'table__count--lose': currentCards.totalDealer > 21,
          })}>
          {currentCards.totalDealer}
        </span>
      </div>

      <div className='table__adaptive'>
        <div className='table__btns'>
          <Button
            className='table__btn table__btn--more'
            onClickFunc={() => createCard('you')}
            disabled={disableBtnMore}>
            more
          </Button>
          <Button
            className='table__btn table__btn--fold'
            onClickFunc={() => giveCardToDealer(false)}
            disabled={disableBtnFold}>
            fold
          </Button>
        </div>

        <Github className='github github__adaptive' />
      </div>
    </div>
  );
};

export default Table;
