import React, { useState } from 'react';
import axios from 'axios';

const HelperButton = ({ content, setTranslatedContent, setAssistantFeedback, setShowPopup }) => {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {

        
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/assistant/analyze', { content });
            setTranslatedContent(response.data.translate);
            setAssistantFeedback(response.data.assistant);
            setShowPopup(true);
        } catch (error) {
            alert("AI 분석 요청 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            className={`helper-button ${loading ? "loading" : ""}`}
            onClick={handleClick}
            disabled={loading}
        ></button>
    );
};

export default HelperButton;
