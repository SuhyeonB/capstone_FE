import React from 'react';
import '../../styles/diary.css';

const DiaryModal = ({ setInitialModal }) => {
    const handleDiaryCreate = () => {
        setInitialModal(false);
        window.open('http://localhost:8501', '_blank'); // AI 생성 페이지를 새 탭에서 열기
    };

    const handleDiaryWrite = () => {
        setInitialModal(false);
    };

    return (
        <div className="diarymodal-background">
            <div className="diarymodal">
                <div className="diarymodal-option" onClick={handleDiaryCreate}>
                    <div className="ai-icon"></div>
                    <p>
                        일기 작성이 어려우신가요? <br />
                        AI가 도와드릴게요!<br />
                        쉽고 간편하게 일기를 생성해 보세요.
                    </p>
                    <button>일기 생성하기</button>
                </div>
                <div className="diarymodal-option" onClick={handleDiaryWrite}>
                    <div className="create-icon"></div>
                    <p>
                        오늘 하루를 직접 기록해 보세요.<br />
                        편하게 일기를 작성할 수 있어요!
                    </p>
                    <button>일기 작성하기</button>
                </div>
            </div>
        </div>
    );
};

export default DiaryModal;
