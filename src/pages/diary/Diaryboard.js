import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
//import api from '../../api/interceptor';
import dummy_post from '../../dummy/dummy_post';
//import dummy_user from '../../dummy/dummy_user';
import "../../styles/diary.css"; 

const currentUserId = 101;

const Diaryboard = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [dateFilterOpen, setDateFilterOpen] = useState(false);
  const navigate = useNavigate();

  const currentUserDiaries = dummy_post
    .filter(diary => diary.user_id === currentUserId) // 현재 사용자의 일기만 필터링
    .filter(diary => {
      if (!startDate || !endDate) return true;
      const diaryDate = new Date(diary.createdAt);
      return diaryDate >= startDate && diaryDate <= endDate;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // 최신순 정렬

  const handleEntryClick = (postId) => {
    navigate(`/diary/${postId}`);
  };

  const handleDateFilterToggle = () => {
    setDateFilterOpen(!dateFilterOpen);
    if (dateFilterOpen) {
      setDateRange([null, null]); // 날짜 필터를 초기화
    }
  };

  return (
    <div className="diary-board">
      <h1 className='board-title'>
        전체 일기{" "}
        <span className="diary-count">{currentUserDiaries.length}</span>
      </h1>
      
      {/* 날짜 필터링 UI */}
      <div className="date-filter">
        <button className="date-filter-button" onClick={handleDateFilterToggle}>
          특정 날짜로 찾기
        </button>
        {dateFilterOpen && (
          <div className="date-picker-container">
            <DatePicker
              selected={startDate}
              onChange={(update) => setDateRange(update)}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
            />
          </div>
        )}
      </div>

      {/* 일기 리스트 */}
      <div className="diary-list">
        {currentUserDiaries.map((diary) => (
          <div key={diary.post_id} className="diary-entry" onClick={() => handleEntryClick(diary.post_id)}>
            {diary.imageUrl && (
              <img src={diary.imageUrl} alt={diary.title} className="diary-image" />
            )}
            <h2>{diary.title}</h2>
            <p>{diary.content}</p>
            <div className="diary-meta">
              <span className='createdAt'>{diary.createdAt}</span>
              <span className={`weather-icon ${diary.weather}`}></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Diaryboard;