import React from "react";
import {StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    BackHandler,
    FlatList,
    Alert,
    Linking,
    ScrollView,} from "react-native";
import MapView, {Marker, Callout} from 'react-native-maps';

const MapMy = ()=>{

    dialCall = () => {
        // const myNumber =Number(item)
            let phoneNumber = '';
        
            if (Platform.OS === 'android') {
              phoneNumber = `tel:${8080206053}`;
            }
            else {
              phoneNumber = `telprompt:${8080206053}`;
            }
                                
            Linking.openURL(phoneNumber);
          };
          
    return(
        <View >
            <MapView style={styles.map}
     initialRegion={{
  latitude: 33.7872131,
  longitude: -84.381931,
  latitudeDelta: .005,
  longitudeDelta: .005
  }}
>
<Marker 
coordinate={{
    latitude: 33.7872131,
  longitude: -84.381931,
}}
Image={require('../assets/placeholder.png')}
title="Service Name"
description="Best service"
 >
     <Callout tooltip={true} onPress={() => dialCall()}  >
     {/* <View>
     <View Style={styles.bubble}>
         <Text style={styles.name}>Servicer Name</Text>
         <Text> A short description</Text> 
         <Image style={styles.image} source={require('../assets/tik.png')}/>
     </View>
     <View style={styles.arrowBorder}/>
     <View style={styles.arrow}/>
     </View>  */}

      <TouchableOpacity  style={styles.card}>
              <View style={styles.details}>
                <View style={styles.parts}>

                  <Text ><Image
                    style={{
                      position:'absolute',
                        width: 50,
                        height: 60,
                        alignSelf:'center',
                        alignContent:'center',
                        justifyContent:'center',
                        alignItems:'center',
                        resizeMode: 'contain'
                      }}
                    source={require('../assets/placeholder.png')}
                  /></Text>
                  <View>
                    <Text style={styles.Text}>service Name</Text>
                    <Text style={styles.Text1}>service type</Text>
                  </View>
                </View>

                <TouchableOpacity  onPress={() => dialCall(8080206053)} style={styles.btnContact}>
                  <Text>8080206053</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
     </Callout> 
     
 </Marker>
</MapView>
</View>

    )
}
export default MapMy;
const styles = StyleSheet.create({
    map:{
        height:"100%"
    },
    btnContact: {
        width: '80%',
        borderRadius: 25,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderBottomColor: 'black',
        borderWidth: 1,
        marginBottom: 20,
      },
    parts: {
        flexDirection: 'row',
        paddingHorizontal: 25,
        paddingVertical: 20,
      },
      card: {
        backgroundColor: 'white',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 15,
        marginTop: 2,
      },
    // image: {
    //     width: '25%',
    //     height: 80,
    //     borderRadius: 15,
    //     marginRight: 20,
    //     backgroundColor: 'red',
    //     resizeMode:'contain'
    //   },
    Text: {
        color: 'black',
        fontSize: 13,
      },
      Text1: {
        color: 'grey',
        fontSize: 13,
      },
    bubble:{
        flexDirection:'column',
        alignSelf:'flex-start',
        backgroundColor:'#fff',
        borderRadius:6,
    },
    arrow:{
      backgroundColor:'transparent',
      borderColor:'transparent',
      borderTopColor:'#fff',
      borderWidth:16,
      alignSelf:'center',
      marginTop:-32,  
    },
    arrowBorder:{
        backgroundColor:'transparent',
        borderColor:'transparent',
        borderTopColor:'#007a87',
        borderWidth:16,
        alignSelf:'center',
        marginTop:-0.5,   
    },
    name:{
     fontSize:16,
     marginBottom:5,   
    },
    image:{
      height: 100, width:100,
        resizeMode:"cover"
    },

})