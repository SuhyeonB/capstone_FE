import React, { useState } from 'react';
import '../styles/component_css/Main.css';
import Calendar from "./Calendar";

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
                            <strong>{username}</strong>님, 오늘 하루는 어땠나요?
                        </div>
                        <div className="weather-info">

                        </div>
                    </div>
                    <div className="content">
                        <div className="calendar">
                            <Calendar/>
                        </div>
                        <div className="happiness-index">

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

export default Main;


/*import React from 'react';
import '../styles/component_css/Main.css'

const Main = () => {
    return (
        <div className="wallpaper">
            <div className='text fade-in-up'>
            <strong>당신</strong>의 <br/>오늘 하루는 어땠나요?
            </div>
        </div>
    );
};

export default Main;*/