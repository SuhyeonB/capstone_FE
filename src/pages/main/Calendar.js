import React, { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceDays, setAttendanceDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay(); // 해당 달의 첫 번째 날의 요일
    const lastDate = new Date(year, month + 1, 0).getDate(); // 해당 달의 마지막 날짜

    const prevLastDate = new Date(year, month, 0).getDate(); // 이전 달의 마지막 날짜
    const totalDays = 35; // 5주 = 35일
    let days = [];

    // 이전 달의 날짜
    for (let x = firstDay; x > 0; x--) {
      days.push(
        <div className="prev-date" key={`prev-${x}`}>
          {prevLastDate - x + 1}
        </div>
      );
    }

    // 현재 달의 날짜
    for (let i = 1; i <= lastDate; i++) {
      const isToday = i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
      
      // 해당 달과 해당 날짜에만 출석 체크를 표시
      const isAttendance = attendanceDays.some(
        (day) => day.year === year && day.month === month && day.date === i
      );

      days.push(
        <div 
          className={`day ${isToday ? 'today' : ''}`} 
          key={`day-${i}`} 
          onClick={() => setSelectedDate(new Date(year, month, i))} // 날짜 클릭 시 선택된 날짜 업데이트
        >
          {isAttendance && <div className="attendance-dot"></div>}
          {i}
        </div>
      );
    }

    // 다음 달의 날짜 (5주 = 총 35일로 맞추기 위해 나머지 공간에 추가)
    const totalRenderedDays = days.length;
    for (let j = 1; totalRenderedDays + j <= totalDays; j++) {
      days.push(
        <div className="next-date" key={`next-${j}`}>
          {j}
        </div>
      );
    }

    return days;
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleAttendance = () => {
    const currentYear = selectedDate.getFullYear();
    const currentMonth = selectedDate.getMonth();
    const currentDate = selectedDate.getDate();

    const attendanceExists = attendanceDays.some(
      (day) => day.year === currentYear && day.month === currentMonth && day.date === currentDate
    );

    if (!attendanceExists) {
      setAttendanceDays([...attendanceDays, { year: currentYear, month: currentMonth, date: currentDate }]);
    }
  };

  return (
    <div>
      <div className="calendar-container">
        <h1><strong>캘린더</strong></h1>
        <div className="calendar-header">
          <div className="month">
            <i className="prev" onClick={prevMonth}>&lt;</i>
            <div>
              {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
            </div>
            <i className="next" onClick={nextMonth}>&gt;</i>
          </div>
          <div className="calendar-box">
            <div><span className="dot diary"></span>일기 작성됨</div>
            <div><span className="dot attendance"></span>출석함</div>
          </div>
        </div>
        <div className="calendar">
          <div className="weekdays">
            <div className="sun">일</div>
            <div className="mon">월</div>
            <div className="tue">화</div>
            <div className="wed">수</div>
            <div className="thu">목</div>
            <div className="fri">금</div>
            <div className="sat">토</div>
          </div>
          <div className="days">{renderCalendar()}</div>
        </div>
        <button className="attendance-btn" onClick={handleAttendance}>
          {`${selectedDate.getMonth() + 1}/${selectedDate.getDate()}일 출첵!`}
        </button>
      </div>
    </div>
  );
};

export default Calendar;
