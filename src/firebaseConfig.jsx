import React from 'react';
import { View, Text } from 'react-native';
import Game from './src/components/Game';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2f2f2' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Tic-Tac-Toe</Text>
      <Game />
    </View>
  );
}
