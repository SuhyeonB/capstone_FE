import React from 'react';
import dummy_post from '../../dummy/dummy_post';
import dummy_user from '../../dummy/dummy_user';
import "../../styles/diary.css"; 

const Diaryboard = () => {
  const findUserNameById = (userId) => {
    const user = dummy_user.find(user => user.user_id === userId);
    return user ? user.name : 'Unknown User';
  };

  return (
    <div className="diary-board">
      <h1 className='board-title'>여러분은 어떤 하루를 보냈나요?</h1>
      <div className="diary-list">
        {dummy_post
          .filter((diary) => diary.public === 1) // public 값이 1인 게시물만 필터링
          .map((diary) => (
            <div key={diary.post_id} className="diary-entry">
              <h2>{diary.title}</h2>
              <p>{diary.content}</p>
              <div className="diary-meta">
                <span className='user-name'>{findUserNameById(diary.user_id)}</span> 
                <span className='createdAt'>{diary.createdAt}</span>
                <span className={`weather-icon ${diary.weather.replace(/\s/g, '-')}`}></span> {/* 날씨 아이콘 */}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Diaryboard;