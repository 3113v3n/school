import React, { Component } from 'react';
import {View, Text,StyleSheet,ViewPagerAndroid,Image, TouchableOpacity, Platform} from 'react-native';
import TabBarIcon from '../TabBarIcon';
export default class Pager extends Component{
    state={ width:0, autoplay:false}
    constructor(props){
        super(props)
        this._goToNextPage = this._goToNextPage.bind(this)
        this._onScroll = this._onScroll.bind(this)
        this._startAutoPlay = this._startAutoPlay.bind(this)
        this._stopAutoPlay = this._stopAutoPlay.bind(this)
        this._onScrollViewLayout = this._onScrollViewLayout.bind(this)

        this._currentIndex=0;
        this._childrenCount = 3;
    }

    componentDidMount(){
        if (this.state.autoplay) this._startAutoPlay()
        else this._stopAutoPlay
    }
   
    render(){
        const childWidth=250;
        return(
            <View style={{flex:1}}>
            <ViewPagerAndroid style={styles.mainViewStyle} initialPage={0}
            ref={SCROLLVIEW_REF}
            onLayout={this._onScrollViewLayout}
            onPageScroll={this._onScroll}
            scrollEnabled={true}
            //scrollEventThrottle={8}
            >
            
                <View style={styles.mainViewStyle}>
                <View style={styles.barItem}>

                    <Text style={styles.barTop}> 200</Text>
                    <Text  style={styles.barBottom}> Complete Jobs</Text>
                </View>
                </View>
                <View style={styles.mainViewStyle}>
                <View style={styles.barItem}>

                    <Text style={styles.barTop}> 120</Text>
                    <Text  style={styles.barBottom}> Job Post</Text>
                 </View>
                </View>
                <View style={styles.mainViewStyle}>
                <View style={styles.barItem}>
                 <TouchableOpacity>
                        <TabBarIcon
                          name={
                            Platform.OS === 'ios'
                              ? `ios-star${focused ? '' : '-outline'}`
                              : 'md-star'
                          }
                          color={'#ffd700'}
                        />
                      
                   </TouchableOpacity >
                   <Text style={styles.barBottom}>stars</Text>
           </View>

                </View>
                
            </ViewPagerAndroid>
            </View>
        );
    }

    _onScroll(event){
        let {y} = event.nativeEvent.contentOffset, offset, position = Math.floor(y/this.state.width)
        if (y== this._preScrollY) return;
        this._preScrollY = y
        offset = y/this.state.width - position

        if (offset === 0){
            this._currentIndex = position
            this._timerId = setInterval(this._goToNextPage,3000)
        }
    }

    _onScrollViewLayout(event){
        let {width} = event.nativeEvent.Layout
        this.setState({width:width})
    }

    _goToNextPage(){
        this._stopAutoPlay()
        let nextIndex = (this._currentIndex +1) % this._childrenCount;
        this.refs[SCROLLVIEW_REF].scrollTo({y:this.state.width*nextIndex})
    }

    _startAutoPlay(){
      this._timerId=  setInterval(this._goToNextPage,3000)
    }

    _stopAutoPlay(){
        if(this._timerId){
            clearInterval(this._timerId)
            this._timerId=null
        }
    }

}
const styles= StyleSheet.create({
    mainViewStyle:{
        backgroundColor:"#ec2e4a",
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopColor: '#fff',
        //width:childWidth
        
    },
    imageWrapper:{
        resizeMode: 'contain',
        height:'100%',
        width:'50%',
        alignItems: 'center',
    },
    bar:{
        borderTopColor: '#fff',
        borderBottomColor: '#fff',
        borderLeftColor: '#fff',
        borderTopWidth: 2,
        flex:1,
        backgroundColor:"#ec2e4a",
        flexDirection:'row',
        justifyContent:'space-between'
      },
    barItem:{
        flex:1,
        alignItems: 'center',
        //padding:20
        
      },
      barseparator:{
        borderRightWidth: 2,
        
        
      },
      barTop:{
        color:'#fff',
        fontSize:16,
        fontWeight:'bold',
        fontStyle:'italic'
      },
      barBottom:{
        color:'#000',
        fontSize:14,
        fontWeight:'bold',
        marginTop: 5,
      }
})