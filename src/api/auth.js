import axios from 'axios';

// Refresh Token을 사용해 새로운 Access Token을 발급받는 함수
export async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('refresh_token'); // Refresh Token 가져오기

    if (!refreshToken) {
        throw new Error('No refresh token found');
    }

    try {
        const response = await axios.post('http://localhost:8080/api/users/refresh', {
            token: refreshToken, // Refresh Token을 서버로 전달
        });

        const newAccessToken = response.data.accessToken; // 새로 발급받은 Access Token
        localStorage.setItem('access_token', newAccessToken); // LocalStorage에 저장
        return newAccessToken; // Access Token 반환
    } catch (error) {
        console.error('Failed to refresh access token:', error);
        throw error;
    }
}
