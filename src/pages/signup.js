import React, { useEffect, useState } from 'react';
import '../styles/Sign.css'

const Signup = () => {
    const [pwd, setPwd] = useState('');
    const [usablePwd, setUsablePwd] = useState(true);
    const [repwd, setRepwd] = useState('');
    const [pwdcheck, setPwdcheck] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        setPwdcheck(pwd === repwd);
    },[pwd, repwd])

    const onClick = () => {
        alert(`이메일: ${email} / 비밀번호: ${pwd} / 이름: ${name}`)
    }

    const validatePassword = (password) => {
        const lengthValid = password.length >= 8 && password.length <= 20;
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return lengthValid && hasLetter && hasNumber && hasSpecialChar;
    };

    return (
        <div className="signup-container">
      <div className="signup-box">
        <h2>회원가입</h2>
        <form>
            
            <span>이름</span>
            <input type='text' className='input-text' placeholder='이름을 입력해주세요' 
            value={name} onChange={e => setName(e.target.value)} required />

            <span>이메일</span>
            <input type='email' className='input-text' placeholder='이메일 주소 입력' 
            value={email} onChange={e => setEmail(e.target.value)} required />

            <span>비밀번호</span>
            {!usablePwd && ( <span className='not-allowed'>잘못된 형식입니다.</span> )}
            
            <input type='password' className='input-text'
            placeholder='비밀번호 입력(문자, 숫자, 특수문자 포함 8~20자)'
            value={pwd} onChange={e => {
                const inputPwd = e.target.value;
                setPwd(e.target.value);
                setUsablePwd(validatePassword(inputPwd));
            }} required />

            <span>비밀번호 확인</span>
            {!pwdcheck && (<span className='not-allowed'>비밀번호가 일치하지 않습니다.</span>)}
            <input type='password' className='input-text' placeholder='비밀번호 재입력'
            value={repwd} onChange={e => {setRepwd(e.target.value);}} required />

            <button className='submit' onClick={onClick}>가입하기</button>
        </form>
      </div>
    </div>
    );
};

export default Signup;