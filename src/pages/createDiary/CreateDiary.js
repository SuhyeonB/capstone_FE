import React, { useState } from 'react';
import '../../styles/diary.css';

import image_upload from '../../assets/icons/image-upload.png'
import sunny from '../../assets/icons/9193.png'
import partly_cloudy from '../../assets/icons/9190.png'
import rainy from '../../assets/icons/9188.png'
import snowy from '../../assets/icons/9191.png'
import cloudy from '../../assets/icons/9192.png'

import default_sunny from '../../assets/icons/9197.png'
import default_partly_cloudy from '../../assets/icons/9198.png'
import default_rainy from '../../assets/icons/9194.png'
import default_snowy from '../../assets/icons/9195.png'
import default_cloudy from '../../assets/icons/9187.png'
import { upload } from '@testing-library/user-event/dist/upload';
import { Form } from 'react-router-dom';

const CreateDiary = () => {
    const typo=0;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    //const [weather, setWeather] = useState('');
    //const [visibility, setVisibility] = useState('private');

    const handleSubmit = (e) => {
        e.preventDefault();
        // 일기 저장 로직 추가 가능
        console.log({
            title,
            content,
            //weather,
            //visibility
        });
    };
    return (
        <div className="container">
            <h1>새로운 일기 작성</h1>
            <p className='align-right'>{typo}/1000자</p>
            <div className='flex-cont'>
                <div className="cont-2">
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
                        <div className="diary-options">
                            <div className="privacy">
                                <label htmlFor="visibility">전체공개</label>
                                {/*
                                <select id="visibility" value={visibility}
                                    onChange={(e) => setVisibility(e.target.value)} >
                                    <option value="private">비공개</option>
                                    <option value="public">전체공개</option>
                                </select> */}
                            </div>
                        </div>
                        
                        {/* 날씨 선택 */}
                        <div className="weather">
                            <span>날씨 선택</span>
                            <div className="weather-options">
                                <img src={default_sunny} alt='default_sunny'/>
                                <img src={default_partly_cloudy} alt='default_partly_cloudy'/>
                                <img src={default_rainy} alt='default_rainy'/>
                                <img src={default_snowy} alt='default_snowy'/>
                                <img src={default_cloudy} alt='default_cloudy'/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 내용 입력 */}
                <div className='cont-2 diary-content'>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)}
                        placeholder="내용을 입력하세요." ></textarea>
                {/* 제출 버튼 */}
                <button className="submit-btn" onClick={handleSubmit}>일기 등록 완료</button>
                </div>
            </div>
        </div>
    );
};

export default CreateDiary;