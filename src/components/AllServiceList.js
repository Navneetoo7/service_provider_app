import React, {useState, useEffect} from "react";
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
  FlatList,
} from "react-native";
import {FireAjax,FireAjaxToken} from '../services/FireAjax';
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
let data;
const AllServiceList =()=>{
  const [value, setValue] = useState([]);
  // https://jsonplaceholder.typicode.com/posts
  useEffect(() => {
    FireAjax({method:"GET",url:'/api/UserService/userServicelist'}).then((res)=>{
   data = res.data;
   setValue(res.data)
  })
  })
console.log("test", value)
    return(
      <View>
        <Text>AllServiceList111</Text>
        <FlatList />
      </View>
    )
}
export default AllServiceList;