interface ICustomSearchBoxProps {
  mode?: 'flat' | 'outlined';
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  showSearchIcon?: boolean;
  onSearchPress?: () => void;
  activeBorderColor?: string;
}

export default ICustomSearchBoxProps;
