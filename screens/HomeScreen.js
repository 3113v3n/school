import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { WebBrowser } from 'expo';
import {Icon} from 'native-base';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerMode:'none',   
  };
  
 
  render() {
    return (
      <View style={styles.container}>
               
                <View style={styles.middle}></View>
                <View style={styles.bottom}>
                
                    <View style={styles.bottomItem}>
                    <View style={styles.bottomItemInner}>
                    <Text style={{color:'#353662'}}> Add Task
                    </Text>
                    <TouchableOpacity>
                        <Icon name="md-add-circle"
                        style={{color:'#353662', }}
                          onPress={()=>this.props.navigation.navigate('add')}
                        />
                    </TouchableOpacity>
                    </View>
                    </View>
                   
                    <View style={styles.bottomItem}>
                    
                    <View style={styles.bottomItemInner}>
                    <Text  style={{color:'#F95B57'}}> History
                    </Text>
                    <TouchableOpacity>
                    <Icon 
                        //name='md-paper-plane'
                        name='md-locate'
                        onPress={()=>this.props.navigation.navigate('session')}
                        style={{color:'#F95B57', }}
                        />
                    </TouchableOpacity>
                        
                    </View>
                 
                    </View>
                    
               

                    <View style={styles.bottomItem}>
                    <View style={styles.bottomItemInner}>
                    <Text  style={{color:'#8266D4'}}> Schedule
                    </Text>
                    <TouchableOpacity>
                    <Icon 
                        name='md-calendar'
                        style={{color:'#8266D4'}}
                        onPress={()=>{
                          {this.props.navigation.navigate('scheduler')}
                          {}//onpress function
                          }}
                        />
                    </TouchableOpacity>
                    </View>
                    </View>
               
                

                    <View style={styles.bottomItem}>
                    
                    <View style={styles.bottomItemInner}>
                    <Text  style={{color:'#3B5F8F'}}> Payment
                    </Text>
                    <TouchableOpacity
                    onPress={()=>{
                      Alert.alert('module coming soon');
                      }}
                    >
                    
                    <Image
                      source={require('../assets/images/mpesa.png')}
                      style={{height:50,width:50}}
                    />
                    </TouchableOpacity>
                    
                    </View>
                  
                    </View>
                
                </View>
            </View>
    );
  }
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
  container:{
    flex:1,
    backgroundColor:'lightgray'
},
topCard:{
  //paddingTop: 15,
    height:'38%',
    marginRight: 20,
    marginLeft: 20,
    marginTop:10,
    backgroundColor:'#fff',//#70758F',
    elevation:3,
    shadowColor: 'black',
    shadowOpacity: 2,
},
middle:{
    height:'2%',
   // padding:5

},
bottom:{
  marginTop:5,
    height:'93%',
    flexDirection: 'row',
    flexWrap:'wrap',//items can overflow into the next line
    padding:5

},
bottomItem:{
    width:'50%',
    height:'50%',
    padding:5,
  },
  bottomItemInner:{
    flex:1,
    backgroundColor:'#fff',//#878A96',
    elevation:3,
    shadowColor: 'black',
    shadowOpacity: 2,
    alignItems: 'center',
    justifyContent:'center'
    
  }

});
