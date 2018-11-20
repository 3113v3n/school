import React, { Component } from 'react';
import {View, Text,StyleSheet,} from 'react-native';
import moment from "moment";
import KeepAwake from "react-native-keep-awake"
 class ClockTimer extends Component{
    constructor(props){
        super(props);
        this.state={
            time:moment().format("LTS"),//LTS
            date:moment().format("LL")
        }
    }
render(){
    setTimeout(()=>{
        this.setState({
            time:moment().format("LTS"),
        date:moment().format("LL")
        })
    },1000)
    return(
       <View style={styles.container}>
        <Text style={styles.timeText}>{this.state.time}</Text>
        <Text style={styles.dateText}>{this.state.date}</Text>
       </View> 
    );
}
}

class CountDownTimer extends Component{
    constructor(props){
        super(props);
        this.state={
            timer:100
        }
    }
    componentDidMount(){
        this.interval = setInterval(
            ()=>this.setState((prevState)=>({timer:prevState.timer -1})),1000
            );
    }
    componentDidUpdate(){
        if (this.state.timer === 0){
            clearInterval(this.interval)
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.timeText}>{this.state.timer}</Text>
            </View>
        )
    }
}

class DaysTimer extends Component{
    constructor(props){
        super(props);
        this.state={
            days:0,
            hours:0,
            minutes:0,
            seconds:0,
           // deadline:'December 19, 2018',
        }
      //  console.log(this.props);
    }
    componentWillMount(){
        this.getTimeUntil(this.props.deadline)//state
    }
    componentDidMount(){
        setInterval(()=>this.getTimeUntil(this.props.deadline),1000)
    }
    leading0(num){
        //insert a 0 to the number if its less than 10 i.e 05
        return num < 10 ? '0' + num : num;
    }
  
    getTimeUntil(deadline){
        const time= Date.parse(deadline) - Date.parse(new Date());
       // console.log('time',time)
       const seconds=Math.floor((time/1000) % 60);
       const minutes=Math.floor((time/1000/60) % 60);
       const hours = Math.floor(time/(1000*60*60)% 24);
       const days = Math.floor(time/(1000*60*60*24));
       
        this.setState({days,hours,minutes,seconds})
    }
    render(){
        //this.getTimeUntil(this.state.deadline)//props
        return(
            <View style={styles.container}>
             <Text style={styles.dateText}>{this.state.deadline}</Text>

            <View style={{flexDirection:"row"}}>

            <View style={{flexDirection:'column'}}>
            <Text style={styles.timeText}>{this.leading0(this.state.days)} </Text>
            <Text style={styles.timeText}> days</Text>
            </View>

            <View style={{flexDirection:'column'}}>
            <Text style={styles.timeText}>{this.leading0(this.state.hours)} </Text>
            <Text style={styles.timeText}> hours</Text>
            </View>

            <View style={{flexDirection:'column'}}>
            <Text style={styles.timeText}>{this.leading0(this.state.minutes)} </Text>
            <Text style={styles.timeText}> minutes</Text>
            </View>

            <View style={{flexDirection:'column'}}>
            <Text style={styles.timeText}>{this.leading0(this.state.seconds)} </Text>
            <Text style={styles.timeText}> seconds</Text>
            </View>
           
            </View>  

            </View>
        )
    }
}
/**
 * to pass props from parent to child component
 * <clock deadline={this.state.deadlin}/>
 * we can now view the current set deadline in our clock component
 */

const styles= StyleSheet.create({
container:{
    flex:1,
    backgroundColor:'white',//'#000',
    justifyContent:'center',
    alignItems:'center'
},
timeText:{
    color:'#000',//'#999999',
    fontsize:80,
    padding:5
},
dateText:{
    color:'#000',//'#999999',
    fontsize:80
},
})

export default DaysTimer;