import React, { useEffect, useState } from 'react';
import '../styles/Sign.css'

const Signup = () => {
    const [id, setId] = useState('');
    const [usableID, setUsableID] = useState(true);
    const [pwd, setPwd] = useState('');
    const [usablePwd, setUsablePwd] = useState(true);
    const [repwd, setRepwd] = useState('');
    const [pwdcheck, setPwdcheck] = useState(true);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        setPwdcheck(pwd === repwd);
    },[pwd, repwd])

    const onClick = () => {
        alert(`아이디: ${id} / 비밀번호: ${pwd} / 이름: ${name} / 전화번호: {$phone} / 이메일: ${email}`)
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
            <span>아이디</span>
            {!usableID && ( <span className='not-allowed'>사용할 수 없는 아이디입니다.</span> )}
            
            <input type='text' className='input-text' placeholder='아이디 입력 (6~20자)'
            value={id} onChange={e => {
                const inputId = e.target.value;
                setId(e.target.value);
                if (inputId.length > 0 && (inputId.length < 6 || inputId.length > 20)) {
                    setUsableID(false);
                } else setUsableID(true);
            }} required />

            <span>비밀번호</span>
            {!usablePwd && ( <span className='not-allowed'>잘못된 형식입니다.</span> )}
            
            <input type='text' className='input-text'
            placeholder='비밀번호 입력(문자, 숫자, 특수문자 포함 8~20자)'
            value={pwd} onChange={e => {
                const inputPwd = e.target.value;
                setPwd(e.target.value);
                setUsablePwd(validatePassword(inputPwd));
            }} required />

            <span>비밀번호 확인</span>
            {!pwdcheck && (<span className='not-allowed'>비밀번호가 일치하지 않습니다.</span>)}
            <input type='text' className='input-text' placeholder='비밀번호 재입력'
            value={repwd} onChange={e => {setRepwd(e.target.value);}} required />

            <span>이름</span>
            <input type='text' className='input-text' placeholder='이름을 입력해주세요' 
            value={name} onChange={e => setName(e.target.value)} required />

            <span>전화번호</span>
            <input type='text' className='input-text' placeholder='휴대폰 번호 입력' 
            value={phone} onChange={e => setPhone(e.target.value)} required/>

            <span>이메일 주소</span>
            <input type='text' className='input-text' placeholder='이메일 주소 입력' 
            value={email} onChange={e => setEmail(e.target.value)} required />

            <button className='submit' onClick={onClick}>가입하기</button>
        </form>
      </div>
    </div>
    );
};

export default Signup;