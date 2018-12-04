
import React,{Component}  from 'react';
import {FlatList, StyleSheet,View,Text,
    ActivityIndicator
    ,RefreshControl ,
    AsyncStorage,
    Image,

} from 'react-native';

import _ from 'lodash';
import {SearchBar,List,ListItem} from "react-native-elements";
const apiGet_All_Task='https://gawatask-app.herokuapp.com/all-posts.php';
import ClockTimer from '../components/AppComponents/ClockTimer'
import TaskModal from '../components/modals/TaskModal'

//const numColumns=2;
 class JobLists extends Component {     //pure!

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

           idNumber:'32571242',//fetch nat id
  
        }
      
        this.arrayholder=[] ;
    } 
  
    componentDidMount(){
      
         isMounted= true ;
         if(isMounted=true){
            this.getAllTasks().then(()=>{this.setState({refreshing:false});})
           //this.refreshDataFromServer();
            
         }else{
             console.log('error mounting')
         }
    }
    
    handlepress=()=>{
     
  this.refs.Mymodal.showModal()
           
    }
    learnMore=(item)=>{
        console.log('you pressed me and I am relaying the following',item)
        this.props.navigation.navigate('Details', {...item});
    }
    componentWillUnmount(){
    
    isMounted=false;
    }
    getNatID=async ()=>{
        myID= await AsyncStorage.getItem('NatID');
        this.setState({idNumber:myID})
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
        this.getNatID().then(()=>{
            this.getAllTasks().then(()=>{
                this.setState({refreshing:false});
            })
        })
       
   },250);
     
      refreshFlatList=() =>{
    
        this.refs.joblists.scrollToEnd();
      }
      
      onRefresh = () => {
        this.refreshDataFromServer();
        this.refreshFlatList();
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
                    <View>
                        
                    <List containerStyle={{borderTopWidth:0, borderBottomWidth:0}}>
                        <FlatList
                       // numColumns={numColumns}
                        ref={'joblists'}
                        data={this.state.TasksFromServer}
                        renderItem={({item, index})=>(
                            
                    
                            <ListItem item={item} index={index}
                          
                                roundAvatar
                                avatar={
                                    <View style={{
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
                               title={item.task_name.toUpperCase()}  
                               titleStyle={{fontWeight:'bold'}}
                               subtitle={<View style={styles.subtitleView}>
                               <Text >{item.description}</Text>
                               <Text style={{paddingTop:5,fontWeight:'400'}}>location: {item.location.toUpperCase()}</Text>
                               <Text style={{fontWeight:'700'}}>ksh: {item.amount}</Text>
                               <ClockTimer deadline={item.end_date}
                               />
                           </View>}
                                containerStyle={{borderBottomWidth:0}}
                                onPress={()=>this.learnMore(item)}
                               hideChevron
                             ////this.handlepress.bind(this)
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
                    <TaskModal
                        ref={'Mymodal'} 
                   parentFlatlist={this}
                        />
                
                  
             </View> 
            
                
                );
            }      
       
    } 
    
}
 

export default JobLists;
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
     
      fontSize:{
        fontWeight:'bold',
        flexWrap:'wrap',
        flexGrow: 1,
        flex:1
      },
    
     subtitleView: {
        flexDirection: 'column',
        paddingLeft: 10,
        paddingTop: 5
      }
    
})