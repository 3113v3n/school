import React, { Component } from 'react';
import { Text, StyleSheet, View, Animated, Easing} from 'react-native';
export default class Screen2 extends Component{

    constructor(props){
        super(props);
            var animatedValues = [];
            for (var i = 0; i< 1000; i++){
                animatedValues.push(new Animated.Value(0));//generates 1000 views for animation
            }
            this.state={
                animatedValues: animatedValues
            };
        
    }
    componentDidMount
    staggerAnimate = ()=>{
        const animations = this.state.animatedValues.map((animatedValue)=> {
            return Animated.timing(
                animatedValue,
                {
                    toValue:1,
                    duration:3000 //3secs
                }
            )
       }) ;
       Animated.stagger(10, animations).start();
    }



    render(){
        const animatedViews = this.state.animatedValues.map((animatedValue, index)=>{
            return
                <Animated.View 
                key={index}
                style={[style.animatedView,{
                    opacity: animtedValue,
                    backgroundColor: index % 2 === 0 ? 'skyblue' : 'steelblue'
                }]}
                />
            
        });
        return (
            <View style={styles.container}>
            {animatedViews}
            </View>
        );
        
    }
}
 const styles= StyleSheet.create({
     container:{
         flex:1,
         flexDirection: 'row',
         flexWrap:'wrap'
     },
     animatedView:{
         height:12,
         width:12,
         
         margin: 3,
         borderRadius: 6,
     }
 })