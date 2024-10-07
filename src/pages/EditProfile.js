import React, { useEffect, useState } from 'react';
import '../styles/Sign.css';

const EditProfile = () => {
    const [pwd, setPwd] = useState(''); // 새 비밀번호
    const [usablePwd, setUsablePwd] = useState(true); // 새 비밀번호 유효성 여부
    const [repwd, setRepwd] = useState(''); // 새 비밀번호 확인
    const [pwdcheck, setPwdcheck] = useState(true); // 비밀번호 확인 여부
    const [name, setName] = useState(''); // 이름
    const [email, setEmail] = useState(''); // 이메일
    const [currentPassword, setCurrentPassword] = useState(''); // 현재 비밀번호

    // 비밀번호와 비밀번호 확인이 일치하는지 여부 체크
    useEffect(() => {
        setPwdcheck(pwd === repwd);
    }, [pwd, repwd]);

    const onClick = (e) => {
        e.preventDefault();
        if (!usablePwd || !pwdcheck) {
            alert('비밀번호를 다시 확인해주세요.');
            return;
        }
        alert('수정되었습니다.');
    };

    // 비밀번호 유효성 검사 함수
    const validatePassword = (password) => {
        const lengthValid = password.length >= 8 && password.length <= 20;
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return lengthValid && hasLetter && hasNumber && hasSpecialChar;
    };

    return (
        <div className="editprofile-container">
            <div className="editprofile-box">
                <h2>회원정보수정</h2>
                <form onSubmit={onClick}>
                    <span>이름</span>
                    <input type="text" className="input-text" placeholder="이름을 입력해주세요" 
                    value={name} onChange={e => setName(e.target.value)} required />

                    <span>이메일</span>
                    <input type="email" className="input-text" placeholder="이메일 주소 입력"
                    value={email} onChange={e => setEmail(e.target.value)} required />

                    <span>현재 비밀번호</span>
                    <input type="password" className="input-text" placeholder="현재 비밀번호 입력" 
                    value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />

                    <span>새 비밀번호</span>
                    {!usablePwd && (<span className="not-allowed">잘못된 형식입니다.</span>)}
                    <input
                        type="password"
                        className="input-text"
                        placeholder="비밀번호 입력(문자, 숫자, 특수문자 포함 8~20자)"
                        value={pwd}
                        onChange={e => {
                            const inputPwd = e.target.value;
                            setPwd(inputPwd);
                            setUsablePwd(validatePassword(inputPwd));
                        }}
                        required
                    />

                    <span>새 비밀번호 확인</span>
                    {!pwdcheck && (<span className="not-allowed">비밀번호가 일치하지 않습니다.</span>)}
                    <input type="password" className="input-text" placeholder="비밀번호 재입력"
                    value={repwd} onChange={e => setRepwd(e.target.value)} required />
                    
                    <button className="submit" type="submit">수정하기</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
