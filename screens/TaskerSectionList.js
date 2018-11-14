import React,{Component} from 'react';
import {
    AppRegistry,StyleSheet,Text,View,SectionList
} from 'react-native';
import _ from 'lodash';

let datasource=[
    {name:'reezy',sport:'rugby'},{name:'Sidney',sport:'soccer'},
    {name:'Bradley',sport:'rugby'},{name:'Paul',sport:'tennis'},
    {name:'Jason',sport:'soccer'},{name:'STatham',sport:'soccer'},
    {name:'Job',sport:'tennis'},{name:'Ethan',sport:'rugby'},
    {name:'nick',sport:'American Football'},{ name: 'Amonde',sport:'swimming'}
]
datasource= _.groupBy(datasource, d => d.sport)
datasource= _.reduce(datasource,(acc,next,index)=>{
    acc.push({
        key:index,
        data:next
    })
    return acc
},[])
export default class TaskerSectionList extends Component{
    renderItem =(item) =>{
        return<Text style={styles.text}>{item.item.name}</Text>
    }
    renderHeader=(headerItem)=>{
        return<Text style={styles.header}>{headerItem.section.key}</Text>
    }
    render(){
        return(
            <View styles={styles.container}>
                <SectionList
                renderItem={this.renderItem}
                renderSectionHeader={this.renderHeader}
                sections={datasource}
                keyExtractor={(item)=> item.name}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#F5FCFF',
        padding:20,
        paddingTop:40
    },
    text:{
        fontSize:14,
        color:'rgba(0,0,0,.5)'
    },
    header:{
        fontSize:20
    }
})