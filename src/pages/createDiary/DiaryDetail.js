import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/interceptor';
import dummy_post from '../../dummy/dummy_post';
import dummy_user from '../../dummy/dummy_user';

const DiaryDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [likes, setLikes] = useState({});
  const diaryEntry = dummy_post.find(diary => diary.post_id === parseInt(postId));

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        // 좋아요 수를 가져오는 요청
        const response = await api.get('/api/likes');
        setLikes(response.data);
      } catch (error) {
        console.error("Failed to fetch likes:", error);
      }
    };
    fetchLikes();
  }, []);

  if (!diaryEntry) {
    return <p>일기를 찾을 수 없습니다.</p>;
  }

  // 일기를 작성한 유저의 이름 찾기
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
                <span className="detail-author">{authorName}</span>  {/*게시물을 작성한 유저의 이름*/}
                <span className="detail-createdAt">{diaryEntry.createdAt}</span> {/*게시물 작성 날짜*/}
                <span className="detail-public-status"> {/*게시물의 공개여부*/}
                    {diaryEntry.public === 1 ? '전체 공개' : '비공개'}
                </span>
                <label className={`detail-weather-icon ${diaryEntry.weather}`}></label> {/*게시물의 날씨*/}
            </div>
          </div>
          <div className="edit-delete-buttons"> {/*게시물의 수정 또는 삭제 선택*/}
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
              <div className="detail-like-section"> {/*게시물의 좋아요 갯수 표시*/}
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

export default DiaryDetail;
