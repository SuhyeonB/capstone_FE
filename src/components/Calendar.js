import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko'; // 한국어 설정

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(moment()); // 현재 월
  const [attendanceDays, setAttendanceDays] = useState([]); // 출석한 날짜들

  // 이전 달로 이동
  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, 'month'));
  };

  // 출석 버튼 클릭 시 해당 날짜를 출석으로 기록
  const handleAttendance = (day) => {
    if (!attendanceDays.includes(day)) {
      setAttendanceDays([...attendanceDays, day]);
    }
  };

  // 현재 월의 모든 날짜 생성
  const renderDaysInMonth = () => {
    const startOfMonth = currentMonth.clone().startOf('month').startOf('week');
    const endOfMonth = currentMonth.clone().endOf('month').endOf('week');

    const day = startOfMonth.clone().subtract(1, 'day');
    const days = [];

    while (day.isBefore(endOfMonth, 'day')) {
      day.add(1, 'day');
      const formattedDay = day.format('YYYY-MM-DD');
      const isAttendanceDay = attendanceDays.includes(formattedDay);
      days.push(
        <div 
          key={formattedDay} 
          className={`day ${isAttendanceDay ? 'attended' : ''}`}
          onClick={() => handleAttendance(formattedDay)} // 클릭 시 출석 처리
        >
          {day.format('D')}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>◀</button>
        <span>{currentMonth.format('YYYY년 MM월')}</span>
        <button onClick={handleNextMonth}>▶</button>
      </div>
      <div className="calendar-grid">
        <div className="day-name">일</div>
        <div className="day-name">월</div>
        <div className="day-name">화</div>
        <div className="day-name">수</div>
        <div className="day-name">목</div>
        <div className="day-name">금</div>
        <div className="day-name">토</div>
        {renderDaysInMonth()}
      </div>
    </div>
  );
};

export default Calendar;
