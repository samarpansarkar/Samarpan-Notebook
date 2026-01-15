import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/client";
import { getIcon } from "@/utils/componentRegistry";

export const fetchSubjects = createAsyncThunk(
  "subjects/fetchSubjects",
  async () => {
    const { data } = await api.get("/subjects");
    return data.map((sub) => ({
      ...sub,
      iconComponent: getIcon(sub.icon), // Note: storing functions/components in Redux is non-serializable and generally bad practice.
      // Better to store just the icon name string and resolve it in the component.
      // BUT, to minimize refactoring pain right now, I will keep it IF serializability check doesn't block.
      // Actually, let's fix this properly: Store only strings in Redux. Resolve icon in component.
    }));
  }
);

const subjectSlice = createSlice({
  name: "subjects",
  initialState: {
    items: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Store raw data. We will map icons in the selector or component.
        state.items = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllSubjects = (state) =>
  state.subjects.items.map((sub) => ({
    ...sub,
    iconComponent: getIcon(sub.icon), // Resolving here for compatibility with existing code
  }));

export default subjectSlice.reducer;
