import classNames from 'classnames';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { toggleGameCounter, changeTheme, toggleJDK, toggleHideHud } from '../../redux/slices/settingsSlice';
import { clearBarStorage, clearGameCounter } from '../../redux/slices/cardsSlice';
import usePopup, { PopupReturn } from '../../hooks/usePopup';
import { RootState, useAppDispatch } from '../../redux/store';
import settingsImg from '../../assets/img/settings.svg';
import './settingsBar.scss';

type SettingsBar = {
  counterItems: React.ReactNode[];
};

type SettingsPopup = SettingsBar & PopupReturn;

const SettingsBar: React.FC<SettingsBar> = ({ counterItems }) => {
  const { showPopup, onShowPopup, popupRef } = usePopup({
    className: 'popup--show',
    btnClassName: 'settings-btn',
  });

  return (
    <>
      <button
        className={classNames('settings-btn', { 'settings-btn--active': showPopup })}
        onClick={() => onShowPopup(true)}>
        <img src={settingsImg} alt='settingsImg' style={{ maxWidth: '50px' }} />
      </button>

      <SettingsPopup
        showPopup={showPopup}
        onShowPopup={onShowPopup}
        popupRef={popupRef}
        counterItems={counterItems}
      />
    </>
  );
};

const SettingsPopup: React.FC<SettingsPopup> = ({ showPopup, onShowPopup, popupRef, counterItems }) => {
  const dispatch = useAppDispatch();
  const gameCounter = useSelector((state: RootState) => state.cards.gameCounter);
  const { gameCounterMain, theme, hideJDK, hideHUD } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    theme === 'white'
      ? document.body.classList.add(`theme-${theme}`)
      : (document.body.className = 'wrapp-popup');
  }, [theme]);

  const clearGames = () => {
    dispatch(clearGameCounter());
    dispatch(clearBarStorage());
  };

  return (
    <div ref={popupRef} className={classNames('popup settings-popup', { 'popup--show': showPopup })}>
      <h3 className='settings-popup__title'>settings</h3>
      <ul>
        <li className='settings-popup__item'>
          <label className='settings-popup__label'>
            <input
              className='settings-popup__checkbox move-game-counter'
              defaultChecked={gameCounterMain}
              onChange={(e) => dispatch(toggleGameCounter(e.target.checked))}
              type='checkbox'
            />
            <div></div>
            <p className='settings-popup__text'>move the game counter to the main screen</p>
          </label>
        </li>

        <li className='settings-popup__item'>
          <label className='settings-popup__label'>
            <input
              className='settings-popup__checkbox move-game-counter'
              defaultChecked={hideJDK}
              onChange={(e) => dispatch(toggleJDK(e.target.checked))}
              type='checkbox'
            />
            <div></div>
            <p className='settings-popup__text'>hide J, D, K</p>
          </label>
        </li>

        <li className='settings-popup__item'>
          <label className='settings-popup__label'>
            <input
              className='settings-popup__checkbox move-game-counter'
              onChange={(e) => dispatch(toggleHideHud(e.target.checked))}
              defaultChecked={hideHUD}
              type='checkbox'
            />
            <div></div>
            <p className='settings-popup__text'>hide HUD</p>
          </label>
        </li>

        <li className='settings-popup__item clear-bar'>
          <button onClick={clearGames} className='settings-popup__label settings-popup__label--line'>
            <div></div>
            <p className='settings-popup__text settings-popup__text--line'>clear the game story</p>
          </button>
        </li>
      </ul>

      <span onClick={() => onShowPopup(false)} className='popup__close settings-popup__close '>
        &#10006;
      </span>

      <ul className='counter'>{(hideHUD || !gameCounterMain) && counterItems}</ul>

      <div className='theme-change'>
        <input
          type='checkbox'
          className='checkbox'
          onChange={() => dispatch(changeTheme())}
          defaultChecked={theme === 'white'}
          id='chk'
        />
        <label className='theme-change__btn' htmlFor='chk'>
          <span className='theme-change__name'>D</span>
          <span className='theme-change__name'>W</span>
          <div className='theme-change__ball'></div>
        </label>
      </div>

      <span className='settings-popup__winrate'>
        winrate: {Math.floor((gameCounter[0] / (gameCounter[0] + gameCounter[2])) * 100) || 0} %
      </span>
    </div>
  );
};

export default SettingsBar;
