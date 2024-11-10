import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

// 요청 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    // localStorage에서 access token을 가져옴
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      // access token이 존재하면 Authorization 헤더에 추가
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config; 
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config; 

    // 401 Unauthorized 에러가 발생하고, 재시도하지 않은 요청일 때만 실행
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token'); // localStorage에서 refresh token을 가져옵니다.

      if (refreshToken) {
        try {
          // refresh token을 이용해 새로운 access token을 요청
          const response = await api.post('/auth/refresh', { token: refreshToken });
          const newAccessToken = response.data.access_token; // 새로 받은 access token을 변수에 저장

          // 새로운 access token을 localStorage에 저장
          localStorage.setItem('access_token', newAccessToken);

          // 원래 요청의 Authorization 헤더에 새로운 access token을 설정
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          // 실패했던 요청을 새로운 access token으로 재시도하여 반환
          return api(originalRequest);
        } catch (refreshError) {
          // refresh token이 만료되거나 유효하지 않다면 오류 처리
          localStorage.removeItem('access_token'); // 기존 access token을 삭제
          localStorage.removeItem('refresh_token'); // 기존 refresh token을 삭제
          window.location.href = '/login'; // 사용자에게 다시 로그인을 요청
          return Promise.reject(refreshError); // 오류를 반환하여 이후 로직에서 처리할 수 있게 함
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
