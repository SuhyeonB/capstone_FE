import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/Sign.css'
import dummy_user from '../dummy/dummy_user';

function Signin() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이션 훅

  const handleLoginClick = () => {
    if (!id && !pw) {
      alert('이메일과 비밀번호를 모두 입력하세요.');
    } else if (!id) {
      alert('이메일을 입력하세요.');
      resetFields();
    } else if (!pw) {
      alert('비밀번호를 입력하세요.');
      resetFields();
    } else {
      const user = dummy_user.find(user => user.email === id && user.password === pw);

      if (user) {
        alert(`${user.name}님, 로그인에 성공했습니다.`);
        navigate('/'); // 로그인 성공 시 메인 페이지로 리다이렉트
      } else {
        alert('이메일 또는 비밀번호가 일치하지 않습니다.');
        resetFields();
      }
    }
  }

  const resetFields = () => {
    setId('');
    setPw('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLoginClick(); // Enter 키를 눌렀을 때 로그인 버튼 클릭 함수 호출.
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>로그인</h2>
        <form className="signin-form">
          <input 
            type="text" 
            placeholder="이메일" 
            className="signin-input" 
            value={id} 
            onChange={(e) => setId(e.target.value)} 
            onKeyDown={handleKeyDown} // ENTER 입력 감지
          />
          <input 
            type="password" 
            placeholder="비밀번호" 
            className="signin-input" 
            value={pw} 
            onChange={(e) => setPw(e.target.value)} 
            onKeyDown={handleKeyDown} // ENTER 입력 감지
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
          <button className="kakao-button">카카오 로그인</button>
          <button className="naver-button">네이버 로그인</button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
