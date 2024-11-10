// redux에서 여러 개의 리듀서를 하나로 결합하여 전체 애플리케이션의 상태 관리
import { combineReducers } from 'redux';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
