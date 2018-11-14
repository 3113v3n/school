import {Rating} from 'react-native-elements';
import React,{Component } from 'react';

export default class CheckBoxItem extends Component{
    constructor(props){
        super(props);
        this.state={
            rating:''
        }
    }
    ratingCompleted=() =>{
        this.setState({rating})
        console.log("Rating is : "+ this.state.rating)
    }
    render(){
        return(
           
            
            <Rating
             
             showRating
             type="star"
             fractions={1}
             startingValue={2.5}
             imageSize={40}
             onFinishRating={()=>this.ratingCompleted()}
             style={{ paddingVertical: 10, marginLeft:10 }}
            />
        );
    }
}