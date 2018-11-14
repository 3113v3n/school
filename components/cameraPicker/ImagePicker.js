import React, { Component } from 'react';
import {Button, View, Image} from 'react-native';
import {ImagePicker } from 'expo';

export default class ImagePickerDemo extends Component{
    state={
        image:null,
    };
    render(){
        let {image} =this.state;
        return(
            <View style={{
                flex:1, alignItems:'center', justifyContent:'center'
            }}>
            <Button
            title='upload photo'
            onPress={this._pickImage}
            />
            {image && 
            <Image source={{uri:image}} style={{width:200, height:200}}/>}
            </View>
        );
    }

    _pickImage = async () =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        //ToDo: Handle promise
        console.log(result);
        if (!result.cancelled){
            this.setState({image: uri});
        }
    };
}
