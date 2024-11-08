// userid와 username을 payload로 전달하여 redux 상태에 저장
// reducer에서 payload 정보를 참조하여 상태를 업데이트
export const setUser = (userId, username) => ({
  type: 'SET_USER',
  payload: { userId, username },
});

// 유저가 로그아웃할 시에 사용자 정보 초기상태로 돌아감
export const logoutUser = () => ({
  type: 'LOGOUT_USER',
});
