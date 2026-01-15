import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/client";
import { getIcon } from "@/utils/componentRegistry";

export const fetchTopicsAndTheories = createAsyncThunk(
  "topics/fetchData",
  async () => {
    const [topicsRes, theoriesRes] = await Promise.all([
      api.get("/topics"),
      api.get("/theory"),
    ]);
    return { topics: topicsRes.data, theories: theoriesRes.data };
  }
);

const processTheory = (t) => ({
  ...t,
  // Store icon string, resolve later
  theory: {
    ...t.theory,
    pros: t.theory?.pros || [],
    cons: t.theory?.cons || [],
    whenToUse: t.theory?.whenToUse || [],
    tips: t.theory?.tips || [],
    commonPitfalls: t.theory?.commonPitfalls || [],
  },
});

const topicSlice = createSlice({
  name: "topics",
  initialState: {
    allTopics: [],
    allTheories: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopicsAndTheories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTopicsAndTheories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allTopics = action.payload.topics;
        state.allTheories = action.payload.theories.map(processTheory);
      })
      .addCase(fetchTopicsAndTheories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Selector to get grouped topics (logic moved from Context to Selector)
export const selectTopicsBySubject = (state, subjectKey) => {
  const key = subjectKey?.toLowerCase();
  const { allTopics, allTheories } = state.topics;

  const subjectTopics = allTopics
    .filter((t) => (t.subject || "").toLowerCase() === key)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const subjectTheories = allTheories.filter(
    (t) => (t.subject || "react").toLowerCase() === key
  );

  return subjectTopics
    .map((topic) => {
      const subtopics = subjectTheories
        .filter(
          (theory) =>
            theory.topicId === topic.topicId ||
            (theory.section &&
              theory.section.toLowerCase() === topic.topicId.toLowerCase())
        )
        .sort((a, b) => (a.order || 0) - (b.order || 0));

      return {
        id: topic.topicId,
        title: topic.name,
        icon: getIcon(topic.icon), // Resolve icon here
        color: topic.color,
        subtopics: subtopics.map((sub) => ({
          ...sub,
          id: sub.topicId,
          icon: getIcon(sub.icon), // Resolve icon here if needed
        })),
      };
    })
    .filter((section) => section.subtopics.length > 0 || true);
};

export default topicSlice.reducer;
