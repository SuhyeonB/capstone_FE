import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import dummy_post from '../../dummy/dummy_post';
import dummy_user from '../../dummy/dummy_user';

const DiaryDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [diaryEntry, setDiaryEntry] = useState(null);
  const [authorName, setAuthorName] = useState('');
  const [likes, setLikes] = useState(0); // 좋아요 수 상태
  const [loading, setLoading] = useState(true);
  const [likeStatus, setLikeStatus] = useState(false);

  // 게시물 상세 정보 가져오기
  useEffect(() => {
    const fetchDiaryDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // 인증 토큰
          },
        });
        setDiaryEntry(response.data);
        setLikes(response.data.likeCount); // 좋아요 수 초기화
        const author = dummy_user.find(user => user.user_id === response.data.user_id);
        setAuthorName(author ? author.name : '이름을 찾을 수 없음');
      } catch (error) {
        console.error('데이터 요청 실패, 더미 데이터를 사용합니다.', error);
        const dummyDiary = dummy_post.find(diary => diary.post_id === parseInt(postId));
        if (dummyDiary) {
          setDiaryEntry(dummyDiary);
          setLikes(dummyDiary.likeCount); // 더미 데이터에서 좋아요 수 가져오기
          const author = dummy_user.find(user => user.user_id === dummyDiary.user_id);
          setAuthorName(author ? author.name : '이름을 찾을 수 없음');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDiaryDetail();
  }, [postId]);

  // 좋아요 처리 함수
  const handleLike = () => {
    const currentLikes = likes;

    if (likeStatus) {
      // 좋아요 취소
      setLikes(currentLikes - 1);
      setLikeStatus(false);
    } else {
      // 좋아요 추가
      setLikes(currentLikes + 1);
      setLikeStatus(true);
    }

    // dummy_post 업데이트
    const updatedPost = dummy_post.find(diary => diary.post_id === parseInt(postId));
    if (updatedPost) {
      updatedPost.likeCount = likeStatus ? currentLikes - 1 : currentLikes + 1;
    }
  };

  // 로딩 중일 때 표시
  if (loading) return <p>로딩 중...</p>;

  // 데이터가 없을 경우
  if (!diaryEntry) return <p>일기를 찾을 수 없습니다.</p>;

  return (
    <div className="diary-detail-container">
      <div className="diary-detail-header">
        <p className="breadcrumb">게시물 &gt; 게시물 상세</p>
        <button className="back-button" onClick={() => navigate(-1)}>
          &lt; 게시물 목록으로 돌아가기
        </button>
      </div>
      <div className="flex-cont">
        <div className="cont-2 cont-box">
          <div className="height-6 img-display">
            {diaryEntry.imageUrl ? (
              <img src={diaryEntry.imageUrl} alt="Diary" className="detail-image" />
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
        </div>
        <div className="cont-2">
          <div className="cont-box diary-detail-content">
            <p>{diaryEntry.content}</p>
          </div>

          {diaryEntry.public === 1 && (
            <div className="diary-footer">
              <div className="detail-like-section">
                <div
                  className={`like-icon ${likeStatus ? 'liked' : ''}`}
                  onClick={handleLike}
                />
                <span>게시물 좋아요 {likes}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiaryDetail;
