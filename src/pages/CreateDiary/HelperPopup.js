import React from 'react';

const HelperPopup = ({ content, translatedContent, assistantFeedback, onClose, onRegister }) => {
    return (
        <div className="modal-background">
            <div className="modal-content">
                <div className="content-section">
                    {/* 작성된 일기 섹션 */}
                    <div className="left-section">
                        <div className="section-title">작성된 일기</div>
                        <p className="diarycontent">{content}</p>
                    </div>
                    {/* 번역과 어시스턴트 섹션 */}
                    <div className="right-section">
                        {/* 일기 번역 */}
                        <div>
                            <div className="section-title">일기 번역</div>
                            <p className="translated-content">{translatedContent}</p>
                        </div>
                        {/* 어시스턴트 */}
                        <div className="assistant">
                            <div className="section-title">어시스턴트</div>
                            <p className="assistant-feedback">{assistantFeedback}</p>
                        </div>
                    </div>
                </div>
                {/* 버튼 섹션 */}
                <div className="button-section">
                    <button className="register-button" onClick={onRegister}>일기 등록하기</button>
                    <button className="close-button" onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
};

export default HelperPopup;
