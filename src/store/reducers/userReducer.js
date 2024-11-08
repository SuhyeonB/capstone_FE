// 초기 상태 정의
const initialState = {
  isLoggedIn: false, // 로그인 상태를 나타내는 변수. 기본값은 false (로그인되지 않음)
  userId: null,      // 로그인된 사용자의 ID. 기본값은 null
  username: null,    // 로그인된 사용자의 이름. 기본값은 null
};

// userReducer 함수 정의. state와 action을 받아서 새로운 상태를 반환
const userReducer = (state = initialState, action) => {
  // action의 type에 따라 상태를 변경하는 switch 문
  switch (action.type) {
    // 'SET_USER' 액션 타입일 때 (사용자 정보를 설정할 때)
    case 'SET_USER':
      return {
        ...state,                   // 이전 상태를 복사 (기존 상태 유지)
        isLoggedIn: true,           // 로그인 상태를 true로 설정
        userId: action.payload.userId, // 액션의 payload에서 userId 값을 가져와 설정
        username: action.payload.username, // 액션의 payload에서 username 값을 가져와 설정
      };
    // 'LOGOUT_USER' 액션 타입일 때 (사용자가 로그아웃할 때)
    case 'LOGOUT_USER':
      return initialState; // 초기 상태로 돌아감
    // 다른 액션 타입일 경우 현재 상태를 그대로 반환
    default:
      return state;
  }
};

export default userReducer;
