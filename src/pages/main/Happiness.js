import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import dummy_happy from '../../dummy/dummy_happy';
import texts from '../../dummy/texts';

const Happiness = () => {
  const initialHappinessData = dummy_happy.map(data => data.score);
  const [happinessData, setHappinessData] = useState(initialHappinessData);
  const [inputValue, setInputValue] = useState(0);
  const [currentDay, setCurrentDay] = useState(null);
  const [currentMonth, setCurrentMonth] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [average, setAverage] = useState(0);

  useEffect(() => {
    const today = new Date();
    setCurrentDay(today.getDate());
    setCurrentMonth(today.toLocaleString('ko-KR', { month: 'long' }));
  }, []);

  useEffect(() => {
    const validData = happinessData.filter(value => value >= 0);
    const sum = validData.reduce((a, b) => a + b, 0);
    const avg = validData.length > 0 ? (sum / validData.length).toFixed(2) : 0;
    setAverage(avg);
  }, [happinessData]);

  useEffect(() => {
    let range = 0;
    if (average >= 8) {
      range = 8;
    } else if (average >= 6) {
      range = 6;
    } else if (average >= 4) {
      range = 4;
    } else if (average >= 2) {
      range = 2;
    } else {
      range = 0;
    }

    const messages = texts[range] || [];
    const randomMessage = messages.length > 0
      ? messages[Math.floor(Math.random() * messages.length)]
      : '문구를 찾을 수 없습니다.';
    setMessage(randomMessage);
  }, [average]);

  const handleInputChange = (e) => {
    setInputValue(parseFloat(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHappinessData = [...happinessData];
    newHappinessData[currentDay - 1] = inputValue;
    setHappinessData(newHappinessData);
    setIsModalOpen(false);
  };

  const chartData = {
    labels: Array.from({ length: 31 }, (_, i) => `${i + 1}일`),
    datasets: [
      {
        label: '행복지수',
        data: happinessData,
        backgroundColor: 'blue',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    animation: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: { display: false },
      },
      y: {
        grid: { display: false },
        ticks: { display: false },
        min: 0,
        max: 10,
      },
    },
    plugins: {
      legend: { display: false },
    },
    maintainAspectRatio: false,
    elements: {
      bar: { borderRadius: 2, barPercentage: 0.5 },
    },
  };

  return (
    <div className="happiness-card">
      <h1 className="happiness-title"><strong>{currentMonth} 행복지수</strong></h1>
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>

      <div className="average-section">
        <span className="average-text"><strong>평균</strong></span>
        <span className="average-score"><strong>{average} 점</strong></span>
      </div>

      <div className="message">
        <p>{message}</p>
      </div>

      <button className="register-btn" onClick={() => setIsModalOpen(true)}>
      <strong>행복지수 등록</strong>
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3 className="modal-title">행복지수 등록(0~10)</h3>
            <form className="modal-form" onSubmit={handleSubmit}>
              <p>오늘은 {currentDay}일입니다.</p>
              <input
                className="modal-input"
                type="number"
                step="0.5"
                min="0"
                max="10"
                value={inputValue}
                onChange={handleInputChange}
              />
              <div className="button-group">
                <button type="submit" className="submit-button">등록</button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="close-button">
                  닫기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Happiness;
