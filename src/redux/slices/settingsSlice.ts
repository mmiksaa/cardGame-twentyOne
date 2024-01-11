import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface settingsSliceState {
  theme: 'white' | 'dark';
  gameCounterMain: boolean;
  hideJDK: boolean;
  hideHUD: boolean;
}

const themeStorage = localStorage.getItem('theme');
const counterMainStorage = localStorage.getItem('counterMain');
const hideJDKStorage = localStorage.getItem('hideJDK');
const hideHUDStorage = localStorage.getItem('hideHUD');

const initialState: settingsSliceState = {
  theme: themeStorage !== null ? JSON.parse(themeStorage) : 'dark',
  gameCounterMain: counterMainStorage !== null ? JSON.parse(counterMainStorage) : '',
  hideJDK: hideJDKStorage !== null ? JSON.parse(hideJDKStorage) : '',
  hideHUD: hideHUDStorage !== null ? JSON.parse(hideHUDStorage) : '',
};

const settingsSlise = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleGameCounter: (state, action: PayloadAction<boolean>) => {
      state.gameCounterMain = action.payload;
      localStorage.setItem('counterMain', JSON.stringify(state.gameCounterMain));
    },

    changeTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'white' : 'dark';
      localStorage.setItem('theme', JSON.stringify(state.theme));
    },

    toggleJDK: (state, action: PayloadAction<boolean>) => {
      state.hideJDK = action.payload;
      localStorage.setItem('hideJDK', JSON.stringify(state.hideJDK));
    },

    toggleHideHud: (state, action: PayloadAction<boolean>) => {
      state.hideHUD = action.payload;
      localStorage.setItem('hideHUD', JSON.stringify(state.hideHUD));
    },
  },
});

const { actions, reducer } = settingsSlise;

export default reducer;
export const { toggleGameCounter, changeTheme, toggleJDK, toggleHideHud } = actions;
