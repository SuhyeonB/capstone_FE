import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import api from '../../api/interceptor';
import dummy_post from '../../dummy/dummy_post';
import dummy_user from '../../dummy/dummy_user';
import "../../styles/diary.css"; 

const currentUserId = 101;

const MyDiaryboard = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [dateFilterOpen, setDateFilterOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // 요약할 날짜 선택
  const [showModal, setShowModal] = useState(false); // 모달 창 상태
  const [summaryResult, setSummaryResult] = useState(null); // 요약 결과 상태
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

  const handleSummarizeDailyDiary = async (dailyDiaries) => {
    try {
      const diaryData = {
        diaries: dailyDiaries.map(diary => ({
          user_id: diary.user_id,
          content: diary.content,
          createdAt: diary.createdAt
        })),
      };

      const blob = new Blob([JSON.stringify(diaryData)], { type: 'application/json' });
      const formData = new FormData();
      formData.append('file', blob, 'daily_diary.json');

      const response = await api.post('http://localhost:8000/summarize_diary', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSummaryResult(response.data.summary);
      setShowModal(false); // 모달 창을 닫음
    } catch (error) {
      console.error("Error summarizing diary:", error);
    }
  };

  const handleSummarizeClick = () => {
    if (!selectedDate) {
      alert("요약할 날짜를 선택해주세요.");
      return;
    }
    
    const dailyDiaries = dummy_post.filter(diary => 
      new Date(diary.createdAt).toDateString() === selectedDate.toDateString()
    );

    if (dailyDiaries.length === 0) {
      alert("선택한 날짜에 해당하는 일기가 없습니다.");
      return;
    }

    handleSummarizeDailyDiary(dailyDiaries);
  };

  return (
    <div className="diary-board">
      <h1 className='board-title'>
        {currentUserName}님의 일기{" "}
        <span className="diary-count">{currentUserDiaries.length}</span>
      </h1>

      {/* 일기 요약하기 버튼 */}
      <button
        className="summarize-button"
        onClick={() => setShowModal(true)}>
        일기 요약하기
      </button>

      {/* 요약 결과 표시 */}
      {summaryResult && (
        <div className="summary-result">
          <h2>요약 결과:</h2>
          <p>{summaryResult}</p>
        </div>
      )}

      {/* 모달 창 */}
      {showModal && (
        <div className="diarymodal-background">
          <div className="modal-content">
            <h2 className="modal-title">일기 요약</h2>
            <label>
              요약할 날짜 선택:
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="날짜 선택"
                className="modal-input"
              />
            </label>
            <div className="button-group">
                <button 
                  type="submit" 
                  className="yoyak-button" 
                  onClick={handleSummarizeClick}>
                  요약하기
                </button>
                <button
                  className="close-button"
                  type="button"
                  onClick={() => setShowModal(false)}>
                  닫기
                </button>
              </div>
          </div>
        </div>
      )}
      
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

export default MyDiaryboard;
