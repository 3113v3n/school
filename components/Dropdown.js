import React, { Component } from 'react';
import {StyleSheet, Platform,
    KeyboardAvoidingView,Text,StatusBar,TextInput,
     View, Button, Picker,AsyncStorage} from 'react-native';
import {registerGtasker}from '../networking/server';




export default class Dropdown extends Component{
    constructor(props){
        super(props);
        this.state={
           
            fname:'',
            lname:'',
            nat_id:'32570002',
            location:'',
            u_id:'',
            skill_id:'',

        }
    }
    componentWillMount(){
this.fetchId= this.getID();
    }
    componentWillUnmount(){
this._fetchId
    }
loadScreen=async()=>{
    const NatID = await AsyncStorage.getItem('NatID')
    
    this.props.navigation.navigate(NatID? 'GtaskerScreen':'') 
}
getID=async ()=>{
    const ID = await AsyncStorage.getItem('userID')
   this.setState({u_id:ID})
 }

    storeNatID=async(nationalId)=>{
        try{
          await AsyncStorage.setItem('NatID',nationalId);
        console.log('nationalId was stored successfully')
        }catch(error){
          console.log("error storing ID");
        }
      }
    gtaskerDetail(text,field){
        if(field=='fname'){
            this.setState({fname:text});
        }else if (field=='lname'){
            this.setState({lname:text});
        }else if(field=='nat_id'){
            this.setState({nat_id:text})
        }else if(field=='location'){
            this.setState({location:text})
        }
    }
    Clickme=()=>{
        
        var data = this.state.PickerValue;
        if (this.state.fname.length == 0 || this.state.lname.length == 0 ||
        this.state.nat_id.length == 0 || this.state.location.length == 0){
            alert("PLEASE FILL ALL FIELDS"); //no submision on empty fields
        } else if (
            data=="" && this.state.fname.length != 0 && this.state.lname.length != 0 &&
            this.state.nat_id.length != 0 && this.state.location.length != 0
                
        ){
                alert("SWIPE UP TO CHOOSE SKILL ");
        } 
        else if (
            data!="" && this.state.fname.length != 0 && this.state.lname.length != 0 &&
            this.state.nat_id.length != 0 && this.state.location.length != 0
                
        )
        {
           
       let gtasker={}
       gtasker.nat_id=this.state.nat_id,
       gtasker.fname=this.state.fname,
       gtasker.lname=this.state.lname, 
       gtasker.location=this.state.location,
       gtasker.u_id=this.state.u_id,
       gtasker.skill_id=this.state.skill_id,
       console.log(gtasker);
     
      if(!this.validateNatId(this.state.nat_id) && !this.validateUserDetail()){
          alert('enter Valid ID number');
      }else{
          
        registerGtasker(gtasker).then((nat_id)=>{
            this.setState({nat_id:nat_id});
             this.storeNatID(nat_id)
             this.loadScreen();
        })
         }
        }
        
    //    let gtasker={}
    //    gtasker.nat_id=this.state.nat_id,
    //    gtasker.fname=this.state.fname,
    //    gtasker.lname=this.state.lname, 
    //    gtasker.location=this.state.location,
    //    gtasker.u_id=this.state.u_id,
    //    gtasker.skill_id=this.state.skill_id,
    //    console.log(gtasker);
     
    //    //---------*******DELETE ******------//

    //   if(!this.validateNatId(this.state.nat_id) && !this.validateUserDetail()){
    //       alert('enter Valid ID number');
    //   }else{
    //     // registerGtasker(gtasker).then((nat_id)=>{
    //     //     this.setState({nationalId:nat_id});
    //     let nationalId = this.state.nat_id
    //     this.storeNatID(nationalId)
    //     //     this.loadScreen();
    //     // })
    //   this.loadScreen();
     // }
      }

    
    validateNatId=()=>{
        //!0 as first input but can be accepted after
        var regEx=/^[1-9][0-9]*$/           
        var ValidId=this.state.nat_id
        return regEx.test(ValidId);
    }
    validateUserDetail=()=>{
        //accept strings only
        var regex =/^[a-zA-Z]*$/
        let gtaskerDetail={}
       gtaskerDetail.fname=this.state.fname,
       gtaskerDetail.lname=this.state.lname, 
       gtaskerDetail.location=this.state.location
        return regex.test(gtaskerDetail);
    }

