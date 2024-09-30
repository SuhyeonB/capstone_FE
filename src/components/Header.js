import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import "../styles/component_css/Main.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const dropdownRef = useRef(null);

  // 드롭다운 토글 함수
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert("로그아웃 되었습니다.");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // 외부 클릭시 드롭다운 메뉴 닫기
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="brand">My Daily Diary</Link>
        <ul className="nav-links">
          <li><Link to="/diary">내일기</Link></li>
          <li><Link to="/writediary">일기작성</Link></li>
          <li><Link to="/board">게시판</Link></li>
        </ul>
      </div>
      <div className="header-right">
        {isLoggedIn ? (
          <>
            <button className="logout" onClick={handleLogout}>로그아웃</button>
            <li className="mypage-container" ref={dropdownRef}>
              <button className="mypage" onClick={toggleDropdown}>마이페이지</button>
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <li><Link to="/likes">좋아요 보관함</Link></li>
                  <li><Link to="/editprofile">회원정보수정</Link></li>
                  <li><Link to="/deleteaccount">회원탈퇴</Link></li>
                </ul>
              )}
            </li>
          </>
        ) : (
          <Link to="/signin" className="login">로그인</Link>
        )}
      </div>
    </header>
  );
};

export default Header;