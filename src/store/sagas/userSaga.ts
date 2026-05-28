import {call, put, takeLatest} from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
} from '../slices/userSlice';
import firestore from '@react-native-firebase/firestore';
import {syncSavedWordsSaga} from './wordSaga';

function* loginUser(action: any): Generator<any, any, any> {
  try {
    const {email, password} = action.payload;
    const userCridential = yield auth().signInWithEmailAndPassword(
      email,
      password,
    );
    const user = {
      uid: userCridential.user.uid,
      email: userCridential.user.email,
      fullName: userCridential.user.displayName,
    };
    yield put(loginSuccess(user));
    yield call(syncSavedWordsSaga); // to get the saved words from firestore
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* registerUser(action: any): Generator<any, any, any> {
  try {
    const {email, password, fullName, mobile} = action.payload;

    const userCridential = yield auth().createUserWithEmailAndPassword(
      email,
      password,
    );

    const user = userCridential.user;

    yield call([user, user.updateProfile], {
      displayName: fullName,
    });

    yield call([firestore().collection('users').doc(user.uid), 'set'], {
      fullName,
      mobile,
      email,
      password,
      createdAt: firestore.Timestamp.now(),
    });

    yield put(registerSuccess({uid: user.uid, email, fullName, mobile}));
  } catch (error) {
    yield put(registerFailure(error));
  }
}

// watcher saga
export function* userSaga() {
  yield takeLatest(loginRequest.type, loginUser);
  yield takeLatest(registerRequest.type, registerUser);
}

// auth().signInWithEmailAndPassword() is an async function (it returns a Promise).
// yield pauses the loginUser generator until Firebase returns the result (either success or error).
// When Firebase resolves (success), userCridential gets the result.
// If Firebase rejects (error), the try-catch block catches the error.

// put is a Redux-Saga effect.
// yield put() tells Redux-Saga to dispatch the loginSuccess action.
// Redux sees the action and updates the store.
// After put completes, the saga moves to the next line.
