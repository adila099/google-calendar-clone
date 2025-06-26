import { createSlice } from '@reduxjs/toolkit';
import { mockEvents } from '../utils/mockData';

const initialState = {
  events: mockEvents,
  selectedEvent: null,
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      const newEvent = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      state.events.push(newEvent);
    },
    updateEvent: (state, action) => {
      const { id, updates } = action.payload;
      const eventIndex = state.events.findIndex(event => event.id === id);
      if (eventIndex !== -1) {
        state.events[eventIndex] = { ...state.events[eventIndex], ...updates };
      }
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
    clearSelectedEvent: (state) => {
      state.selectedEvent = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addEvent,
  updateEvent,
  deleteEvent,
  setSelectedEvent,
  clearSelectedEvent,
  setLoading,
  setError,
} = eventSlice.actions;

export default eventSlice.reducer;