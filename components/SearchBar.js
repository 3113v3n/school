import React, { Component } from 'react';
import {View, TouchableOpacity,Button, TextInput} from 'react-native';
import {Icon} from 'native-base';
import {connect} from 'react-redux';


export default class searchBar extends Component{
    constructor(props){
        super(props);
        this.state=({
       
          text:''
        });
    }

    search(text){
        //alert('searching')
        this.setState({text: text});
      }
    ItemSearchHandler = () =>{
        this.props._onPressSearch(text);
    };
    render(){
        return(
        
             <View style={{flexDirection:'row',
            flex:1,
             marginRight:10,
            marginTop:5,
           
             
             
             }}>
             <View style={{ flex:1,}}>
             <TextInput style={{textAlign:'center',
            height:30,
             backgroundColor:'#fff',
             marginRight:10,
             color:'black',
             borderColor:'black',
             marginBottom:15,
             
             borderRadius:5
             }}
             underlineColorAndroid='rgba(0,0,0,0)'
             placeholder='search bar'
             onChangeText={(text)=>this.search(text)} 
             value={this.state.text}
             placeholderTextColor='black'/>
             </View>


             <View >
             <TouchableOpacity
                 style={{ paddingBottom:'20%'}}
                 onPress={()=>this.props._onPressSearch(this.state.text)}
                //onPress={()=>this.props._onPressSearch}
                 justifyContent='flex-end' >
                 
           <Icon name="md-search"/>
      
           </TouchableOpacity>
             </View>
           
           </View> 
       
            
     
        );
    }
}

