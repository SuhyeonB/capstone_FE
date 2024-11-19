import React, { useState } from 'react';
import axios from 'axios';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceDays, setAttendanceDays] = useState([]);
  const today = new Date(); // 오늘 날짜로 고정

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
      const isToday =
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      const isAttendance = attendanceDays.some(
        (day) => day.year === year && day.month === month && day.date === i
      );

      days.push(
        <div
          className={`day ${isToday ? 'today' : ''}`}
          key={`day-${i}`}
          onClick={() => {}}
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

  const prevMonth = async () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(newDate);

    // 연도와 월을 파라미터로 백엔드에 전달
    try {
      await axios.get('/api/calendar', {
        params: {
          year: newDate.getFullYear(),
          month: newDate.getMonth() + 1,
        },
      });
      console.log('이전 달 데이터 요청 성공');
    } catch (error) {
      console.error('이전 달 데이터 요청 실패:', error);
    }
  };

  const nextMonth = async () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(newDate);

    // 연도와 월을 파라미터로 백엔드에 전달
    try {
      await axios.get('/api/calendar', {
        params: {
          year: newDate.getFullYear(),
          month: newDate.getMonth() + 1,
        },
      });
      console.log('다음 달 데이터 요청 성공');
    } catch (error) {
      console.error('다음 달 데이터 요청 실패:', error);
    }
  };

  const handleAttendance = () => {
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();

    const attendanceExists = attendanceDays.some(
      (day) =>
        day.year === currentYear &&
        day.month === currentMonth &&
        day.date === currentDate
    );

    if (attendanceExists) {
      alert('이미 오늘 출석체크를 완료했습니다!');
      return;
    }

    setAttendanceDays([
      ...attendanceDays,
      { year: currentYear, month: currentMonth, date: currentDate },
    ]);
  };

  return (
    <div>
      <div className="calendar-container">
        <h1 className="calendar-title">
          <strong>캘린더</strong>
        </h1>
        <div className="calendar-header">
          <div className="month">
            <i className="prev" onClick={prevMonth}>
              &lt;
            </i>
            <div>
              <strong>
                {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
              </strong>
            </div>
            <i className="next" onClick={nextMonth}>
              &gt;
            </i>
          </div>
          <div className="calendar-box">
            <div>
              <span className="dot diary"></span>일기 작성됨
            </div>
            <div>
              <span className="dot attendance"></span>출석함
            </div>
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
          <strong>{`${today.getMonth() + 1}/${today.getDate()}일 출첵!`}</strong>
        </button>
      </div>
    </div>
  );
};

export default Calendar;
