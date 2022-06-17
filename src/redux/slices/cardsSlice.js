import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allCards: [
    2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 11,
    11, 11, 11,
  ],
  endGame: null,
  restartGame: 0,
  tableBlur: false,
  barStorage: JSON.parse(localStorage.getItem('bar')) || [],
  gameCounter: JSON.parse(localStorage.getItem('gameCount')) || [0, 0, 0],
};

const cardsSlise = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    removeCard: (state, action) => {
      state.allCards.splice(action.payload, 1);
    },

    setEndGame: (state, action) => {
      state.endGame = action.payload;

      switch (action.payload) {
        case 'win':
          state.gameCounter[0]++;
          break;
        case 'draw':
          state.gameCounter[1]++;
          break;
        case 'lose':
          state.gameCounter[2]++;
          break;
        default:
          console.log('cant set endGame');
      }

      localStorage.setItem('gameCount', JSON.stringify(state.gameCounter));
    },

    restartGame: (state) => {
      state.endGame = null;
      state.restartGame = state.restartGame ? 0 : 1;
      state.tableBlur = false;
      state.allCards = initialState.allCards;
    },

    setBarStorage: (state, action) => {
      if (state.barStorage.length > 20) {
        state.barStorage.splice(-1, 1);
      }
      state.barStorage.unshift(action.payload);
      localStorage.setItem('bar', JSON.stringify(state.barStorage));
    },

    clearBarStorage: (state) => {
      state.barStorage = [];
      localStorage.setItem('bar', JSON.stringify(state.barStorage));
    },

    clearGameCounter: (state) => {
      state.gameCounter = [0, 0, 0];
      localStorage.setItem('gameCount', JSON.stringify(state.gameCounter));
    },

    tableBlur: (state, action) => {
      state.tableBlur = action.payload;
    },
  },
});

const { actions, reducer } = cardsSlise;

export default reducer;
export const {
  removeCard,
  setEndGame,
  restartGame,
  clearRestartGame,
  setBarStorage,
  tableBlur,
  clearGameCounter,
  clearBarStorage,
} = actions;
