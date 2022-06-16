import classNames from 'classnames';
import ReactDOM from 'react-dom';

import usePopup from '../../hooks/usePopup';
import './instruction.scss';

function Instruction({ hideHUD }) {
  const { showPopup, onShowPopup, popupRef } = usePopup('popup--show', 'instruction');

  return (
    <>
      <button
        onClick={() => onShowPopup(true)}
        className={classNames('instruction', { hideHUD })}>
        <div className="card instruction__card">
          <div className="card__name instruction__name">?</div>
        </div>
      </button>

      <Portal>
        <InstructionPopup showPopup={showPopup} onShowPopup={onShowPopup} popupRef={popupRef} />
      </Portal>
    </>
  );
}

const Portal = ({ children }) => ReactDOM.createPortal(children, document.body);

function InstructionPopup({ showPopup, onShowPopup, popupRef }) {
  return (
    <div
      ref={popupRef}
      className={classNames('popup instruction-popup fade', { 'popup--show': showPopup })}>
      <h1 className="instruction-popup__title">twenty one</h1>

      <ul className="instruction-popup__item">
        <li>
          <h2 className="instruction-popup__win">win</h2>
        </li>
        <li>1) if you score more points than the dealer.</li>
        <li>2) if the sum of points on the dealer's cards is more than 21.</li>
      </ul>

      <ul className="instruction-popup__item">
        <li>
          <h2 className="instruction-popup__lose">lose</h2>
        </li>
        <li>1) if you score more than 21.</li>
        <li>2) if you score less points than the dealer.</li>
      </ul>

      <ul className="instruction-popup__item">
        <li>
          <h2 className="instruction-popup__extra">extra</h2>
        </li>
        <li>
          1) you can get a draw if your number is equal to the dealer's number and less than 21.
        </li>
        <li>2) you/dealer cannot take more than 5 cards</li>
        <li>3) minimum cards at table 2</li>
        <li>4) J-2, Q-3, K-4, other cards are equal to their number</li>
        <li>5) cards can be repeated more than 4 times</li>
      </ul>

      <span onClick={() => onShowPopup(false)} className="popup__close instruction-popup__close">
        &#10006;
      </span>
    </div>
  );
}

export default Instruction;
