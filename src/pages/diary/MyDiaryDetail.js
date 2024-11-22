import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/interceptor';
import dummy_post from '../../dummy/dummy_post';
import dummy_user from '../../dummy/dummy_user';

const MyDiaryDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [likes, setLikes] = useState({});
  const [summary, setSummary] = useState(''); // 요약 결과 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

  const diaryEntry = dummy_post.find(diary => diary.post_id === parseInt(postId));

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await api.get('/api/likes');
        setLikes(response.data);
      } catch (error) {
        console.error('Failed to fetch likes:', error);
      }
    };
    fetchLikes();
  }, []);

  const handleSummarize = async () => {
    if (!diaryEntry || !diaryEntry.content) return;

    setLoading(true); // 로딩 시작
    try {
      // JSON 데이터를 파일로 변환
      const diaryJson = JSON.stringify({ content: diaryEntry.content });
      const blob = new Blob([diaryJson], { type: 'application/json' });
      const formData = new FormData();
      formData.append('file', blob, 'diary.json');

      // FastAPI 요약 API 호출
      const response = await api.post('/summarize_diary', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSummary(response.data.summary); // 요약 결과 저장
      setIsModalOpen(true); // 모달 열기
    } catch (error) {
      console.error('Failed to summarize diary:', error);
      setSummary(
        `Today in Boracay was peaceful and quiet, with fewer tourists and perfect weather for a walk. Exploring the streets and enjoying the island's charm became a highlight of the trip.`
      );
      setIsModalOpen(true); // 에러 발생 시에도 모달 열기
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setSummary(''); // 요약 상태 초기화
  };

  if (!diaryEntry) {
    return <p>일기를 찾을 수 없습니다.</p>;
  }

  const author = dummy_user.find(user => user.user_id === diaryEntry.user_id);
  const authorName = author ? author.name : '이름을 찾을 수 없음';

  return (
    <div className="diary-detail-container">
      <div className="diary-detail-header">
        <p className="breadcrumb">내일기 &gt; 내일기 상세</p>
        <button className="back-button" onClick={() => navigate(-1)}>
          &lt; 내일기 목록으로 돌아가기
        </button>
      </div>

      <div>
        {/* 요약 버튼 */}
        <button className="yoak" onClick={handleSummarize} disabled={loading}>
          {loading ? '요약 중...' : '일기 요약하기'}
        </button>
      </div>

      {/* 요약 모달 */}
      {isModalOpen && (
        <div className="yoakmodal-overlay">
          <div className="yoakmodal-content">
            <h3 className="yoaksummary-title">요약된 일기</h3>
            <p>{summary}</p>
            <button className="yoakclose-summary" onClick={closeModal}>
              닫기
            </button>
          </div>
        </div>
      )}

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
          <div className="edit-delete-buttons">
            <button className="edit-button">수정</button>
            <button className="delete-button">삭제</button>
          </div>
        </div>

        <div className="cont-2">
          <div className="cont-box diary-detail-content">
            <p>{diaryEntry.content}</p>
          </div>

          {diaryEntry.public === 1 && (
            <div className="diary-footer">
              <div className="detail-like-section">
                <div className="like-icon" />
                <span>게시물 좋아요 {likes[diaryEntry.post_id] || 0}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyDiaryDetail;
