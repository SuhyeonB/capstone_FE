import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Happiness = () => {
  const [happinessData, setHappinessData] = useState(new Array(31).fill(0)); // 31일 데이터를 위한 초기화
  const [inputValue, setInputValue] = useState(0); // 입력값 상태 관리
  const [currentDay, setCurrentDay] = useState(null); // 현재 날짜 상태 관리
  const [currentMonth, setCurrentMonth] = useState(''); // 현재 달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  // 페이지 접속 시 현재 날짜와 달 설정
  useEffect(() => {
    const today = new Date();
    setCurrentDay(today.getDate()); // 오늘의 일자를 설정
    setCurrentMonth(today.toLocaleString('ko-KR', { month: 'long' })); // 현재 달 설정
  }, []);

  // 평균 계산 함수
  const calculateAverage = () => {
    const validData = happinessData.filter(value => value > 0);
    const sum = validData.reduce((a, b) => a + b, 0);
    return validData.length > 0 ? (sum / validData.length).toFixed(2) : 0;
  };

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    setInputValue(parseFloat(e.target.value));
  };

  // 행복지수 저장 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    const newHappinessData = [...happinessData];
    newHappinessData[currentDay - 1] = inputValue; // 오늘 날짜의 행복지수 업데이트
    setHappinessData(newHappinessData);
    setIsModalOpen(false); // 모달 닫기
  };

  // 그래프에 표시할 데이터 형식
  const chartData = {
    labels: Array.from({ length: 31 }, (_, i) => `${i + 1}일`),
    datasets: [
      {
        label: '행복지수',
        data: happinessData,
        backgroundColor: 'blue', // 막대 전체 색상
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        grid: {
          display: false, 
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false, 
        },
        ticks: {
          display: false,
        },
        min: 0,
        max: 10, 
      },
    },
    plugins: {
      legend: {
        display: false, 
      },
    },
    maintainAspectRatio: false, 
    elements: {
      bar: {
        borderRadius: 2, 
        barPercentage: 0.5,
      },
    },
  };

  return (
    <div className="happiness-card">
      <h1><strong>{currentMonth} 행복지수</strong></h1>
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>

      <div className="average">
        <span className="average-text"><strong>평균</strong></span>
        <span className="average-score"><strong>{calculateAverage()} 점</strong></span>
      </div>

      <button className="register-button" onClick={() => setIsModalOpen(true)}>행복지수 등록</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>행복지수 등록(0~10)</h3>
            <form onSubmit={handleSubmit}>
              <p>오늘은 {currentDay}일입니다.</p>
              <input
                type="number"
                id="happiness-input"
                step="0.5"
                min="0"
                max="10"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button type="submit" className="submit-button">등록</button>
              <button onClick={() => setIsModalOpen(false)} className="close-button">닫기</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Happiness;
