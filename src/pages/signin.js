import React, { useState } from 'react';
import '../styles/Sign.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/actions/userActions';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginClick = async () => {
    if (!email) { alert("아이디를 입력하세요."); return; }
    if (!password) { alert("비밀번호를 입력하세요."); return; }

    try {
      const response = await axios.post('http://localhost:8080/api/users/signin', {
        email,
        password,
      });

      const { accessToken, refreshToken, userId, username } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // 유저 정보를 리덕스에 저장
      dispatch(setUser(userId, username));
      
      navigate('../');
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.status || error.message;

      if (status === 401) {
        alert('비밀번호가 잘못되었습니다.');
      } else if (status === 404) {
        alert('존재하지 않는 회원입니다.');
      } else {
        alert('로그인 중 오류:', message);
      }
    }
  };

  // 카카오 로그인 핸들러
  const handleKakaoLogin = () => {
    window.location.href = 'https://kauth.kakao.com/oauth/authorize?client_id=YOUR_KAKAO_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code';
  };

  // 구글 로그인 핸들러
  const handleGoogleLogin = () => {
    window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email profile';
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>로그인</h2>
        <form className="signin-form">
          <input 
            type="email" 
            placeholder="이메일" 
            className="signin-input" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          <input 
            type="password" 
            placeholder="비밀번호" 
            className="signin-input" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            onKeyDown={(e) => { if (e.key === 'Enter') handleLoginClick(); }}
            required
          />
          <button 
            type="button" 
            className="signin-button" 
            onClick={handleLoginClick}
          >
            로그인
          </button>
          <div className="signin-options">
            <label>
              <input type="checkbox" /> 자동 로그인
            </label>
            <Link to='/signup' className="link-button">회원가입</Link>
          </div>
          <button 
            type="button" 
            className="kakao-button" 
            onClick={handleKakaoLogin}
          ></button>
          <button 
            type="button" 
            className="google-button" 
            onClick={handleGoogleLogin}
          ></button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
