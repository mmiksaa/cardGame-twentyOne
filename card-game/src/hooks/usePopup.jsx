import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { onTableBlur } from '../redux/cardsSlice';


function usePopup(className, btnClassName) {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef();

  const onShowPopup = (boolean) => {
    setShowPopup(boolean);
    dispatch(onTableBlur(boolean));
  }

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        !e.target.closest('.' + className) &&
        popupRef.current.classList.contains(className) &&
        !e.target.closest('.' + btnClassName)
      ) {
        console.log('work');
        setShowPopup(false);
        dispatch(onTableBlur(false));
      }
    };

    document.body.addEventListener('click', handleOutsideClick);
    // eslint-disable-next-line
  }, []);

  
  //in useEffect i cant give a class on the body
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
