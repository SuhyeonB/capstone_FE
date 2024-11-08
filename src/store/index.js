import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // rootReducer 가져오기 
 
// configureStore를 사용하여 Redux 스토어 생성
// reducer 속성에 rootReducer를 전달하여 스토어가 전체 애플리케이션의 상태를 관리하도록 설정
const store = configureStore({
  reducer: rootReducer, // rootReducer : 결합된 리듀서로, 애플리케이션의 상태를 관리함
});

export default store;
