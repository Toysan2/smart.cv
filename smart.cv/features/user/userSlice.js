import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false, // domyślnie niezalogowany
  userData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
      // localStorage.setItem('isLoggedIn', true); // Przenieś do komponentu
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
      // localStorage.removeItem('isLoggedIn'); // Przenieś do komponentu
    },
    // Możesz dodać akcję inicjalizującą stan na podstawie localStorage
    initializeState: (state) => {
      state.isLoggedIn =
        typeof window !== "undefined"
          ? !!localStorage.getItem("isLoggedIn")
          : false;
      // Podobnie, możesz zaktualizować userData, jeśli jest przechowywane w localStorage
    },
  },
});

export const { login, logout, initializeState } = userSlice.actions;

export default userSlice.reducer;
