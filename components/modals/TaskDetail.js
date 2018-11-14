import React, { Component } from 'react';
import{FlatList, StyleSheet, Text, View, Image, Alert,
        Platform, TouchableHighlight, Dimensions,
        Button,
        } from 'react-native';


import Modal from 'react-native-modalbox';


var screen = Dimensions.get('window');
export default class TaskDetail extends Component{
  constructor(props){
          super(props);
  }
  showTaskModal=()=>{
this.refs.myModal.open();
  }
  render(){
          return(
                  <Modal
                  ref={"myModal"}
                  style={styles.modal}
                  position='center'
                  backdrop={true}
                  onClosed={()=>{alert("Modal closed");}}
                  >
                 
                 <Text style={styles.text}>details: </Text>
                 <Text style={styles.text}> Location:</Text>
                 <Text  style={styles.text}>Amount: </Text>
                 <Text  style={styles.text}>Day/Time: </Text>
                 <Text  style={styles.text}>End Day/Time: </Text>
                  </Modal>
          );
  }
            
    
}
const styles=StyleSheet.create({
modal:{
        justifyContent:'center',
        borderRadius: Platform.OS === 'ios'? 30:0,
        shadowRadius:10,
        width:screen.width -80,
        height:"40%"
},
text:{
        fontSize:16,
        fontWeight:'bold',
        textAlign:'center',

}
});