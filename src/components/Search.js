import React, {useState, useEffect} from 'react';
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
  Alert,
} from 'react-native';
import "./Common.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemsList from './ItemsList';
import {FireAjax,FireAjaxToken} from '../services/FireAjax';
import {getFilteredData} from './utils';
import {serviceList} from '../services/constants';
import { useFocusEffect } from "@react-navigation/native";


const Search = ({navigation}) => {
  // navigation.setOption({title: "Search"});
  global.title="Search";
  const [box, setBox] = useState();
  const [serachItem, setSearchItem] = useState([]);
  const [services, setServices] = useState([]);
  const [datatoken, setDatatoken]= useState();
  var value;
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Login');
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  
  const getData = async () => {
    try {
      value = await AsyncStorage.getItem('@storage_Key')
      console.log("gettoken",value)
      if(value !== null) {
        // value previously stored
        console.log("gettoken",value)
        setDatatoken(value)
      }
    } catch(e) {
      // error reading value
    }
  }
  // useEffect(() => {
  //   async () => {
  //     try {
  //       value = await AsyncStorage.getItem(token)
  //       if(value !== null) {
  //         // value previously stored
  //         console.log("gettoken",value)
  //         setDatatoken(value)
  //       }
  //     } catch(e) {
  //       // error reading value
  //     }
  //   }
  // },[value]);
  getData();
  console.log("hhhhhhhhhhhhhhhhhhhhh",datatoken)
  // useEffect(async () => {
  //   try {
  //     const value = await AsyncStorage.getItem(token)
  //     if(value !== null) {
  //       // value previously store
  //       setData(value)
  //     }
  //   } catch(e) {
  //     // error reading value
  //   }
  // })
  useEffect(() => {
    FireAjax({method: 'GET', url: '/api/Service/servicelist'}).then(res => {
      setServices(res.data);
    });
  }, []);
  const handleChange = text => {
    setBox(text);

    let data = serviceList.filter(item => {
      if (item.label.toLowerCase().includes(text.toLowerCase())) {
        return item;
      }
    });
    setSearchItem(text.trim() ? data : []);
  };
  const handlePress = item => {
    navigation.navigate('ServiceProvider', {item});
  };
  return ( 
    <SafeAreaView style={styles.container}>
      <View style={styles.InputView}>
        <TextInput
          style={styles.search}
          placeholder="What are you looking for?"
          placeholderTextColor="grey"
          onChangeText={handleChange}
        />
        <Image source={require('../assets/search.png')} style={styles.image} />
      </View>
      <View style={styles.wrapper}>
        <ItemsList serachItem={serachItem} handlePress={handlePress} />
      </View>
      {/* <Text style={styles.black}>{data}</Text> */}
      <TouchableOpacity onPress={()=> navigation.navigate("Services")} style={styles.btmAll}>
      <Text>All Service</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    flex: 1,
    paddingHorizontal: 30,
  },
  black:{
    color:"black"
  },
  btmAll:{
    width:"80%",
    height:40,
    borderRadius:25,
    backgroundColor:"white",
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    alignSelf:'center'
  },
  InputView: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    width: '100%',
    height: 45,

    borderWidth: 1,
    borderColor: 'grey',
  },
  search: {
    textAlign: 'left',
    marginLeft: 20,
    color: 'grey',
  },
  wrapper: {
    width: '100%',
  },
  image: {
    width: 15,
    height: 15,
    position: 'absolute',
    right: 20,
    top: 15,
  },
});
