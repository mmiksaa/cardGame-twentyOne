import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import classNames from 'classnames';

import { setBarStorage } from '../../redux/slices/cardsSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import './gameBar.scss';

type GameBar = {
  hideHUD: boolean;
};
const GameBar: React.FC<GameBar> = ({ hideHUD }) => {
  const dispatch = useAppDispatch();
  const barStorage = useSelector((state: RootState) => state.cards.barStorage);
  const endGame = useSelector((state: RootState) => state.cards.endGame);

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
    <ul className={classNames('game-bar', { 'game-bar-animate': endGame, hideHUD })}>{createItems()}</ul>
  );
};

export default GameBar;
