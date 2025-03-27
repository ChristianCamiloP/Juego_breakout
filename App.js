import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAphrLdNrDnOyFJwY6dVD8oJTTYA-DXAME",
  authDomain: "juego-db.firebaseapp.com",
  projectId: "juego-db",
  storageBucket: "juego-db.firebasestorage.app",
  messagingSenderId: "967613130349",
  appId: "1:967613130349:web:2f4c21392cad7d6dc60164",
  measurementId: "G-64PBJ1EJX4"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null)); // Estado del tablero
  const [xIsNext, setXIsNext] = useState(true); // Turno de X o O
  const [winner, setWinner] = useState(null); // Ganador del juego
  const [playerName, setPlayerName] = useState(""); // Nombre del jugador
  const [score, setScore] = useState(0); // Puntuación del jugador

  // Función para calcular el ganador
  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
      [0, 4, 8], [2, 4, 6] // Diagonales
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Devuelve X o O
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return; // Si la celda ya está ocupada o el juego ya terminó

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O'; // Asigna el símbolo del jugador
    setBoard(newBoard);
    setXIsNext(!xIsNext); // Cambia el turno
    setWinner(calculateWinner(newBoard)); // Verifica si hay un ganador
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null)); // Reinicia el tablero
    setWinner(null);
    setXIsNext(true); // Comienza con X
  };

  // Función para guardar la puntuación en Firebase
  const saveScore = async () => {
    if (!playerName.trim()) return; // Si el nombre está vacío, no guardar
    try {
      await addDoc(collection(db, 'scores'), {
        name: playerName,
        score: score,
        date: new Date(),
      });
      Alert.alert('Puntuación guardada!');
    } catch (error) {
      console.error('Error saving score: ', error);
    }
  };

  useEffect(() => {
    if (winner) {
      const newScore = winner === 'X' ? 1 : 0; // Asignar puntos según el ganador
      setScore(newScore);
      saveScore(); // Guardar puntuación en Firebase cuando haya un ganador
    }
  }, [winner]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic-Tac-Toe</Text>

      {/* Tablero de juego */}
      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleClick(index)}
            style={styles.cell}
          >
            <Text style={styles.cellText}>{cell}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {winner ? (
        <View style={styles.resultContainer}>
          <Text style={styles.winnerText}>Winner: {winner}</Text>
          <Text style={styles.scoreText}>Score: {score}</Text>
          <TouchableOpacity onPress={resetGame} style={styles.button}>
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.turnText}>Next Player: {xIsNext ? 'X' : 'O'}</Text>
      )}

      {/* Input para que el jugador ingrese su nombre */}
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={playerName}
        onChangeText={setPlayerName}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    marginBottom: 20,
  },
  cell: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  cellText: {
    fontSize: 36,
    color: '#333',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  winnerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 20,
  },
  turnText: {
    fontSize: 18,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    width: 200,
    height: 40,
    marginTop: 20,
    paddingLeft: 10,
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

