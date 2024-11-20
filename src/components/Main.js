import React from 'react';
import { useSelector } from "react-redux";
import '../styles/component_css/Main.css';
import Calendar from '../pages/main/Calendar';
import Happiness from '../pages/main/Happiness';
import Weather from '../pages/main/Weather';

const Main = () => {
    //const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const isLoggedIn = true;
    const username = useSelector((state) => state.user.username);

    return (
        <div className="wallpaper">
            {isLoggedIn ? (
                // 로그인 된 상태의 화면
                <div className="logged-in-view">
                    <div className="content-header">
                        <div className="intro-text fade-in-up">
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

export default Main;