import React, { useState, useEffect } from 'react';
import {
  monthNames, dayNames, morningSlots, eveningSlots, formatDateFormatted
} from '../utils';

export default function CustomCalendarModal({
  isOpen,
  onClose,
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
  onApply,
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currYear, setCurrYear] = useState(today.getFullYear());
  const [currMonth, setCurrMonth] = useState(today.getMonth());
  const [showSundayNotice, setShowSundayNotice] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.classList.add('cal-modal-open');
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.classList.remove('cal-modal-open');
    }
    return () => {
      document.body.classList.remove('cal-modal-open');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handlePrevMonth = (e) => {
    e.stopPropagation();
    if (currMonth === 0) {
      setCurrMonth(11);
      setCurrYear((prev) => prev - 1);
    } else {
      setCurrMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    if (currMonth === 11) {
      setCurrMonth(0);
      setCurrYear((prev) => prev + 1);
    } else {
      setCurrMonth((prev) => prev + 1);
    }
  };

  const handleSelectToday = (e) => {
    e.stopPropagation();
    setCurrYear(today.getFullYear());
    setCurrMonth(today.getMonth());

    let targetDate = new Date(today);
    if (targetDate.getDay() === 0) {
      targetDate.setDate(targetDate.getDate() + 1);
    }
    onSelectDate(targetDate);
  };

  const handleDayClick = (cellDate, isPast, isSunday) => {
    if (isPast) return;
    if (isSunday) {
      setShowSundayNotice(true);
      setTimeout(() => setShowSundayNotice(false), 3500);
      return;
    }
    setShowSundayNotice(false);
    onSelectDate(cellDate);
  };

  // Build month grid
  const firstDayIndex = new Date(currYear, currMonth, 1).getDay();
  const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
  const lastDateOfPrevMonth = new Date(currYear, currMonth, 0).getDate();

  const prevDays = [];
  for (let i = firstDayIndex; i > 0; i--) {
    prevDays.push(lastDateOfPrevMonth - i + 1);
  }

  const currentDays = [];
  for (let day = 1; day <= lastDateOfMonth; day++) {
    currentDays.push(new Date(currYear, currMonth, day));
  }

  const totalCellsSoFar = firstDayIndex + lastDateOfMonth;
  const nextDaysCount = (7 - (totalCellsSoFar % 7)) % 7;
  const nextDays = [];
  for (let j = 1; j <= nextDaysCount; j++) {
    nextDays.push(j);
  }

  if (!isOpen) return null;

  return (
    <div
      className={`cal-modal-overlay active`}
      id="customCalendarModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="calModalTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="cal-modal-container">
        {/* Drag Handle for Mobile Sheet */}
        <div className="cal-modal-drag-handle"></div>

        {/* Modal Header */}
        <div className="cal-modal-header">
          <div className="cal-modal-title-group">
            <div className="cal-modal-icon">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div>
              <h3 id="calModalTitle" className="cal-modal-title">Select Appointment Slot</h3>
              <p className="cal-modal-subtitle">Choose your preferred date & time for consultation</p>
            </div>
          </div>
          <button
            type="button"
            className="cal-modal-close"
            id="calModalCloseBtn"
            aria-label="Close Calendar Modal"
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="cal-modal-body">
          {/* Header: Month/Year navigation */}
          <div className="calendar-header">
            <button
              type="button"
              className="calendar-nav-btn"
              id="calPrevMonth"
              aria-label="Previous Month"
              onClick={handlePrevMonth}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="calendar-month-year" id="calMonthYear">
              {monthNames[currMonth]} {currYear}
            </div>
            <button
              type="button"
              className="calendar-nav-btn"
              id="calNextMonth"
              aria-label="Next Month"
              onClick={handleNextMonth}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Weekdays Row */}
          <div className="calendar-weekdays">
            <span className="closed-day" title="Clinic closed on Sundays">Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Interactive Days Grid */}
          <div className="calendar-days-grid" id="calDaysGrid">
            {prevDays.map((d, i) => (
              <button key={`prev-${i}`} type="button" className="cal-day-cell other-month">
                {d}
              </button>
            ))}

            {currentDays.map((cellDate, i) => {
              cellDate.setHours(0, 0, 0, 0);
              const isPast = cellDate < today;
              const isSunday = cellDate.getDay() === 0;
              const isToday = cellDate.getTime() === today.getTime();
              const isSelected = selectedDate && cellDate.getTime() === selectedDate.getTime();

              let cellClass = 'cal-day-cell';
              if (isPast) cellClass += ' disabled';
              else if (isSunday) cellClass += ' sunday-closed';
              if (isToday) cellClass += ' today';
              if (isSelected) cellClass += ' selected';

              return (
                <button
                  key={`curr-${i}`}
                  type="button"
                  className={cellClass}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDayClick(cellDate, isPast, isSunday);
                  }}
                >
                  {cellDate.getDate()}
                </button>
              );
            })}

            {nextDays.map((d, i) => (
              <button key={`next-${i}`} type="button" className="cal-day-cell other-month">
                {d}
              </button>
            ))}
          </div>

          {/* Time Slot Selection Section */}
          {selectedDate && (
            <div className="calendar-slots-wrapper" id="calSlotsWrapper" style={{ display: 'block' }}>
              <div className="slots-header">
                <span>Preferred Time Slot</span>
                <span className="slots-date-badge" id="selectedDateBadge">
                  {formatDateFormatted(selectedDate)}
                </span>
              </div>

              <div className="slots-section-label">☀️ Morning Session (09:30 AM &ndash; 01:30 PM)</div>
              <div className="slots-grid" id="morningSlotsGrid">
                {morningSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={`slot-chip ${selectedTime === time ? 'selected' : ''}`}
                    onClick={() => onSelectTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>

              <div className="slots-section-label" style={{ marginTop: '0.75rem' }}>
                🌙 Evening Session (04:30 PM &ndash; 08:30 PM)
              </div>
              <div className="slots-grid" id="eveningSlotsGrid">
                {eveningSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={`slot-chip ${selectedTime === time ? 'selected' : ''}`}
                    onClick={() => onSelectTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sunday Closure Notice Toast */}
          {showSundayNotice && (
            <div className="sunday-notice-popup" id="sundayNotice" style={{ display: 'block' }}>
              🏥 Clinic is closed on Sundays. Please choose Monday &ndash; Saturday.
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="cal-modal-footer">
          <div className="cal-legend">
            <span className="legend-item"><span className="legend-dot available"></span> Available</span>
            <span className="legend-item"><span className="legend-dot closed"></span> Sun Closed</span>
          </div>
          <div className="cal-footer-btns">
            <button type="button" className="btn-today-quick" id="calTodayBtn" onClick={handleSelectToday}>
              Select Today
            </button>
            <button
              type="button"
              className="btn btn-primary cal-modal-apply-btn"
              id="calApplyBtn"
              onClick={onApply}
            >
              Apply & Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
