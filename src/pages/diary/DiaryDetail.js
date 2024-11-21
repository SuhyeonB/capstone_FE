import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dummy_post from '../../dummy/dummy_post';
import dummy_user from '../../dummy/dummy_user';

const DiaryDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [likes, setLikes] = useState({}); // Store like counts
  const [likedPosts, setLikedPosts] = useState([]); // Track liked posts
  const diaryEntry = dummy_post.find(diary => diary.post_id === parseInt(postId));

  if (!diaryEntry) {
    return <p>일기를 찾을 수 없습니다.</p>;
  }

  const author = dummy_user.find(user => user.user_id === diaryEntry.user_id);
  const authorName = author ? author.name : '이름을 찾을 수 없음';

  // Handle Like/*
  const handleLike = () => {
    if (likedPosts.includes(diaryEntry.post_id)) {
      alert("이미 이 게시물을 좋아요했습니다!");
      return;
    }

    const currentLikes = likes[diaryEntry.post_id] || 0; // Get current likes
    const updatedLikes = { ...likes, [diaryEntry.post_id]: currentLikes + 1 }; // Increment like count
    setLikes(updatedLikes); // Update state
    setLikedPosts([...likedPosts, diaryEntry.post_id]); // Add post to likedPosts
  };

  return (
    <div className="diary-detail-container">
      <div className="diary-detail-header">
        {/* Breadcrumb */}
        <p className="breadcrumb">게시물 &gt; 게시물 상세</p>
        {/* Previous Button */}
        <button className="back-button" onClick={() => navigate(-1)}>
          &lt; 게시물 목록으로 돌아가기
        </button>
      </div>
      <div className="flex-cont">
        {/* Left Side: Image and Meta Info */}
        <div className="cont-2 cont-box">
          {/* Image */}
          <div className="height-6 img-display">
            {diaryEntry.imageUrl ? (
              <img src={diaryEntry.imageUrl} alt="Diary" className="detail-image" />
            ) : (
              <p className="font-gray">이미지가 없습니다.</p>
            )}
          </div>
          {/* Meta Info */}
          <div className="diary-title diary-element">
            <h2>{diaryEntry.title}</h2>
          </div>
          <div className="diary-meta">
            <div className="meta-info">
              <span className="detail-author">{authorName}</span>
              <span className="detail-createdAt">{diaryEntry.createdAt}</span>
              <span className="detail-public-status">
                {diaryEntry.public === 1 ? '전체 공개' : '비공개'}
              </span>
              <label className={`detail-weather-icon ${diaryEntry.weather}`}></label>
            </div>
          </div>
        </div>

        {/* Right Side: Content and Like Section */}
        <div className="cont-2">
          <div className="cont-box diary-detail-content">
            <p>{diaryEntry.content}</p>
          </div>
          {/* Like Section */}
          {diaryEntry.public === 1 && (
            <div className="diary-footer">
              <div
                className={`like-icon ${likedPosts.includes(diaryEntry.post_id) ? 'liked' : ''}`}
                onClick={handleLike}
              />
              <span>게시물 좋아요 {likes[diaryEntry.post_id] || 0}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiaryDetail;
