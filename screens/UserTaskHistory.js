import React,{Component} from 'react';
import { Image,
    FlatList,StyleSheet,View,Text,ActivityIndicator,RefreshControl,
    TouchableOpacity,AsyncStorage,Animated,Alert
 } from 'react-native';
    import {SearchBar,List,ListItem} from "react-native-elements";
    import {Icon} from 'native-base';
   import {getTaskHistory} from '../networking/server';
   
    export default class taskHistory extends Component{
        
        constructor(props){
            super(props)
            this.state={
                isLoading:true,
                refreshing:false,
                myPost:[],
                userId:'36',
                filterText:'',
                
            }
            this.arrayholder=[]
        }
    
      
          componentWillMount(){
            isMounted=true;
            
            if(isMounted=true){
                this.fetchUserPost()
               
            }
          }
          componentWillUnmount(){
            isMounted=false;
          }
          getID=async ()=>{
            const ID = await AsyncStorage.getItem('userToken')
           this.setState({userId:ID})
         }

          fetchUserPost(){
            this.getID().then(()=>{
                let user={}
            user.userId = this.state.userId
            getTaskHistory(user)
            .then((responseJson)=>{
                        this.setState({
                            isLoading:false,
                            myPost:responseJson,
                            refreshing:false
                        })
                        this.arrayholder= responseJson;
                    })
                    .catch((error)=>{
                        console.log(error)
                    })
            })
         
            
          }
          setSearchText=filterText=>{
            const newData1 = this.arrayholder.filter(item=>{
                const itemData = `${item.description.toUpperCase()} 
                ${item.task_name.toUpperCase()} 
                ${item.location.toUpperCase()}`;
     
                const textData = filterText.toUpperCase();
                return itemData.indexOf(textData) >-1;
            });
            this.setState({myPost:newData1});
         } ;
         _twoOptionAlertHandler = () => {
           
            Alert.alert(
              //title
              'Delete',
              //body
              'Are you sure ,you Want to delete me ?',
              [
                { text: 'Yes', onPress: () => console.log('Task deleted') },
                {
                  text: 'No',
                  onPress: () => 
                console.log('iwant task id'),
                  style: 'cancel',
                },
              ],
              { cancelable: true }
              
            );
          };
         
          
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
           
            if(this.state.isLoading){
                return(
                    <View style={styles.container1}>
                    <View style={{marginTop:30,alignItems:"center"}}>
                        <Text style={{fontWeight:'bold',fontSize:16}}>
                            Getting your posts-------->
                        </Text>
                    </View>
                        <ActivityIndicator />
                    </View>
                )
            }else{
                return (
                    
                <List containerStyle={{borderTopWidth:0, borderBottomWidth:0}}>
                   
                    <FlatList
                    data={this.state.myPost}
                    renderItem={({item, index})=>(
                        
                     
                        <ListItem  item={item} index={index}
                      
                            roundAvatar
                            avatar={
                                <View style={{
                                    //flex:1,
                                    marginTop:2,
                                    marginLeft:5,
                                  flexDirection:'row',elevation:0,shadowOpacity:1,shadowColor:'gray', backgroundColor:'white' 
                                 }}>
                                    <Image
                                    source={
                                    item.task_name==='general cleaning' ? require('../assets/images/home_cleaning.jpg'):
                                    item.task_name ==='delivery'? require('../assets/images/deliveryServices.jpg'):
                                    item.task_name==='baby sitting' ? require('../assets/images/baby.jpg'):
                                    item.task_name==='laundry' ? require('../assets/images/laundryIcon.jpg'):
                                    item.task_name==='movers' ? require('../assets/images/moving.jpeg'):
                                    require('../assets/images/Plumbing.jpg')
                                    //require('../assets/images/Snoopy.jpg')
                                }
                                    style={{width:100, height:100, borderRadius:50}}
                                    />
                                       <Icon
                                name="md-trash"
                                style={{color:'#F95B57', }}
                                onPress={this._twoOptionAlertHandler }
                                />
                                </View>
                            }
                            title={item.task_name }
                           titleStyle={{fontWeight:'bold'}}
                           subtitle={ 
                           <View style={styles.subtitleView}>
                               <Text >{item.description}</Text>
                               
                               <Text style={{paddingTop:5,fontWeight:'bold'}}>location: {item.location}</Text>
                               <Text style={{fontWeight:'bold'}}>ksh: {item.amount}</Text>
                           </View>
                           }
                            containerStyle={{borderBottomWidth:0}}
                             hideChevron
                             buttonGroup
                             
                           

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
               
                );
            }      
       
    } 
        
    }
    const styles=StyleSheet.create({
        container1:{
            flex:1,
            alignItems: 'center',
            justifyContent:'center'
            },
        subtitleView:{
            flexDirection:'column',
            
        },animate:{
        
            position:'absolute',
             height:60,width:60,
             right:10,
             zIndex:100,
             backgroundColor:'gray',
             alignItems:'center',
             justifyContent:'center',
             borderRadius:30,
             marginTop: 200,
           
      },
        });