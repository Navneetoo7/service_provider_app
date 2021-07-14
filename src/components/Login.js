import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import Tabs from './navigation/Tabs'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FireAjax,FireAjaxToken} from '../services/FireAjax';
import Snackbar from 'react-native-snackbar';
import {emailRegex} from '../services/constants';
import Loader from './Loader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const {height} = Dimensions.get('window');
const getLoginAuth = data => {
  const {email, password} = data;
  const error = {};

  console.log(emailRegex.test(email), 'emailRegex.test(email)');
  if (!email.trim()) {
    error.email = '* Field is required';
    error.error = true;
  } else if (!emailRegex.test(email)) {
    error.email = '* Enter valid email';
    error.error = true;
  } else {
    error.error = false;
  }
  if (!password.trim()) {
    error.password = '* Field is required';
    error.error = true;
  } else {
    error.error = false;
  }
  return error;
};

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState()
  var tokenValue ;
  var Role;

  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  const handleAuth =  () => {
    const error = getLoginAuth({
      email,
      password,
    });

    console.log(error);
    setError(error);
    const login = {
      Email: email,
      Password: password, 
    };
    if (!error.error) {
      setLoading(true);
      FireAjax({method: 'POST', url: '/api/Users/login', data: login})
        .then((data11) => {
          setLoading(false);
          // console.log(data11);
          Role= data11.data.role;
          tokenValue = data11.data.token
          console.log("tv",tokenValue)
          setData(String(tokenValue)) 
          if(Role==1){
            navigation.navigate('AdminServiceProvider');
          }else{
            navigation.navigate('Tabs');
          }

          // try {
          //    AsyncStorage.setItem('token', data11.data.token)
          // } catch (e) {
          //   console.log("try",e)
          // }
        })
        .catch(error => {
          setLoading(false);
          Alert.alert(
            "Can't find account",
            "Mentioned Email or Password does not exist !",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
          Snackbar({text: 'Error Occurs', type: error});
        });
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
      console.log("value storeData login",value)
    } catch (e) {
      // saving error
    }
  }

  // useEffect((data) => {
  //   storeData(data);
  //   console.log("ttttttttt",data)
  // },[data]);
  storeData(data);

  return (
    <ScrollView>
    <SafeAreaView>
      <Loader showLoader={loading} />
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Image style={styles.image} source={require('../assets/logo.png')} />
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor="#003f5c"
              onChangeText={email => setEmail(email)}
            />
            <Text style={styles.error}>{error.email}</Text>
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={password => setPassword(password)}
            />
            <Text style={styles.error}>{error.password}</Text>
          </View>

          <TouchableOpacity
            style={styles.forgetBtn}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Forget')}>
            <Text style={styles.forgot_button}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginBtn}
            activeOpacity={0.5}
            onPress={handleAuth}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          <View style={styles.new}>
            <TouchableOpacity
              style={styles.wrap}
              activeOpacity={0.5}
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.sign}>Don't have an account?</Text>
              <Text style={styles.black}> SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: height - 30,
    // height: '100%',
  },
  loginText: {
    color: 'white',
  },
  wrap: {
    flexDirection: 'row',
    marginTop: 10,
  },
  forgetBtn: {
    width: '80%',
    borderRadius: 25,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'left',
    marginLeft: '12%',
    marginTop: 3,
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 50,
    marginTop: 100,
  },
  imageWrapper: {},
  inputView: {
    borderRadius: 30,
    height: 80,
    width: '100%',
    justifyContent: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 30,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 25,
  },

  forgot_button: {
    height: 30,
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: 'black',
  },
  new: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  sign: {
    color: 'grey',
  },
  black: {
    fontSize: 16,
    color: 'black',
    marginBottom:"5%"
  },
});

export default Login;
