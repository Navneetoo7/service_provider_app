import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  BackHandler
} from "react-native";
import Loader from './Loader/index';
import { useFocusEffect } from "@react-navigation/native";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Reset =({navigation})=>{
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const onBackPress = () => {
  //       navigation.navigate('Login');
  //       return true;
  //     };
  //     BackHandler.addEventListener('hardwareBackPress', onBackPress);
  //   }, []),
  // );
    return(
      
        <SafeAreaView>
        {/* <Loader showLoader={loading} /> */}
        <ScrollView>
        
        <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={styles.box}>
          <Image
            source={require("../assets/tik.png")}
            style={styles.inner}
          />
          <Text style={styles.text}>Password Reset Email has been sent!</Text>
          </View>
          <TouchableOpacity style={styles.okay} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.ok}>Okay</Text>
          </TouchableOpacity>
          </View>
          </KeyboardAwareScrollView>
          </ScrollView>
        </SafeAreaView>
        
    )
}
export default Reset;

const styles = StyleSheet.create({
  container: {
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center',
    marginTop: 200
   
  },
  box: {
    width: 300,
    height: 250,
    margin: 12,
    borderRadius: 30/2,
    backgroundColor:'white',
    alignItems: "center",
    justifyContent: "center",
    alignSelf:'center'
  
  },
  inner: {
    flex: 1,
    width: "40%",
    height:"40%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    resizeMode: "contain",
  
  },

  text: {
    alignItems: "center",
    justifyContent: "center",
    color:"black",
    marginBottom: 30
    
  },
  okay:{
    width:300,
    backgroundColor:'white',
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center',
    borderRadius:30,
    height:40
  },
  ok:{
    color:'black'
  }

});