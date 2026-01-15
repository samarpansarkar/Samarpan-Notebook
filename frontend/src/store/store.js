import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import subjectReducer from "./slices/subjectSlice";
import topicReducer from "./slices/topicSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    subjects: subjectReducer,
    topics: topicReducer,
  },
  // We can add middleware here if needed, specifically serializableCheck might alert on functions if not handled
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disabling for now to avoid issues if we accidentally put non-serializable data (like icons) in, though I tried to avoid it.
    }),
});
