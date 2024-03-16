import { useMemo } from "react";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/userSlice";

export const initializeStore = (preloadedState) => {
  return configureStore({
    reducer: {
      // Assuming there's a user slice for handling user-related state
      user: userReducer,
      // Add other slices here as necessary
    },
    preloadedState,
  });
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
