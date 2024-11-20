import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dummy_post from '../../dummy/dummy_post';
import dummy_user from '../../dummy/dummy_user';
import "../../styles/diary.css";

import arrowUp from '../../assets/icons/arrow_up.gif';
import arrowDwn from '../../assets/icons/arrow_dwn.gif';
import searchIcon from '../../assets/icons/search.png';

const Diaryboard = () => {
  const [sortOrder, setSortOrder] = useState("latest");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const findUserNameById = (userId) => {
    const user = dummy_user.find(user => user.user_id === userId);
    return user ? user.name : 'Unknown User';
  };

  // 게시물 정렬
  const sortedPosts = [...dummy_post]
    .filter((diary) => diary.public === 1) // 공개된 게시물만 표시
    .sort((a, b) => {
      if (sortOrder === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt); // 최신순
      } else {
        return b.likes - a.likes; // 좋아요순
      }
    });

  // 정렬 순서 변경 핸들러
  const handleSortChange = (order) => {
    setSortOrder(order);
    setIsDropdownOpen(false);
  };

  // 드롭다운 토글
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 검색창 토글
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 검색 필터 적용
  const filteredPosts = sortedPosts.filter((diary) =>
    diary.title.includes(searchQuery) || diary.content.includes(searchQuery)
  );

  return (
    <div className="diary-board">
      <h1 className='board-title'>여러분은 어떤 하루를 보냈나요?</h1>

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
            
            {/* 드롭다운 메뉴 */}
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
      
      {/* 게시물 리스트 */}
      <div className="diary-list">
        {filteredPosts.map((diary) => (
          <DiaryEntry
            key={diary.post_id}
            postId={diary.post_id} 
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

const DiaryEntry = ({ postId, title, content, userId, createdAt, weather, imageUrl, findUserNameById }) => {
  const navigate = useNavigate();

  // 게시물 클릭 시 경로 설정
  const goToDetailPage = () => {
    const path = `/board/${postId}`;
    navigate(path, { state: { fromDiaryboard: true } });
  };

  return (
    <div className="diary-entry" onClick={goToDetailPage}>
      {/* 이미지 */}
      {imageUrl && (
        <div className="diary-image">
          <img src={imageUrl} alt="Diary entry" />
        </div>
      )}

      {/* 게시물 제목 */}
      <div className="diary-header">
        <h2>{title}</h2>
      </div>

      {/* 게시물 내용 */}
      <p>{content}</p>

      {/* 메타 정보 */}
      <div className="diary-meta">
        <span className='user-name'>{findUserNameById(userId)}</span>
        <span className='createdAt'>{createdAt}</span>
        <span className={`weather-icon ${weather.replace(/\s/g, '-')}`}></span>
      </div>
    </div>
  );
};

export default Diaryboard;