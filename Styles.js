import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
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

export default styles;
