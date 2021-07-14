import React from 'react';
import {View, StyleSheet} from 'react-native';
import Snackbar from 'react-native-snackbar';

export default function SnackbarComponent(data) {
  console.log(data, 'uuuuuuuuuuu');
  const {type = 'success', text = ''} = data;
  Snackbar.show({
    text,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: type === 'success' ? '#9EF79E' : '#F8726A',
  });
}
