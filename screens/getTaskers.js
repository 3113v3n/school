
import React from 'react';
import { 
     FlatList,StyleSheet,View,Text,ActivityIndicator,RefreshControl,
    Image,ScrollView,Dimensions,Button } from 'react-native';

import _ from 'lodash';
import {SearchBar,List,ListItem} from "react-native-elements";

import { bold } from 'ansi-colors';
import Swipeable from 'react-native-swipeable';

const  apiGetUsers='https://gawatask-app.herokuapp.com/all-gtaskers.php';
const { width } = Dimensions.get('window');


 class getTaskers extends React.PureComponent {

    constructor(props){
        super(props);
        this.state={
            isLoading:true,
            dataSource:null,
            refreshing: false,
             UsersFromServer: [],
             filterText:'',

             show: false,
             touchable: null,
             isModalVisible:false,
        }
       this.arrayholder=[]
    } 
    componentWillMount(){
       isMounted= true ;
       if(isMounted=true){
           this.refreshDataFromServer()
          
       }else{
           console.log('error mounting')
       }
    }
    componentWillUnmount(){
      isMounted=false;
    }
           
    getAllUsers() {
        return fetch(apiGetUsers)//enter db url
        .then((response)=>response.json())
        .then((responseJson)=>{
           
            this.setState({
                isLoading:false,
               dataSource:responseJson,
               UsersFromServer:responseJson,
            });
            this.arrayholder= responseJson; 
        })
        .catch((error)=>{
            console.log(error)
        });
        
    }
    refreshDataFromServer = _.debounce(() => {
         this.setState({ refreshing: true, });
        this.getAllUsers().then(() => {
            
            this.setState({ refreshing: false });
        }).catch((error) => {
            this.setState({ UsersFromServer: [] });
            this.setState({ refreshing: false });
            console.log(error);
        });
    },250);
    onRefresh = () => {
        this.refreshDataFromServer();
    }
   

    setSearchText=filterText=>{
        const newData1 = this.arrayholder.filter(item=>{
            const itemData = `${item.fname.toUpperCase()} 
            ${item.lname.toUpperCase()} ${item.location.toUpperCase()}`;
 
            const textData = filterText.toUpperCase();
            return itemData.indexOf(textData) >-1;
        });
        this.setState({UsersFromServer:newData1});
     } ;


renderSeparator=()=>{
    return(
        <View
        style={{
            height:1,
            width:"86%",
            backgroundColor:'#CED0CE',
            marginLeft:"14%"
        }}/>
    );
}

handleItemPressed=(item)=>{
  
    console.log('you pressed me and I am relaying the following',item)
    this.props.navigation.navigate('UserDetails', {...item});
}


       renderHeader=()=>{
           return<SearchBar placeholder="Search user..." lightTheme round  
            onChangeText={(filterText)=>this.setSearchText(filterText)}  
           autoCorrect={false}
           />

       };
       renderFooter=()=>{
           if(!this.state.isLoading) return null;
           return(
               <View style={{paddingVertical:10,
               borderTopWidth:1,
               borderTopColor:'#CED0CE'}}>
                   <ActivityIndicator animating size="large"/>
               </View>
           )
       }
      
    render(){
        {  
            if(this.state.isLoading){
                return(
                    <View style={styles.container1}>
                    <View style={{marginTop:30,alignItems:"center"}}>
                        <Text style={{fontWeight:'bold',fontSize:16}}>
                            Getting all users-------->
                        </Text>
                    </View>
                        <ActivityIndicator />
                    </View>
                )
            }else{
                return (
                    <Swipeable>
                <List containerStyle={{borderTopWidth:0, borderBottomWidth:0}}>
                    <FlatList
                    data={this.state.UsersFromServer}
                    renderItem={({item, index})=>(
                        
                        
                        <ListItem item={item} index={index}
                      
                            roundAvatar
                            avatar={
                                <View style={{
                                    //flex:1,
                                    marginTop:2,
                                    marginLeft:10,
                                  flexDirection:'row',elevation:3,shadowOpacity:1,shadowColor:'gray', backgroundColor:'white' 
                                 }}>
                                    <Image
                                    source={require('../assets/images/Snoopy.jpg')}
                                    style={{width:80, height:80, borderRadius:40}}
                                    />
                                </View>
                            }
                           title={`${item.fname} ${item.lname}` }
                           titleStyle={{fontWeight:'bold'}}
                           subtitle={item.location}
                            containerStyle={{borderBottomWidth:0}}
                            onPress={()=>this.handleItemPressed(item) }
                           hideChevron
                           
                        />
                       
                       
                    )}
                    
                    keyExtractor={(item) => item.location}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}       
                            onRefresh={this.onRefresh}
                        />
                    }
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                    />
                    
               
                </List> 
                
               </Swipeable>
                );
            }      
       
    } 
    }
}


export default getTaskers;
const styles=StyleSheet.create({
    modal: {
        margin: 0, 
        backgroundColor: 'white', 
        height:350,
        flex:0 , 
        bottom: 0, 
        position: 'absolute',
        width: '100%'
      },
    card:{
        
        width:width * 0.48,
        height:width * 0.68,
        elevation   : 4,
        borderRadius:8,
        overflow:"hidden",
    },
    image2:{
        padding:0,
        margin:0,
        width:width * 0.68,
        height:width * 1.00,
        borderRadius:4,
       
    },
    container1:{
        flex:1,
        alignItems: 'center',
        justifyContent:'center'
    },
    // subtitleView: {
    //     flexDirection: 'column',
    //     paddingLeft: 10,
    //     paddingTop: 5
    //   },
      ratingImage: {
        height: 19.21,
        width: 100
      },
      ratingText: {
        paddingLeft: 10,
        color: 'grey'
      },

    bottomItem:{
        width:'97%',
        height:'12%',
        padding:5,
        marginLeft: 7,
        backgroundColor:"blue",
        marginTop:20
      },
      bottomItemInner:{
        
        flex:1,
        backgroundColor:'#fff',
        elevation:5,
        shadowColor: 'black',
        shadowOpacity: 3,
        alignItems: 'center',
        justifyContent:'center'
        
      },
    
})