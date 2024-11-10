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

  const sortedPosts = [...dummy_post]
    .filter((diary) => diary.public === 1)
    .sort((a, b) => {
      if (sortOrder === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return b.likes - a.likes;
      }
    });

  const handleSortChange = (order) => {
    setSortOrder(order);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPosts = sortedPosts.filter((diary) =>
    diary.title.includes(searchQuery) || diary.content.includes(searchQuery)
  );

  return (
    <div className="diary-board">
      <h1 className='board-title'>여러분은 어떤 하루를 보냈나요?</h1>

      <div className="search-sort-container">
        <img 
          src={searchIcon} 
          alt="Search Icon" 
          className="search-icon" 
          onClick={toggleSearch} 
        />

        {isSearchOpen && (
          <input 
            type="text" 
            value={searchQuery} 
            onChange={handleSearchChange} 
            placeholder="검색어를 입력하세요"
            className="search-input" 
          />
        )}
        
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

  // 게시물 클릭 시 DiaryDetail로 이동하며 상태 전달
  const goToDetailPage = () => {
    navigate(`/diary/${postId}`, { state: { fromDiaryboard: true } });
  };

  return (
    <div className="diary-entry" onClick={goToDetailPage}>
      {imageUrl && (
        <div className="diary-image">
          <img src={imageUrl} alt="Diary entry" />
        </div>
      )}
      <div className="diary-header">
        <h2>{title}</h2>
      </div>
      <p>{content}</p>
      <div className="diary-meta">
        <span className='user-name'>{findUserNameById(userId)}</span>
        <span className='createdAt'>{createdAt}</span>
        <span className={`weather-icon ${weather.replace(/\s/g, '-')}`}></span>
      </div>
    </div>
  );
};

export default Diaryboard;
