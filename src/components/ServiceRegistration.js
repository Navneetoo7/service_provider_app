import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const ServiceRegistration = ({navigation}) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.box}>
          <Image source={require('../assets/tik.png')} style={styles.inner} />
          <Text style={styles.text}>
            You have successfully registered as services provider!
          </Text>
        </View>
        <TouchableOpacity
          style={styles.okay}
          onPress={() => navigation.navigate('Tabs')}>
          <Text style={styles.ok}>Okay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default ServiceRegistration;

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
  box: {
    width: 300,
    height: 250,
    margin: 12,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  inner: {
    flex: 1,
    width: '40%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    resizeMode: 'contain',
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    marginBottom: 30,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  okay: {
    width: 300,
    backgroundColor: 'white',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    height: 40,
  },
  ok: {
    color: 'black',
  },
});
