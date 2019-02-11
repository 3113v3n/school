import React from 'react';
import { StyleSheet, Text, View ,Button} from 'react-native';
import {createSwitchNavigator,createAppContainer,
  createDrawerNavigator,
createBottomTabNavigator,
createStackNavigator} from 'react-navigation';
import Icon from '@expo/vector-icons/Ionicons';
/**
 *AppSwitchNavigator
  -UserScreen 
      UserBottomTab
 *  -Dropdown screen
 *      GtaskerBottomTab
 * -AppDrawerNavigator
 *    -Dashboard
 */
 class App extends React.Component {
  render() {
    return <AppContainer/>
     
  }
}

class WelcomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
        title="Client"
        onPress={()=>this.props.navigation.navigate('Dashboard')}

        />
        <Button
        title="FreeLancer"
        onPress={()=>alert('You are a Gtasker now')}

        />
      </View>
    );
  }
}

class DashboardScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>DashboardScreen</Text>
      </View>
    );
  }
}

////////////Dashboard///////////////////

class Feed extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button title="Show Tasks" onPress={()=>this.props.navigation.navigate('Detail')}/>
      </View>
    );
  }
}class Profile extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>PROFILE</Text>
      </View>
    );
  }
}class Settings extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>SETTINGS</Text>
      </View>
    );
  }
}


export default App;
const Detail = props=>(
  <View style={styles.container}>
    <Text>
      My Jobs
    </Text>
  </View>
)
const FeedStack = createStackNavigator({
  Feed:{
    screen: Feed,
    navigationOptions:({navigation})=>{
      return{
        headerTitle:'Feed',
        headerLeft:<Icon name="md-menu" style={{paddingLeft:10}}
        onPress={()=>navigation.openDrawer()} size={30}/>
      }
    }
  },
  Detail:{
    screen: Detail
  }
},{
  defaultNavigationOptions:{
    gesturesEnabled:false //prevent left swipe
    
  }
})

const ProfileStack = createStackNavigator({
  Profile:{
    screen: Profile,
    navigationOptions:({navigation})=>{
      return{
        headerTitle:'Feed',
        headerLeft:<Icon name="md-menu" style={{paddingLeft:10}}
        onPress={()=>navigation.openDrawer()} size={30}/>
      }
    }
  }
})

const SettingsStack = createStackNavigator({
  Settings:{
    screen: Settings,
    navigationOptions:({navigation})=>{
      return{
        headerTitle:'Feed',
        headerLeft:<Icon name="md-menu" style={{paddingLeft:10}}
        onPress={()=>navigation.openDrawer()} size={30}/>
      }
    }
  }
})

const DashboardTabNavigator = createBottomTabNavigator({
  FeedStack,//swap feed with stack
  ProfileStack,
  SettingsStack
  },{
    navigationOptions:({navigation})=>{
      //fetch index of page
      const {routeName}= navigation.state.routes[navigation.state.index];
      return{
        header:null, //remove Top header
        headerTitle:routeName
      };
    }
  });

const DashboardStackNavigator = createStackNavigator({//create stack nav for dashboard tab items
DashboardTabNavigator:DashboardTabNavigator
},{
  defaultNavigationOptions:({navigation})=>{
return{
  headerLeft:<Icon name="md-menu" style={{paddingLeft:10}}
  onPress={()=>navigation.openDrawer()} size={30}/>
}
}
});


const AppDrawerNavigator = createDrawerNavigator({
  Dashboard:DashboardStackNavigator//DashboardScreen ==> DashboardTabNaviator
});

const AppSwitchNavigator = createSwitchNavigator({
  Welcome:{screen:WelcomeScreen},
  Dashboard:{screen : AppDrawerNavigator}//DashboardScreen 
});
const AppContainer =createAppContainer(AppSwitchNavigator);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
