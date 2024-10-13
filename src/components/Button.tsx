import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React from 'react';

type Props = TouchableOpacityProps & {
  label: string;
  columns?: 1 | 2 | 3;
  onCLick: (value: string) => void;
};

export default function Button({
  label,
  columns = 1,
  onCLick,
  ...rest
}: Props) {
  const width = (Dimensions.get('window').width / 4) * columns;

  const operation = ['/', '+', '-', '*', '='];

  operation.includes(label);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onCLick(label)}
      {...rest}
    >
      <Text
        style={[
          styles.button,
          { width },
          operation.includes(label) ? styles.operationButton : false,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    fontSize: 40,
    height: Dimensions.get('window').width / 4,
    padding: 20,
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#888',
  },
  operationButton: {
    color: '#fff',
    backgroundColor: '#fa8231',
  },
});
