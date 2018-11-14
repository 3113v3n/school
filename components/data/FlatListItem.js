import React, {Component} from 'react';
import { ExpoConfigView } from '@expo/samples';
import{View,
       Text,
      StyleSheet,
      Image,
    Alert,
    AsyncStorage
   } from 'react-native';
import Swipeout from 'react-native-swipeout';
import {_claimTask} from '../../networking/server';


export default class FlatListItem extends Component{
  
        constructor(props){
          super(props);
          this.state={
            activeRowKey: null,
            numberOfRefresh:0,
            nat_id:'32572232',//from dropdown
            claimed:[],
            post:''
          };

        }
      
     componentWillMount(){
  this.getPostID();
     }
    getPostID() {
    let ID = this.props.item.post_id
    this.setState({
      post:ID
    })
  console.log(this.state.post)
    }
        refreshFlatListItem=()=>{
          this.setState((prevState)=>{
            return{
              numberOfRefresh: prevState.numberOfRefresh + 1
              
            };
          });
        }
        

        
        render() {
          let TaskName = this.props.item.task_name
          const swipeSettings={
            
                autoClose:true,
                onClose:(secId, rowId, direction)=>{
                    if (this.state.activeRowKey != null){
                      this.setState({activeRowKey:null});
                    }
                },
                onOpen:(secId, rowId, direction)=>{
                    this.setState({activeRowKey: this.props.item.key});
                    // this changes the active row key from null to key set in flatlistData.js
    
                },
                right:[
                 
                  {
                    //Claim BUTTON
                    
                    onPress:()=>{
                   /////-----------*******CLAIM tASK *********--------------////
                  
                   {
                     console.log(this.state.post)
                    let task={}
                    task.nat_id=this.state.nat_id,
                    task.post_id=this.state.post
                       _claimTask(task).then((status)=>{
                         if(status==0){
                           Alert.alert('task claimed');
                          // this.props.navigation.navigate('session');//navigation to session screen
                           return<View style={styles.itemInvisible}/>
                           
                         }
                       })
                   }
                   
                     
                    },
                    text:'Claim', type:'primary'
    
                  },
                 
                ],
                rowId: this.props.index,
                sectionId:1
          };
          return(

           
            <Swipeout {...swipeSettings} style={{elevation:3, marginRight:5}}>
    
              <View style={{flexDirection:'column',
            flex:1}}>
    
                <View style={{flex:1,
                marginTop:10,
               // marginRight:10,
                marginLeft:10,
              flexDirection:'row',
              elevation:3,
              shadowOpacity:1,
              shadowColor:'gray',
            
              backgroundColor:'white' 
             }}>
            <Image
            
            source={ TaskName ==='delivery'? require('../../assets/images/deliveryServices.jpg'):
            TaskName ==='Plumbing'? require('../../assets/images/Plumbing.jpg'):
            TaskName ==='Movers'? require('../../assets/images/moving.jpeg'):
            TaskName ==='baby sitting'? require('../../assets/images/baby.jpg'):
            TaskName ==='general cleaning'? require('../../assets/images/home_cleaning.jpg'):
           require('../../assets/images/laundryIcon.jpg')
          }
              style={{width:100, height:100, margin:2}}
              >
              </Image>
              <View style={{
                marginLeft:8
              }}>

               <Text style={[styles.flatListItem,styles.fontSize]}>
               {this.props.item.task_name}</Text>
               <Text style={styles.flatListItem}>
                 {this.props.item.description}
                </Text>

                <Text style={styles.flatListItem}>
                location : {this.props.item.location}
                </Text>
                <Text style={styles.flatListItem}>
                Amount : {this.props.item.amount}
                </Text>

                
                
              </View>
       
              </View>
             
            </View>
    
            </Swipeout>
           
            
          );
        }
      }
////-----------------********************------------FLATLIST PROPERTY----*************

const styles= StyleSheet.create({
 
  flatListItem:{
    color:'black',
    fontSize: 12,
   // flexWrap: 'wrap',
    paddingVertical:5
  },
  fontSize:{
    fontWeight:'bold',
    flexWrap:'wrap',
    flexGrow: 1,
    flex:1
  },
  itemInvisible:{
    backgroundColor:'transparent'
  }
});