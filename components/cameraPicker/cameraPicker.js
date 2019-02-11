import React, { Component } from 'react'; 
import CameraRollPicker from 'react-native-camera-roll-picker';
import {View} from 'react-native';
export default class cameraPicker extends Component{
    myGallery(){
        alert('selected');
    }
    render(){
        return(
            <View style={{
                flex:1,
                
            }}>
            <CameraRollPicker
            callback={this.myGallery.bind(this)}
            />
            </View>
        );
    }
   
}
