import axios from 'axios';
import { refreshAccessToken } from './auth'; // refreshAccessToken 함수 가져오기

const api = axios.create({
    baseURL: 'http://localhost:8080', // 서버 주소
});

// 요청 인터셉터 설정
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`; // Access Token 추가
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터 설정
api.interceptors.response.use(
    (response) => response, // 응답 성공 시 그대로 반환
    async (error) => {
        const originalRequest = error.config;

        // Access Token 만료 시 처리
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // 재시도 플래그 설정

            try {
                const newAccessToken = await refreshAccessToken(); // 새 Access Token 발급
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`; // 헤더에 새로운 Access Token 설정
                return api(originalRequest); // 원래 요청 재시도
            } catch (refreshError) {
                console.error('Refresh token expired or invalid:', refreshError);
                localStorage.removeItem('access_token'); // Access Token 삭제
                localStorage.removeItem('refresh_token'); // Refresh Token 삭제
                window.location.href = '/login'; // 로그인 페이지로 리다이렉트
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error); // 다른 에러는 그대로 반환
    }
);

export default api;