/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import ServiceRegistration from './src/components/ServiceRegistration';
import Login from './src/components/Login';
import EditUserService from './src/components/EditUserService';
import ServiceProvider from './src/components/ServiceProvider';
import Services from './src/components/Services';
import SelectedUserService from './src/components/SelectedUserService';
import Search from './src/components/Search';
import RegistrationForm from './src/components/RegistrationForm';
import SignUp from './src/components/SignUp';
import Reset from './src/components/Reset';
import SplashScreen from 'react-native-splash-screen';
import AdminServiceProvider from './src/components/AdminServiceProvider';
import 'react-native-gesture-handler';
import './src/components/Common.js';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Forget from './src/components/Forget';
import Tabs from './src/components/navigation/Tabs';
import EditProfile from './src/components/EditProfile';
import SelectBook from './src/components/SelectBook';
import HomePage from './src/components/HomePage';
import BookMarked from './src/components/BookMarked';
import AllServiceList from './src/components/AllServiceList';
import UserRegistration from './src/components/UserRegistration';
import MapMy from './src/components/MapMy';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    // width: 25,
    // height: 25,
    // paddingRight: 9,
    fontSize: 40,
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});

const App: route => Node = route => {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const Stack = createStackNavigator();
  global.title = 'Search';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  // const Save = () => {
  //   return (
  //     <TouchableOpacity onPress={()=> {<SelectedUserService onPress={Hello()}/>}}>

  //     <Image
  //   source={require('./src/assets/bookmark.png')}
  //   style={{ width: 30, height: 30, borderRadius: 40/2, marginLeft : 15 ,resizeMode:'contain'}} />
  //   </TouchableOpacity>
  //   );
  // };
  console.log(route);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            title: 'Login', //Set Header Title
            headerStyle: {
              backgroundColor: 'white', //Set Header color
            },
            headerTitleAlign: 'center',
            headerTintColor: 'black', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MapMy"
          component={MapMy}
          options={{
            headerTitleAlign: 'center',
            title: 'map', //Set Header Title
            headerStyle: {
              backgroundColor: 'white', //Set Header color
            },
            headerTintColor: 'black', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="SelectBook"
          component={SelectBook}
          options={{
            headerTitleAlign: 'center',
            title: 'Service', //Set Header Title
            headerStyle: {
              backgroundColor: 'white', //Set Header color
            },
            headerTintColor: 'black', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="AdminServiceProvider"
          component={AdminServiceProvider}
          options={{
            headerTitleAlign: 'center',
            title: 'Admin Response', //Set Header Title
            headerStyle: {
              backgroundColor: 'white', //Set Header color
            },
            headerTintColor: 'black', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="EditUserService"
          component={EditUserService}
          options={{
            headerTitleAlign: 'center',
            title: 'Edit Service Provider', //Set Header Title
            headerStyle: {
              backgroundColor: 'white', //Set Header color
            },
            headerTintColor: 'black', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerTitleAlign: 'center',
            title: 'Edit Profile', //Set Header Title
            headerStyle: {
              backgroundColor: 'white', //Set Header color
            },
            headerTintColor: 'black', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="BookMarked"
          component={BookMarked}
          options={{
            headerTitleAlign: 'center',
            title: 'Book Marked Services', //Set Header Title
            headerStyle: {
              backgroundColor: 'white', //Set Header color
            },
            headerTintColor: 'black', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{
            title: `${title}`,
            headerTitleAlign: 'center',
            //Set Header Title
            headerLeft: null,
            headerStyle: {
              backgroundColor: 'white', //Set Header color
            },
            headerTintColor: 'black', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="ServiceProvider"
          component={ServiceProvider}
          options={{
            headerTitleAlign: 'center',
            title: 'Service Provider', //Set Header Title
            headerStyle: {
              backgroundColor: 'white', //Set Header color
            },
            headerTintColor: 'black', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{
            headerTitleAlign: 'center',
            title: 'Home', //Set Header Title
            headerStyle: {
              backgroundColor: 'white', //Set Header color
            },
            headerTitleAlign: 'center',
            headerTintColor: 'black', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="ServiceRegistration"
          component={ServiceRegistration}
          options={{
            headerTitleAlign: 'center',
            title: 'Service registration', //Set Header Title
            headerStyle: {
              backgroundColor: 'white', //Set Header color
            },
            headerTitleAlign: 'center',
            headerTintColor: 'black', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="UserRegistration"
          component={UserRegistration}
          options={{
            headerTitleAlign: 'center',
            title: 'User registration', //Set Header Title
            headerStyle: {
              backgroundColor: 'white', //Set Header color
            },
            headerTitleAlign: 'center',
            headerTintColor: 'black', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerTitleAlign: 'center',
            title: 'Signup', //Set Header Title
            headerStyle: {
              backgroundColor: 'white',
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center', //Set Header color
            },
            headerTitleAlign: 'center',
            headerTintColor: 'black', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="SelectedUserService"
          component={SelectedUserService}
          options={{
            headerTitleAlign: 'center',
            // headerRight:()=><Save/> ,
            title: 'Service Provider', //Set Header Title
            headerStyle: {
              backgroundColor: 'white', //Set Header color
            },
            headerTintColor: 'black', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="RegistrationForm"
          component={RegistrationForm}
          options={{
            headerTitleAlign: 'center',
            title: 'Registration Form', //Set Header Title
            headerStyle: {
              backgroundColor: 'white', //Set Header color
            },
            headerTitleAlign: 'center',
            headerTintColor: 'black', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Forget"
          component={Forget}
          options={{
            headerTitleAlign: 'center',
            title: 'Forget Password', //Set Header Title
            headerStyle: {
              backgroundColor: 'white', //Set Header color
            },
            headerTitleAlign: 'center',
            headerTintColor: 'black', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerTitleAlign: 'center',
            title: 'Search', //Set Header Title
            headerStyle: {
              backgroundColor: 'white',
              textAlign: 'center', //Set Header color
            },
            headerTitleAlign: 'center',
            headerTintColor: 'black', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Reset"
          component={Reset}
          options={{
            headerTitleAlign: 'center',
            title: 'Reset', //Set Header Title
            headerStyle: {
              backgroundColor: 'white', //Set Header color
            },
            headerTitleAlign: 'center',
            headerTintColor: 'black', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Services"
          component={Services}
          options={{
            headerTitleAlign: 'center',
            // headerLeft:()=> {<Circle/> },
            title: 'Services', //Set Header Title
            headerStyle: {
              backgroundColor: 'white', //Set Header color
            },
            headerTitleAlign: 'center',
            headerTintColor: 'black', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>

    //  <NavigationContainer>
    //     <Tabs/>
    //     </NavigationContainer>
  );
};

export default App;
