import React from 'react';
import { X, Edit, Trash2, Clock, Calendar } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/store';
import {
  closeEventDetails,
  openEventModal,
  deleteEvent,
  clearSelectedEvent
} from '../store/calendarSlice';
import { format } from 'date-fns';

const EventDetails = () => {
  const dispatch = useAppDispatch();
  const { showEventDetails, selectedEvent } = useAppSelector(state => state.calendar);

  const handleClose = () => {
    dispatch(closeEventDetails());
    dispatch(clearSelectedEvent());
  };

  const handleEdit = () => {
    dispatch(closeEventDetails());
    dispatch(openEventModal());
  };

  const handleDelete = () => {
    if (selectedEvent) {
      dispatch(deleteEvent(selectedEvent.id));
      handleClose();
    }
  };

  if (!showEventDetails || !selectedEvent) return null;

  const startDate = new Date(selectedEvent.startDate);
  const endDate = new Date(selectedEvent.endDate);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
         
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: selectedEvent.color }}
            />
            <h2 className="text-lg font-semibold text-gray-900">
              Event Details
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {selectedEvent.title}
            </h3>
          </div>

          {/* Description */}
          {selectedEvent.description && (
            <div>
              <p className="text-gray-600">{selectedEvent.description}</p>
            </div>
          )}

          {/* Date & Time */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{format(startDate, 'EEEE, MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>
                {format(startDate, 'h:mm a')} - {format(endDate, 'h:mm a')}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleDelete}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
            <button
              onClick={handleEdit}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
