import React, { useState } from 'react';
import '../styles/Sign.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 로그인 버튼 클릭 시 실행되는 함수.
  const handleLoginClick = async () => {
    if (!email) { alert("아이디를 입력하세요."); }
    if (email && !password) { alert("비밀번호를 입력하세요."); }
    
    try {
      const response = await axios.post('http://localhost:8080/api/users/signin',  {
        email: email,
        password : password,
      });

      const {accessToken, refreshToken} = response.data;
      console.log('User signed in successfully: ', response.data);

      localStorage.setItem('acessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

    
      navigate('../');
    } catch (error) {
      const status =error.response?.status;
      const message = error.response?.data?.status || error.message;

      if (status === 401) {
        alert('비밀번호가 잘못되었습니다.');
      } else if (status === 404) {
        alert('존재하지 않는 회원입니다.');
      } else { //
        alert('Error during login:', message);
      }
    }
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
            onKeyDown={(e) => {if (e.key === 'Enter') handleLoginClick(); }} // ENTER 입력 감지.
            required
          />
          <button 
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
          <button className="kakao-button">카카오 로그인</button>
          <button className="naver-button">네이버 로그인</button>
          </form>
        </div>
      </div>
  );
}

export default Signin;
