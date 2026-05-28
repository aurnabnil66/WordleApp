import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Definition {
  definition: string;
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

export interface WordData {
  word: string;
  phonetic?: string;
  audio?: string;
  meanings: Meaning[];
}

interface SavedWordsState {
  savedWords: WordData[];
  isLoading: boolean; // Optional: for loading states
}

const initialState: SavedWordsState = {
  savedWords: [],
  isLoading: false,
};

const savedWordsSlice = createSlice({
  name: 'savedWords',
  initialState,
  reducers: {
    addWord: (state, action: PayloadAction<WordData>) => {
      const exists = state.savedWords.find(
        word => word.word.toLowerCase() === action.payload.word.toLowerCase(),
      );
      if (!exists) {
        state.savedWords.unshift(action.payload); // Add to beginning for recent words first
      }
    },
    removeWord: (state, action: PayloadAction<string>) => {
      state.savedWords = state.savedWords.filter(
        word => word.word.toLowerCase() !== action.payload.toLowerCase(),
      );
    },
    // Keep this for backward compatibility but it's not the main sync method anymore
    syncSavedWords: (state, action: PayloadAction<WordData>) => {
      const exists = state.savedWords.find(
        word => word.word.toLowerCase() === action.payload.word.toLowerCase(),
      );
      if (!exists) {
        state.savedWords.push(action.payload);
      }
    },
    // New action to set all saved words at once (replaces existing words)
    setSavedWords: (state, action: PayloadAction<WordData[]>) => {
      state.savedWords = action.payload;
      state.isLoading = false;
    },
    clearWords: state => {
      state.savedWords = [];
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  addWord,
  removeWord,
  syncSavedWords,
  setSavedWords,
  clearWords,
  setLoading,
} = savedWordsSlice.actions;

// Action creator for requesting sync
export const syncSavedWordsRequest = () => ({
  type: 'SYNC_SAVED_WORDS_REQUEST',
});

export const savedWordsReducer = savedWordsSlice.reducer;
