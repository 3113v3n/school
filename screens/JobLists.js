
import React  from 'react';
import {FlatList, StyleSheet,View,Text,
    ActivityIndicator
    ,RefreshControl ,
    AsyncStorage,
    Image,ScrollView,Dimensions,Button
} from 'react-native';
import Modal from "react-native-modal";
import _ from 'lodash';
import {SearchBar,List,ListItem} from "react-native-elements";
import {Right,Card,CardItem} from 'native-base';
import Swipeable from 'react-native-swipeable';
const apiGet_All_Task='https://gawatask-app.herokuapp.com/all-posts.php';
import {_claimTask} from '../networking/server';
const { width } = Dimensions.get('window');
import StarRating from 'react-native-star-rating';
export default class JobLists extends React.PureComponent {     //pure!

    constructor(props){
        super(props);
        this.state={
            isLoading:true,
            dataSource:null,
            deletedRowKey: null,
            refreshing: false,
             TasksFromServer: [],
             filterText:'',
             empty:false,
             post_id:'48',//fetch post id

             show: false,
             touchable: null,
             isModalVisible:false,
           idNumber:'32572242'//fetch nat id

        }
      
        this.arrayholder=[] ;
    } 
    componentDidMount(){
      
         isMounted= true ;
         if(isMounted=true){
            // this.getAllTasks()
            this.refreshDataFromServer();
            
         }else{
             console.log('error mounting')
         }
    }
    componentWillUnmount(){
    
    isMounted=false;
    }
   
    setSearchText=filterText=>{
       const newData1 = this.arrayholder.filter(item=>{
           const itemData = `${item.description.toUpperCase()} 
           ${item.location.toUpperCase()} ${item.task_name.toUpperCase()}`;

           const textData = filterText.toUpperCase();
           return itemData.indexOf(textData) >-1;
       });
       this.setState({TasksFromServer:newData1});
    } ;

    getAllTasks() {
       
            return fetch(apiGet_All_Task)
            .then((response)=>response.json())
            .then((responseJson)=>{
                
                this.setState({
                    isLoading:false,
                    refreshing:true,
                   TasksFromServer:responseJson,
                });

                this.arrayholder= responseJson;
                
            })
           
            .catch((error)=>{
                console.log(error)
                this.setState({ isLoading: false });
            });
            
         
    }
    refreshDataFromServer = _.debounce(() => {
        this.setState({ refreshing: true, });
       this.getAllTasks().then(()=>{
           this.setState({refreshing:false});
       })
   },250);
     
      refreshFlatList=() =>{
    
        this.refs.flatList.scrollToEnd();
      }
      
      onRefresh = () => {
        this.refreshDataFromServer();
    }



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
      
        handleItemPressed=()=>{
        
            this.setState({ isModalVisible: !this.state.isModalVisible });
        }
       renderHeader=()=>{
           return(
           <SearchBar placeholder="Search task..."
            lightTheme
             round  
            onChangeText={(filterText)=>this.setSearchText(filterText)}
           autoCorrect={false}
           />
           );
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
       
        let jobList=this.state.TasksFromServer.map((val,key)=>{
            return (

                 
                <Swipeable>
                <List containerStyle={{borderTopWidth:0, borderBottomWidth:0}}>
                    <FlatList
                    data={this.state.TasksFromServer}
                    renderItem={({item, index})=>(
                        
                        
                        <ListItem item={item} index={index}
                      
                            roundAvatar
                            avatar={
                                <View style={{
                                    //flex:1,
                                    marginTop:2,
                                    marginLeft:10,
                                  flexDirection:'row',elevation:1,shadowOpacity:1,shadowColor:'gray', backgroundColor:'white' 
                                 }}>
                                    <Image
                                    source={
                                    item.task_name==='general cleaning' ? require('../assets/images/home_cleaning.jpg'):
                                    item.task_name ==='delivery'? require('../assets/images/deliveryServices.jpg'):
                                    item.task_name==='baby sitting' ? require('../assets/images/baby.jpg'):
                                    item.task_name==='laundry' ? require('../assets/images/laundryIcon.jpg'):
                                    item.task_name==='movers' ? require('../assets/images/moving.jpeg'):
                                    require('../assets/images/Plumbing.jpg')
                                    }
                                    style={{width:80, height:80, borderRadius:40}}
                                    />
                                </View>
                            }
                           title={item.task_name}  
                           titleStyle={{fontWeight:'bold'}}
                           subtitle={<View style={styles.subtitleView}>
                           <Text >{item.description}</Text>
                           <Text style={{paddingTop:5,fontWeight:'400'}}>location: {item.location}</Text>
                           <Text style={{fontWeight:'bold'}}>ksh: {item.amount}</Text>
                       </View>}
                            containerStyle={{borderBottomWidth:0}}
                            onPress={this.handleItemPressed.bind(this) }
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
                
                <Modal 
         
             onBackdropPress={()=>this.setState({isModalVisible:false})}
              style={styles.modal}
             isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1,alignItems:'flex-end' }}>
        
          <ScrollView>
                            
                    <CardItem style={{height:200,width:100+'%'}}>
                    <Image style={{width:100,height:80+'%',borderRadius:4}} source={require('../assets/images/Johnny.jpg')}/>
                    <Right style={{flex:1,alignItems:'flex-start',height:200,padding:20}}>
                        <Text style={{fontWeight:'bold',fontSize:16}}>Job</Text>
                        <Text >name: task name </Text>
                        <Text style={{color:'gray'}}>location:task location</Text>
                        <Text style={{color:'gray'}}>amount:task Amount</Text>
                        <Text style={{color:'gray'}}>Start Date: Start Dat3</Text>
                    </Right>
                    </CardItem>
                
                    <View style={{alignItems:'flex-start',justifyContent:'flex-start',padding:10,paddingTop:5}}>

                        <Text style={{fontWeight:'bold'}}>About Task</Text>
                        <Text> i need my job description written here........</Text>
                       
                    </View>
          </ScrollView>
  
                    <View style={{width:width}}>
                    <View style={{height:50,padding:5}}>
             
                     <Text style={{fontWeight:'bold',color:'red'}}></Text></View>
                     
                
                    <View style={{width:250,height:50,padding:10,position:'absolute',right:0,alignItems:'flex-end'}}>
                  
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
                    onPress={()=>{{
                        let task={}
                        task.post_id=this.state.post_id
                        task.nat_id=this.state.idNumber
                        _claimTask(task).then((status)=>{
                            if(status==0){
                                Alert.alert('task claimed');
                            this.props.navigation.navigate('myHome')}
                        })}
                
                }}
                    containerStyle={{ marginTop: 20 }}
                    title='Bid'/>

                   </View>
                  </View>

          </View>
        </Modal>
          
         
               </Swipeable>

            );
        })


            if(this.state.isLoading){
                return(
                    <View style={styles.container1}>
                    <View style={{marginTop:30,alignItems:"center"}}>
                        <Text style={{fontWeight:'bold',fontSize:16}}>
                            FETCHING TASKS PLEASE WAIT
                        </Text>
                    </View>
                        <ActivityIndicator />
                    </View>
                )
            }else{
                return (
               [jobList]
                
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
    bottomItem:{
        width:'97%',
        height:'12%',
        padding:5,
        marginLeft: 7,
        backgroundColor:"blue",
        marginTop:20
      },
      itemInvisible:{
          backgroundColor:'transparent'
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
    }, subtitleView: {
        flexDirection: 'column',
        paddingLeft: 10,
        paddingTop: 5
      },

})