import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  BackHandler,
  Linking,
  ScrollView
} from "react-native";
import "./Common.js"
import { useFocusEffect } from "@react-navigation/native";


const HomePage =({navigation})=>{
    // navigation.setOption({title: "Home"});
    return(
      <ScrollView>
      <View style={styles.container}>
      <ImageBackground source={require("../assets/pic.png")} style={styles.image}>
      <TouchableOpacity
          style={styles.opText}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Search")}
        >
        <Text style={styles.text}>Our Services</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.opText}
          activeOpacity={0.5}
          onPress={() => Linking.openURL('https://maxelit.com')}
        >
        <Text style={styles.text}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.opText}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("RegistrationForm")}
        >
        <Text style={styles.text}>Register as a Services provider </Text>
        </TouchableOpacity>
        </ImageBackground>
        
        </View>
        </ScrollView>
    )
}
export default HomePage;

const styles =StyleSheet.create({
  container:{
    justifyContent:"center",
    textAlign:'center',
    alignSelf:'center'
  },
  image: {
    width:400,
    height:760,
    
    justifyContent: "center"
  },
  opText:{
    width: "90%",
    borderRadius: 25,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    alignSelf:'center',
    backgroundColor: 'black'
  },
  text:{
    justifyContent:"center",
    textAlign:'center',
    alignSelf:'center',
    fontSize:23,
    color: 'white'   
  }
})