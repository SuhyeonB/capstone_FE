import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/interceptor'; // Axios interceptor 사용
import "../../styles/diary.css";

import arrowUp from '../../assets/icons/arrow_up.gif';
import arrowDwn from '../../assets/icons/arrow_dwn.gif';
import searchIcon from '../../assets/icons/search.png';
import likeIcon from '../../assets/icons/ico-subscription-b.png';

const Diaryboard = () => {
  const [sortOrder, setSortOrder] = useState("latest");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  // 게시물을 서버에서 가져오는 함수
  const fetchPosts = async () => {
    try {
      const url =
        sortOrder === "latest"
          ? "/api/public" // 최신순 API
          : "/api/public/like-counts"; // 좋아요순 API

      const response = await api.get(url);
      setPosts(response.data); // 서버에서 가져온 데이터로 상태 업데이트
    } catch (error) {
      console.error("서버에서 게시물을 가져오는 중 오류 발생:", error);
      setPosts([]); // 오류 발생 시 빈 배열로 초기화
    }
  };

  useEffect(() => {
    fetchPosts(); // 정렬 상태 변경 시 데이터 요청
  }, [sortOrder]);

  // 검색어에 따른 필터링
  useEffect(() => {
    const filtered = posts.filter(
      (diary) =>
        diary.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        diary.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered); // 필터링된 데이터 상태 업데이트
  }, [searchQuery, posts]);

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

  return (
    <div className="diary-board">
      <h1 className="board-title">여러분은 어떤 하루를 보냈나요?</h1>

      {/* 검색 및 정렬 영역 */}
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

      {/* 게시물 리스트 */}
      <div className="diary-list">
        {filteredPosts.map((diary) => (
          <DiaryEntry
            key={diary.postId}
            postId={diary.postId}
            title={diary.title}
            content={diary.content}
            userId={diary.userId}
            createdAt={diary.createdAt}
            weather={diary.weather}
            imageUrl={diary.imageUrl}
            likeCount={diary.likeCount}
          />
        ))}
      </div>
    </div>
  );
};

const DiaryEntry = ({ postId, title, content, userId, createdAt, weather, imageUrl, likeCount }) => {
  const navigate = useNavigate();

  const goToDetailPage = () => {
    navigate(`/board/${postId}`);
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
        <span className="createdAt">{createdAt}</span>
        <span className={`weather-icon ${weather.replace(/\s/g, '-')}`}></span>
      </div>
      <div className="like-container">
        <img src={likeIcon} alt="Like Icon" />
        <span className="like-count">{likeCount}</span>
      </div>
    </div>
  );
};

export default Diaryboard;