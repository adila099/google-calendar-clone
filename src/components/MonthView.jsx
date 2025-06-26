import React from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import {
  setSelectedDate,
  setSelectedEvent,
  openEventModal,
  openEventDetails,
} from "../store/calendarSlice";
import { generateMonthDays, getEventsForDate } from "../utils/dateUtils";
import { format } from "date-fns";

const MonthView = () => {
  const dispatch = useAppDispatch();
  const { displayDate, selectedDate, events } = useAppSelector(
    (state) => state.calendar
  );

  const monthDays = generateMonthDays(displayDate);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const selectedDateObj = selectedDate ? new Date(selectedDate) : null;

  const handleDateClick = (date) => {
    dispatch(setSelectedDate(date.toISOString()));
    dispatch(openEventModal());
  };

  const handleEventClick = (event, e) => {
    e.stopPropagation();
    dispatch(setSelectedEvent(event));
    dispatch(openEventDetails());
  };

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-7 text-[10px] sm:text-sm border-b border-gray-200 sticky top-0 bg-white z-10">
        {weekdays.map((day) => (
          <div key={day} className="p-3 text-center">
            <span className="text-sm font-medium text-gray-500 uppercase">
              {day}
            </span>
          </div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-7 auto-rows-fr overflow-auto">
        {monthDays.map((day, index) => {
          const dayEvents = getEventsForDate(events, day.date.toISOString());
          const isSelected =
            selectedDateObj &&
            format(day.date, "yyyy-MM-dd") ===
              format(selectedDateObj, "yyyy-MM-dd");

          return (
           <div key={index} className="border-t border-l border-gray-200">
  <div
    onClick={() => handleDateClick(day.date)}
    className={`relative w-full h-full p-1 sm:p-2 cursor-pointer transition-colors
      ${isSelected ? "bg-blue-50" : ""}
      ${!isSelected ? "hover:bg-gray-100" : ""}
      ${!day.isCurrentMonth ? "bg-gray-50 text-gray-400" : ""}
    `}
  >
    {/* Date Number */}
    <div className="flex justify-between items-start mb-1">
      <span
        className={`text-[10px] sm:text-sm font-medium ${
          day.isToday
            ? "bg-blue-600 text-white w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px]"
            : day.isCurrentMonth
            ? "text-gray-900"
            : "text-gray-400"
        }`}
      >
        {format(day.date, "d")}
      </span>
    </div>

    {/* Events */}
    <div className="space-y-1">
      {dayEvents.slice(0, 3).map((event) => (
        <div
          key={event.id}
          onClick={(e) => handleEventClick(event, e)}
          className="text-xs p-1 rounded text-white cursor-pointer hover:opacity-80 transition-opacity truncate"
          style={{ backgroundColor: event.color }}
          title={event.title}
        >
          {event.title}
        </div>
      ))}
      {dayEvents.length > 3 && (
        <div className="text-xs text-gray-500 pl-1">
          +{dayEvents.length - 3} more
        </div>
      )}
    </div>
  </div>
</div>

          );
        })}
      </div>
    </div>
  );
};

export default MonthView;
