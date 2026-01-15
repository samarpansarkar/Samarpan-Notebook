import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedTheme = window.localStorage.getItem("theme");
    if (storedTheme) {
      return storedTheme;
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  }
  return "light";
};

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: getInitialTheme(),
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      // Side effect: update document class and localStorage
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(state.mode);
      localStorage.setItem("theme", state.mode);
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(state.mode);
      localStorage.setItem("theme", state.mode);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

// Initialize theme on load (needs to be called or handled via effect elsewhere,
// but reducer side-effect logic above handles updates.
// Ideally, initialization logic runs once.
// For Redux, it's often cleaner to handle side-effects in middleware or components,
// but direct DOM manipulation in reducers is generally discouraged.
// However, for this simple migration, keeping it similar to Context's behavior is simplest,
// OR we move the DOM updates to a subscriber/component.
// Let's stick to the reducer updating state, and we'll add a listener in App or use an effect component.
// Re-reading: Effect in Context handled this. We should replicate that Effect in a top-level component.
// I will keep the reducer pure-ish (updating state) and move DOM effects to MainLayout or similar.
export default themeSlice.reducer;
