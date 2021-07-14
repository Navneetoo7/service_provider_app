import React,{useState} from 'react';
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
import {getRegistrationValidation} from '../services/utils';
import {FireAjax,FireAjaxToken} from '../services/FireAjax';
import Loader from './Loader';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Snackbar from './Snackbar';
import RNPickerSelect from 'react-native-picker-select';
import {serviceList} from '../services/constants';
const EditUserService = ({navigation}) => {
  const [name, onChangeName] = React.useState('');
  const [category, onChangeCategory] = React.useState('');
  const [price, onChangePrice] = React.useState('');
  const [contact, onChangeContact] = React.useState('');
  const [error, setError] = React.useState({});
  const [profile, setProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [address, setAddress] = useState("");
  const [desc, setDesc] = useState("")

  let ImageUrl = profile ? {uri: profile} : require('../assets/picture.png');


  const ViewsImage = () => {
    Alert.alert(
      'Select Your Profile',
      'You want to select from you device or use capture?',
      [
        {
          text: 'Device',
          onPress: () =>
            launchImageLibrary({}, res => {
              console.log('Response = ', res.uri);
              if (res.didCancel) {
                console.log('User cancelled image picker');
              } else if (res.error) {
                console.log('ImagePicker Error: ', res.errorMessage);
              } else {
                setProfile(res.uri);
              }
            }),
        },
        {
          text: 'Capture',
          onPress: () =>
            launchCamera({}, res => {
              console.log('Response = ', res.uri);
              if (res.didCancel) {
                console.log('User cancelled image picker');
              } else if (res.error) {
                console.log('ImagePicker Error: ', res.errorMessage);
              } else {
                setProfile(res.uri);
              }
            }),
        },
        {
          text: 'Not Now',
          onPress: () => null,
        },
      ],
    );
    return true;
  };

  const handleRegistration = () => {
    const error = getRegistrationValidation({name, category, price, contact, desc, address, profile});
    setError(error);
    console.log(error);
    const data = {
      ChargePerHour: price,
      ContactNumber: contact,
      ServiceName: category,
      Details: desc,
      Address: address,
      CreatedUser:name,
    };
    if (!error.error) {
      setLoading(true);
      fireAjax({
        method: 'POST',
        url: '/api/UserService/createUserService',
        data: data,
      })
        .then(() => {
          setLoading(false);
          navigation.navigate('ServiceRegistration');
        })
        .catch(error => {
          setLoading(false);
          // Snackbar({text: 'Error Occurs', type: 'error'});
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader showLoader={loading} />
      <View style={{marginTop: '10%'}}>
      <View style={styles.top}>
            <TouchableOpacity
              style={styles.boxBlack}
              onPress={() => ViewsImage()}>
              <Image
                style={{width: 100, height: 100, borderRadius: 20 / 2}}
                source={ImageUrl}
              />
            </TouchableOpacity>
            <Text>Update Profile Picture</Text>
            <Text style={styles.error}>{error.profile}</Text>
          </View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
          placeholder="Full Name"
        />
        <Text style={styles.error}>{error.name}</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeContact}
          value={contact}
          placeholder="Phone Number"
          keyboardType="numeric"
        />
        <Text style={styles.error}>{error.contact}</Text>

        <View style={styles.dropdown}>
          <RNPickerSelect
            onValueChange={value => onChangeCategory(value)}
            items={serviceList}
            value={category}
            style={pickerStyle}
            placeholder={{
              label: category ? '' : 'Category of Service',
              value: null,
            }}
          />
        </View>
        <Text style={styles.error}>{error.category}</Text>

        <TextInput
          style={styles.input}
          onChangeText={setDesc}
          value={desc}
          placeholder="description"
        />
        <Text style={styles.error}>{error.price}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setAddress}
          value={address}
          placeholder="Address"
        />
        <Text style={styles.error}>{error.price}</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePrice}
          value={price}
          placeholder="Charges per Hour"
          keyboardType="numeric"
        />
        <Text style={styles.error}>{error.price}</Text>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleRegistration}>
            <Text style={styles.loginText}>SAVE CHANGES</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default EditUserService;

const pickerStyle = {
  inputIOS: {
    color: 'black',
    borderWidth: 1,
    height: 40,
    position: 'relative',
    bottom: 8,
    fontSize: 12,
    left: -5,
  },
  
  inputAndroid: {
    color: 'black',
    borderWidth: 1,
    height: 40,
    position: 'relative',
    bottom: 8,
    fontSize: 12,
    left: -5,
    // paddingHorizontal: 20,
  },
  placeholder: {
    color: 'grey',
    position: 'relative',
    left: -5,
  },
  underline: {borderWidth: 1},
  icon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: '#00000099',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
    top: 25,
    right: 15,
  },
};
const styles = StyleSheet.create({
  btm: {
    marginTop: 20,
    paddingLeft: 90,
    paddingRight: 90,
  },
  input: {
    height: 40,
    padding: 10,
    marginHorizontal: 12,
    marginLeft: 12,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'black',
  },
  boxBlack: {
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  top: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center'
  },
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: 'black',
    borderWidth: 3,
    borderColor: 'black',
  },
  loginText: {
    color: 'white',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginLeft: 12,
    marginBottom: 8,
    marginTop: 2,
  },
  dropdown: {
    marginHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    height: 40,
    backgroundColor: 'white',
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: 'red',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignSelf:'center',
    width:"100%"
  },
});
