import React, { Component } from 'react';
import{ StyleSheet, Text, View, 
         Dimensions,
         TouchableOpacity,
        TextInput,
    Animated,
    KeyboardAvoidingView,
    Picker,
    StatusBar,
    Image,
    AsyncStorage,
    Platform,
Alert,ScrollView} from 'react-native';

import Button from 'react-native-button';
import {Icon} from 'native-base';

import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {AddNewTask} from '../networking/server';

var screen = Dimensions.get('window');


 export default class AddComponent extends Component{
    constructor(props){
        super(props);
        this.state={
         u_id:'45',
          newTaskDesc:"",
          newAmount:"",
          newLocation:"",
          start_date:"",
          end_date:"",
          PickerIndex:[],
          isVisible:false,
          chosenStartDate:moment().format("YYYY-MM-DD hh:mm:ss"),//YYYY-MMMM-Do HH:mm
          chosenEndDate:''
          
         
        }
    }
    componentWillMount(){
        this.fetchID = true;
        if(this.fetchID){
            this.subscribeToID =this.getID();
        } //_-REMOVE
    }
    componentWillUnmount(){
        this.fetchID = false
    }

    _handleEndDatePicked=(datetime)=>{
        this.setState({
            isVisible:false,
            chosenEndDate:moment(datetime).format('YYYY-MM-DD hh:mm:ss')
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
   
    getID=async ()=>{
        const ID = await AsyncStorage.getItem('userToken')
        console.log(ID)
        this.setState({
            u_id:ID
        })
       
     }
       
    setTaskValues=(text,field)=>{
        if(field=='newTaskDesc'){
            this.setState({
                newTaskDesc:text
            })
        }else if(
            field=='newLocation'
        ){
            this.setState({
                newLocation:text
            })
        }else if(field=='newAmount'){
            this.setState({newAmount:text})
        }else if (field=='start_date'){
            this.setState({start_date:text})
        }else if (field=='end_date'){
            this.setState({end_date:text})
        }

    }
    onSave(){
        var data = this.state.PickerIndex;
        if (this.state.newTaskDesc.length == 0 || this.state.newLocation.length == 0 ||
        this.state.newAmount.length == 0 || this.state.chosenEndDate.length == 0){
            alert("PLEASE FILL ALL FIELDS"); //no submision on empty fields
        } else if (
            data=="" && this.state.newTaskDesc.length != 0 && this.state.newLocation.length != 0 &&
            this.state.newAmount.length != 0 && this.state.chosenEndDate.length != 0
                
        ){
                alert("CLICK ON DROP DOWN AND SELECT SERVICE TYPE ");
        } 
        else if (
            data!="" && this.state.newTaskDesc.length != 0 && this.state.newLocation.length != 0 &&
            this.state.newAmount.length != 0 && this.state.chosenEndDate.length != 0
                
        ){ 
            let tasks={}
        tasks.userId=this.state.u_id,
        tasks.taskId=this.state.PickerIndex,
        tasks.description=this.state.newTaskDesc,
        tasks.location=this.state.newLocation,
        tasks.amount=this.state.newAmount,
        tasks.startDate=this.state.chosenStartDate,
        tasks.endDate=this.state.chosenEndDate,
       
       AddNewTask(tasks).then((status)=>{
            
               if(status==0){
                  //clear Text field here
                this.nav();
               }
           
       }) }
    }
   
    nav(){
        this.componentWillUnmount()
       this.props.navigation.navigate('userscreen');
    }
    render(){
        setTimeout(()=>{
            this.setState({
                chosenStartDate:moment().format("YYYY-MM-DD hh:mm:ss"),
            
            })
        },1000)
        
        return(
            <View behavior='padding' style={{flex:1,padding:0}}>
            <StatusBar hidden={true}/>
            <KeyboardAvoidingView style={{flex:1}}>
                <View style={{flex:1}}>

                     <Animated.View style={styles.animate}>
            <TouchableOpacity  >
                        <Icon name="md-arrow-back"
                        style={{color:'#353662', }}
                        onPress={()=>this.nav()}
                        />
            </TouchableOpacity>
            </Animated.View>
            
                <View  style={{position:'absolute',width:100+'%',height:100+'%',zIndex:10,alignItems:'center'}}>
                <View style={{alignItems:'center',padding:10,justifyContent:'flex-end',flexGrow:1,width:100+'%',marginBottom:20}}>
               
                <Picker
                        style={{width:'80%',height:'10%'}}
                        selectedValue={this.state.PickerValue}
                        onValueChange={(ItemValue,itemIndex)=>
                            this.setState({PickerValue:ItemValue, PickerIndex:itemIndex})}
                        >
                        <Picker.Item label="SELECT SERVICE TYPE ==>" value="" />
                        <Picker.Item label ='Laundry' value='laundry'/>
                        <Picker.Item label ='Delivery' value='delivery'/>
                        <Picker.Item label ='Movers' value='movers'/>
                        <Picker.Item label ='Plumbing' value='plumbing'/>
                        <Picker.Item label ='Baby Sitting' value='baby sitting'/>
                        <Picker.Item label ='General Cleaning' value='general cleaning'/>
                    </Picker>
                   

                <TextInput style={styles.inputBox}
                autoCorrect={false}
                underlineColorAndroid='transparent'
               onSubmitEditing={()=>this._location.focus()}
                keyboardType="email-address"
                placeholder="*Enter task description:"
                multiline={true}
                onChangeText={(text)=>this.setTaskValues(text,'newTaskDesc')}
                returnKeyType='next'
                blurOnSubmit={true}
                clearButtonMode='while-editing'
                placeholderTextColor="#000000"
                enablesReturnKeyAutomatically={true}
                maxLength={250}
                editable={true}
                />
              
              <TextInput style={styles.inputBox}
                autoCorrect={false}
                underlineColorAndroid='transparent'
                onSubmitEditing={()=>this.amount.focus()}
                keyboardType="email-address"
                placeholder=" *task Location:"
                ref={(input)=>this._location=input}
                onChangeText={(text)=>this.setTaskValues(text,'newLocation')}
                returnKeyType='next'
                blurOnSubmit={true}
                clearButtonMode='while-editing'
                placeholderTextColor="#000000"
                enablesReturnKeyAutomatically={true}
                maxLength={250}
                />

                    
              <TextInput style={styles.inputBox}

                underliclearButtonMode='while-editing'neColorAndroid='transparent'
                autoCorrect={false}
                keyboardType="email-address"
                placeholder=" *Amount:"
                ref={(input)=>this.amount=input}
                onChangeText={(text)=>this.setTaskValues(text,'newAmount')}
                returnKeyType='next'
                blurOnSubmit={true}
                clearButtonMode='while-editing'
                placeholderTextColor="#000000"
                enablesReturnKeyAutomatically={true}
                maxLength={250}
             
                />
                
                  <Text style={{
                 color:'red',fontSize:15
             }}>
                {this.state.chosenEndDate}</Text>

                <TouchableOpacity style={styles.button} onPress={this._showPicker}>
                 <Text style={styles.text}>Set Deadline</Text>
             </TouchableOpacity>
             <DateTimePicker
                 isVisible={this.state.isVisible}
                 onConfirm={this._handleEndDatePicked}
                 onCancel={this._hideDateTimePicked}
                 mode={'datetime'}
                 is24Hour={true}
                 />
               
   
                <TouchableOpacity style={styles.Loginbutton} 
               onPress={()=>{ this.onSave() }}>
              <Text  style={styles.buttonText}>Post Task</Text>
            </TouchableOpacity>

                </View>
                </View>

                </View>
    
                </KeyboardAvoidingView>
          </View>
        );
    }
}
const styles= StyleSheet.create({
    container:{
        alignItems: 'center',
        backgroundColor: '#44485A',
    },
    buttonText:{
        textAlign:'center',
        color:'#ffffff',
        fontWeight:'bold',
        fontSize:16,
       
      },
      Loginbutton:{
        backgroundColor:'#0f9154',
        paddingVertical:15,
         width:90+'%',
         margin:15,
    },
    
    inputBox:{
        width: '90%',
        backgroundColor:'#979A9A',
       height:50,
        paddingHorizontal: 20,
        fontSize: 16,
        color:'#000000',
       margin:15,
       opacity:0.9
       
      
      },
      animate:{
        
            position:'absolute',
             height:60,width:60,
             right:10,
             zIndex:100,
             backgroundColor:'mediumseagreen',
             alignItems:'center',
             justifyContent:'center',
             borderRadius:30,
             marginTop: 200,
           
      },
      button:{
        width:'90%',
        height:50,
        backgroundColor:'#979A9A',
        //borderRadius:30,
       // justifyContent:'center',
        marginTop:15
    },
    text:{
        fontSize:16,
        color:'black',
        textAlign:'center'
    }
    });
