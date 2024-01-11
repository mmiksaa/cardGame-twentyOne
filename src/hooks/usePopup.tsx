import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { tableBlur } from '../redux/slices/cardsSlice';
import { RootState, useAppDispatch } from '../redux/store';

type PopupPropse = {
  className: string;
  btnClassName: string;
};

export type PopupReturn = {
  showPopup: boolean;
  onShowPopup: (boolean: boolean) => void;
  popupRef: React.RefObject<HTMLDivElement>;
};

const usePopup: (props: PopupPropse) => PopupReturn = ({ className, btnClassName }) => {
  const dispatch = useAppDispatch();
  const endGame = useSelector((state: RootState) => state.cards.endGame);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const event = e.target as HTMLBodyElement;

      if (
        !event.closest('.' + className) &&
        popupRef.current &&
        popupRef.current.classList.contains(className) &&
        !event.closest('.' + btnClassName)
      ) {
        setShowPopup(false);
        dispatch(tableBlur(false));
      }
    };

    document.body.addEventListener('click', handleOutsideClick);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setShowPopup(false);
  }, [endGame]);

  const onShowPopup = (boolean: boolean) => {
    setShowPopup(boolean);
    dispatch(tableBlur(boolean));
  };

  useEffect(() => {
    if (showPopup) {
      document.body.classList.add('wrapp-popup');
    } else {
      document.body.classList.remove('wrapp-popup');
    }
  }, [showPopup]);

  return {
    showPopup,
    onShowPopup,
    popupRef,
  };
};

export default usePopup;
