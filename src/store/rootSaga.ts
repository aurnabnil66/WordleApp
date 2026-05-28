import {all} from 'redux-saga/effects';

import {userSaga} from './sagas/userSaga';
import wordSaga from './sagas/wordSaga';

export default function* rootSaga() {
  yield all([userSaga(), wordSaga()]);
}
