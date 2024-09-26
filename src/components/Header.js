import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/component_css/Main.css"

const Header = () => {
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
        <Link to="/signin" className="login">로그인</Link>
      </div>
    </header>
    );
};

export default Header;