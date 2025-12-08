'use client';

import React, { useState, useMemo } from 'react';

interface CalendarProps {
  weekStart?: number;
}

export default function Calendar({ weekStart = 0 }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const daysInMonth = useMemo(() => {
    return new Date(year, month + 1, 0).getDate();
  }, [year, month]);

  const firstDayOfMonth = useMemo(() => {
    return new Date(year, month, 1).getDay();
  }, [year, month]);

  const days = useMemo(() => {
    const result: (number | null)[] = [];
    // Calculate empty slots based on weekStart
    // firstDayOfMonth is 0 (Sun) to 6 (Sat)
    const emptySlots = (firstDayOfMonth - weekStart + 7) % 7;

    // Add empty slots
    for (let i = 0; i < emptySlots; i++) {
      result.push(null);
    }
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      result.push(i);
    }
    return result;
  }, [firstDayOfMonth, weekStart, daysInMonth]);

  const weekDayNames = useMemo(() => {
    const names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const rotated = [...names.slice(weekStart), ...names.slice(0, weekStart)];
    return rotated;
  }, [weekStart]);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>{monthName} {year}</h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className="weekdays">
        {weekDayNames.map((day) => (
          <div key={day}>
            {day}
          </div>
        ))}
      </div>
      <div className="days">
        {days.map((day, index) => (
          <div
            key={index}
            className={`day ${day === null ? 'empty' : ''}`}
          >
            {day}
          </div>
        ))}
      </div>
      <style jsx>{`
        .calendar {
          max-width: 400px;
          margin: 0 auto;
          font-family: sans-serif;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 16px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          font-weight: bold;
          margin-bottom: 8px;
          text-align: center;
        }

        .days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
        }

        .day {
          text-align: center;
          padding: 8px;
          border: 1px solid #eee;
          border-radius: 4px;
        }

        .day.empty {
          background-color: transparent;
          border: none;
        }
      `}</style>
    </div>
  );
}
