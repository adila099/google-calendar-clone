import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
  isSameMonth,
  parseISO,
  isToday,
} from 'date-fns';

// Generate calendar days for month view
export const generateMonthDays = (dateString) => {
  const date = new Date(dateString);
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = [];
  let currentDate = calendarStart;

  while (currentDate <= calendarEnd) {
    days.push({
      date: new Date(currentDate),
      isCurrentMonth: isSameMonth(currentDate, date),
      isToday: isToday(currentDate),
    });
    currentDate = addDays(currentDate, 1);
  }

  return days;
};

// Generate week days for week view
export const generateWeekDays = (dateString) => {
  const date = new Date(dateString);
  const weekStart = startOfWeek(date, { weekStartsOn: 0 });
  const days = [];

  for (let i = 0; i < 7; i++) {
    const dayDate = addDays(weekStart, i);
    days.push({
      date: dayDate,
      isToday: isToday(dayDate),
    });
  }

  return days;
};

// Format date for display
export const formatDisplayDate = (dateString, viewMode) => {
  const date = new Date(dateString);
  switch (viewMode) {
    case 'month':
      return format(date, 'MMMM yyyy');
    case 'week':
      const weekStart = startOfWeek(date, { weekStartsOn: 0 });
      const weekEnd = endOfWeek(date, { weekStartsOn: 0 });
      return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
    case 'day':
      return format(date, 'EEEE, MMMM d, yyyy');
    default:
      return format(date, 'MMMM yyyy');
  }
};

// Get events for a specific date
export const getEventsForDate = (events, dateString) => {
  const date = new Date(dateString);
  return events.filter(event => {
    const eventDate = parseISO(event.startDate);
    return isSameDay(eventDate, date);
  });
};

// Format time for display
export const formatTime = (dateString) => {
  return format(parseISO(dateString), 'h:mm a');
};

// Check if event spans multiple days
export const isMultiDayEvent = (event) => {
  const startDate = parseISO(event.startDate);
  const endDate = parseISO(event.endDate);
  return !isSameDay(startDate, endDate);
};