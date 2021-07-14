// Imports
import React,{useState, useEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  BackHandler,
  FlatList,
  Alert,
  Linking,
} from "react-native";
import "./Common.js"
import { useFocusEffect } from "@react-navigation/native";
import {FireAjax,FireAjaxToken} from "../services/FireAjax";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constructor / Init
const SelectedUserService =(props,{navigation}) => 
{
  const [profile, setProfile] = useState("");
  const [data, setData]= useState(false);
  var jsonValue;
  let ImageUrl;
 
  // let ImageUrl = profile ? profile : require('../assets/bookmark.png');

  useFocusEffect(
    React.useCallback(() => 
    {
      const onBackPress = () => 
      {
        props.navigation.navigate('Tabs');
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  let value = props.route.params;
  let userid = value.item.userid;
  console.log(value)
 const BookMarkStatus = (user)=>{
  FireAjaxToken({
    method:"GET",
    url:'/api/Bookmark/validateProviderBookmark/'+user,
  }).then((res)=> {
    console.log(res.data, "cons"),
    setData(res.data)
  })
 }

BookMarkStatus(userid);
if(data==true){
  ImageUrl = profile ? profile : require('../assets/dark.png')
  
}else{
  ImageUrl= profile ? profile : require('../assets/bookmark.png');
}
  
  //for call
  dialCall = (item) => 
  {
        const mynumber = Number(item)
        let phoneNumber = '';
    
        if (Platform.OS === 'android') {
          phoneNumber = `tel:${mynumber}`;
        }
        else {
          phoneNumber = `telprompt:${mynumber}`;
        }
                            
        Linking.openURL(phoneNumber);
      };

      const BookMark = async ()=>{
        if(data==false){
        const BookData ={
            providerId:value.item.userid,
            userserviceId:value.item.userserviceid
        };
        FireAjaxToken({
          method:'POST',
          url: '/api/Bookmark/addBookmark',
          data: BookData
        }).then(()=>{
          setProfile(require('../assets/dark.png'))
          alert("You added this service successfully from bookmark")
          // navigation.navigate('BookMarked')
        }).catch(error=>{
          alert(error);
          console.log(error);
        })}else{
      FireAjaxToken({
        method:'DELETE',
        url: '/api/Bookmark/RemoveFromProviderUserid/'+value.item.userid,
      }).then(()=>{
        setProfile(require('../assets/bookmark.png'))
        alert("You removed this service successfully from bookmark")
        // navigation.navigate('BookMarked')
      }).catch(error=>{
        alert(error);
        console.log(error);
        })
      }
    }
      
      console.log("select as lasttt",jsonValue)
    return(
      <ScrollView>
      <SafeAreaView>
     <View style={styles.container}>
     <Image style={styles.image}
     source={{uri:value.item.profileURL}}
       />
       <View >
      <Text style={styles.text}>{value.item.providerName}</Text>
      <TouchableOpacity onPress={BookMark}>
    
    <Image
  source={ImageUrl}
  style={{ width: 30, height: 30, borderRadius: 40/2, alignSelf:'flex-end' ,resizeMode:'contain', }} />
  </TouchableOpacity>
      </View>
      <Text style={styles.desc}>{value.item.details}</Text>
      <Text style={styles.text1}>{value.item.address}</Text>
      <TouchableOpacity onPress={() => dialCall(value.item.contactNumber)} style={styles.btnContact}>
      <Text style={styles.cont}>{value.item.contactNumber}</Text>
      </TouchableOpacity>
     </View>
     <View style={{marginTop:"10%"}}></View>
     </SafeAreaView>
     </ScrollView>
    )
};


const styles = StyleSheet.create({
  container:{
    
    justifyContent: 'center',
    alignContent:'center',
    backgroundColor: 'white',
  },
  desc:{
    fontSize:15,
    marginLeft:'8%',
    marginRight:"13%",
  },
  image:{
    marginTop:'10%',
    width:"90%",
    borderRadius:15,
    height:300,
    justifyContent: 'center',
    alignContent:'center',
    alignItems:'center',
    alignSelf:"center"

  },
  cont:{
    fontSize:15,
    color:'black', 
  },
  text1:{
    fontSize:17,
    color:'black',
    marginLeft:'8%',
  },
  text:{
    fontSize:25,
    color:'black',
    marginLeft:'10%',
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
    marginTop:"5%"
  },
})
export default SelectedUserService;