import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios 추가
import dummy_post from '../../dummy/dummy_post'; // 더미 데이터 임포트
import dummy_user from '../../dummy/dummy_user'; // 더미 데이터 임포트

const DiaryDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [diaryEntry, setDiaryEntry] = useState(null); // 서버 데이터 상태
  const [authorName, setAuthorName] = useState(''); // 작성자 이름 상태
  const [likes, setLikes] = useState({}); // 좋아요 상태 관리
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [likeStatus, setLikeStatus] = useState(false); // 좋아요 여부 상태

  // 게시물 상세 정보 가져오기
  useEffect(() => {
    const fetchDiaryDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/${postId}`, {
          headers: {
            Authorization: `Bearer AccessToken`, // 인증 토큰 전달
          },
        });
        setDiaryEntry(response.data); // 서버 데이터를 상태에 설정
        const author = dummy_user.find(user => user.user_id === response.data.user_id);
        setAuthorName(author ? author.name : '이름을 찾을 수 없음'); // 작성자 이름 설정
      } catch (error) {
        console.error('데이터 요청 실패, 더미 데이터를 사용합니다.', error);
        const dummyDiary = dummy_post.find(diary => diary.post_id === parseInt(postId));
        if (dummyDiary) {
          setDiaryEntry(dummyDiary); // 더미 데이터로 설정
          const author = dummy_user.find(user => user.user_id === dummyDiary.user_id);
          setAuthorName(author ? author.name : '이름을 찾을 수 없음'); // 작성자 이름 설정
        }
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchDiaryDetail(); // 데이터 요청 실행
  }, [postId]);

  // 좋아요 상태 가져오기
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/${postId}/likes`, {
          headers: {
            Authorization: `Bearer AccessToken`, // 인증 토큰 전달
          },
        });
        setLikes({ [postId]: response.data.likeCount }); // 서버의 좋아요 수로 초기화
        setLikeStatus(response.data.isLiked); // 좋아요 여부 설정
      } catch (error) {
        console.error('좋아요 상태를 가져오는 중 오류 발생:', error);
        setLikes({}); // 초기화
        setLikeStatus(false); // 좋아요 여부 초기화
      }
    };

    fetchLikes(); // 좋아요 상태 요청
  }, [postId]);

  // 로딩 중일 때 표시
  if (loading) return <p>로딩 중...</p>;

  // 데이터가 없을 경우
  if (!diaryEntry) return <p>일기를 찾을 수 없습니다.</p>;

  // 좋아요 처리 함수
  const handleLike = () => {
    const currentLikes = likes[postId] || 0; // 현재 좋아요 수 가져오기

    if (likeStatus) {
      // 좋아요 취소
      setLikes(prevLikes => ({
        ...prevLikes,
        [postId]: currentLikes - 1,
      }));
      setLikeStatus(false); // 좋아요 상태 변경
    } else {
      // 좋아요 추가
      setLikes(prevLikes => ({
        ...prevLikes,
        [postId]: currentLikes + 1,
      }));
      setLikeStatus(true); // 좋아요 상태 변경
    }
  };

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
              <div
                className={`like-icon ${likeStatus ? 'liked' : ''}`} // 좋아요 여부에 따라 클래스 변경
                onClick={handleLike}
              />
              <span>
                게시물 좋아요 {likes[postId] !== undefined ? likes[postId] : 0}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiaryDetail;
