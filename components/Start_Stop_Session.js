import React,{Component} from 'react';
import {View,Text, Image, TouchableOpacity,Alert} from 'react-native';

export default class Start_Stop_Session extends Component{


    stopSession=()=>{
        Alert.alert(
            'Alert',
            'ARE YOU SURE YOU WANT TO END SESSION?',
            [
                {text:'No', onPress:()=> console.log('Cancel Pressed'), style:'cancel'},
                {text:'Yes',onPress:()=>{
                        ///CODE TO END SESSION///
                }}
            ],
            {cancelable:true}
            );
    }
    startSession=()=>{
        alert('you have started a task session')
    }

    render(){
        return(
            <View style={{flex:1,alignContent:'center',alignItems:'center',
        justifyContent:'center'}}>

            <TouchableOpacity
            onPress={()=>this.startSession()}
            >
                <Image
                 style={{height:100,width:100}}
                source={require('../assets/images/start.jpg')}/>
             </TouchableOpacity>

             <TouchableOpacity
             onPress={()=>this.stopSession()}
             >       
                <Image
                style={{height:100,width:100}}
                source={require('../assets/images/Perspective-Button-Stop-icon.png')}
                
                />
                </TouchableOpacity>
            </View>
        )
    }
}
