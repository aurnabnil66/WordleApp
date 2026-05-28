import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

export const useSavedWordData = () => {
  const savedWords = useSelector(
    (state: RootState) => state.savedWords.savedWords,
  );

  return {
    savedWords,
  };
};
