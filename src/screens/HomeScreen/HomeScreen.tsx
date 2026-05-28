import {FC, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import CustomSearchBox from '../../components/CustomSearchBox/CustomSearchBox';
import styles from './style';
import {ScrollView} from 'react-native-gesture-handler';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import ToastPopUp from '../../utils/ToastAndroid';
import {useDispatch} from 'react-redux';
import {addWord} from '../../store/slices/wordsSlice';
import {useSavedWordData} from '../../hooks/useSavedWordData';
import {fetchWordData} from '../../api/FetchWordData';
import {useUserData} from '../../hooks/useUserData';
import {Grid, Row} from 'react-native-easy-grid';
import CustomButton from '../../components/customButton/CustomButton';

const HomeScreen: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [wordData, setWordData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const {user} = useUserData();

  const {savedWords} = useSavedWordData();

  // Function to handle search
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      ToastPopUp('Please enter at least one word');
      return;
    }

    setLoading(true);
    const result = await fetchWordData(searchQuery);
    setLoading(false);

    if (result) {
      setWordData(result);
    } else {
      setWordData(null);
    }
  };

  // Function to save word to Firestore
  const handleSaveWord = (wordData: any) => {
    // Check if word already exists or not
    const exists = savedWords.find((item: any) => item.word === wordData.word);

    if (exists) {
      ToastPopUp(`"${wordData.word}" already exists in your saved words`);
    } else {
      dispatch(addWord(wordData));
      ToastPopUp(`"${wordData.word}" saved to your words`);
    }
  };

  return (
    <Grid style={styles.mainGridStyle}>
      <Row style={styles.firstRowContainer}>
        <Text style={{color: '#fff'}}>
          Welcome, {user?.displayName ? user.displayName : ''}
        </Text>
      </Row>
      <Row style={styles.secondRowContainer}>
        {loading ? (
          <ActivityIndicator
            animating={true}
            color={MD2Colors.red800}
            size="large"
          />
        ) : wordData ? (
          <ScrollView style={styles.scrollViewContainer}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {wordData.word}
            </Text>
            {wordData.meanings?.map((meaning: any, index: number) => (
              <View key={index} style={{marginVertical: 10}}>
                <Text style={{fontStyle: 'italic'}}>
                  {meaning.partOfSpeech}
                </Text>
                {meaning.definitions?.map((def: any, i: number) => (
                  <Text key={i}>• {def.definition}</Text>
                ))}
              </View>
            ))}
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={() => setWordData(null)}>
                <Text style={{marginTop: 20, color: 'blue'}}>
                  Search another word
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSaveWord(wordData)}>
                <Text style={{marginTop: 20, color: 'blue'}}>
                  Save word to Firestore
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <View>
            <View style={styles.secondRowHeaderPosition}>
              <Text style={styles.secondRowHeaderText1}>
                Search for a Word Here
              </Text>
              <Text style={styles.secondRowHeaderText2}>
                Enter any word of your choice
              </Text>
              {/* <Image
                style={styles.headerImage}
                source={require('../../assets/wordle_logo.png')}
              /> */}
            </View>

            <View>
              <CustomSearchBox
                mode="outlined"
                label="Search"
                placeholder="Search"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <View style={{marginTop: 20}}>
              <CustomButton
                text="Search"
                onPress={handleSearch}
                disabled={false}></CustomButton>
            </View>
          </View>
        )}
      </Row>
    </Grid>
  );
};

export default HomeScreen;
