import {combineReducers} from '@reduxjs/toolkit';
import {userReducer} from './slices/userSlice';
import {savedWordsReducer} from './slices/wordsSlice';

const rootReducer = combineReducers({
  user: userReducer,
  savedWords: savedWordsReducer,
});

export default rootReducer;
