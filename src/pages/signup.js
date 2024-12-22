import React, { useEffect, useState } from 'react';
import '../styles/Sign.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [pwd, setPwd] = useState('');
    const [usablePwd, setUsablePwd] = useState(true);
    const [repwd, setRepwd] = useState('');
    const [pwdcheck, setPwdcheck] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [time, setTime] = useState(300);
    const [timerShow, setTimerShow] = useState(false);
    const [verifyCode, setVerfyCode] = useState('');
    const [verified, setVerified] = useState(false);
    const [disableVerifyButton, setDisableVerifyButton] = useState(false);

    useEffect(() => {
        if (repwd.length > 0)
            setPwdcheck(pwd === repwd);
    },[pwd, repwd])


    const sendEmail = async () => {
        setTimerShow(true);
        setTime(300);

        try {
            const response = await axios.post('http://localhost:8080/api/emails/send-email', {
                email: email,
            });

            if (response.data === 'verification code sent') {
                console.log('Success:', response.data);
                alert('인증코드가 전송되었습니다.');
            } else {
                console.log('Failed: ', response.data);
                alert("이미 가입된 이메일입니다."); // "Email already exists"
            } 
        } catch (error) {
            console.error('Error sending email:', error);
            alert("이메일 전송에 실패했습니다.");
        }
    };

    // 타이머 효과
    useEffect(() => {
        let timer;
        if (timerShow && time > 0) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
        } else if (time === 0) {
            clearInterval(timer);
            setTimerShow(false); // 타이머가 끝나면 인증창 숨기기
            alert("인증 시간이 만료되었습니다. 다시 시도해 주세요.");
        }

        return () => clearInterval(timer);
    }, [time, timerShow]);

    // 시간을 mm:ss 형식으로 변환하는 함수
    const formatTime = (seconds) => {
        const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
        const remainingSeconds = String(seconds % 60).padStart(2, '0');
        return `${minutes}:${remainingSeconds}`;
    };

    const checkVerify = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/emails/verify-code', {
                email: email,
                code: verifyCode
            });
    
            if (response.data === 'success') {
                alert('인증되었습니다.');
                setVerified(true);
                setTimerShow(false);
                setDisableVerifyButton(true);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data); // Display the error message from the backend
            } else {
                console.error("Unexpected error:", error);
                alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
            }
        }
    };

    const signup = async (e) => {
        e.preventDefault();
    
        if (!name.trim() || !email.trim() || !pwd.trim()) {
            alert("모든 필드를 채워주세요.");
            return;
        }
    
        if (!verified) {
            alert("이메일 인증이 필요합니다.");
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:8080/api/users', {
                name: name,
                email: email,
                password: pwd,
            });
    
            // Success message
            alert("회원가입이 완료되었습니다.");
            console.log('User signed up successfully: ', response.data);
    
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data);
            } else {
                alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
                console.error('Unexpected error during signup:', error.message);
            }
        }
    };
    

    const validatePassword = (password) => {
        const lengthValid = password.length >= 8 && password.length <= 20;
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>~]/.test(password);

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
            <div className='input-with-btn'>
                <input type='email' className='input-text email-input' placeholder='이메일 주소 입력' 
                value={email} onChange={e => setEmail(e.target.value)} required />
                <button className='btn-black' onClick={sendEmail}>인증메일 보내기</button>
            </div>
            
            <span>인증 코드</span>
            <div className='input-with-btn'>
                        <input type='text' className='input-text verify-input' placeholder='인증 코드 입력' 
                        value={verifyCode} onChange={e => setVerfyCode(e.target.value)} required />
                        {timerShow && <div className='timer'>{formatTime(time)}</div>}
                        <button type='button' className='btn-black' onClick={checkVerify} disabled={disableVerifyButton}>인증하기</button>
                    </div>

            <span>
                <span>비밀번호</span>
                {!usablePwd && ( <span className='not-allowed'>잘못된 형식입니다.</span> )}
            </span>
            
            <input type='password' className='input-text'
            placeholder='비밀번호 입력(문자, 숫자, 특수문자 포함 8~20자)'
            value={pwd} onChange={e => {
                const inputPwd = e.target.value;
                setPwd(e.target.value);
                setUsablePwd(validatePassword(inputPwd));
            }} required />
            <span>
                <span>비밀번호 확인</span>
                {!pwdcheck && (<span className='not-allowed'>비밀번호가 일치하지 않습니다.</span>)}
            </span>
            <input type='password' className='input-text' placeholder='비밀번호 재입력'
            value={repwd} onChange={e => {setRepwd(e.target.value);}} required />

            <button className='submit' onClick={signup}>가입하기</button>
        </form>
      </div>
    </div>
    );
};

export default Signup;