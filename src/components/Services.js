import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Image,
  StyleSheet,
  Text,
  View,
  BackHandler,
  ImageBackground,
  TouchableOpacity,
  AppRegistry,
  ScrollView,
} from 'react-native';
import "./Common.js";
import ItemsList from './ItemsList';
import {serviceList} from '../services/constants';
import Tabs from './navigation/Tabs';

import {useFocusEffect} from '@react-navigation/native';

const Services = ({navigation}) => {
  // navigation.setOption({title: "Service"});
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Tabs');
        // Return true to stop default back navigaton
        // Return false to keep default back navigaton
        return true;
      };

      // Add Event Listener for hardwareBackPress
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  const handlePress = item => {
    navigation.navigate('ServiceProvider', {item});
  };

  return (
    <ScrollView>
    
      <View style={styles.container}>
        <View style={styles.container1}>
          {/* <ScrollView> */}
          <TouchableOpacity
            style={styles.box}
            activeOpacity={0.5}
            onPress={() => {
              handlePress(serviceList[0]);
            }}>
            <Image source={require('../assets/1.png')} style={styles.inner} />
            <Text style={styles.text}>Realtors</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.box}
            activeOpacity={0.5}
            //   onPress={() => navigation.navigate("Form")}
            onPress={() => {
              handlePress(serviceList[1]);
            }}>
            <Image source={require('../assets/2.png')} style={styles.inner} />
            <Text style={styles.text}>Licensed Realtors</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            activeOpacity={0.5}
            //   onPress={() => navigation.navigate("Form")}
            onPress={() => {
              handlePress(serviceList[2]);
            }}>
            <Image source={require('../assets/3.png')} style={styles.inner} />
            <Text style={styles.text}>Vendor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            activeOpacity={0.5}
            //   onPress={() => navigation.navigate("Form")}
            onPress={() => {
              handlePress(serviceList[3]);
            }}>
            <Image source={require('../assets/4.png')} style={styles.inner} />
            <Text style={[styles.text, styles.p]}>Housing Counselor</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.box}
            activeOpacity={0.5}
            //   onPress={() => navigation.navigate("Form")}
            onPress={() => {
              handlePress(serviceList[4]);
            }}>
            <Image source={require('../assets/5.png')} style={styles.inner} />
            <Text style={[styles.text, styles.p]}>Services Provider</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            activeOpacity={0.5}
            //   onPress={() => navigation.navigate("Form")}
            onPress={() => {
              handlePress(serviceList[5]);
            }}>
            <Image source={require('../assets/6.png')} style={styles.inner} />
            <Text style={[styles.text, styles.p]}>Counselor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            activeOpacity={0.5}
            //   onPress={() => navigation.navigate("Form")}
            onPress={() => {
              handlePress(serviceList[6]);
            }}>
            <Image source={require('../assets/7.png')} style={styles.inner} />
            <Text style={[styles.text, styles.p]}>Food Vendor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            activeOpacity={0.5}
            //   onPress={() => navigation.navigate("Form")}
            onPress={() => {
              handlePress(serviceList[7]);
            }}>
            <Image source={require('../assets/8.png')} style={styles.inner} />
            <Text style={[styles.text, styles.p]}>Carpenters</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            activeOpacity={0.5}
            //   onPress={() => navigation.navigate("Form")}
            onPress={() => {
              handlePress(serviceList[8]);
            }}>
            <Image source={require('../assets/9.png')} style={styles.inner} />
            <Text style={[styles.text, styles.p]}>Drivers</Text>
          </TouchableOpacity>
          {/* </ScrollView> */}
        </View>
        {/* <NavigationContainer>
        <Tabs/>
        </NavigationContainer>
         */}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '85%',
    padding: 5,
    backgroundColor: 'transparent',
    opacity: 2,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  container1: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 160,
    height: 180,
    margin: 12,
    borderRadius: 8 / 2,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    flex: 1,
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    resizeMode: 'contain',
  },

  text: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  image: {
    width: '50%',
    height: '30%',
    marginBottom: 10,
    resizeMode: 'contain',
    marginTop: '10%',
    marginRight: '5%',
  },
});
AppRegistry.registerComponent('Services', () => Services);
export default Services;
