import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator} from 'react-navigation';
import UserBottomTab from '../navigation/UserBottomTab';

import calendar from '../components/calendar';
import UserSchedule from '../components/UserSchedule';
import Start_Stop_Session from '../components/Start_Stop_Session';
import MapView from '../components/profileTab/MapView';
import AuthLoadingscreen from '../screens/AuthLoadingScreen';
import AddComponent from '../components/AddComponent';
import GtaskerBottomTab from '../navigation/GtaskerBottomTab';
import CheckBox from '../components/CheckBox';
import UserTaskHistory from '../screens/UserTaskHistory';



export default  createStackNavigator({
//   welcome:WelcomeScreen,


myHome:GtaskerBottomTab,
 maps: MapView,
add: AddComponent,
back: UserBottomTab,
date: calendar,
 session: UserTaskHistory,
login: AuthLoadingscreen,
scheduler:UserSchedule,

//check: CheckBox//Ratings
},{
  headerMode:'none',
navigationOptions:{
  gesturesEnabled:false
}
})
