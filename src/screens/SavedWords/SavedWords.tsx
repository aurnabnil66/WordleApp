import {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {removeWord, syncSavedWordsRequest} from '../../store/slices/wordsSlice';
import {RootState} from '../../store/store';
import {Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

const SavedWords: FC = () => {
  const dispatch = useDispatch();

  const {savedWords, isLoading} = useSelector(
    (state: RootState) => state.savedWords,
  );

  // Sync saved words when component mounts or user changes
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in, sync their saved words
        dispatch(syncSavedWordsRequest());
      } else {
        // User is signed out, clear saved words
        // This will be handled in the saga
        dispatch(syncSavedWordsRequest());
      }
    });

    // Initial sync
    dispatch(syncSavedWordsRequest());

    return () => unsubscribe();
  }, [dispatch]);

  const handleRemoveWord = (word: string) => {
    dispatch(removeWord(word));
  };

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="blue" />
        <Text style={{marginTop: 10}}>Loading saved words...</Text>
      </View>
    );
  }

  if (savedWords.length === 0) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 16, color: 'gray'}}>No saved words yet</Text>
        <Text style={{fontSize: 12, color: 'gray'}}>
          Start searching for words to save them!
        </Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, alignItems: 'center', paddingTop: 20}}>
      <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
        My Saved Words
      </Text>
      <FlatList
        style={{width: '90%'}}
        data={savedWords}
        keyExtractor={item => item.word.toLowerCase()}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 10,
              paddingHorizontal: 15,
              marginVertical: 5,
              backgroundColor: '#f5f5f5',
              borderRadius: 8,
            }}>
            <View style={{flex: 1}}>
              <Text style={{fontWeight: 'bold', fontSize: 16, color: 'blue'}}>
                {item.word}
              </Text>
              {item.phonetic ? (
                <Text style={{fontSize: 12, color: 'gray', marginTop: 2}}>
                  {item.phonetic}
                </Text>
              ) : (
                <Text style={{fontSize: 12, color: 'gray', marginTop: 2}}>
                  Phonetic not found
                </Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() => handleRemoveWord(item.word)}
              style={{
                backgroundColor: '#ff4444',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 5,
                alignSelf: 'center',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 14, color: 'white'}}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default SavedWords;
