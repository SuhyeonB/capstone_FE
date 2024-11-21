import React, { useEffect, useState } from 'react';
import '../../styles/diary.css';
//import api from '../../api/interceptor';
import image_upload from '../../assets/icons/image-upload.png';
import arrowUp from '../../assets/icons/arrow_up.gif';
import arrowDwn from '../../assets/icons/arrow_dwn.gif';
import dummy_post from '../../dummy/dummy_post';

const CreateDiary = () => {
    const today = new Date();
    const MAX_CONTENT_LENGTH = 1000;
    const MAX_TITLE_LENGTH = 50;

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

    const [imagePreview, setImagePreview] = useState(null); // 미리보기 이미지
    const [imageFile, setImageFile] = useState(null); // 업로드된 이미지 파일

    const handleTitleChange = (e) => {
        const inputTitle = e.target.value;
        if (inputTitle.length <= MAX_TITLE_LENGTH) {
            setTitle(inputTitle);
        }
    };

    // Handle Content Change (with length restriction)
    const handleContentChange = (e) => {
        const inputContent = e.target.value;
        if (inputContent.length <= MAX_CONTENT_LENGTH) {
            setContent(inputContent);
        } else {
            alert("더 이상 작성하실 수 없습니다.")
        }
    };
    
    // 공개 여부를 선택하는 함수
    const handleSelect = (value) => {
        setPublic(value);
        setIsOpen(false);
    };

    // 내용이 입력될 때마다 글자 수를 계산하는 함수
    useEffect(() => {
        setTypo(content.length);
    }, [content]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result); // Display the preview
            };
            reader.readAsDataURL(file);
            setImageFile(file); // Save the uploaded file
        }
    };

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

        // 유저가 작성한 내용을 바탕으로 번역 및 맞춤법 검사 수행
        const translated = `
        오늘은 보라카이에서 평화로운 하루를 보냈다. 관광객이 적은 시기에 방문해서 특히 조용했고, 섬의 매력을 여유롭게 즐길 수 있었다. 부모님이 마사지를 받으러 가신 동안 나는 산책하며 주변을 탐험하기로 했다.

        `;
        const feedback = `
1. there day
there는 장소를 나타낼 때 사용하는 단어인데, 여기서는 그들의라는 소유격을 나타내야 해서 their를 써야 합니다.

수정 방법: friendly people going about their day로 고치는 것이 맞습니다.
`;


        // 번역 및 피드백 내용을 상태에 저장하여 모달에 표시
        setTranslatedContent(translated);
        setAssistantFeedback(feedback);
        setResultModal(true); // 결과 모달 열기
    };

    // "일기 등록하기" 버튼 클릭 시 실행되는 함수
    const handleRegister = () => {
        if (!title || !content) {
            alert("제목과 내용을 모두 입력해주세요!");
            return;
        }

        const newDiary = {
            post_id: dummy_post.length + 1,
            title: title,
            content: content,
            createdAt: today.toISOString().split('T')[0],
            public: ispublic === "비공개" ? 0 : 1,
            user_id: 101,
            weather: weather,
            imageUrl: imageFile ? URL.createObjectURL(imageFile) : null, // 업로드된 이미지를 URL로 변환
            likeCount: 0, // Default
        };
        dummy_post.push(newDiary);
        alert("일기가 성공적으로 등록되었습니다!");

        // Reset form fields
        setTitle('');
        setContent('');
        setImagePreview(null);
        setImageFile(null);
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
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="image-preview"
                                style={{width:"100%"}} />
                            ) : (
                                <>
                                    <img src={image_upload} alt="image_upload" className="font-gray" />
                                    <p className="font-gray">
                                        이곳을 클릭하여 이미지를 업로드하세요.<br />
                                        지원 형식(jpg, jpeg, png)
                                    </p>
                                </>
                            )}
                        </label>
                        <input
                            type="file"
                            id="upload"
                            accept="image/*"
                            className="invisible"
                            onChange={handleImageUpload}
                        />
                    </div>
                    {/* 제목 입력 */}
                    <div className="diary-title diary-element">
                        <input
                            type="text" value={title} onChange={handleTitleChange}
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
                        <textarea value={content} onChange={handleContentChange}
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