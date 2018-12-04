import React, { Component } from 'react';
import{ Text, View, Image, Alert,
         Dimensions,Button,ScrollView,StyleSheet,Platform
  } from 'react-native';


import Modal from 'react-native-modalbox';
 import { KeyboardAvoidingView } from 'react-native';
import {Right,Card,CardItem, Item} from 'native-base';
const { width } = Dimensions.get('window');
import {_claimTask} from '../../networking/server';



 class TaskModal extends Component{
     constructor(props){
         super(props);
         
           
     }
    
    showModal=()=>{
        this.refs.details.open()
        console.log('opening')
        }
    
  
  render(){
      return(
        <KeyboardAvoidingView>
        <Modal 
      onClosed={()=>{
          alert("Modal closed")
      }}
         style={styles.modal}
         ref={'details'}
        
         backdropPressToClose={true}
         >
        
     <View style={{ flex: 1,alignItems:'flex-end' }}>
  
     <ScrollView>
                       
               <CardItem style={{height:200,width:100+'%'}}>
               <Image style={{width:100,height:80+'%',borderRadius:4}} source={require('../../assets/images/Johnny.jpg')}/>
               <Right style={{flex:1,alignItems:'flex-start',height:200,padding:20}}>
                   <Text style={{fontWeight:'bold',fontSize:16}}>Job</Text>
                   <Text >name:</Text>
                   <Text style={{color:'gray'}}>location:</Text>
                   <Text style={{color:'gray'}}>amount:</Text>
                   <Text style={{color:'gray'}}>Start Date: </Text>
               </Right>
               </CardItem>
           
               <View style={{alignItems:'flex-start',justifyContent:'flex-start',padding:10,paddingTop:5}}>

                   <Text style={{fontWeight:'bold'}}>About Task</Text>
                   <Text> i need my job description written here........</Text>
                  
               </View>
     </ScrollView>

               <View style={{width:width}}>
               <View style={{height:50,padding:5}}>
        
                <Text style={{fontWeight:'bold',color:'red'}}></Text></View>
                
           
               <View style={{width:250,height:50,padding:10,position:'absolute',right:0,alignItems:'flex-end'}}>
             
           <Button style={{backgroundColor:'#b71540',color:'#ffffff',fontWeight:'bold'}} 
               color='#b71540'
                buttonStyle={{
                 backgroundColor: "#b71540",
                 width: 300,
                 height: 45,
                 borderColor: "transparent",
                 borderWidth: 0,
                 borderRadius: 5
               }}
               onPress={()=>{
                //    {
                //    let task={}
                //    task.post_id=this.state.post_id
                //    task.nat_id=this.state.idNumber
                //    _claimTask(task).then((status)=>{
                //        if(status==0){
                //            Alert.alert('task claimed');
                //       this.refs.details.close()}
                //    })}
                this.refs.details.close() ;
           
           }}
               containerStyle={{ marginTop: 20 }}
               title='Bid'/>

              </View>
             </View>

     </View>
  
   </Modal>
   </KeyboardAvoidingView>
      )
  }
}
export default TaskModal;
const styles=StyleSheet.create({
    
    modal: {
        margin: 0, 
        backgroundColor: 'white', 
        height:350,
        flex:0 , 
        bottom: 0, 
        position: 'absolute',//absolute
        width: '100%'
      },
      modal2:{
          justifyContent:'center',
          borderRadius: Platform.OS === 'ios' ? 30:0,
          shadowRadius:5,
          width:width-80,
          height:300
      },
      card:{
        
        width:width * 0.48,
        height:width * 0.68,
        elevation   : 4,
        borderRadius:8,
        overflow:"hidden",
    },
})