import React,{Component} from 'react';
import {ScrollView,View,Text,Button,StyleSheet,Alert,AsyncStorage} from 'react-native';
import {Tile,List,ListItem} from 'react-native-elements';
import {_claimTask} from '../networking/server';
import ClockTimer from '../components/AppComponents/ClockTimer'
class TaskDetails extends Component{
    getNatID=async ()=>{
        myID= await AsyncStorage.getItem('NatID');
        return myID
      }
    render(){
        const{task_name,description,amount,location,post_id,end_date}=this.props.navigation.state.params;
    return(
        <ScrollView>
            <Tile
            imageSrc={ 
            task_name==='general cleaning' ? require('../assets/images/home_cleaning.jpg'):
             task_name ==='delivery'? require('../assets/images/deliveryServices.jpg'):
            task_name==='baby sitting' ? require('../assets/images/baby.jpg'):
            task_name==='laundry' ? require('../assets/images/laundryIcon.jpg'):
            task_name==='movers' ? require('../assets/images/moving.jpeg'):
            require('../assets/images/Plumbing.jpg')} 
            featured
            title={`${task_name.toUpperCase()}`}
            caption={location}
            />
            <List>
                <ListItem
                title="Time Remaining"
                rightTitle={<ClockTimer deadline={end_date}/>}//display timer
                hideChevron
                />
                <ListItem
                title={"Amount"}
                rightTitle={amount}
                rightTitleStyle={{fontWeight:'bold'}}
                hideChevron
                />

                <ListItem
                title={"description"}
               titleStyle={{fontWeight:'bold'}}
               subtitle={
                   <View style={styles.subtitleView}>
                      <Text>{description}</Text> 
                      <Button style={{backgroundColor:'#b71540',color:'#ffffff',fontWeight:'bold'}} 
               color='#b71540'
                buttonStyle={styles.button}
               onPress={()=>{
                   {
                   let task={}
                   task.post_id=post_id
                   task.nat_id=myID
                   _claimTask(task).then((status)=>{
                       if(status==0){
                           Alert.alert('task claimed');
                
                   }
                }
            )
           // Alert.alert('task claimed');
                }
          
           
           }}
               containerStyle={{ marginTop: 20 }}
               title='Bid'/>
                   </View>
               }
                hideChevron
                />
            </List>
        </ScrollView>
    )
    }
}
export default TaskDetails;
const styles = StyleSheet.create({
    subtitleView:{
        flexDirection: 'column',
        paddingLeft: 10,
        paddingTop: 5
    },
    subtitleView1:{
       // flex:1,
    backgroundColor:'white',//'#000',
    justifyContent:'center',
    alignItems:'center'
    },
    button:{
        backgroundColor: "#b71540",
        width: 300,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
      }
})