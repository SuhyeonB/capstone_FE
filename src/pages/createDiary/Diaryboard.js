import React, { useState } from 'react';
import api from '../../api/interceptor';
import dummy_post from '../../dummy/dummy_post';
import dummy_user from '../../dummy/dummy_user';
import "../../styles/diary.css";

import arrowUp from '../../assets/icons/arrow_up.gif';
import arrowDwn from '../../assets/icons/arrow_dwn.gif';
import searchIcon from '../../assets/icons/search.png';

const Diaryboard = () => {
  const [sortOrder, setSortOrder] = useState("latest"); // 최신순, 좋아요순 정렬 순서 상태
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 정렬 드롭다운 열림/닫힘 상태
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 검색창 열림/닫힘 상태
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태

  // 유저이름 찾가
  const findUserNameById = (userId) => {
    const user = dummy_user.find(user => user.user_id === userId);
    return user ? user.name : 'Unknown User';
  };

  // 게시를 목록 정렬 / 공개된 개시글 표시
  const sortedPosts = [...dummy_post]
    .filter((diary) => diary.public === 1) // 공개된 게시글만 표시
    .sort((a, b) => {
      if (sortOrder === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt); // 최신순으로 정렬
      } else {
        return b.likes - a.likes; // 좋아요순으로 정렬
      }
    });

  // 정렬 순서 변경 함수
  const handleSortChange = (order) => {
    setSortOrder(order);
    setIsDropdownOpen(false); // 드롭다운 닫기
  };

  // 정렬 드롭다운 열림/닫힘 토글
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 검색창 열림/닫힘 토글
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // 검색어 변경 시 검색어 상태 업데이트
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 검색어에 따라 게시글 필터링
  const filteredPosts = sortedPosts.filter((diary) =>
    diary.title.includes(searchQuery) || diary.content.includes(searchQuery)
  );

  return (
    <div className="diary-board">
      <h1 className='board-title'>여러분은 어떤 하루를 보냈나요?</h1>
      
      {/* 검색 및 정렬 컨테이너 */}
      <div className="search-sort-container">
        
        {/* 검색 아이콘 */}
        <img 
          src={searchIcon} 
          alt="Search Icon" 
          className="search-icon" 
          onClick={toggleSearch} 
        />
        
        {/* 검색창 */}
        {isSearchOpen && (
          <input 
            type="text" 
            value={searchQuery} 
            onChange={handleSearchChange} 
            placeholder="검색어를 입력하세요"
            className="search-input" 
          />
        )}
        
        {/* 정렬 드롭다운 */}
        <div className="sort-dropdown">
          <div className="dropdown">
            <button className="dropbtn" onClick={toggleDropdown}>
              {sortOrder === "latest" ? "최신순" : "좋아요순"}
              <img
                src={isDropdownOpen ? arrowUp : arrowDwn}
                alt={isDropdownOpen ? "arrow_up" : "arrow_dwn"}
                className="arrow"
              />
            </button>
            
            {/* 드롭다운 메뉴 항목 */}
            {isDropdownOpen && (
              <div className="dropdown-content">
                <div
                  className={`dropdown-item ${sortOrder === "latest" ? "active" : ""}`}
                  onClick={() => handleSortChange("latest")}
                >
                  최신순
                </div>
                <div
                  className={`dropdown-item ${sortOrder === "likes" ? "active" : ""}`}
                  onClick={() => handleSortChange("likes")}
                >
                  좋아요순
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* 게시글 목록 */}
      <div className="diary-list">
        {filteredPosts.map((diary) => (
          <DiaryEntry
            key={diary.post_id}
            title={diary.title}
            content={diary.content}
            userId={diary.user_id}
            createdAt={diary.createdAt}
            weather={diary.weather}
            imageUrl={diary.imageUrl}
            findUserNameById={findUserNameById}
          />
        ))}
      </div>
    </div>
  );
};

// 게시글 항목 컴포넌트
const DiaryEntry = ({ title, content, userId, createdAt, weather, imageUrl, findUserNameById }) => {
  const [liked, setLiked] = useState(false);   // 좋아요 버튼 상태

  // 좋아요 버튼 클릭 시 상태 변경 및 서버로 좋아요 상태 전송
  const toggleLike = async () => {
    setLiked(!liked);
    try {
      const response = await api.post('/api/like', { postId: userId, liked: !liked }); // 좋아요 상태를 서버에 업데이트하는 요청
      console.log(response.data.message); // 서버의 응답 메시지 출력
    } catch (error) {
      console.error("Failed to update like status:", error);
    }
  };

  return (
    <div className="diary-entry">
      {/* 좋아요 버튼 */}
      <span
        className={`like-button ${liked ? 'liked' : ''}`}
        onClick={toggleLike}
      />
      {/* 이미지가 있는 경우 이미지 표시 */}
      {imageUrl && (
        <div className="diary-image">
          <img src={imageUrl} alt="Diary entry" />
        </div>
      )}
      {/* 제목 */}
      <div className="diary-header">
        <h2>{title}</h2>
      </div>
      {/* 내용 */}
      <p>{content}</p>
      
      {/* 게시글 메타 정보 */}
      <div className="diary-meta">
        <span className='user-name'>{findUserNameById(userId)}</span>
        <span className='createdAt'>{createdAt}</span>
        <span className={`weather-icon ${weather.replace(/\s/g, '-')}`}></span>
      </div>
    </div>
  );
};

export default Diaryboard;
