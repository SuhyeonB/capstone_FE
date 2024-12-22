import React, { useEffect, useState } from 'react';
import '../../styles/diary.css';
import HelperButton from './HelperButton';
import HelperPopup from './HelperPopup';
import DiaryModal from './DiarlModal';
import image_upload from '../../assets/icons/image-upload.png';
import arrowUp from '../../assets/icons/arrow_up.gif';
import arrowDwn from '../../assets/icons/arrow_dwn.gif';
import axios from 'axios';

const CreateDiary = () => {
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

    const handleRegister = async () => {
        if (!title || !content || !weather) {
            alert("제목과 내용을 모두 입력해주세요!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("isPublic", ispublic === "비공개" ? false : true); // Boolean 값 전달
        formData.append("weather", weather);
        if (imageFile) {
            formData.append("image", imageFile); // 이미지 파일 추가
        }

        try {
            // 서버로 POST 요청 전송
            const response = await axios.post('http://localhost:8080/api/posts', formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // FormData 전송
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}` // JWT 토큰 추가
                },
            });

            // 성공적으로 처리된 경우
            alert("일기가 성공적으로 등록되었습니다!");
            console.log("서버 응답:", response.data);

            // 상태 초기화
            setTitle('');
            setContent('');
            setImagePreview(null);
            setImageFile(null);
            setResultModal(false);

        } catch (error) {
            console.error("Failed to create diary:", error);
            alert("일기 등록 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="container">
            {/* 일기 생성 또는 작성 선택 모달 */}
            {initialModal && <DiaryModal setInitialModal={setInitialModal} />}

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
                    <button className="submit-btn cont-box" onClick={handleRegister}>일기 등록하기</button>
                </div>
                {/* 모달 열기 버튼 */}
                <HelperButton
                    content={content} // content 전달
                    setTranslatedContent={setTranslatedContent}
                    setAssistantFeedback={setAssistantFeedback}
                    setShowPopup={setResultModal}
                />
            </div>
            {/* 결과 모달 */}
            {resultModal && (
                <HelperPopup
                    content={content}
                    translatedContent={translatedContent}
                    assistantFeedback={assistantFeedback}
                    onClose={() => setResultModal(false)}
                    onRegister={handleRegister}
                />
            )}
        </div>
    );
};

export default CreateDiary;