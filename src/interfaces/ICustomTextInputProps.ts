interface ICustomTextInputProps {
  mode?: 'flat' | 'outlined';
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  showAffix?: boolean;
  affixText?: string;
  showIcon?: boolean;
  onIconPress?: () => void;
  isError?: boolean;
  errorText?: string;
  activeBorderColor?: string;
}

export default ICustomTextInputProps;
