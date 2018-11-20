import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ImageBackground,
  Animated,
  Dimensions,
  Keyboard
  
  
} from 'react-native';
import { WebBrowser } from 'expo';
import TabBarIcon from '../components/TabBarIcon';
import {Icon} from 'native-base';


//mport { MonoText } from '../components/StyledText';

//import MainTabNavigator from '../navigation/MainTabNavigator';
import * as Animatable from 'react-native-animatable';

const SCREEN_HEIGHT =Dimensions.get('window').height//height of screen

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props)
    
  }



increaseHeightOfLogin=()=>{
  this.setState({placeholderText:''})
    Animated.timing(this.LoginHeight,{
      toValue:SCREEN_HEIGHT,
      duration:500
    }).start(()=>{
      this.refs.textInputMobile.focus()
    })

}
componentWillMount(){
  this.LoginHeight = new Animated.Value(300)

  this.keyboardWillShowListerner= Keyboard.addListener
  ('keyboardWillShow',this.keyboardWillShow)
//when shows
  this.keyboardWillHideListener = Keyboard.addListener
  ('keyboardWillHide', this.keyboardWillHide)
  //when keyboard hides

  ///////----------for Android-----------------///

  this.keyboardDidShowListener= Keyboard.addListener
  ('keyboardDidShow',this.keyboardWillShow)
//when shows
  this.keyboardDidHideListener = Keyboard.addListener
  ('keyboardDidlHide', this.keyboardWillHide)
  //when keyboard hides
  this.keyboardHeight = new Animated.Value(0)
  this.forwardArrowOpacity = new Animated.Value(0)
  this.borderBottomWidth = new Animated.Value(0)
}
keyboardWillShow =(event)=>{
  if(Platform.OS=='android')
  {
    duration=100
  }else{
    duration=event.duration
  }


  Animated.parallel([
    Animated.timing(this.keyboardHeight,{
      duration:duration  + 100  ,                 //time taken for keyboard to move up + delay
      toValue: event.endCoordinates.height + 10
    }),
    Animated.timing(this.forwardArrowOpacity,{
      duration:duration,
      toValue:1
    }),
    Animated.timing(this.borderBottomWidth,{
      duration:duration,
      toValue:1
    }),

    
  ]).start()

}
keyboardWillHide =(event)=>{
  //android lacks event functionality hence:
  if(Platform.OS=='android')
  {
    duration=100
  }else{
    duration=event.duration
  }


  Animated.parallel([
    Animated.timing(this.keyboardHeight,{
      duration:duration  + 100  ,                 //time taken for keyboard to move up + delay
      toValue: 0
    }),
    Animated.timing(this.forwardArrowOpacity,{
      duration:duration,
      toValue:0
    }),
    Animated.timing(this.borderBottomWidth,{
      duration:duration,
      toValue:0
    }),

    
  ]).start()

}
decreaseHeightOfLogin=()=>{
  Keyboard.dismiss()//closes the keyboard on back arrow
  //opposite of icreasing height
  Animated.timing(this.LoginHeight,{
    toValue:300,
    duration:500
  }).start()
}
  render() {

    const headerTextOpacity = this.LoginHeight.interpolate({
      inputRange:[150, SCREEN_HEIGHT],
      outputRange:[1,0]
      //when height=150: opacity=0 && when height=SCREEN_HEIGHT: opacity=0
    })

    const marginTop = this.LoginHeight.interpolate({
      inputRange:[150, SCREEN_HEIGHT],
      outputRange:[25,100]
      //when height=150: opacity=0 && when height=SCREEN_HEIGHT: opacity=0
    })
    
    const headerBackArrowOpacity = this.LoginHeight.interpolate({
      inputRange:[150, SCREEN_HEIGHT],
      outputRange:[0,1]
 
    })

    const titleTextLeft = this.LoginHeight.interpolate({
      inputRange:[150, SCREEN_HEIGHT],
      outputRange:[100,25]
 
    })

    const titleTextBottom = this.LoginHeight.interpolate({
      inputRange:[150,400, SCREEN_HEIGHT],
      outputRange:[0,0,100]
 
    })

    const titleTextOpacity = this.LoginHeight.interpolate({
      inputRange:[150, SCREEN_HEIGHT],
      outputRange:[0,1]
 
    })
    
    return (
          <View style={{flex:1}}>
            <Animated.View
            style={{
              position:'absolute',height:60,
              width:60,top:60,
              left:25,
              zIndex:100,//allow it to stay on top
              opacity:headerBackArrowOpacity
            }}>
           
            </Animated.View>

            <Animated.View
            style={{
              position:'absolute',
              height:60,width:60,
              right:10,
              bottom:this.keyboardHeight,//animated
              opacity:this.forwardArrowOpacity,//animated
              zIndex:100,
              backgroundColor:'#54575e',
              alignItems:'center',
              justifyContent:'center',
              borderRadius:30
            }}
            >
           
              </Animated.View>

              <ImageBackground
               source={require('../assets/images/Map_Carbon.jpg')}
              //style={styles.welcomeImage}
              style={{flex:1}}
              >
                <View style={{flex:1, justifyContent:'center', alignItems:"center",heigh:'80%'}}>
                  <Animatable.View 
                  animation="zoomIn" iterationCount={1}
                  style={{//backgroundColor:"white",
                  height:100, width:100,alignItems:'center',
                  borderRadius:50,
                justifyContent:'center'}}>
                      <Image
                          source={
                            __DEV__
                              ? require('../assets/images/gawa.jpg')
                              : require('../assets/images/gawa.jpg')
                          }
                          style={styles.welcomeImage}
                      />
                      <Text style={{fontWeight:'bold',
                      fontSize:26,
                    alignItems:'center'}}
                      > </Text>
                  </Animatable.View>
                </View>
                {/**BOTTOM HALF**/}
                <Animatable.View animation="slideInUp" iterationCount={1}>
                  <Animated.View
                  style={{
                    height:"50%",
                    backgroundColor:'white',
                    alignItems:'flex-end'

                  }}>
                      <Animated.View style={{
                        opacity:headerTextOpacity,//initially 1
                        alignItems:'flex-start',
                        paddingHorizontal:25,
                        marginTop:marginTop//initially 25 but we call method marginTop
                      }}>
                      <TouchableOpacity
           
           onPress={()=>{
           {this.props.navigation.navigate(' AuthLoading')}}}
           >
                          <Text
                          style={{fontSize:24}}>Get Started
                          </Text>
                          </TouchableOpacity>
                        </Animated.View>  
                    </Animated.View>

                   
                 </Animatable.View>
          
              </ImageBackground>
            
          </View>
         

          
        
    );
  }
  //    <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },LoginButtonText:{
    width:400,
    justifyContent:'center',
    fontSize:16,
    textAlign:'center'
  },
  inputBox:{
    width: 300,
    backgroundColor:'#979A9A',//rgba(255,255,255,0.2)
    borderRadius:25,
    paddingHorizontal: 16,
    fontSize: 16,
    color:'blue',
    marginVertical:20,
    marginBottom:30,
    paddingVertical:20
  },
  buttonContainer:{
    backgroundColor:'#2E86C1',
    paddingVertical:15,
    marginBottom: 10,
    width:100,
    borderRadius:25,
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:15,
    marginLeft:245
},
inputBox1:{
 flex:1,
  flexDirection:"row",
  justifyContent:'space-between'

},
inputBox2:{
width:"100%"
},
  inputBox:{
    width: 300,
    backgroundColor:'#979A9A',//rgba(255,255,255,0.2)
    borderRadius:25,
    paddingHorizontal: 16,
    fontSize: 16,
    color:'blue',
    marginVertical:10,
    marginBottom:10,
    paddingVertical:10
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginTop: 15,
    marginLeft: -10,
    alignItems:'center',
    paddingTop:20,
    borderRadius:40
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 8,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
