import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { Notifications } from 'expo';
import MainTabNavigator from './MainTabNavigator';
import registerForPushNotification from '../api/registerForPushNotification';
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import AuthStackNavigator from '../screens/AuthStackNavigator'
import UserBottomTab from './UserBottomTab';
import GtaskerBottomTab from './GtaskerBottomTab';
import JobLists from '../screens/JobLists';
import getTaskers from '../screens/getTaskers';
import UserTaskHistory from '../screens/UserTaskHistory';


const RootNavigator = createSwitchNavigator({
jobs: JobLists
// UserTaskHistory//getTaskers,,
  // AuthLoading: AuthLoadingScreen,
  // Auth: AuthStackNavigator,
 
  // UserScreen: UserBottomTab,
  // GtaskerScreen: GtaskerBottomTab,
  // Main: MainTabNavigator,
});

export default class AppNavigator extends React.Component{
  componentDidMount(){
    this._notificationSubscription = this._registerForPush()
  }

  componentWillUnmount(){
    this._notificationSubscription && this._notificationSubscription.remove();
  }
  render(){
    return <RootNavigator/>;
  }

  _registerForPush(){
    registerForPushNotification();

    //watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }
    _handleNotification=({origin, data})=>{
      console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
   
  };
}