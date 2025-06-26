import React from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import {
  setSelectedDate,
  openEventModal,
  openEventDetails,
  setSelectedEvent,
} from "../store/calendarSlice";
import { generateWeekDays, getEventsForDate } from "../utils/dateUtils";
import { format } from "date-fns";

const WeekView = () => {
  const dispatch = useAppDispatch();
  const { displayDate, events } = useAppSelector((state) => state.calendar);

  const weekDays = generateWeekDays(displayDate);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handleTimeSlotClick = (date, hour) => {
    const selectedDateTime = new Date(date);
    selectedDateTime.setHours(hour, 0, 0, 0);
    dispatch(setSelectedDate(selectedDateTime.toISOString()));
    dispatch(openEventModal());
  };

  const handleEventClick = (event) => {
    dispatch(setSelectedEvent(event));
    dispatch(openEventDetails());
  };

  return (
    <div className="flex flex-col h-full">
     
      <div className="grid grid-cols-8 border-b border-gray-200 sticky top-0 bg-white z-5">
        <div className="p-3"></div> 
        {weekDays.map((day) => (
          <div
            key={day.date.toISOString()}
            className="p-3 text-center border-l border-gray-200"
          >
            
            <div className="text-xs sm:text-sm md:text-base font-medium text-gray-500 uppercase">
              {format(day.date, "EEE")}
            </div>

           
            <div
              className={`mt-1 font-semibold ${
                day.isToday
                  ? "bg-blue-600 text-white w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center mx-auto text-sm sm:text-base md:text-lg"
                  : "text-gray-900 text-sm sm:text-base md:text-lg"
              }`}
            >
              {format(day.date, "d")}
            </div>
          </div>
        ))}
      </div>

      
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-8">
          
          <div className="border-r border-gray-200 sticky left-0 bg-white z-5">
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-16 p-2 border-b border-gray-100 text-xs text-gray-500"
              >
                {hour === 0
                  ? "12 AM"
                  : hour < 12
                  ? `${hour} AM`
                  : hour === 12
                  ? "12 PM"
                  : `${hour - 12} PM`}
              </div>
            ))}
          </div>

         
          {weekDays.map((day) => (
            <div
              key={day.date.toISOString()}
              className="border-l border-gray-200"
            >
              {hours.map((hour) => {
                const dayEvents = getEventsForDate(
                  events,
                  day.date.toISOString()
                ).filter((event) => {
                  const eventStart = new Date(event.startDate);
                  return eventStart.getHours() === hour;
                });

                return (
                  <div
                    key={hour}
                    onClick={() => handleTimeSlotClick(day.date, hour)}
                    className="h-16 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors relative"
                  >
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEventClick(event);
                        }}
                        className="absolute left-1 right-1 top-1 p-1 rounded text-xs text-white cursor-pointer hover:opacity-80 transition-opacity"
                        style={{ backgroundColor: event.color }}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeekView;
