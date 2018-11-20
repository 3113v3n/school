import React from 'react';
import {MapView, Constants,Location,Permissions} from 'expo';

export default class Mapview extends React.Component{
    state={
        location:null,
        errormessage:null
    }

    
//get Location Permissions
  getLocationAsync=async()=>{
   // const {Location, Permission}=Expo;
    const {status} = await Permissions.askAsync(Permissions.LOCATION);
    if (status==='granted'){
        let location= await Location.getCurrentPositionAsync({enableHighAccuracy:true});
        this.setState({location});
    }else{
        this.setState({
            errormessage:'Location permission Denied!'
        })
       
    }
};
    render(){
        let text='waiting..';
        if (this.state.errormessage){
            text=this.state.errormessage;
        }else if(this.state.location){
            text=JSon.stringify(this.state.location);
        }
        return(
            
            <MapView
            style={{flex:1}}
            initialRegion={{
          latitude: -1.2312,
          longitude: 36.8840,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        />
      );
        
    }
}