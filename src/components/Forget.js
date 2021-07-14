import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
  ScrollView,
} from "react-native";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { useFocusEffect } from "@react-navigation/native";
import {emailRegex} from '../services/constants';
import Loader from './Loader/index';
import { loadPartialConfig } from "@babel/core";
import {FireAjax,FireAjaxToken} from "../services/FireAjax";
import Snackbar from "react-native-snackbar";
const getForgetMail = data => {
  const {email} = data;
  const error ={}
  
  console.log(emailRegex.test(email), 'emailRegex.test(email)');
  if (!email.trim()){
    error.email = '* Field is required';
    error.error = true;
  }else if (!emailRegex.test(email)){
    error.email = '* Enter valid email';
    error.error = true;
  }else{
    error.error =false;
  }
  return error;
}
const data1 = true;

const Forget = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);



  const handleForget = ()=>{
    const error = getForgetMail({
      email,
    })
    console.log(error);
    setError(error);
    const forget ={
      EmailAddress:email,
    }
    if(!error.error){
      setLoading(true);
      FireAjax({method:"POST", url:'/api/Users/ResetPassword', data:forget})
      .then(()=>{
        setLoading(false);
        navigation.navigate('Reset');
      }).catch(error =>{
        setLoading(false);
        Snackbar({text:'Error Occurs', type: 'error'});
      })
    }
  }
  

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Login");
        // Return true to stop default back navigaton
        // Return false to keep default back navigaton
        return true;
      };

      // Add Event Listener for hardwareBackPress
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  return (
    <ScrollView>
    <Loader showLoader={loading} />
      <SafeAreaView >
      
        <KeyboardAwareScrollView>
      
      <View style={styles.container}>
        <Image style={styles.image} source={require("../assets/logo.png")} />
       
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
          />
          <Text style={ styles.error}>{error.email}</Text>
        </View>


        <TouchableOpacity
          style={styles.loginBtn}
          activeOpacity={0.5} onPress={handleForget}
        >
          <Text style={styles.loginText}>Forget Password</Text>
        </TouchableOpacity>
        </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
      </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  error:{
    color:'red',
    paddingRight:180
  },
  loginText:{
    color:'white'
  },
  wrap:{
    flexDirection: "row",
  },
  forgetBtn:{
    width: "80%",
    borderRadius: 25,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 300,
    height: 400,
    resizeMode: "contain",
  },

  inputView: {
    borderRadius: 30,
    width: "100%",
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    borderColor:'black',
    borderWidth:1,
    width: "80%",
    borderRadius: 25, 
  },

  forgot_button: {
    height: 30,
   
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "black",
    marginBottom:'7%'
  },
  new:{
    width: "80%",
    borderRadius: 25,
    height: 50,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  sign:{
    color:'black',
  },
  black:{
    fontSize:17,
    fontWeight: "bold"
  }
});
export default Forget;
