import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: JSON.parse(localStorage.getItem('theme')) || 'dark',
  gameCounterMain: JSON.parse(localStorage.getItem('counterMain')),
  hideJDK: JSON.parse(localStorage.getItem('hideJDK')),
  hideHUD: JSON.parse(localStorage.getItem('hideHUD'))
};

const settingsSlise = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleGameCounter: (state, action) => {
      state.gameCounterMain = action.payload;
      localStorage.setItem('counterMain', JSON.stringify(state.gameCounterMain));
    },

    changeTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'white' : 'dark';
      localStorage.setItem('theme', JSON.stringify(state.theme));
    },

    toggleJDK: (state, action) => {
      state.hideJDK = action.payload;
      localStorage.setItem('hideJDK', JSON.stringify(state.hideJDK));
    },

    toggleHideHud: (state, action) => {
      state.hideHUD = action.payload;
      localStorage.setItem('hideHUD', JSON.stringify(state.hideHUD));
    },
  }
});

const { actions, reducer } = settingsSlise;

export default reducer;
export const {
  toggleGameCounter,
  changeTheme,
  toggleJDK,
  toggleHideHud
} = actions;
