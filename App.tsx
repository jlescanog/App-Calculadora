import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import tw from 'twrnc'; // TailwindCSS para React Native

export default function App() {
  
  const nombre = "Jhair Lescano Dev";
  
  const [currentValue, setCurrentValue] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [resetInput, setResetInput] = useState<boolean>(true);

  const handleNumberPress = (num: string) => {
    if (resetInput) {
      setCurrentValue(num);
      setResetInput(false);
    } else {
      setCurrentValue(currentValue === '0' ? num : currentValue + num);
    }
  };

  const handleOperationPress = (op: string) => {
    setPreviousValue(currentValue);
    setOperation(op);
    setResetInput(true);
  };

  const handleEquals = () => {
    if (!previousValue || !operation) return;

    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    let result = 0;

    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        result = prev / current;
        break;
      default:
        return;
    }

    setCurrentValue(result.toString());
    setPreviousValue(null);
    setOperation(null);
    setResetInput(true);
  };

  const handleClear = () => {
    setCurrentValue('0');
    setPreviousValue(null);
    setOperation(null);
    setResetInput(true);
  };

  const CalculatorButton = ({ text, color = 'bg-gray-700', onPress }: { text: string; color?: string; onPress: () => void }) => (
    <TouchableOpacity
      style={tw`${color} w-16 h-16 rounded-full items-center justify-center m-2`}
      onPress={onPress}
    >
      <Text style={tw`text-white text-2xl font-bold`}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <StatusBar barStyle="light-content" />
      
      {/* Mi nombre en la parte superior */}
      <View style={tw`pt-12 px-4`}>
        <Text style={tw`text-gray-400 text-right text-sm`}>Calculadora por {nombre}</Text>
      </View>
      
      <View style={tw`flex-1 justify-end p-4`}>
        {previousValue && (
          <Text style={tw`text-gray-400 text-right text-2xl`}>
            {previousValue} {operation}
          </Text>
        )}
        <Text style={tw`text-white text-right text-6xl font-bold mb-8`}>{currentValue}</Text>
        
        <View style={tw`flex-row justify-between mb-2`}>
          <CalculatorButton text="C" color="bg-gray-500" onPress={handleClear} />
          <CalculatorButton text="±" color="bg-gray-500" onPress={() => setCurrentValue((parseFloat(currentValue) * -1).toString())} />
          <CalculatorButton text="%" color="bg-gray-500" onPress={() => setCurrentValue((parseFloat(currentValue) / 100).toString())} />
          <CalculatorButton text="÷" color="bg-orange-500" onPress={() => handleOperationPress('÷')} />
        </View>
        
        <View style={tw`flex-row justify-between mb-2`}>
          <CalculatorButton text="7" onPress={() => handleNumberPress('7')} />
          <CalculatorButton text="8" onPress={() => handleNumberPress('8')} />
          <CalculatorButton text="9" onPress={() => handleNumberPress('9')} />
          <CalculatorButton text="×" color="bg-orange-500" onPress={() => handleOperationPress('×')} />
        </View>
        
        <View style={tw`flex-row justify-between mb-2`}>
          <CalculatorButton text="4" onPress={() => handleNumberPress('4')} />
          <CalculatorButton text="5" onPress={() => handleNumberPress('5')} />
          <CalculatorButton text="6" onPress={() => handleNumberPress('6')} />
          <CalculatorButton text="-" color="bg-orange-500" onPress={() => handleOperationPress('-')} />
        </View>
        
        <View style={tw`flex-row justify-between mb-2`}>
          <CalculatorButton text="1" onPress={() => handleNumberPress('1')} />
          <CalculatorButton text="2" onPress={() => handleNumberPress('2')} />
          <CalculatorButton text="3" onPress={() => handleNumberPress('3')} />
          <CalculatorButton text="+" color="bg-orange-500" onPress={() => handleOperationPress('+')} />
        </View>
        
        <View style={tw`flex-row justify-between mb-8`}>
          <CalculatorButton text="0" onPress={() => handleNumberPress('0')} />
          <CalculatorButton text="." onPress={() => handleNumberPress('.')} />
          <View style={tw`w-16 m-2`}></View>
          <CalculatorButton text="=" color="bg-orange-500" onPress={handleEquals} />
        </View>
      </View>
    </SafeAreaView>
  );
}