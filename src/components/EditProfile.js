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
  Alert,
  ScrollView,
} from 'react-native';
import Loader from './Loader';
import ImgToBase64 from 'react-native-image-base64';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useFocusEffect} from '@react-navigation/native';
import {getEditValidation} from '../services/utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FireAjax, FireAjaxToken} from '../services/FireAjax';
import Snackbar from './Snackbar';
import Tab from './navigation/Tabs';

const EditProfile = ({navigation}) => {
  const [user, onChangeUser] = React.useState('');
  const [first, onChangeFirst] = React.useState('');
  const [last, onChangeLast] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [confirm, onChangeConfirm] = React.useState('');
  const [profile, setProfile] = React.useState(null);
  const [error, setError] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [active, setActive] = React.useState(true);
  const [base, setBase] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [imageString, setImageString] = React.useState('')
  var base64String1;
  let image= "image.png";
  const [data, setData] = useState([]);
  useEffect(() => {
    FireAjaxToken({
      method: 'GET',
      url: '/api/Users/getuserdata',
    }).then((res) => {
        setData(res.data)
        console.log("setData",res.data)
        }).catch(error => {
          console.log(error)
        });
    }, [])
  

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@base64String', value)
      console.log("base64string is stored in storage",value)
    } catch (e) {
      // saving error
    }
  };
  const getData = async () => {
    try 
    {
      base64stringStorage = await AsyncStorage.getItem('@base64String')
      if(base64stringStorage !== null) 
      {
        return base64stringStorage
      }
    } catch(e) 
    {
      // error reading value
    }
  }
  let ImageUrl = profile ? {uri: profile} : {uri:data.profileURL};

  const ViewsImage = () => {
    Alert.alert(
      'Select Your Profile',
      'You want to select from you device?',
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
                ImgToBase64.getBase64String(res.uri)
                  .then(base64String =>{
                    // base64String1=base64String
                    //setBase(base64String),
                    setImageString(base64String)
                  })
                  .catch(err => console.log(err),
                  // alert(err))
                  )

              }
            }),
        },
        // {
        //   text: 'Capture',
        //   onPress: () =>
        //     launchCamera({}, res => {
        //       console.log('Response = ', res.uri);
        //       if (res.didCancel) {
        //         console.log('User cancelled image picker');
        //       } else if (res.error) {
        //         console.log('ImagePicker Error: ', res.errorMessage);
        //       } else {
        //         
        //         setProfile(res.uri);
        //         ImgToBase64.getBase64String(res.uri)
        //           .then(base64String =>
        //             base64String1=base64String
        //             // setBase(base64String1)
                  
        //           )
        //           .catch(err => console.log(err));
        //       }
        //     }),
        // },
        {
          text: 'Not Now',
          onPress: () => null,
        },
      ],
    );
    return true;
  };
  const handleEditPress = async() => {
    //var baseValue = await getData();
    //console.log(baseValue);
    const error = getEditValidation({
      user,
      first,
      last,
      email,
      password,
    });
    
    setError(error);
    const userData = {
      userName: user,
      email: email,
      firstName: first,
      lastName: last,
      password: password,
      active: active,
      profileBase64: imageString,
      profileName: "profile.png"
    };
  
    if (!error.error) {
      setLoading(true);
   
      FireAjaxToken({
        method: 'PUT',
        url: '/api/Users/userupdate',
        data: userData,
      })
        .then(() => {
          setLoading(false);
          alert("You added your profile successfully")

          navigation.navigate('Tabs');
        })
        .catch(error => {
          Snackbar({text: 'Error Occurs', type: error});
        });
    }
  };
 
  console.log(profile);
  return (
    <SafeAreaView>
      <Loader showLoader={loading} />
      <ScrollView style={{marginTop: '15%'}}>
        <KeyboardAwareScrollView extraHeight={50}>
          <View style={styles.top}>
            <TouchableOpacity
              style={styles.boxBlack}
              onPress={() => ViewsImage()}>
              <Image
                style={{width: 100, height: 100, borderRadius: 20 / 2}}
                source={ImageUrl}
              />
            </TouchableOpacity>
            <Text>Upload Profile Picture</Text>
            <Text style={styles.error}>{error.profile}</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={onChangeUser}
            value={user}
            placeholder={data.userName}
          />
          <Text style={styles.error}>{error.user}</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeFirst}
            value={first}
            placeholder={data.firstName}
          />
          <Text style={styles.error}>{error.first}</Text>

          <TextInput
            style={styles.input}
            onChangeText={onChangeLast}
            value={last}
            placeholder={data.lastName}
          />
          <Text style={styles.error}>{error.last}</Text>

          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            placeholder={data.email}
          />
          <Text style={styles.error}>{error.email}</Text>

          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            placeholder={data.password}
            secureTextEntry={true}
          />
          <Text style={styles.error}>{error.password}</Text>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={handleEditPress}>
              <Text style={styles.loginText}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};
export default EditProfile;
const styles = StyleSheet.create({
  btm: {
    marginTop: 20,
    paddingLeft: 90,
    paddingRight: 90,
  },
  boxBlack: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 5,
  },
});
