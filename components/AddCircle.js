import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';
import {Icon} from 'native-base';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    ImageBackground,
    Animated,
    Dimensions,
    Keyboard
    
    
  } from 'react-native';

  class AddCircle extends Component{
      render(){
          return(
            <Animated.View
            style={{
             position:'absolute',
              height:60,width:60,
              right:10,
            
              zIndex:100,
              backgroundColor:'mediumseagreen',
              alignItems:'center',
              justifyContent:'center',
              borderRadius:30,
              marginTop: 200,
            }}
            >
            <TouchableOpacity
           
            onPress={()=>{
              {this.props._onPressAdd()}
            } }
            underlayColor='white'
            justifyContent='flex-end'
            >
                <Icon name="md-add-circle"
                
              />                
            </TouchableOpacity>
              </Animated.View>
          );
      }
  }
export default AddCircle;