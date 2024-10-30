import React from 'react';
import dummy_post from '../../dummy/dummy_post';
import dummy_user from '../../dummy/dummy_user';
import "../../styles/diary.css"; 

// 현재 로그인한 유저의 user_id
const currentUserId = 101; 

const MyDiaryboard = () => {
  // 현재 로그인한 유저의 이름 찾기
  const currentUser = dummy_user.find(user => user.user_id === currentUserId);
  const currentUserName = currentUser ? currentUser.name : '알 수 없는 사용자';

  // 현재 유저의 일기 목록 필터링 및 정렬
  const currentUserDiaries = dummy_post
    .filter(diary => diary.user_id === currentUserId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="diary-board">
      {/* 유저 이름과 일기 개수 표시 */}
      <h1 className='board-title'>
        {currentUserName}님의 일기{" "}
        <n className="diary-count">{currentUserDiaries.length}</n>
      </h1>
      <div className="diary-list">
        {currentUserDiaries.map((diary) => (
          <div key={diary.post_id} className="diary-entry">
            <h2>{diary.title}</h2>
            <p>{diary.content}</p>
            <div className="diary-meta">
              <span className='createdAt'>{diary.createdAt}</span>
              <span className={`weather-icon ${diary.weather.replace(/\s/g, '-')}`}></span> {/* 날씨 아이콘 */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDiaryboard;
