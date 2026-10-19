import { StyleSheet } from 'react-native';

import theme from '../../theme';

export const commonStyles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
    margin: 10,
  },
  button: {
    backgroundColor: '#0366d6',
    color: 'white',
    borderRadius: 4,
    padding: 7,
    marginBottom: 10,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  buttonText: {
    collor: theme.colors.white,
    textAlign: 'center',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    padding: 5,
  },
  error: {
    color: theme.colors.error,
    marginBottom: 10,
  },
})