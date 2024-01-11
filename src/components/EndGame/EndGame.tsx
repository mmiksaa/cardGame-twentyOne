import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { Button } from '..';
import { RootState, useAppDispatch } from '../../redux/store';
import { restartGame } from '../../redux/slices/cardsSlice';
import './endGame.scss';

const EndGame: React.FC = () => {
  const { endGame } = useSelector((state: RootState) => state.cards);
  const dispatch = useAppDispatch();
  const endGameRef = useRef<HTMLDivElement>(null);

  const onStartNewGame = () => dispatch(restartGame());

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const event = e.target as HTMLBodyElement;

      if (
        !event.closest('.popup--show-df') &&
        endGameRef.current &&
        endGameRef.current.classList.contains('popup--show-df')
      ) {
        onStartNewGame();
      }
    };

    document.body.addEventListener('click', handleOutsideClick);

    // return () => document.body.removeEventListener('click', handleOutsideClick);
  }, []);

  useEffect(() => {
    if (endGame) document.body.classList.add('wrapp-popup');
    else document.body.classList.remove('wrapp-popup');
  }, [endGame]);

  return (
    <div
      ref={endGameRef}
      className={classNames('popup', 'end-game-popup', endGame, {
        'popup--show-df': endGame,
      })}>
      <p className='end-game-popup__text'>{endGame}</p>
      <Button onClickFunc={onStartNewGame} className='end-game-popup__btn'>
        resume
      </Button>
    </div>
  );
};

export default EndGame;
