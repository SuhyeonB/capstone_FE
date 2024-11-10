import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/interceptor';
import dummy_post from '../../dummy/dummy_post';
import dummy_user from '../../dummy/dummy_user';

const DiaryDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [likes, setLikes] = useState({});
  const [liked, setLiked] = useState(false);
  const diaryEntry = dummy_post.find(diary => diary.post_id === parseInt(postId));

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await api.get('/api/likes');
        setLikes(response.data);
        setLiked(response.data[postId] > 0);
      } catch (error) {
        console.error("Failed to fetch likes:", error);
      }
    };
    fetchLikes();
  }, [postId]);

  const toggleLike = async (e) => {
    e.stopPropagation(); // 클릭 이벤트 전파 방지
    try {
      const newLiked = !liked;
      setLiked(newLiked);

      // 서버에 좋아요 상태 업데이트 요청
      await api.post('/api/like', { postId, liked: newLiked });

      // 좋아요 상태에 따라 좋아요 수 업데이트
      setLikes(prevLikes => ({
        ...prevLikes,
        [postId]: prevLikes[postId] + (newLiked ? 1 : -1)
      }));
    } catch (error) {
      console.error("Failed to update like status:", error);
    }
  };

  if (!diaryEntry) {
    return <p>일기를 찾을 수 없습니다.</p>;
  }

  const author = dummy_user.find(user => user.user_id === diaryEntry.user_id);
  const authorName = author ? author.name : '이름을 찾을 수 없음';

  const isFromDiaryboard = location.state?.fromDiaryboard;

  return (
    <div className="diary-detail-container">
      <div className="diary-detail-header">
        <p className="breadcrumb">
          {isFromDiaryboard ? "게시물 > 게시물 상세" : "내일기 > 내일기 상세"}
        </p>
        <button className="back-button" onClick={() => navigate(-1)}>
          &lt; {isFromDiaryboard ? "게시물 목록으로 돌아가기" : "내일기 목록으로 돌아가기"}
        </button>
      </div>

      <div className="flex-cont">
        <div className="cont-2 cont-box">
          <div className="height-6 img-display">
            {diaryEntry.image ? (
              <img src={diaryEntry.image} alt="uploaded" />
            ) : (
              <p className="font-gray">이미지가 없습니다.</p>
            )}
          </div>
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
          {!isFromDiaryboard && (
            <div className="edit-delete-buttons">
              <button className="edit-button">수정</button>
              <button className="delete-button">삭제</button>
            </div>
          )}
        </div>

        <div className="cont-2">
          <div className="cont-box diary-detail-content">
            <p>{diaryEntry.content}</p>
          </div>
          {diaryEntry.public === 1 && (
            <div className="diary-footer">
              <div className="detail-like-section">
                <div
                  className={`like-icon ${liked ? 'liked' : ''}`}
                  onClick={toggleLike} // 좋아요 토글 함수 연결
                  role="button" // 접근성을 위한 버튼 역할 추가
                  tabIndex="0" // 접근성을 위한 키보드 포커스 가능
                  onKeyDown={(e) => e.key === 'Enter' && toggleLike(e)} // Enter 키로도 버튼 활성화
                />
                <span>게시물 좋아요 {likes[postId] || 0}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiaryDetail;
