import React,{useState, useEffect} from "react";
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
  ScrollView,
  Linking,
} from "react-native";
// import Loader from './Loader';
import Snackbar from './Snackbar';
import {FireAjax,FireAjaxToken} from '../services/FireAjax';

const BookMarked =({navigation})=>{
  const [data, setData] = useState([]);
  useEffect(() => {
    FireAjaxToken({
      method: 'GET',
      url: '/api/Bookmark/getbookmarklist',
    }).then((res) => {
        setData(res.data)
        console.log("setData",res.data)
        }).catch(error => {
          console.log(error)
        });
    }, [{navigation}])
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


    return(
      <ScrollView>
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {/* <Loader showLoader={loader} /> */}
      <View style={styles.Container}>
        <FlatList
          contentContainerStyle={styles.flatlist}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <TouchableOpacity onPress={()=> navigation.navigate('SelectBook',{data:item})} style={styles.card}>
              <View style={styles.details}>
                <View style={styles.parts}>
                  <Image
                    style={styles.image}
                    source={{uri:item.profileURL}}
                  />
                  <View>
                    <Text style={styles.Text}>{item.providerName}</Text>
                    <Text style={styles.Text1}>{item.details}</Text>
                  </View>
                </View>

                <TouchableOpacity  onPress={() => dialCall(item.contactNumber)} style={styles.btnContact}>
                  <Text>{item.contactNumber}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
    </ScrollView>     )
}
export default BookMarked;

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    // marginTop: 20,
    // flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  Text: {
    color: 'black',
    fontSize: 13,
  },
  Text1: {
    color: 'grey',
    fontSize: 13,
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
  flatlist: {
    width: '100%',
    marginTop: 20,
    marginBottom: 50,
    paddingBottom: 50,
  },
  image: {
    width: '25%',
    height: 80,
    borderRadius: 15,
    marginRight: 20,
    backgroundColor: 'red',
  },
  parts: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  card: {
    backgroundColor: 'white',
    width: '85%',
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
});