import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import dummy_post from '../../dummy/dummy_post';
import dummy_user from '../../dummy/dummy_user';
import "../../styles/diary.css"; 

import likeIcon from '../../assets/icons/ico-subscription-b.png';

const currentUserId = 101;

const MyDiaryboard = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [dateFilterOpen, setDateFilterOpen] = useState(false);
  const navigate = useNavigate();

  const currentUser = dummy_user.find(user => user.user_id === currentUserId);
  const currentUserName = currentUser ? currentUser.name : '알 수 없는 사용자';

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

  const truncateContent = (content, maxLength = 200) => {
    return content.length > maxLength ? content.slice(0, maxLength) + "..." : content;
  };


  return (
    <div className="diary-board">
      <h1 className='board-title'>
        {currentUserName}님의 일기{" "}
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
            <p>{truncateContent(diary.content)}</p> {/* 내용 자르기 적용 */}
            <div className="diary-meta">
              <span className='createdAt'>{diary.createdAt}</span>
              <span className={`weather-icon ${diary.weather}`}></span>
            </div>
            {/* 좋아요 컨테이너 */}
            <div className="like-container">
              <img src={likeIcon} alt="Like Icon" />
              <span className="like-count">{diary.likeCount}</span>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDiaryboard;