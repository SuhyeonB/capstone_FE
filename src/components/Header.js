import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/component_css/Main.css";
import { logoutUser } from '../store/actions/userActions';

const Header = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser);
    alert("로그아웃 되었습니다.");

    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="brand">My Daily Diary</Link>
        <ul className="nav-links">
          <li><Link to="/diary">내일기</Link></li>
          <li><Link to="/writediary">일기작성</Link></li>
          <li><Link to="/board">게시물</Link></li>
        </ul>
      </div>
      <div className="header-right">
        {isLoggedIn ? (
          <>
            <button className="logout" onClick={handleLogout}>로그아웃</button>
            <button className="mypage" onClick={() => navigate('/mypage')}>마이페이지</button>
          </>
        ) : (
          <Link to="/signin" className="login">로그인</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
