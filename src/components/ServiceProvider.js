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
  Linking,
  ScrollView,
} from 'react-native';
import {FireAjax, FireAjaxToken} from '../services/FireAjax';
import Loader from './Loader';
import {useFocusEffect} from '@react-navigation/native';

const ServiceProvider = (props, {navigation}) => {
  const [value, setValue] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filterService, setFilterService] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {                                                            
        props.navigation.navigate('Tabs');
        // Return true to stop default back navigaton
        // Return false to keep default back navigaton
        return true;
      };

      // Add Event Listener for hardwareBackPress
      BackHandler.addEventListener('hardwareBackPress', onBackPress); 
    }, []),
  );

  useEffect(() => {
    setLoader(true);
    FireAjax({method: 'GET', url: '/api/UserService/userServicelist'}).then(
      res => {
        data = res.data;
        setValue(res.data);
        console.log(value, "services checking", res.data)
        setLoader(false);
      },
    );
  }, []);
  dialCall = item => {
    const mynumber = Number(item);
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${mynumber}`;
    } else {
      phoneNumber = `telprompt:${mynumber}`;
    }

    Linking.openURL(phoneNumber);
  };
  const handleSelectedCard = item => {
    props.navigation.navigate('SelectedUserService', {item});
  };
  useEffect(() => {
    const {item} = props.route.params;
    if (value.length) {
      console.log('value', props);
      const data = value.filter(data => {
        return data.serviceName.toLowerCase() === item.label.toLowerCase();
      });
      setFilterService(data);
      console.log('data', filterService);
    }
  }, [value]);
  console.log(filterService, 'testfilterService');
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Loader showLoader={loader} />
      <View style={styles.Container}>
        <FlatList
          contentContainerStyle={styles.flatlist}
          data={filterService}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handleSelectedCard(item)}
              style={styles.card}>
              <View style={styles.details}>
                <View style={styles.parts}>
                  <Image
                    style={styles.image}
                    source={{uri:item.profileURL}}
                  />
                  <View>
                    <Text style={styles.Text}>{item.providerName}</Text>
                    <Text style={styles.Text1}>{item.serviceName}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => dialCall(item.contactNumber)}
                  style={styles.btnContact}>
                  <Text>{item.contactNumber}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ServiceProvider;

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
