import {takeEvery, call, put} from 'redux-saga/effects';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {PayloadAction} from '@reduxjs/toolkit';
import {
  WordData,
  addWord,
  removeWord,
  clearWords,
  setSavedWords, // New action we'll add to the slice
} from '../slices/wordsSlice';

// Helper to get current user
function getCurrentUser() {
  return auth().currentUser;
}

// Save word to Firestore
function* handleAddWord(action: PayloadAction<WordData>): Generator {
  try {
    const user = yield call(getCurrentUser);
    if (!user) return;

    const wordRef = firestore()
      .collection('users')
      .doc(user.uid)
      .collection('savedWords')
      .doc(action.payload.word.toLowerCase());

    const doc = yield call([wordRef, wordRef.get]);

    if (!doc.exists) {
      yield call([wordRef, wordRef.set], {
        ...action.payload,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      console.log(`✅ Word "${action.payload.word}" saved to Firestore`);
    } else {
      console.log(`ℹ️ Word "${action.payload.word}" already exists`);
    }
  } catch (error) {
    console.error('❌ Failed to save word:', error);
  }
}

// Remove word from Firestore
function* handleRemoveWord(action: PayloadAction<string>): Generator {
  try {
    const user = yield call(getCurrentUser);
    if (!user) return;

    const wordRef = firestore()
      .collection('users')
      .doc(user.uid)
      .collection('savedWords')
      .doc(action.payload.toLowerCase());

    yield call([wordRef, wordRef.delete]);
    console.log(`🗑️ Word "${action.payload}" removed from Firestore`);
  } catch (error) {
    console.error('❌ Failed to remove word:', error);
  }
}

// Sync/get saved words - Fixed version
export function* syncSavedWordsSaga(): Generator<any, void, any> {
  try {
    const user = yield call(getCurrentUser);
    if (!user) {
      // Clear words if no user is logged in
      yield put(clearWords());
      return;
    }

    const snapshot = yield call(() =>
      firestore()
        .collection('users')
        .doc(user.uid)
        .collection('savedWords')
        .orderBy('createdAt', 'desc') // Optional: order by creation time
        .get(),
    );

    const words: WordData[] = [];
    snapshot.docs.forEach((doc: any) => {
      const wordData: WordData = doc.data();
      words.push(wordData);
    });

    // Use setSavedWords instead of syncSavedWords to replace all words at once
    yield put(setSavedWords(words));

    console.log(
      `✅ Synced ${words.length} saved words from Firestore for user ${user.uid}`,
    );
  } catch (error) {
    console.error('❌ Error syncing saved words:', error);
    // Clear words on error
    yield put(clearWords());
  }
}

// New saga to handle initial sync (call this when app starts or user logs in)
function* handleSyncRequest(): Generator {
  yield call(syncSavedWordsSaga);
}

// Creating word saga
export default function* wordSaga() {
  yield takeEvery(addWord.type, handleAddWord);
  yield takeEvery(removeWord.type, handleRemoveWord);
  yield takeEvery('SYNC_SAVED_WORDS_REQUEST', handleSyncRequest); // New action type
}
