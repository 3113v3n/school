import React from 'react';
import {
  Image,StyleSheet,Text,TouchableOpacity,
  View,TextInput,KeyboardAvoidingView,
  StatusBar,AsyncStorage
} from 'react-native';

import * as Animatable from 'react-native-animatable'
import {registerUsers} from '../networking/server';
import Icon from 'react-native-vector-icons/FontAwesome';


//const USER_ID = 'user_id';
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

 
  constructor(props){
    super(props);
    this.state={
      placeholderText:'Enter phone number',
      mob:'',
      username:'',
      id:''
    }
}

setValue=(text,field)=>{
  if (field=='mob'){
    this.setState({mob: text});
    
  }
  else
   if(field=='username'){
    this.setState({username:text});
  }
 
}
validateMob=()=>{
  var reGex=/^(2547[0-9]{8})$/
  var ValidatedMob = this.state.mob
  return reGex.test(ValidatedMob);
}

storeID=async(user_id)=>{
  try{
    await AsyncStorage.setItem('userToken',user_id);
  
    this.getID();
  }catch(error){
    console.log("error storing ID");
  }
}

storeUserID=async(user_id)=>{
  try{
    await AsyncStorage.setItem('userID',user_id);
  
    this.getUserID();
  }catch(error){
    console.log("error storing ID");
  }
}
getUserID=async ()=>{
  try{
    let ID = await AsyncStorage.getItem('userID');
    this.setState({id:ID})
    console.log('your get id =>'+ID);
    return JSON.parse(ID); ///
  }catch(error){
    console.log('error fetching id')
  }
}

getID=async ()=>{
  try{
    let ID = await AsyncStorage.getItem('userToken');
    this.setState({id:ID})
    console.log('your  user get id =>'+ID);
    return JSON.parse(ID); ///
  }catch(error){
    console.log('error fetching id')
  }
}

submitUsers(){
  let user={}
  user.mob=this.state.mob,
  user.username=this.state.username
 user.id=this.state.id
  if(!this.validateMob(this.state.mob)){
    alert('you must start your number with 2547******')
  }else{
    
    registerUsers(user).then((userId)=>{
     let user_id = userId;
     this.storeID(user_id);
     console.log('your id returned ' +user_id+ 'from database');
     this.props.navigation.navigate('UserScreen',{id:user_id});
  })
  .catch(()=>{
    alert('Details already exist')
   })

  
// let user_id = this.state.id;
//     this.storeID(user_id);
//     console.log('your new id is ===' +user_id);
//     this.props.navigation.navigate('UserScreen',{id:user_id});
 }
}
submitGtasker(){
  let user={}
  user.mob=this.state.mob,
  user.username=this.state.username,
  user.id=this.state.id
  if(!this.validateMob(this.state.mob)){
    alert('you must start your number with 2547******')
  }else{
    registerUsers(user).then((userId)=>{
      let user_id = userId;
 this.storeUserID(user_id)
 this.setState({id:user_id})
      this.props.navigation.navigate('gtasker',user_id);
   })
   .catch(()=>{
    alert('Details already exist')
   })
//   let user_id = this.state.id;
//  this.storeUserID(user_id);
 
//   this.props.navigation.navigate('gtasker',{id:user_id});
}

  
}


  render() {
   
    return (
      
      <View behavior='padding' style={styles.container}>
      <StatusBar hidden={true}/>
      <KeyboardAvoidingView style={{flex:1}}>
      <View style={{flex:1}}>

        <View >
      <Image source={require('../assets/images/Map_Carbon.jpg')} style={{width:100+'%',height:100+'%',}}/></View>
          <View style={{position:'absolute',width:100+'%',height:100+'%',zIndex:10,backgroundColor:'#000000',opacity:0.3,alignItems:'center'}}>
              
          </View>
    

      <View style={{position:'absolute',width:100+'%',height:100+'%',zIndex:10,alignItems:'center'}}>

                <Animatable.View 
                  animation="zoomIn" iterationCount={1}
                  style={{//backgroundColor:"white",
                  height:100, width:100,alignItems:'center',
                  borderRadius:50,
                justifyContent:'center'}}>
                      <Image
                          source={
                            __DEV__
                              ? require('../assets/images/gawa.jpg')
                              : require('../assets/images/gawa.jpg')
                          }
                          style={styles.welcomeImage}
                      />
                      <Text style={{fontWeight:'bold',
                      fontSize:26,
                    alignItems:'center'}}
                      > </Text>
                  </Animatable.View>
      <View style={{ alignItems:'center',padding:10,justifyContent:'flex-end',flexGrow:1,width:100+'%',marginBottom:20  }}>


       

        <TextInput style={styles.inputBox}
          underlineColorAndroid='transparent'
              placeholder="Enter username"
              keyboardType="email-address"
              blurOnSubmit={true}
              autoCorrect={false}
              clearButtonMode='while-editing'
              placeholderTextColor="#ffffff"
              enablesReturnKeyAutomatically={true}
            onChangeText={(text)=>this.setValue(text,'username')}
            maxLength={50}
            returnKeyType='next'
            onSubmitEditing={()=>this._number.focus()}
           />
         

              <TextInput 
                    ref={(input)=>this._number=input}//keyboard to pop up on click
                    style={styles.inputBox}
                    maxLength={12}
                    placeholder={this.state.placeholderText}
                    underlineColorAndroid='transparent'
                    keyboardType='email-address'
                    placeholderTextColor="#ffffff"
                    onChangeText={(text)=>this.setValue(text,'mob')} 
                    value={this.state.mob}             
               />

               <TouchableOpacity style={styles.Signupbutton} 
               onPress={()=>{ this.submitUsers() }}>
              <Text  style={styles.buttonText}>Client</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Loginbutton} 
               onPress={()=>{ this.submitGtasker() }}>
              <Text  style={styles.buttonText}>FreeLancer</Text>
            </TouchableOpacity>

          </View>  
          </View>
             
            </View>

     
      </KeyboardAvoidingView>
          </View>
    );
  }
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#44485A',
    padding:0
    
  },
 
inputBox1:{
 flex:1,
  

},
inputBox2:{
width:"100%"
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
  },
  Loginbutton:{
    backgroundColor:'#0f9154',
    paddingVertical:15,
     width:90+'%',
     margin:15,
},
Signupbutton:{
  backgroundColor:'#2A6BAC',
  paddingVertical:15,
   width:90+'%',
   margin:15,
},
buttonText:{
  textAlign:'center',
  color:'#ffffff',
  fontWeight:'bold',
  fontSize:16,
 
},
welcomeImage: {
  width: 80,
  height: 80,
  resizeMode: 'contain',
  marginTop: 15,
  marginLeft: -10,
  alignItems:'center',
  paddingTop:20,
  borderRadius:40
},

});

//AppRegistry.registerComponent('gawaTask',()=>HomeScreen);
