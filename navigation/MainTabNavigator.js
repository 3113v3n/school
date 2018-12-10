import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator} from 'react-navigation';


import calendar from '../components/calendar';
import UserSchedule from '../components/UserSchedule';

import MapView from '../components/AppComponents/MapView';
import AuthLoadingscreen from '../screens/AuthLoadingScreen';
import AddComponent from '../components/AddComponent';
import GtaskerBottomTab from '../navigation/GtaskerBottomTab';
import CheckBox from '../components/CheckBox';



export const userStack = createStackNavigator({
  add: AddComponent,
  date: calendar,
 
login: AuthLoadingscreen,
},{headerLayoutPreset:false})

export const TaskerStack = createStackNavigator({
  myHome:GtaskerBottomTab,
  scheduler:UserSchedule,
  
login: AuthLoadingscreen,
})


 
