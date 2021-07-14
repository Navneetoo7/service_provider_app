// Imports
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BaseUrl = "https://neannaapi.azurewebsites.net"

// Common method to read Token from AsyncStorage
// Used in : FireAjaxToken
const getData = async () => {
   try 
   {
     token = await AsyncStorage.getItem('@storage_Key')
     console.log("gettoken",token)
     if(token !== null) 
     {
       return token
     }
   } catch(e) 
   {
     // error reading value
   }
 }

// Common method to call APIs without passing Token
// Used in : Login
const FireAjax = ({ method, url, data }) => {
   return axios({
      method: method,
      url: BaseUrl+url,
      data: data,
      headers: { 'content-type': 'application/json' },
   });
};
const FireAjaxToken = async ({ method, url, data }) => {
   var jwtToken = await getData();
   return axios({
   method: method,
   url: BaseUrl+url,
   data: data,
   headers: {
    Authorization: `Bearer ${jwtToken}` 
   }
 });
};
 
export {FireAjax,FireAjaxToken};