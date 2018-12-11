import React, { Component } from 'react';
import { Text, StyleSheet, View} from 'react-native';

import MapView from 'react-native-maps';

export default class Maps extends Component{

   render(){
       return(
        <View style={styles.container}>
        <MapView
        style={styles.map}
        initialRegion={{
            latitude: -1.2312,
            longitude: 36.8840,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
        <MapView.marker 
        coordinate={{
            latitude:-1.2312,
            longitude:36.8840,
        }}>
        <View style={styles.radius}>
            <View style={styles.marker}/>
        </View>
            
        </MapView.marker>
        </MapView>

        </View>
       );
   }
}
 const styles= StyleSheet.create({
     container:{
         flex:1,
      justifyContent:'center',
         alignItems:'center'
     },
     map:{
         left:0,
         right:0,
         top:0,
         bottom:0,
         position:'absolute'
     },
     radius:{
        height:50,
        width:50,
        borderRadius: 50 /2,
        overflow:'hidden',
        backgroundColor:'rgba(0,122,255,0.1)',
        borderWidth:1,
        borderColor:'rgba(0,122,255,0.3)',
        alignItems:'center',
        justifyContent:'center'
     },
     marker:{
        height:20,
        width:20,
        borderWidth:3,
        borderColor:'white',
        borderRadius:20 / 2,
        overflow:'hidden',
        backgroundColor:'#007AFF'
     }
 })