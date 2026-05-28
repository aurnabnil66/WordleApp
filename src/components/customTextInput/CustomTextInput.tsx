import React, {FC, useState} from 'react';
import {Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import ICustomTextInputProps from '../../interfaces/ICustomTextInputProps';
import {colors} from '../../theme/colors';
import styles from './style';

const CustomTextInput: FC<ICustomTextInputProps> = ({
  mode = 'outlined',
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  showAffix = false,
  affixText = '',
  showIcon = false,
  onIconPress,
  isError = false,
  errorText = '', // Add errorText prop
  activeBorderColor = colors.componentBackground, // Default active border color
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(secureTextEntry);

  return (
    <View style={styles.container}>
      <TextInput
        mode={mode}
        label={label}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPasswordVisible && secureTextEntry}
        right={
          showAffix ? (
            <TextInput.Affix text={affixText} />
          ) : showIcon ? (
            <TextInput.Icon
              icon={isPasswordVisible ? 'eye' : 'eye-off'}
              onPress={() => {
                if (onIconPress) {
                  onIconPress();
                } else {
                  setPasswordVisible(!isPasswordVisible);
                }
              }}
            />
          ) : null
        }
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
      {/* Error Text */}
      {isError && errorText ? (
        <Text style={styles.errorText}>{errorText}</Text>
      ) : (
        <></>
      )}
    </View>
  );
};

export default CustomTextInput;
