import ReactDOM from 'react-dom';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { Button } from '../';
import { restartGame } from '../../redux/slices/cardsSlice';
import './endGame.scss';

function EndGame() {
  const { endGame } = useSelector((state) => state.cards);
  const dispatch = useDispatch();
  const endGameRef = useRef();

  const onStartNewGame = () => dispatch(restartGame());

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.popup--show-df') && endGameRef.current.classList.contains('popup--show-df')) {
        onStartNewGame();
      }
    };

    document.body.addEventListener('click', handleOutsideClick);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (endGame) document.body.classList.add('wrapp-popup');
    else document.body.classList.remove('wrapp-popup');
  }, [endGame]);

  return (
    <Portal>
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
    </Portal>
  );
}

const Portal = ({ children }) => ReactDOM.createPortal(children, document.body);

export default EndGame;
