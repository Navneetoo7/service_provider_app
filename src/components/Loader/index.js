import React from 'react';
import {ActivityIndicator, View, StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const style = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width,
    height: height,
    zIndex: 100,
    alignContent: 'center',
    justifyContent: 'center',
  },
  loader: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    alignSelf: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
export default function Loader({showLoader}) {
  if (!showLoader) return null;
  return (
    <View style={style.container}>
      <View style={style.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </View>
  );
}
