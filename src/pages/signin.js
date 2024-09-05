import React, { useState } from 'react';
import '../styles/Sign.css'
import { Link } from 'react-router-dom';

function Signin() {
  // id와 pw를 관리할 상태 변수.
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  // 로그인 버튼 클릭 시 실행되는 함수.
  const handleLoginClick = () => {
    if (!id && !pw) {
      alert('아이디와 비밀번호를 모두 입력하세요.');
    } else if (!id) {
      alert('아이디를 입력하세요.');
      resetFields();
    } else if (!pw) {
      alert('비밀번호를 입력하세요.');
      resetFields();
    } else {
      alert(`로그인이 성공적으로 처리되었습니다.`);
    }
  }

  // id, pw 초기화.
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
            placeholder="아이디" 
            className="signin-input" 
            value={id} 
            onChange={(e) => setId(e.target.value)} 
            onKeyDown={handleKeyDown} // ENTER 입력 감지.
          />
          <input 
            type="password" 
            placeholder="비밀번호" 
            className="signin-input" 
            value={pw} 
            onChange={(e) => setPw(e.target.value)} 
            onKeyDown={handleKeyDown} // ENTER 입력 감지.
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
