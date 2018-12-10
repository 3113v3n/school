import React from 'react';
import { StyleSheet 
  ,View, Text,
   TouchableOpacity,
   Image,
AsyncStorage,Button} from 'react-native';
import {Icon} from 'native-base';

import TabBarIcon from '../components/TabBarIcon';
import {getUsername} from '../networking/server';
import {userPostCount} from '../networking/server';
const apiGetUsername='https://gawatask-app.herokuapp.com/get-user.php';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header:'none'
  };
  constructor(props){
    super(props);
    this.state={
      uname:'',
      u_id:'',
      count:''
    }
  }
  componentWillMount(){
    this.subscribeToUsername = this.uname();
    this.suscribeToCount = this.count();
  }
componentWillUnmount(){
  this._subscribeToUsername 
  this._suscribeToCount


}
count(){
  this.getID().then((ID)=>{
    let user={}
    user.userId=ID
      userPostCount(user).then((result)=>{
         this.setState({
           count:result
         })
       })
  })
}

 SignMeOut = async()=>{
   try{
   
    await AsyncStorage.removeItem('userToken')
     this.getID();
     this.nav();
  
    
   }catch(error){
    console.log('error clearing userID and Token'+error)
   }
 
 }

 nav=()=>{
        
  this.props.navigation.navigate(' login');
}
 
  getID=async ()=>{
     const ID = await AsyncStorage.getItem('userToken')
    return ID;
  }
 
 
 

  uname=()=>{

    this.getID()
    .then((ID)=>{
      console.log('your profile is => '+ID )
      let user={}
      user.u_id=ID
      console.log(user);

      getUsername(user).then((uname)=>{

        this.setState({
          uname:uname
        })
         console.log( ' username is ' +this.state.uname);
       });
     
    });

 
  
  }
  render() {
  
    return (
      <View style={styles.container}>

      <View style={styles.top}>

        <View style={styles.profileimage}>
        <Image
        style={styles.image}
        source={require('../assets/images/if_Account_Audience_person_customer_profile_user_1886036.png')}//if_user_5_6712 
        
        />
        </View>
        <Text style={styles.uname}>{this.state.uname}</Text>
        <Text style={styles.pos}>User</Text>
      </View>

      
        <View style={styles.bottom}>
          
          <View style={styles.bottomItem}>
          <View style={styles.bottomItemInner}>
         
           <View style={styles.bar}>
          <View style={[styles.barItem, styles.barseparator]}>

                <Text style={styles.barTop}> {this.state.count}</Text>
                <Text  style={styles.barBottom}> Job Post</Text>
          </View>

           <View style={[styles.barItem, styles.barseparator]}>
                 <TouchableOpacity>
                        <TabBarIcon
                          name='md-star'
                          color={'#ffd700'}
                        />
                      
                   </TouchableOpacity >
                   <Text style={styles.barBottom}>stars</Text>
           </View>

           </View>
          </View>

          </View>
       
        </View>
        <View style={styles.button}>
       
        <Button
        title='DELETE ACCOUNT'
        onPress={()=>this.SignMeOut()}
        />
        </View>
       

    </View>
            
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // backgroundColor:'lightgray'
    
    
  },
  button:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  top:{
    height:'55%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0394c0',
    padding:8,
    width:'97%',
    marginLeft: 5,
    
  },
  profileimage:{
    width:140,
    height:140,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor:'#eee',
  },
  
  
  bottom:{
    height:'15%',
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    flexWrap:'wrap',//items can overflow into the next line
    padding:5,
  },
  bottomItem:{
    width:'100%',
    height:'100%',
    //padding:5,
  },
  bottomItemInner:{
    flex:1,
    backgroundColor:'#fff',//#878A96',
    elevation:3,
    shadowColor: 'black',
    shadowOpacity: 2,
    alignItems: 'center',
    justifyContent:'center'
  },
  image:{
    flex:1,
    width:null,
    alignSelf: 'auto',
    borderRadius: 100,
    borderColor: '#fff',
    //borderWidth:4
   
  },
  uname:{
    marginTop:5,
    fontSize: 18,
    color:'#000000',
    fontWeight: 'bold',
  },
  pos:{
    marginTop:5,
    fontSize:14,
    color:'#fff',
    fontStyle: 'italic',
  },
  bar:{
    borderTopColor: '#fff',
    borderBottomColor: '#fff',
    borderLeftColor: '#fff',
    borderTopWidth: 2,
    flex:1,
    backgroundColor:"#ec2e4a",
    flexDirection:'row',
    justifyContent:'space-between',
    
  },
  barItem:{
    flex:1,
    alignItems: 'center',
    //padding:20
    
  },
  barseparator:{
    borderRightWidth: 2,
    
    
  },
  barTop:{
    color:'#fff',
    fontSize:16,
    fontWeight:'bold',
    fontStyle:'italic'
  },
  barBottom:{
    color:'#000',
    fontSize:14,
    fontWeight:'bold',
    marginTop: 5,
  }
});


