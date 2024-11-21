import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dummy_post from '../../dummy/dummy_post';
import dummy_user from '../../dummy/dummy_user';
import "../../styles/diary.css";

import arrowUp from '../../assets/icons/arrow_up.gif';
import arrowDwn from '../../assets/icons/arrow_dwn.gif';
import searchIcon from '../../assets/icons/search.png';
import likeIcon from '../../assets/icons/ico-subscription-b.png';

const Diaryboard = () => {
  const [sortOrder, setSortOrder] = useState("latest"); // 정렬 기준 상태
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 열림 상태
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 검색창 열림 상태
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [posts, setPosts] = useState([]); // 게시물 상태
  const [filteredPosts, setFilteredPosts] = useState([]); // 검색 필터링된 게시물 상태

  const findUserNameById = (userId) => {
    const user = dummy_user.find(user => user.user_id === userId);
    return user ? user.name : 'Unknown User';
  };

  // 게시물을 정렬 기준에 따라 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url =
          sortOrder === "latest"
            ? "http://localhost:8080/api/public" // 최신순 데이터
            : "http://localhost:8080/api/public/like-count"; // 좋아요순 데이터

        const response = await axios.get(url); // 서버 요청
        setPosts(response.data); // 서버 데이터로 상태 업데이트
      } catch (error) {
        console.error("게시물 데이터를 가져오는 중 오류 발생. 더미 데이터를 사용합니다.", error);

        // 서버 요청 실패 시 더미 데이터 사용
        const sortedData = [...dummy_post];
        if (sortOrder === "latest") {
          sortedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else {
          sortedData.sort((a, b) => b.likeCount - a.likeCount);
        }
        setPosts(sortedData); // 더미 데이터로 상태 설정
      }
    };

    fetchPosts(); // 데이터 요청
  }, [sortOrder]); // 정렬 기준 변경 시 실행

  // 검색어를 기반으로 게시물 필터링
  useEffect(() => {
    const filtered = posts.filter(
      (diary) =>
        diary.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        diary.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered); // 필터링된 게시물 상태 설정
  }, [searchQuery, posts]); // 검색어 또는 게시물이 변경될 때 실행

  // 정렬 기준 변경 핸들러
  const handleSortChange = (order) => {
    setSortOrder(order); // 정렬 기준 업데이트
    setIsDropdownOpen(false); // 드롭다운 닫기
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

  return (
    <div className="diary-board">
      <h1 className="board-title">여러분은 어떤 하루를 보냈나요?</h1>

      {/* 검색 및 정렬 영역 */}
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
            likeCount={diary.likeCount}
            findUserNameById={findUserNameById}
          />
        ))}
      </div>
    </div>
  );
};

const DiaryEntry = ({ postId, title, content, userId, createdAt, weather, imageUrl, likeCount, findUserNameById }) => {
  const navigate = useNavigate();

  // 게시물 클릭 시 상세 페이지 이동
  const goToDetailPage = () => {
    const path = `/board/${postId}`;
    navigate(path, { state: { fromDiaryboard: true } });
  };

  return (
    <div className="diary-entry" onClick={goToDetailPage}>
      {/* 게시물 이미지 */}
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
        <span className="user-name">{findUserNameById(userId)}</span>
        <span className="createdAt">{createdAt}</span>
        <span className={`weather-icon ${weather.replace(/\s/g, '-')}`}></span>
      </div>

      {/* 좋아요 컨테이너 */}
      <div className="like-container">
        <img src={likeIcon} alt="Like Icon" />
        <span className="like-count">{likeCount}</span>
      </div>
    </div>
  );
};

export default Diaryboard;
