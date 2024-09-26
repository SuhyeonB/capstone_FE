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

/*import React, { useState } from 'react';
import '../styles/component_css/Main.css';
import Calendar from '../pages/main/Calendar';
import Happiness from '../pages/main/Happiness';
import Weather from '../pages/main/Weather';

const Main = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // 로그인 상태 관리
    const username = "홍길동";

    return (
        <div className="wallpaper">
            {isLoggedIn ? (
                // 로그인 된 상태의 화면
                <div className="logged-in-view">
                    <div className="header">
                        <div className="text fade-in-up">
                            <strong>{username}</strong>님, <br />오늘 하루는 어땠나요?
                        </div>
                        <div className="weather-info">
                            <Weather/>
                        </div>
                    </div>
                    <div className="content">
                        <div className="calendar">
                            <Calendar/>
                        </div>
                        <div className="happiness-index">
                            <Happiness/>
                        </div>
                    </div>
                </div>
            ) : (
                // 비 로그인 상태의 화면
                <div className="text fade-in-up">
                    <strong>당신</strong>의 <br />오늘 하루는 어땠나요?
                </div>
            )}
        </div>
    );
};

export default Main;*/