import React, {useState, useEffect} from 'react';
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
  FlatList,
  Alert,
  ScrollView,
} from 'react-native';
import Snackbar from './Snackbar';
import Loader from './Loader';
import {FireAjax, FireAjaxToken} from '../services/FireAjax';

const AdminServiceProvider = () => {
  const [value, setValue] = useState([]);
  const [loader, setLoader] = useState(false);
  const [screen, setScreen] = useState(false)
  useEffect(() => {
    setLoader(true);
    FireAjax({method: 'GET', url: '/api/UserService/getApprovedList'}).then(
      res => {
        console.log("res", res.data.serviceName)
        setValue(res.data);
        setScreen(false);
        setLoader(false);
      },
    );
  }, [screen]);

  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  
  const handleApprove = (data) => {
    FireAjaxToken({
        method: 'POST',
        url: '/api/UserService/'+ data +'/approveOrReject/true',
      })
        .then(() => {
          setScreen(true)
          alert("Added this service successfully")
        })
        .catch(error => {
          Snackbar({text: 'Error Occurs', type: error});
        });
    
  };
  const handleDecline = (data) => {
    FireAjaxToken({
        method: 'POST',
        url:  '/api/UserService/'+ data +'/approveOrReject/false',
      }).then(() => {
          setScreen(true)
          alert("Removed this service successfully")
        })
        .catch(error => {
          Snackbar({text: 'Error Occurs', type: error});
        });
    
  };
  console.log("all data",value);
  return (
    // <ScrollView>
      <SafeAreaView>
      
        <View style={styles.Container}>
      
        <FlatList
        data={value}
        keyExtractor={(value) => value.id}
        renderItem={({item})=>(
        <TouchableOpacity onPress={null} style={styles.card}>
            <View style={styles.details}>
              <View style={styles.parts}>
                <Image
                  style={styles.image}
                  source={{uri:item.profileURL}}
                />
                <View>
                  <Text style={styles.Text}>{item.providerName}</Text>
                  <Text style={styles.Text1}>{item.serviceName}</Text>

                  <View style={styles.row}>
                    <TouchableOpacity
                      onPress={()=>handleApprove(item.userId)}
                      style={{
                        ...styles.btnContact,
                        backgroundColor: '#32CD32',
                      }}>
                      <Text style={styles.btnboth}>Approve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={()=>handleDecline(item.userId)}
                      style={{
                        ...styles.btnContact,
                        backgroundColor: 'red',
                        marginLeft: '5%',
                      }}>
                      <Text style={styles.btnboth}>Decline</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          )}
      />
          
        </View>
      
      </SafeAreaView>
    // </ScrollView>
  );
};
export default AdminServiceProvider;

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    marginTop: 20,
    // flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
  },
  btnboth: {
    color: 'white',
  },
  row: {
    marginTop: '9%',
    flexDirection: 'row',
    // justifyContent:"space-evenly",
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: 'white',
    width: '88%',
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
  parts: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  Text: {
    color: 'black',
    fontSize: 13,
  },
  Text1: {
    color: 'grey',
    fontSize: 13,
  },
  image: {
    width: '29%',
    height: 89,
    borderRadius: 15,
    marginRight: 20,
    backgroundColor: 'white',
  },
  btnContact: {
    width: '38%',
    borderRadius: 25,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  flatlist: {
    width: '100%',
    marginTop: 20,
    marginBottom: 50,
    paddingBottom: 50,
  },
});
