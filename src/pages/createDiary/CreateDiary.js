import React, { useEffect, useState } from 'react';
import '../../styles/diary.css';
import api from '../../api/interceptor';
import image_upload from '../../assets/icons/image-upload.png';
import arrowUp from '../../assets/icons/arrow_up.gif';
import arrowDwn from '../../assets/icons/arrow_dwn.gif';

const CreateDiary = () => {
    const [typo, setTypo] = useState(0); // 글자 수 상태
    const [title, setTitle] = useState(''); // 제목 상태
    const [content, setContent] = useState(''); // 내용 상태
    const [weather, setWeather] = useState(''); // 날씨 선택 상태
    const [ispublic, setPublic] = useState("비공개"); // 공개 여부 상태
    const [isOpen, setIsOpen] = useState(false); // 공개 여부 선택 창의 열림/닫힘 상태
    const [initialModal, setInitialModal] = useState(true); // 일기 생성/작성 선택 모달 표시 여부
    const [resultModal, setResultModal] = useState(false); // 결과 모달 표시 여부
    const [translatedContent, setTranslatedContent] = useState(''); // 번역된 내용
    const [assistantFeedback, setAssistantFeedback] = useState(''); // 어시스턴트 피드백

    // 공개 여부를 선택하는 함수
    const handleSelect = (value) => {
        setPublic(value);
        setIsOpen(false);
    };

    // 내용이 입력될 때마다 글자 수를 계산하는 함수
    useEffect(() => {
        setTypo(content.length);
    }, [content]);

    // 예시 번역 함수
    const translateContent = (text) => {
        // 실제 번역 대신 예시 번역 반환
        return `번역: ${text}`;
    };

    // 간단한 맞춤법 검사 함수
    const checkSpelling = (text) => {
        // 간단한 예시 맞춤법 검사 (실제 API 또는 로직으로 대체 가능)
        if (text.includes("beautiful")) {
            return "‘beautiful’은 잘못된 단어 스펠링입니다.";
        }
        return "맞춤법 오류가 없습니다.";
    };

    /* 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/diary', {
                title,
                content,
                weather,
                visibility: ispublic === 'pub' ? '전체공개' : '비공개'
            });
            alert("일기가 성공적으로 등록되었습니다.");
            console.log("서버 응답:", response.data);
        } catch (error) {
            console.error("Failed to create diary:", error);
            alert("일기 등록 중 오류가 발생했습니다.");
        }
    };
    */

    // 제출 버튼 클릭 시 실행되는 함수
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/diary', {
                title,
                content,
                weather,
                visibility: ispublic === 'pub' ? '전체공개' : '비공개'
            });
            alert("일기가 성공적으로 등록되었습니다.");
            console.log("서버 응답:", response.data);
        } catch (error) {
            console.error("Failed to create diary:", error);
            alert("일기 등록 중 오류가 발생했습니다.");
        }

        // 유저가 작성한 내용을 바탕으로 번역 및 맞춤법 검사 수행
        const translated = translateContent(content);
        const feedback = checkSpelling(content);

        // 번역 및 피드백 내용을 상태에 저장하여 모달에 표시
        setTranslatedContent(translated);
        setAssistantFeedback(feedback);
        setResultModal(true); // 결과 모달 열기
    };

    // "일기 등록하기" 버튼 클릭 시 실행되는 함수
    const handleRegister = () => {
        alert("일기가 성공적으로 등록되었습니다!");
        setResultModal(false);
    };

    // AI 일기 생성 선택 시 실행되는 함수
    const handleDiaryCreate = () => {
        setInitialModal(false);
        window.open('http://localhost:8501', '_blank'); // AI 생성 페이지를 새 탭에서 열기
    };

    // 직접 일기 작성 선택 시 실행되는 함수
    const handleDiaryWrite = () => {
        setInitialModal(false);
    };

    return (
        <div className="container">
            {/* 일기 생성 또는 작성 선택 모달 */}
            {initialModal && (
                <div className="diarymodal-background">
                    <div className="diarymodal">
                        <div className="diarymodal-option" onClick={handleDiaryCreate}>
                            <div className="ai-icon"></div>
                            <p>일기 작성이 어려우신가요? <br />AI가 도와드릴게요!<br />쉽고 간편하게 일기를 생성해 보세요.</p>
                            <button>일기생성 하기</button>
                        </div>
                        <div className="diarymodal-option" onClick={handleDiaryWrite}>
                            <div className="create-icon"></div>
                            <p>오늘 하루를 직접 기록해 보세요.<br />편하게 일기를 작성할 수 있어요!</p>
                            <button>일기작성 하기</button>
                        </div>
                    </div>
                </div>
            )}

            <h1 className="board-title">새로운 일기 작성</h1>
            <p className='align-right'>{typo}/1000자</p>
            <div className='flex-cont'>
                <div className="cont-2 cont-box">
                    {/* 이미지 업로드 */}
                    <div className="height-6 img-upload">
                        <label htmlFor="upload">
                            <img src={image_upload} alt="image_upload" className='font-gray' />
                            <p className='font-gray'>이곳을 클릭하여 이미지를 업로드하세요.<br />지원 형식(jpg, jpeg, png)</p>
                        </label>
                        <input type="file" id="upload" accept="image/*" className='invisible' />
                    </div>
                    {/* 제목 입력 */}
                    <div className="diary-title diary-element">
                        <input
                            type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                            placeholder="제목을 입력하세요."
                        />
                    </div>
                    <div className='flex-cont diary-element options'>
                        {/* 공개 여부 선택 */}
                        <div className="privacy">
                            <div className="custom-select-box" onClick={() => setIsOpen(!isOpen)} >
                                {ispublic === 'non-pub' ? '비공개' : '전체공개'}
                                {isOpen ? 
                                <img src={arrowUp} alt="arrow_up" className='arrow'/>
                                : <img src={arrowDwn} alt="arrow_dwn" className='arrow'/>}
                            </div>
                            {isOpen && (
                                <div className="custom-select-options">
                                    <div className={`custom-option ${ispublic === 'non-pub' ? 'selected' : ''}`}
                                        onClick={() => handleSelect('non-pub', '비공개')} >비공개</div>
                                    <div className={`custom-option ${ispublic === 'pub' ? 'selected' : ''}`}
                                        onClick={() => handleSelect('pub', '전체공개')} >전체공개</div>
                                </div>
                            )}
                        </div>                        
                        {/* 날씨 선택 */}
                        <div className="weather">
                            <span>날씨 선택</span>
                            <div className="weather-options">
                                <input type="radio" name='weather' value="sunny" id='sunny'
                                onChange={e => setWeather(e.target.value)} />
                                <label htmlFor="sunny" className='sunnybtn'/>
                                <input type="radio" name='weather' value="partly cloudy" id='pcloudy'
                                onChange={e => setWeather(e.target.value)} />
                                <label htmlFor="pcloudy" className='pcloudybtn'/>
                                <input type="radio" name='weather' value="rainy" id='rainy'
                                onChange={e => setWeather(e.target.value)} />
                                <label htmlFor="rainy" className='rainybtn'/>
                                <input type="radio" name='weather' value="snowy" id='snowy'
                                onChange={e => setWeather(e.target.value)} />
                                <label htmlFor="snowy"  className='snowybtn'/>
                                <input type="radio" name='weather' value="cloudy" id='cloudy'
                                onChange={e => setWeather(e.target.value)} />
                                <label htmlFor="cloudy"  className='cloudybtn'/>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 내용 입력 */}
                <div className='cont-2'>
                    <div className='cont-box diary-content'>
                        <textarea value={content} onChange={(e) => setContent(e.target.value)}
                        placeholder="내용을 입력하세요."/>
                    </div>
                    {/* 제출 버튼 */}
                    <button className="submit-btn cont-box" onClick={handleSubmit}>제출하기</button>
                </div>
            </div>
            {/* 결과 모달 */}
            {resultModal && (
                <div className="modal-background">
                    <div className="modal-content">
                        {/* 작성된 일기와 번역/어시스턴트를 가로로 배치 */}
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
                            <button className="register-button" onClick={handleRegister}>일기 등록하기</button>
                            <button className="close-button" onClick={() => setResultModal(false)}>닫기</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateDiary;
