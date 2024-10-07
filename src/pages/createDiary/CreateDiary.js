import React, { useEffect, useState } from 'react';
import '../../styles/diary.css';

import image_upload from '../../assets/icons/image-upload.png'
import arrowUp from '../../assets/icons/arrow_up.gif'
import arrowDwn from '../../assets/icons/arrow_dwn.gif'

const CreateDiary = () => {
    const [typo, setTypo] = useState(0);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [weather, setWeather] = useState('');
    const [ispublic, setPublic] = useState("비공개");
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (value) => {
        setPublic(value);
        setIsOpen(false);
    };

    useEffect(()=>{
        setTypo(content.length)
    }, [setTypo, content])
    useEffect(() => {
        
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(title +"\n" + content + "\n"+weather + "\n" + ispublic);
        console.log({
            title,
            content,
            weather,
            //visibility
        });
    };
    return (
        <div className="container">
            <h1>새로운 일기 작성</h1>
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