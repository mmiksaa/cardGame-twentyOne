import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCards: [
    [2, 'peak'], [2, 'hearts'], [2, 'diamonds'], [2, 'clubs'],
    [3, 'peak'], [3, 'hearts'], [3, 'diamonds'], [3, 'clubs'],
    [4, 'peak'], [4, 'hearts'], [4, 'diamonds'], [4, 'clubs'],
    [6, 'peak'], [6, 'hearts'], [6, 'diamonds'], [6, 'clubs'],
    [7, 'peak'], [7, 'hearts'], [7, 'diamonds'], [7, 'clubs'],
    [8, 'peak'], [8, 'hearts'], [8, 'diamonds'], [8, 'clubs'],
    [9, 'peak'], [9, 'hearts'], [9, 'diamonds'], [9, 'clubs'],
    [10, 'peak'], [10, 'hearts'], [10, 'diamonds'], [10, 'clubs'],
    [11, 'peak'], [11, 'hearts'], [11, 'diamonds'], [11, 'clubs']
  ],
  
  endGame: false,
  restartGame: 0,
  tableBlur: false,
  barStorage: JSON.parse(localStorage.getItem('bar')) || [],
  gameCounter: JSON.parse(localStorage.getItem('gameCount')) || [0, 0, 0],
  settings: {
    theme: JSON.parse(localStorage.getItem('theme')) || 'dark',
    gameCounterMain: JSON.parse(localStorage.getItem('counterMain')),
    hideJDK: JSON.parse(localStorage.getItem('hideJDK')), 
    hideHUD: JSON.parse(localStorage.getItem('hideHUD')), 
  }
}

const cardsSlise = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    removeCard: (state, action) => { state.allCards.splice(action.payload, 1); },
    
    setEndGame: (state, action) => { 
      state.endGame = action.payload;

      switch(action.payload) {
        case 'win':  state.gameCounter[0]++; break;
        case 'draw':  state.gameCounter[1]++; break;
        case 'lose':  state.gameCounter[2]++; break;
      }

      localStorage.setItem('gameCount', JSON.stringify(state.gameCounter));
    },

    onRestartGame: (state) => { 
      state.endGame = false;
      state.restartGame = state.restartGame ? 0 : 1;
      state.tableBlur = false
      state.allCards = initialState.allCards
    },
    
    // clearRestartGame: (state) => { state.restartGame = false; },

    setBarStorage: (state, action) => { 
      if (state.barStorage.length > 20) { state.barStorage.splice(-1, 1); }
      state.barStorage.unshift(action.payload);
      localStorage.setItem('bar', JSON.stringify(state.barStorage));
    },

    onTableBlur: (state, action) => { state.tableBlur = action.payload },

    toggleGameCounter: (state, action) => { 
      state.settings.gameCounterMain = action.payload;
      localStorage.setItem('counterMain', JSON.stringify(state.settings.gameCounterMain));
    },
    
    changeTheme: ({settings}) => {
      settings.theme = settings.theme === 'dark' ? 'white' : 'dark';
      localStorage.setItem('theme', JSON.stringify(settings.theme));
    },

    toggleJDK: (state, action) => { 
      state.settings.hideJDK = action.payload;
      localStorage.setItem('hideJDK', JSON.stringify(state.settings.hideJDK));
    },

    toggleHideHud: (state, action) => {
      state.settings.hideHUD = action.payload;
      localStorage.setItem('hideHUD', JSON.stringify(state.settings.hideHUD));
    }
  }
})

const { actions, reducer } = cardsSlise;

export default reducer;
export const {
  removeCard,
  setEndGame,
  onRestartGame,
  clearRestartGame,
  setBarStorage,
  onTableBlur,
  toggleGameCounter,
  changeTheme,
  toggleJDK,
  toggleHideHud
} = actions;