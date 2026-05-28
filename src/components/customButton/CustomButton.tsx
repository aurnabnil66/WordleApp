import React from 'react';
import {Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';

import ICustomButtonProps from '../../interfaces/ICustomButtonProps';

import styles from './style';

const CustomButton: React.FC<ICustomButtonProps> = ({
  text,
  onPress,
  disabled,
}) => {
  return (
    <View>
      <TouchableOpacity
        disabled={disabled}
        style={styles.buttonStyle}
        onPress={onPress}>
        {text !== '' && !disabled ? (
          <Text style={styles.buttonText}>{text}</Text>
        ) : (
          <ActivityIndicator size={'large'} color={'white'} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
