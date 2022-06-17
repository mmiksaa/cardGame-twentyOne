import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import classNames from 'classnames';

import { setBarStorage } from '../../redux/slices/cardsSlice';
import './gameBar.scss';

function GameBar({ hideHUD }) {
  const dispatch = useDispatch();
  const barStorage = useSelector((state) => state.cards.barStorage);
  const endGame = useSelector((state) => state.cards.endGame);

  useEffect(() => {
    if (endGame) {
      const arr = [endGame, nanoid(5)];
      dispatch(setBarStorage(arr));
    }

    // eslint-disable-next-line
  }, [endGame]);

  const createItems = () => {
    return barStorage.map((item) => {
      return <li key={item[1]} className={`game-bar__item game-bar__item-anim game-bar__item--${item[0]}`} />;
    });
  };

  return (
    <Portal>
      <ul className={classNames('game-bar', { 'game-bar-animate': endGame, hideHUD })}>{createItems()}</ul>
    </Portal>
  );
}

const Portal = ({ children }) => ReactDOM.createPortal(children, document.body);

export default GameBar;
