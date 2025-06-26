import React from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import { setSelectedDate, openEventDetails } from "../store/calendarSlice";
import { openEventModal } from "../store/calendarSlice";
import { setSelectedEvent } from "../store/calendarSlice";
import { getEventsForDate } from "../utils/dateUtils";
import { format } from "date-fns";

const DayView = () => {
  const dispatch = useAppDispatch();
  const { displayDate, events } = useAppSelector((state) => state.calendar);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const dayEvents = getEventsForDate(events, displayDate);
  const displayDateObj = new Date(displayDate);

  const handleTimeSlotClick = (hour) => {
    const selectedDateTime = new Date(displayDate);
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
      
      <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-5">
        <h2 className="font-semibold text-gray-900 text-lg sm:text-xl md:text-2xl">
          <span className="block sm:hidden">
            {format(displayDateObj, "EEE, MMM d")}
          </span>
          <span className="hidden sm:block">
            {format(displayDateObj, "EEEE, MMMM d, yyyy")}
          </span>
        </h2>
      </div>

      
      <div className="flex-1 overflow-auto">
        <div className="flex">
          
          <div className="w-20 border-r border-gray-200 sticky left-0 bg-white z-5">
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

        
          <div className="flex-1">
            {hours.map((hour) => {
              const hourEvents = dayEvents.filter((event) => {
                const eventStart = new Date(event.startDate);
                return eventStart.getHours() === hour;
              });

              return (
                <div
                  key={hour}
                  onClick={() => handleTimeSlotClick(hour)}
                  className="h-16 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors relative p-2"
                >
                  {hourEvents.map((event) => (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEventClick(event);
                      }}
                      className="p-2 rounded text-sm text-white cursor-pointer hover:opacity-80 transition-opacity mb-1"
                      style={{ backgroundColor: event.color }}
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="text-xs opacity-90">
                        {format(new Date(event.startDate), "h:mm a")} -{" "}
                        {format(new Date(event.endDate), "h:mm a")}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayView;
