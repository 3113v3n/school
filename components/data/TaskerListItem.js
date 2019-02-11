import React, {Component} from 'react';
import { ExpoConfigView } from '@expo/samples';
import{View,
       Text,
      StyleSheet,
      Image,
    Alert,
    Icon
   } from 'react-native';
import Swipeout from 'react-native-swipeout';

export default class TaskerListItem extends Component{
  
        constructor(props){
          super(props);
          this.state={
            activeRowKey: null,
            numberOfRefresh:0,
            u_id:'',//from dropdown
            
            post:''
          };
        }

        refreshFlatListItem=()=>{
          this.setState((prevState)=>{
            return{
              numberOfRefresh: prevState.numberOfRefresh + 1
              
            };
          });
        }

        
        render() {
    
          const swipeSettings={
            
                autoClose:true,
                onClose:(secId, rowId, direction)=>{
                    if (this.state.activeRowKey != null){
                      this.setState({activeRowKey:null});
                    }
                },
                onOpen:(secId, rowId, direction)=>{
                    this.setState({activeRowKey: this.props.item.key});
                    
    
                },
                right:[
                 
                  {
                    onPress:()=>{
                  
                   {alert('Tasker Booked!!!')}
                  
                    },
                  
                    text:'BOOK ME', type:'primary',
                  }
        
                ],
               
                rowId: this.props.index,
                sectionId:1
          };
          return(

           
            <Swipeout {...swipeSettings} style={{elevation:3, marginRight:5}}>
    
              <View style={{flexDirection:'column',
            flex:1}}>
    
                <View style={{flex:1,
                marginTop:2,
               // marginRight:10,
                marginLeft:10,
              flexDirection:'row',
              elevation:3,
              shadowOpacity:1,
              shadowColor:'gray',
            
              backgroundColor:'white' 
             }}>
            <Image
              source={require('../../assets/images/gawahelp.png')}
              style={{width:80, height:80, margin:2}}
              >
              </Image>
              <View style={{
                marginLeft:2
              }}>

              <Text style={[styles.flatListItem,styles.fontSize]}>
               {this.props.item.fname} {this.props.item.lname}</Text>
                <Text style={styles.flatListItem}>location : {this.props.item.location}</Text>
                
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
    flexWrap: 'wrap',
    paddingVertical:5
  },
  fontSize:{
    fontWeight:'bold',
    flexWrap:'wrap',
    flexGrow: 1,
    flex:1
  }
});