import React, { useEffect, useState } from 'react';
import '../../styles/diary.css';
import api from '../../api/interceptor';
import image_upload from '../../assets/icons/image-upload.png';
import arrowUp from '../../assets/icons/arrow_up.gif';
import arrowDwn from '../../assets/icons/arrow_dwn.gif';

const CreateDiary = () => {
    const [typo, setTypo] = useState(0);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [weather, setWeather] = useState('');
    const [ispublic, setPublic] = useState("비공개");
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(true);

    const handleSelect = (value) => {
        setPublic(value);
        setIsOpen(false);
    };

    useEffect(() => {
        setTypo(content.length);
    }, [content]);

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

    const handleDiaryCreate = () => {
        setShowModal(false);
        window.open('http://localhost:8501', '_blank'); // 새 탭에서 Streamlit 페이지로 이동
    };

    const handleDiaryWrite = () => {
        setShowModal(false);
    };

    return (
        <div className="container">
            {showModal && (
                <div className="diarymodal-background">
                    <div className="diarymodal">
                        <div className="diarymodal-option" onClick={handleDiaryCreate}>
                            <div className="ai-icon"></div>
                            <p>일기 작성이 어려우신가요? <br/>AI가 도와드릴게요!<br />쉽고 간편하게 일기를 생성해 보세요.</p>
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
                    {/* 이미지 업로드 영역 */}
                    <div className="height-6 img-upload">
                        <label htmlFor="upload">
                            <img src={image_upload} alt="image_upload" className='font-gray'/>
                            <p className='font-gray'>이곳을 클릭하여 이미지를 업로드하세요.<br />지원 형식(jpg, jpeg, png)</p>
                        </label>
                        <input type="file" id="upload" accept="image/*" className='invisible'/>
                    </div>
                    {/* 제목 입력 */}
                    <div className="diary-title diary-element">
                        <input
                            type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                            placeholder="제목을 입력하세요."
                        />
                    </div>
                    <div className='flex-cont diary-element options'>
                        {/* 비공개/전체공개 선택 */}
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
                    <button className="submit-btn cont-box" onClick={handleSubmit}>일기 등록 완료</button>
                </div>
            </div>
        </div>
    );
};

export default CreateDiary;
