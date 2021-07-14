import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Tabs from './navigation/Tabs';
import {NavigationContainer} from '@react-navigation/native';


export class BottomTab extends Component {
    render() {
        return (
             <NavigationContainer>
        <Tabs/>
        </NavigationContainer> 
        )
    }
}

export default BottomTab;
