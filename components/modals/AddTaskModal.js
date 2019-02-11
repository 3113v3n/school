import React, { Component } from 'react';
import{FlatList, StyleSheet, Text, View, Image, Alert,
        Platform, TouchableHighlight, Dimensions,
        TextInput} from 'react-native';
import flatListData from '../data/flatListData';
import Button from 'react-native-button';
import Modal from 'react-native-modalbox';
import { KeyboardAvoidingView } from 'react-native';

var screen = Dimensions.get('window');
export default class AddTaskModal extends Component{
    constructor(props){
        super(props);
        this.state={
          newTaskDesc:this.props.newTaskDesc,
          newTasklocation:this.props.newTasklocation,
          newAmount:this.props.newAmount,
          newTime:this.props.newTime

        }
    }
    static defaultProps={
        newTaskDesc:'',
        newTasklocation:'',
        newAmount:'',
        newTime:''
    }

    showAddModal=()=>{
         this.refs.myModal.open();
         
    }
    generateKey=(numberOfCharacters)=>{
        return require('random-string')({length: numberOfCharacters});
    }
    onChangeText(value){
        this.setState({newTaskDesc: value});
    }
    newLocation(value){
        this.setState({newTasklocation:value});
    }
    onChangeAmount(value){
        this.setState({newAmount: value});
    }
    onSetTime(value){
        this.setState({newTime: value});
    }
    render(){
        return(
          
            <Modal 
            ref={"myModal"}
            style={{
                justifyContent:'center',
                borderRadius:Platform.Os === 'ios'? 30:0,
                shadowRadius:10,
                width:screen.width -80,
                height:350
            }}
            position='center'
            backdrop={true}
            onClosed={()=>{
              //  alert('Modal Closed');
            }}
            >
                <Text
                style={{
                    fontSize:16,
                    fontWeight:'bold',
                    textAlign:'center',
                    marginTop:40
                }}
                > NEW TASK</Text>
                  <KeyboardAvoidingView behavior="padding" enabled>
                <TextInput
                style={{
                    height:30,
                    borderBottomColor:'#292929',
                    marginLeft:20,
                    marginRight:10,
                    marginTop:10,
                    marginBottom:10,
                   
                }}
                //onchangeText={(typedText)=>{this.setState({text:typedText});}}//onChangeText=set typed input as state
                placeholder="Enter Task decription:"
                value={this.state.newTaskDesc}
                onChangeText={(value)=>this.onChangeText(value)}
                onSubmitEditing={()=>this.location.focus()}
                multiline={true}
                clearTextOnFocus={true}
                returnKeyType='next'
                />
                
                  <TextInput
                style={{
                    height:30,
                   borderBottomColor:'gray',
                    marginLeft:20,
                    marginRight:10,
                    marginTop:10,
                    marginBottom:10,
                  // borderBottomWidth:1
                 
                }}
                clearTextOnFocus={true}
                placeholder="Enter Task_location:"
               value={this.state.newTasklocation}
               onChangeText={(value)=>this.newLocation(value)}
               ref={(input) => this.location=input}
               onSubmitEditing={()=>this.amount.focus()}
               returnKeyType='next'
                />
                <TextInput
                 style={{
                    height:30,
                   borderBottomColor:'gray',
                    marginLeft:20,
                    marginRight:10,
                    marginTop:10,
                    marginBottom:10,
                  // borderBottomWidth:1
                }}
                ref={(input)=>this.amount=input}
                placeholder="Enter Amount:"
                value={this.state.newAmount}
                onChangeText={(value)=>this.onChangeAmount(value)}
                onSubmitEditing={()=>this.time.focus()}
                keyboardType="numeric"
                maxLength={6}
                returnKeyType='next'
               /* onchangeText={
                    (typedText)=>{
                        this.setState({text:typedText});
                    }
                }
                value={this.state.text}*/
                />
                <TextInput
                style={{
                    height:30,
                   borderColor:'#48BBEC',
                    marginLeft:5,
                    marginRight:5,
                    marginTop:10,
                    marginBottom:10,
                    borderRadius:1
                  
                }}
                ref={(input)=>this.time=input}
                placeholder="Enter Time:"
                value={this.state.newTime}
                onChangeText={(value)=>this.onSetTime(value)}
                returnKeyType='next'
                />
                  </KeyboardAvoidingView>
                <Button
                style={{fontSize:18, color:'white'}}
                containerStyle={{
                    padding:8,
                    marginLeft:70,
                    marginRight:70,
                    height:40,
                    borderRadius:6,
                    backgroundColor:'mediumseagreen',
                    marginBottom:30
                }}
                onPress={()=>{
                    if(this.state.newTaskDesc.length == 0 || this.state.newTasklocation.length==0 || 
                        this.state.newAmount.length ==0
                    || this.state.newTime.length == 0){
                        alert('you must enter task details');
                        return;
                    }
                    const newKey = this.generateKey(24);
                    const newTask={
                        key:newKey,//generates 24 character key
                        description:this.state.newTaskDesc,
                        imageUrl:"http://clipart-library.com/data_images/60058.jpg",
                        location: this.state.newTasklocation,
                        amount: this.state.newAmount,
                        time: this.state.newTime
                        

                    };
                    flatListData.push(newTask);
                    //REFRESH DATA AFTER ADDING//
                    this.props.parentFlatList.refreshFlatList(newKey);
                    this.refs.myModal.close();//close modal on submit
                }}
                >
                    Save
                </Button>
            </Modal>
          
        );
    }
}