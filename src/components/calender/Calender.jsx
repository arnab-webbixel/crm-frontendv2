import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DayView from './DayView';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDayView, setShowDayView] = useState(false);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day) => {
    return selectedDate?.getDate() === day &&
      selectedDate?.getMonth() === currentDate.getMonth() &&
      selectedDate?.getFullYear() === currentDate.getFullYear();
  };

  const handleDateClick = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    setShowDayView(true);
  };

  return (
    <>
      <div className="bg-white  dark:bg-gray-800  rounded-2xl shadow-lg p-6 w-[380px]">
        <div className="flex items-center justify-between mb-6">
          <div className="text-xl font-semibold dark:text-gray-100">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>
          <div className="flex gap-2">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-700"
            >
              <ChevronLeft size={20}  className="text-gray-600 dark:text-gray-400"/>
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-700 "
            >
              <ChevronRight size={20} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {days.map((day) => (
            <div
              key={day}
              className="text-xs font-medium text-gray-500 text-center dark:text-gray-400"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}
          
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            return (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                className={`
                  h-10 w-10 rounded-full flex items-center justify-center text-sm
                  ${isToday(day) ? 'bg-blue-100 text-blue-600 dark:bg-blue-500 dark:text-white' : ''}
                  ${isSelected(day) ? 'bg-blue-500 text-white dark:bg-blue-600 dark:text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                  ${!isToday(day) && !isSelected(day) ? 'text-gray-700 dark:text-gray-300' : ''}
                `}
              >
                {day}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4 mt-6 pt-4 border-t dark:border-gray-700">
          <button className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <div className="w-2 h-2 rounded-full bg-red-500 dark:bg-red-400" />
            Report
          </button>
          <button className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            Check
          </button>
          <button className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400  hover:text-gray-900 dark:hover:text-white">
            <div className="w-2 h-2 rounded-full bg-yellow-500  dark:bg-yellow-400" />
            Visit
          </button>
          <button className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <div className="w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-400" />
            Meeting
          </button>
        </div>
      </div>

      {showDayView && selectedDate && (
        <DayView
          date={selectedDate}
          onClose={() => setShowDayView(false)}
        />
      )}
    </>
  );
};

export default Calendar;
