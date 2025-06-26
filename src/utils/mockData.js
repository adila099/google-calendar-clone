import { addDays, addHours } from 'date-fns';

const today = new Date();

export const mockEvents = [
  {
    id: '1',
    title: 'Team Meeting',
    description: 'Weekly team sync-up meeting',
    startDate: today.toISOString(),
    endDate: addHours(today, 1).toISOString(),
    color: '#1a73e8',
  },
  {
    id: '2',
    title: 'Project Review',
    description: 'Review project deliverables and milestones',
    startDate: addDays(today, 1).toISOString(),
    endDate: addDays(addHours(today, 2), 1).toISOString(),
    color: '#34a853',
  },
  {
    id: '3',
    title: 'Client Presentation',
    description: 'Present final designs to client',
    startDate: addDays(today, 3).toISOString(),
    endDate: addDays(addHours(today, 1.5), 3).toISOString(),
    color: '#ea4335',
  },
  {
    id: '4',
    title: 'Code Review',
    description: 'Review pull requests and discuss improvements',
    startDate: addDays(today, 5).toISOString(),
    endDate: addDays(addHours(today, 1), 5).toISOString(),
    color: '#fbbc04',
  },
  {
    id: '5',
    title: 'Sprint Planning',
    description: 'Plan tasks for the next sprint',
    startDate: addDays(today, 7).toISOString(),
    endDate: addDays(addHours(today, 2), 7).toISOString(),
    color: '#9c27b0',
  },
];

export const eventColors = [
  { name: 'Blue', value: '#1a73e8' },
  { name: 'Green', value: '#34a853' },
  { name: 'Red', value: '#ea4335' },
  { name: 'Yellow', value: '#fbbc04' },
  { name: 'Purple', value: '#9c27b0' },
  { name: 'Orange', value: '#ff9800' },
];