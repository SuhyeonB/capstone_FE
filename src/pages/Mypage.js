import React, { useEffect, useState } from 'react';
import '../styles/Sign.css';
import api from '../api/interceptor';

const Mypage = () => {
    const [pwd, setPwd] = useState(''); 
    const [usablePwd, setUsablePwd] = useState(true); 
    const [repwd, setRepwd] = useState(''); 
    const [pwdcheck, setPwdcheck] = useState(true); 
    const [name, setName] = useState('홍길동'); 
    const [email, setEmail] = useState('hong@example.com');

    // 비밀번호와 비밀번호 확인이 일치하는지 여부 체크
    useEffect(() => {
        setPwdcheck(pwd === repwd);
    }, [pwd, repwd]);

    const onClick = async (e) => {
        e.preventDefault();
        if (!usablePwd || !pwdcheck) {
            alert('비밀번호를 다시 확인해주세요.');
            return;
        }
        
        try {
            // 회원 정보 수정 요청
            const response = await api.put('/api/user/update', {
                name,
                email,
                password: pwd
            });
            alert('수정되었습니다.');
            console.log("서버 응답:", response.data);
        } catch (error) {
            console.error("Failed to update profile:", error);
            alert("프로필 수정 중 오류가 발생했습니다.");
        }
    };

    // 회원탈퇴 버튼 클릭 시
    const handleDeleteAccount = async () => {
        if (window.confirm('정말로 회원탈퇴 하시겠습니까?')) {
            try {
                // 회원 탈퇴 요청
                const response = await api.delete('/api/user/delete');
                alert('회원탈퇴가 완료되었습니다.');
                console.log("서버 응답:", response.data);
            } catch (error) {
                console.error("Failed to delete account:", error);
                alert("회원 탈퇴 중 오류가 발생했습니다.");
            }
        }
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
                <h2>마이페이지</h2>
                <form onSubmit={onClick}>
                    <span>이름</span>
                    <input 
                        type="text" 
                        className="input-text" 
                        placeholder="이름을 입력해주세요" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        required 
                    />

                    <span>이메일</span>
                    <input 
                        type="email" 
                        className="input-text" 
                        placeholder="이메일 주소 입력" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        required 
                    />

                    <span>비밀번호</span>
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

                    <span>비밀번호 확인</span>
                    {!pwdcheck && (<span className="not-allowed">비밀번호가 일치하지 않습니다.</span>)}
                    <input 
                        type="password" 
                        className="input-text" 
                        placeholder="비밀번호 재입력" 
                        value={repwd} 
                        onChange={e => setRepwd(e.target.value)} 
                        required 
                    />
                    
                    <button className="submit" type="submit">수정하기</button>
                </form>

                <button 
                    className="delete-account" 
                    onClick={handleDeleteAccount}
                >
                    회원탈퇴
                </button>
            </div>
        </div>
    );
};

export default Mypage;
