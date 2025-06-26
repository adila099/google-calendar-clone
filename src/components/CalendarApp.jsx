import React, { useEffect } from "react";
import { useAppDispatch } from "../store/store";
import { setIsMobile } from "../store/calendarSlice";
import CalendarHeader from "./CalendarHeader";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import DayView from "./DayView";
import EventModal from "./EventModal";
import EventDetails from "./EventDetails";
import { useAppSelector } from "../store/store";

function CalendarApp() {
  const dispatch = useAppDispatch();
  const { viewMode } = useAppSelector((state) => state.calendar);

  const renderView = () => {
    switch (viewMode) {
      case "month":
        return <MonthView />;
      case "week":
        return <WeekView />;
      case "day":
        return <DayView />;
      default:
        return <MonthView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-4 px-2 sm:px-4">
      <div className="w-full max-w-screen-xxl bg-white rounded-xl shadow-md p-2 sm:p-4 flex flex-col h-[90vh]">
        <CalendarHeader />
        <main className="flex-1 overflow-hidden">{renderView()}</main>
        <EventModal />
        <EventDetails />
      </div>
    </div>
  );
}

export default CalendarApp;
