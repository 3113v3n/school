import React,{Component} from 'react';
import {Platform} from 'react-native';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import getTaskers from '../screens/getTaskers';
import { createStackNavigator} from 'react-navigation';
import UserDetails from '../screens/UserDetails';
import UserTaskHistory from '../screens/UserTaskHistory';
export const userFeedStack = createStackNavigator({

feed:{
    screen:getTaskers
  
},
UserDetails:{
    screen:UserDetails,
    navigationOptions:{
        title:'Tasker Details'
    }
},
})
export const HomeFeedStack = createStackNavigator({
home:HomeScreen,
session:{
    screen:UserTaskHistory,
    navigationOptions:{
        title:'My History'
    }
}
})
 
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
        screen: userFeedStack,
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
        screen: HomeFeedStack,
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