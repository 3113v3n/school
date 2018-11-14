import React,{Component} from 'react';
import {Platform} from 'react-native';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import JobLists from '../screens/JobLists';
import gtaskerHome from '../screens/gtaskerHome';

import GprofileScreen from '../screens/GprofileScreen';


export default GtaskerTabNavigator = new createMaterialBottomTabNavigator({
    HomeScreen:{
        screen: gtaskerHome,
        navigationOptions:{
            tabBarLabel:'G_Home',
            tabBarIcon:({focused})=>(
              <TabBarIcon
              focused={focused}
              name={Platform.Os === 'ios'? `ios-home${focused ?'':'-outline'}`:'md-home'}
              />
            ),
            
            }
    },
    LinksScreen:{
        screen: JobLists,
        navigationOptions:{
            tabBarLabel: 'Tasks',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
              />
            ),
          }
    },
    SettingsScreen:{
        screen:GprofileScreen,
        navigationOptions:{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                name={Platform.OS === 'ios' ? `ios-person${focused ? '' : '-outline'}` : 'md-person'}
              />
              //options-icon
            ),
          }
    }
},{
initialRouteName:'HomeScreen',
  order:['HomeScreen','LinksScreen','SettingsScreen'],
  shifting:true,
  activeTintColor:'white',
  navigationOptions:{
    tabBarVisible:true
  }
})