    nav=()=>{
        
        this.props.navigation.navigate(NatID?'GtaskerScreen':'')//send to claim function
    }
    render(){
        return(
           <View behavior='padding' style={styles.container}>
           <StatusBar hidden={true}/>
           <KeyboardAvoidingView style={{flex:1}}>
           <View style={{flex:1}}>
            <View style={{position:'absolute',width:100+'%',height:100+'%',zIndex:10,alignItems:'center'}}>
            <View style={{alignItems:'center',padding:10,justifyContent:'flex-start',flexGrow:1,width:100+'%',marginBottom:20}}>
               
            <Picker
           style={{width:'80%',height:'20%'}}
           selectedValue={this.state.PickerValue}
           onValueChange={(ItemValue,itemIndex)=>
            this.setState({PickerValue:ItemValue,skill_id:itemIndex})}
           >
           <Picker.Item label="Select your skill set" value="" />
           <Picker.Item label ='Laundry' value='laundry'/>
           <Picker.Item label ='Delivery' value='delivery'/>
           <Picker.Item label ='Movers' value='movers'/>
           <Picker.Item label ='Plumbing' value='plumbing'/>
           <Picker.Item label ='Baby Sitting' value='baby sitting'/>
           <Picker.Item label ='General Cleaning' value='general cleaning'/>
           </Picker>

               
                <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Enter first name"
                keyboardType="email-address"
                onSubmitEditing={()=>this.l_name.focus()}
                blurOnSubmit={true}
                clearButtonMode='while-editing'
                placeholderTextColor="#ffffff"
                enablesReturnKeyAutomatically={true}
                onChangeText={(text)=>this.gtaskerDetail(text,'fname')}
                value={this.state.fname}
                maxLength={50}
                returnKeyType='next'
                
                />

                <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Enter last name"
                keyboardType="email-address"
                ref={(input)=>this.l_name=input}
                onSubmitEditing={()=>this._location.focus()}
                blurOnSubmit={true}
                clearButtonMode='while-editing'
                placeholderTextColor="#ffffff"
                enablesReturnKeyAutomatically={true}
                maxLength={50}
                returnKeyType='next'
                onChangeText={(text)=>this.gtaskerDetail(text,'lname')}
                value={this.state.lname}
                
                />

                <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Enter your location"
                keyboardType="email-address"
                ref={(input)=>this._location=input}
                onSubmitEditing={()=>this.natId.focus()}
                blurOnSubmit={true}
                clearButtonMode='while-editing'
                placeholderTextColor="#ffffff"
                enablesReturnKeyAutomatically={true}
                maxLength={50}
                returnKeyType='next'
                onChangeText={(text)=>this.gtaskerDetail(text,'location')}
                value={this.state.location}
                
                />

                <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Enter your National ID"
                keyboardType="email-address"
                ref={(input)=>this.natId=input}
               
                blurOnSubmit={true}
                clearButtonMode='while-editing'
                placeholderTextColor="#ffffff"
                enablesReturnKeyAutomatically={true}
                maxLength={8}
                returnKeyType='next'
                onChangeText={(text)=>this.gtaskerDetail(text,'nat_id')}
                value={this.state.natId}
                />
            
            <Button title="SAVE DETAILS"
            
             onPress={()=>{
                
                 {this.Clickme()}
           }}/>
          
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
       padding:0,
        flex:1
        
    },
    inputBox:{
        width: '90%',
        backgroundColor:'#979A9A',//rgba(255,255,255,0.2)
       height:50,
        paddingHorizontal: 20,
        fontSize: 16,
        color:'#000000',
       margin:15,
       opacity:0.9
        //paddingVertical:20
      },
})