import React from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/store';
import { 
  navigatePrevious, 
  navigateNext, 
  goToToday, 
  setViewMode,
  openEventModal
} from '../store/calendarSlice';
import { formatDisplayDate } from '../utils/dateUtils';

const CalendarHeader = () => {
  const dispatch = useAppDispatch();
  const { displayDate, viewMode, isMobile } = useAppSelector(state => state.calendar);

  const handleCreateEvent = () => {
    dispatch(openEventModal());
  };

  const handleViewChange = (newView) => {
    dispatch(setViewMode(newView));
  };

  const viewButtons = [
    { key: 'month', label: 'Month' },
    { key: 'week', label: 'Week' },
    { key: 'day', label: 'Day' }
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10 w-full">
      <div className="flex flex-wrap justify-between items-start gap-3 md:items-center w-full">
        {/* Left Section */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
          <div className="flex items-center gap-2 shrink-0">
            <Calendar className="w-6 h-6 text-blue-600" />
            {!isMobile && (
              <h1 className="text-lg font-semibold text-gray-900">Calendar</h1>
            )}
          </div>

          <button
            onClick={() => dispatch(goToToday())}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
          >
            Today
          </button>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => dispatch(navigatePrevious())}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => dispatch(navigateNext())}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <h2 className="text-sm sm:text-base md:text-lg font-medium text-gray-900 truncate">
            {formatDisplayDate(displayDate, viewMode)}
          </h2>
        </div>

        
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div className="flex bg-gray-100 rounded-md p-1">
            {viewButtons.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleViewChange(key)}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded transition-colors ${
                  viewMode === key
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {isMobile ? label.charAt(0) : label}
              </button>
            ))}
          </div>

         <button
  onClick={handleCreateEvent}
  className="flex items-center gap-1 px-2 sm:px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition"
>
  <Plus className="w-4 h-4" />
  {!isMobile && <span>Create</span>}
</button>

        </div>
      </div>
    </header>
  );
};

export default CalendarHeader;
