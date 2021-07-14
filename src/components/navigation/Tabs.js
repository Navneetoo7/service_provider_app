import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  BackHandler,
  TouchableOpacity,
  Alert
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Search from '../Search';
import HomePage from '../HomePage';
import Services from '../Services';
import EditProfile from '../EditProfile';
import BookMarked from '../BookMarked';

const Tab = createBottomTabNavigator();

const Tabs = ({navigation}) => {
  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: 'black',
          borderRadius: 45,
          height: 90,
          ...styles.shadow,
          activeColor: 'red',
          initialRouteName: 'HomePage',
        },
      }}>
      {/* <View>
        <Image source={require('./search-3-24.png')} style={styles.image} /> */}
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          title: 'Search',
          tabBarIcon: ({focused}) => (
            <View>
              {/* <TouchableOpacity onPress{()=>navigation.setOption({title: "Search"})} > */}
              <Image source={require('./search-3-24.png')} />
              {/* </TouchableOpacity> */}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <View>
              {/* <TouchableOpacity onPress{()=>{navigation.setOption({title: "Home"})}} > */}
              <Image source={require('./home-5-24.png')} />
              {/* </TouchableOpacity> */}
            </View>
          ),
        }}
      />

      {/* </View> */}

      <Tab.Screen
        name="BookMarked"
        component={BookMarked}
        options={{
          title: 'Book Marked',
          tabBarIcon: ({focused}) => (
            <View>
              {/* <TouchableOpacity onPress{()=>navigation.setOption({title: "Service"})} > */}
              <Image source={require('./book.png')} />
              {/* </TouchableOpacity> */}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: 'Edit',
          tabBarIcon: ({focused}) => (
            <View>
              {/* <TouchableOpacity onPress{()=>{navigation.setOption({title: "Edit"})}} > */}
              <Image source={require('./edit.png')} />
              {/* </TouchableOpacity> */}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
