import React from 'react';
import { useAppSelector } from '../hooks/useRedux';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';

const CalendarView = () => {
  const { viewMode } = useAppSelector(state => state.calendar);

  const renderView = () => {
    switch (viewMode) {
      case 'month':
        return <MonthView />;
      case 'week':
        return <WeekView />;
      case 'day':
        return <DayView />;
      default:
        return <MonthView />;
    }
  };

  return (
    <div className="flex-1 bg-white">
      {renderView()}
    </div>
  );
};

export default CalendarView;