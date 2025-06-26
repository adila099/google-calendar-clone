import { createSlice } from '@reduxjs/toolkit';
import { startOfMonth, startOfWeek, startOfDay } from 'date-fns';
import { mockEvents } from '../utils/mockData';

const initialState = {
  currentDate: new Date().toISOString(),
  selectedDate: new Date().toISOString(),
  viewMode: 'month',
  displayDate: new Date().toISOString(),
  events: mockEvents,
  selectedEvent: null,
  showEventModal: false,
  showEventDetails: false,
  isMobile: false,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setCurrentDate: (state, action) => {
      state.currentDate = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
      const baseDate = state.selectedDate ? new Date(state.selectedDate) : new Date(state.currentDate);
      switch (action.payload) {
        case 'month':
          state.displayDate = startOfMonth(baseDate).toISOString();
          break;
        case 'week':
          state.displayDate = startOfWeek(baseDate, { weekStartsOn: 0 }).toISOString();
          break;
        case 'day':
          state.displayDate = startOfDay(baseDate).toISOString();
          break;
        default:
          break;
      }
    },
    setDisplayDate: (state, action) => {
      state.displayDate = action.payload;
    },
    goToToday: (state) => {
      const today = new Date();
      state.currentDate = today.toISOString();
      state.selectedDate = today.toISOString();
      state.displayDate = today.toISOString();
    },
    navigatePrevious: (state) => {
      const currentDisplay = new Date(state.displayDate);
      switch (state.viewMode) {
        case 'month':
          currentDisplay.setMonth(currentDisplay.getMonth() - 1);
          break;
        case 'week':
          currentDisplay.setDate(currentDisplay.getDate() - 7);
          break;
        case 'day':
          currentDisplay.setDate(currentDisplay.getDate() - 1);
          break;
      }
      state.displayDate = currentDisplay.toISOString();
    },
    navigateNext: (state) => {
      const currentDisplay = new Date(state.displayDate);
      switch (state.viewMode) {
        case 'month':
          currentDisplay.setMonth(currentDisplay.getMonth() + 1);
          break;
        case 'week':
          currentDisplay.setDate(currentDisplay.getDate() + 7);
          break;
        case 'day':
          currentDisplay.setDate(currentDisplay.getDate() + 1);
          break;
      }
      state.displayDate = currentDisplay.toISOString();
    },
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
    openEventModal: (state) => {
      state.showEventModal = true;
    },
    closeEventModal: (state) => {
      state.showEventModal = false;
    },
    openEventDetails: (state) => {
      state.showEventDetails = true;
    },
    closeEventDetails: (state) => {
      state.showEventDetails = false;
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
  },
});

export const {
  setCurrentDate,
  setSelectedDate,
  setViewMode,
  setDisplayDate,
  goToToday,
  navigatePrevious,
  navigateNext,
  addEvent,
  updateEvent,
  deleteEvent,
  setSelectedEvent,
  clearSelectedEvent,
  openEventModal,
  closeEventModal,
  openEventDetails,
  closeEventDetails,
  setIsMobile,
} = calendarSlice.actions;

export default calendarSlice.reducer;