import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showEventModal: false,
  showEventDetails: false,
  sidebarOpen: false,
  isMobile: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
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
  openEventModal,
  closeEventModal,
  openEventDetails,
  closeEventDetails,
  toggleSidebar,
  setSidebarOpen,
  setIsMobile,
} = uiSlice.actions;

export default uiSlice.reducer;