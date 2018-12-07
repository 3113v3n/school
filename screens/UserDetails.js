import React,{Component} from 'react';
import {ScrollView,View,Text,Button,Alert} from 'react-native';
import {Tile,List,ListItem} from 'react-native-elements';

import StarRating from 'react-native-star-rating';

class UserDetails extends Component{
  
    render(){
        const{fname,lname,location}=this.props.navigation.state.params;
    return(
        <ScrollView>
            <Tile
            imageSrc={require('../assets/images/Johnny.jpg')}
            featured
            title={`${fname.toUpperCase()} ${lname.toUpperCase()}`}
            caption={location}
            />
            <List>
                <ListItem
                title="location"
                rightTitle={location.toUpperCase()}
                hideChevron
                />
                

                <ListItem
                title={"description"}
               titleStyle={{fontWeight:'bold'}}
               subtitle={
                   <View style={{
                       flexDirection: 'column',
                   paddingLeft: 10,
                   paddingTop: 5}}>
                      
                      <StarRating disabled={false} starSize={15} maxStars={5} rating={3} fullStarColor='#FFA500' emptyStarColor='#FFA500' />
                        <Text style={{color:'gray',bottom:2,fontSize:14}}>3 / 5 </Text>

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
                   {
         
            Alert.alert(fname, 'booked');
                }
          
           
           }}
               containerStyle={{ marginTop: 20 }}
               title='Book Me'/>
                   </View>
               }
                hideChevron
                />
            </List>
        </ScrollView>
    )
    }
}
export default UserDetails;