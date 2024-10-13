import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';
import { useState } from 'react';

type MyState = {
  displayValue: string;
  clearDisplay: boolean;
  operation: string | null;
  values: number[];
  current: number;
};

export default function App() {
  const initialValues = {
    clearDisplay: false,
    current: 0,
    displayValue: '0',
    operation: null,
    values: [0, 0],
  };

  const [myState, setMyState] = useState<MyState>(initialValues);

  const addDigit = (digit: string) => {
    const clearDisplay = myState.displayValue === '0' || myState.clearDisplay;

    if (digit === '.' && !clearDisplay && myState.displayValue.includes('.'))
      return;

    const currentValue = clearDisplay ? '' : myState.displayValue;
    const displayValue = currentValue + digit;

    const newState = { ...myState };
    newState.clearDisplay = false;
    newState.displayValue = displayValue;

    if (digit !== '.') {
      const newValue = parseFloat(displayValue);
      newState.values[newState.current] = newValue;
    }

    setMyState({ ...newState });
  };
  const clearMemory = () => {
    setMyState({ ...initialValues });
  };
  const setOperation = (operation: string) => {
    const newState = { ...myState };

    if (newState.current === 0) {
      newState.operation = operation;
      newState.current = 1;
      newState.clearDisplay = true;
    } else {
      const equals = operation === '=';
      const values = [...newState.values];
      try {
        values[0] = eval(`${values[0]} ${newState.operation} ${values[1]}`);
      } catch (error) {
        values[0] = newState.values[0];
      }
      values[1] = 0;
      newState.displayValue = values[0].toString();
      newState.operation = equals ? null : operation;
      newState.current = equals ? 0 : 1;
      newState.clearDisplay = !equals;
      newState.values = [...values];
    }
    setMyState({ ...newState });
  };

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.container}>
        <Display value={myState.displayValue} />
        <View style={styles.buttons}>
          <Button label='AC' columns={3} onCLick={clearMemory} />
          <Button label='/' onCLick={setOperation} />
          <Button label='7' onCLick={addDigit} />
          <Button label='8' onCLick={addDigit} />
          <Button label='9' onCLick={addDigit} />
          <Button label='*' onCLick={setOperation} />
          <Button label='4' onCLick={addDigit} />
          <Button label='5' onCLick={addDigit} />
          <Button label='6' onCLick={addDigit} />
          <Button label='-' onCLick={setOperation} />
          <Button label='1' onCLick={addDigit} />
          <Button label='2' onCLick={addDigit} />
          <Button label='3' onCLick={addDigit} />
          <Button label='+' onCLick={setOperation} />
          <Button label='0' columns={2} onCLick={addDigit} />
          <Button label='.' onCLick={addDigit} />
          <Button label='=' onCLick={setOperation} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
