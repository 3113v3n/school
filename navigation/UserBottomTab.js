import React,{Component} from 'react';
import {Platform} from 'react-native';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import getTaskers from '../screens/getTaskers';
 
export default UserBottomTab = new createMaterialBottomTabNavigator({
    SettingsScreen:{
        screen:SettingsScreen,
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
    },
    TaskerScreen:{
        screen: getTaskers,
        navigationOptions:{
            tabBarLabel:'List',
            tabBarIcon:({focused})=>(
              <TabBarIcon
              focused={focused}
              name={Platform.Os === 'ios'? `ios-list${focused ?'':'-outline'}`:'md-list'}
              />
            ),
            
            }
    },
    HomeScreen:{
        screen: HomeScreen,
        navigationOptions:{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                name={
                  Platform.OS === 'ios'
                    ? `ios-home${focused ? '' : '-outline'}`
                    : 'md-home'
                }
              />
            ),
          }
    }
},{
 initialRouteName:'HomeScreen',
    order:['HomeScreen','TaskerScreen','SettingsScreen'],
    shifting:true,
    activeTintColor:'white',
    navigationOptions:{
        tabBarVisible:true
    }
})