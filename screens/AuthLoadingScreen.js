import React,{Component} from 'react';
import{
    View,ActivityIndicator,
    StyleSheet,
    AsyncStorage
} from 'react-native';

export default class AuthLoadingScreen extends Component {
    constructor(){
        super()
        this.loadApp()
    }
    loadApp = async()=>{
     
        const userToken = await AsyncStorage.getItem('userToken');
        const userID = await AsyncStorage.getItem('userID');
       
        this.props.navigation.navigate(userToken ? 'UserScreen' : 'Auth')
        this.props.navigation.navigate(userID? 'GtaskerScreen' : 'Auth')
    }
    render(){
        return(
            <View style={styles.container}>
                <ActivityIndicator/>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})