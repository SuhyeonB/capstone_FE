import React, { useState } from 'react';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    return (
        <div className="signup-container">
      <div className="signup-box">
        <h2>비밀번호 분실</h2>
        <form>
        <input 
            type="email" 
            placeholder="이메일" 
            className="input-text" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
            <button className='submit'>보내기</button>
        </form>
      </div>
    </div>
    );
};

export default ResetPassword;