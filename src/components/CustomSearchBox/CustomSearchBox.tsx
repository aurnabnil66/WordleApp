import React, {FC, useState} from 'react';
import {Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import ICustomSearchBoxProps from '../../interfaces/ICustomSearchBoxProps';
import {colors} from '../../theme/colors';
import styles from './style';

const CustomSearchBox: FC<ICustomSearchBoxProps> = ({
  mode = 'outlined',
  label,
  placeholder,
  value,
  onChangeText,
  activeBorderColor = colors.componentBackground, // Default active border color
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        mode={mode}
        label={label}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[
          {
            backgroundColor: colors.appBackground,
          },
        ]}
        theme={{
          colors: {
            primary: activeBorderColor, // Focus color for label/underline
            onSurface: colors.componentBackground,
          },
        }}
      />
    </View>
  );
};

export default CustomSearchBox;
