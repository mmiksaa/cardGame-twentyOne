import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type desicionType = 'win' | 'draw' | 'lose' | '';

interface cardsSliseState {
  allCards: number[];
  endGame: desicionType;
  restartGame: boolean;
  tableBlur: boolean;
  barStorage: string[][];
  gameCounter: number[];
}

const barStorage = localStorage.getItem('bar');
const gameCounterStorage = localStorage.getItem('gameCount');

const initialState: cardsSliseState = {
  allCards: [
    2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 11,
    11, 11, 11,
  ],
  endGame: '',
  restartGame: false,
  tableBlur: false,
  barStorage: barStorage !== null ? JSON.parse(barStorage) : [],
  gameCounter: gameCounterStorage !== null ? JSON.parse(gameCounterStorage) : [0, 0, 0],
};

const cardsSlise = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    removeCard: (state, action: PayloadAction<number>) => {
      state.allCards.splice(action.payload, 1);
    },

    setEndGame: (state, action: PayloadAction<desicionType>) => {
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
      state.endGame = '';
      state.restartGame = state.restartGame ? false : true;
      state.tableBlur = false;
      state.allCards = initialState.allCards;
    },

    setBarStorage: (state, action: PayloadAction<string[]>) => {
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

    tableBlur: (state, action: PayloadAction<boolean>) => {
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
  setBarStorage,
  tableBlur,
  clearGameCounter,
  clearBarStorage,
} = actions;
