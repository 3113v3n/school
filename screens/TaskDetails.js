import React,{Component} from 'react';
import {ScrollView} from 'react-native';
import {Tile,List,ListItem} from 'react-native-elements';
import { View, } from 'native-base';

class TaskDetails extends Component{
   
    render(){
        const{task_name,description,amount,location}=this.props.navigation.state.params;
    return(
        <ScrollView>
            <Tile
            imageSrc={require('../assets/images/Johnny.jpg')}
            featured
            title={`${task_name.toUpperCase()}`}
            caption={location}
            />
            <List>
                <ListItem
                title="location"
                rightTitle={location}
                hideChevron
                />
                <ListItem
                title={"Amount"}
                rightTitle={amount}
                hideChevron
                />
                <ListItem
                title={"description"}
               subtitle={
                   <View style={{
                       flexDirection: 'column',
                   paddingLeft: 10,
                   paddingTop: 5}}>
                       {description}
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