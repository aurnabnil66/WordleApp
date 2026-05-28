import React, {FC, useState} from 'react';
import {Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import styles from './style';
import {colors} from '../../theme/colors';

interface ICustomDropdownProps {
  data: {label: string; value: string}[];
  placeholder?: string;
  label?: string;
  value: string | null;
  onChange: (value: string) => void;
  isError?: boolean;
  errorText?: string;
}

const CustomDropdown: FC<ICustomDropdownProps> = ({
  data,
  placeholder,
  value,
  onChange,
  isError = false,
  errorText,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <>
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && {borderColor: colors.componentBackground},
        ]}
        placeholderStyle={styles.placeholderStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          onChange(item.value);
          setIsFocus(false);
        }}
      />
      {isError && errorText ? (
        <Text style={styles.errorTextStyle}>{errorText}</Text>
      ) : null}
    </>
  );
};

export default CustomDropdown;
