import React, { Component } from 'react';
import{FlatList, StyleSheet, Text, View, Image, Alert,
        Platform, TouchableHighlight, Dimensions,
        TextInput} from 'react-native';

import Button from 'react-native-button';
import Modal from 'react-native-modalbox';
import {updateTasks} from '../../networking/server';

var screen = Dimensions.get('window');
export default class EditTaskModal extends Component{
    constructor(props){
        super(props);
        this.state={
          TaskDesc:this.props.TaskDesc,
          Tasklocation:this.props.Tasklocation,
          Amount:this.props.Amount,
          Time:this.props.Time

        }
    }
    static defaultProps={
        TaskDesc:'',
        Tasklocation:'',
        Amount:'',
        Time:''
    }

    showEditModal=(editingTask, flatListItem)=>{
        this.setState({
            key: editingTask.key,
            TaskDesc:editingTask.TaskDesc,
            Tasklocation: editingTask.Tasklocation,
            Amount: editingTask.amount,
            Time:editingTask.time,
            flatListItem: flatListItem

        });
         this.refs.myModal.open();
         
    }
    generateKey=(numberOfCharacters)=>{
        return require('random-string')({length: numberOfCharacters});
    }
    onChangeText(value){
        this.setState({TaskDesc: value});
    }
    newLocation(value){
        this.setState({Tasklocation:value});
    }
    onChangeAmount(value){
        this.setState({Amount: value});
    }
    onSetTime(value){
        this.setState({Time: value});
    }
    render(){
        return(
            <Modal 
            ref={"myModal"}
            style={{
                justifyContent:'center',
                borderRadius:Platform.Os === 'ios'? 30:0,
                shadowRadius:10,
                width:"90%",
                height:"100%"
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
                    marginTop:10
                }}
                > EDIT TASK</Text>
                <TextInput
                style={{
                    height:30,
                    borderBottomColor:'gray',
                    marginLeft:20,
                    marginRight:10,
                    marginTop:20,
                    marginBottom:10,
                    borderBottomWidth:1
                   
                }}
                placeholder="Edit Task description:"
                value={this.state.TaskDesc}
                onChangeText={(value)=>this.onChangeText(value)}
                returnKeyType='next'
                onSubmitEditing={()=>this.location.focus()}
                underlineColorAndroid='rgba(0,0,0,0)'
                />
                
                  <TextInput
                style={{
                    height:30,
                   borderBottomColor:'gray',
                    marginLeft:20,
                    marginRight:10,
                    marginTop:20,
                    marginBottom:10,
                   borderBottomWidth:1
                 
                }}
               
                placeholder="Edit location:"
               value={this.state.Tasklocation}
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
                    marginTop:20,
                    marginBottom:10,
                   borderBottomWidth:1
                }}
                ref={(input)=>this.amount=input}
                placeholder="Enter Amount:"
                value={this.state.Amount}
                onChangeText={(value)=>this.onChangeAmount(value)}
                onSubmitEditing={()=>this.time.focus()}
                
                maxLength={6}
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
                  
                }}
                ref={(input)=>this.time=input}
                placeholder="Enter Time:"
                value={this.state.Time}
                onChangeText={(value)=>this.onSetTime(value)}
                returnKeyType='next'
                />
                <Button
                style={{fontSize:18, color:'white'}}
                containerStyle={{
                    padding:8,
                    marginLeft:70,
                    marginRight:70,
                    height:40,
                    borderRadius:6,
                    backgroundColor:'mediumseagreen',
                    marginBottom:10
                }}
                onPress={()=>{
                    if(this.state.TaskDesc.length == 0 || this.state.Tasklocation.length==0 || 
                        this.state.Amount.length ==0
                    || this.state.Time.length == 0){
                        alert('you must enter task details');
                        return;
                    }
                  ///___***UPDATE EXISTING TASK___****///
                //   var foundIndex= flatListData.findIndex(item => this.state.key == item.key);
                //     if (foundIndex < 0){
                //         return;//not found
                //     }
                //    flatListData[foundIndex].description=this.state.TaskDesc;
                //    flatListData[foundIndex].location=this.state.Tasklocation;
                //    flatListData[foundIndex].amount=this.state.Amount;
                //    flatListData[foundIndex].time=this.state.time;


                    // let params = {
                    //         task_id: this.state.key,
                    //         TaskDesc:this.state.TaskDesc,
                    //         Tasklocation:this.state.Tasklocation,
                    //         Amount:this.state.Amount,
                    //         Time:this.state.Time
                    //     };
                    //     updateTasks(params).then((result) => {                            
                    //         console.log(`this.state.flatlistItem = ${this.state.flatlistItem}`);
                    //         if (result === 'ok') {
                    //             this.state.flatlistItem.refreshFlatListItem({
                    //                 _id: this.state.key,
                    //                 TaskDesc:this.state.TaskDesc,
                    //                 Tasklocation:this.state.Tasklocation,
                    //                 Amount:this.state.Amount,
                    //                 Time:this.state.Time

                    //             });       
                    //             this.refs.myModal.close();                          
                    //         }
                    //     }).catch((error) => {                            
                    //         console.log(`error = ${error}`);   
                    //         this.refs.myModal.close();                          
                    //     });


                  this.state.flatListItem.refreshFlatListItem();//refresh flatlist item

                   this.refs.myModal.close();//close modal on submit
                }}
                >
                    Save
                </Button>
            </Modal>
        );
    }
}