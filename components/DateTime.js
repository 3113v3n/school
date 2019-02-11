import React, { Component } from 'react';
import {View, TouchableOpacity,Button,Text, TextInput,StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';


export default class DateTime extends Component{
  constructor(){
      super()
      this.state={
        isVisible:false,
        chosenDate:''
      }
  }
  _handleDatePicked=(datetime)=>{
      this.setState({
          isVisible:false,
          chosenDate:moment(datetime).format('YYYY, MMMM Do HH:mm')
      })
  }
  _showPicker=()=>{
    this.setState({
        isVisible:true
    }) 
  }
  _hideDateTimePicked=()=>{
    this.setState({
        isVisible:false,
        
    })
  }
    render(){
        return(
        
             <View style={{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#F5FCFF'
             }}>
             <Text style={{
                 color:'red',fontSize:15
             }}>{this.state.chosenDate}</Text>
             <TouchableOpacity style={styles.button} onPress={this._showPicker}>
                 <Text style={styles.text}>SHOW PICKER</Text>
             </TouchableOpacity>
             <DateTimePicker
                 isVisible={this.state.isVisible}
                 onConfirm={this._handleDatePicked}
                 onCancel={this._hideDateTimePicked}
                 mode={'datetime'}
                 is24Hour={true}
             />
            
           </View> 
       
            
     
        );
    }
}
const styles= StyleSheet.create({
    button:{
        width:250,
        height:50,
        backgroundColor:'#330066',
        borderRadius:30,
        justifyContent:'center',
        marginTop:15
    },
    text:{
        fontSize:12,
        color:'white',
        textAlign:'center'
    }
})

