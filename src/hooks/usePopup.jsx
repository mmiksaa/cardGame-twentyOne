import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { tableBlur } from '../redux/slices/cardsSlice';


function usePopup(className, btnClassName) {
  const dispatch = useDispatch();
  const endGame = useSelector(state => state.cards.endGame)
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef();
  
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        !e.target.closest('.' + className) &&
        popupRef.current.classList.contains(className) &&
        !e.target.closest('.' + btnClassName)
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
  }, [endGame])


  const onShowPopup = (boolean) => {
    setShowPopup(boolean);
    dispatch(tableBlur(boolean));
  }
  
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
}

export default usePopup;
