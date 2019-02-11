
import React, { Component } from 'react';
import { View } from 'react-native';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';
 
export default class App extends Component {
  constructor(props) {
    super(props);
    //initialize the counter duration
    this.state = {
      totalDuration: '',
    };
  }
  componentDidMount() {
    var that = this;
    var date = moment()
      //.utcOffset('+05:30')
      .format('YYYY-MM-DD hh:mm:ss');//YYYY-MM-DD hh:mm:ss//LLL
     
    var expirydate =this.props.deadline//'February 1, 2019'; //'2019-01-31 01:39:45';//You can set your own date-time
    
    var diffr = moment.duration(moment(expirydate).diff(moment(date)));
    //difference of the expiry date-time given and current date-time
    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());
    var d = hours * 60 * 60 + minutes * 60 + seconds;
    //converting in seconds
    that.setState({ totalDuration: d });
    
  }
  render() {
  //  console.log(this.state.totalDuration);
    const Duration =parseInt(this.state.totalDuration);
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <CountDown
          until={Duration}
          //duration of countdown in seconds
          timetoShow={('H', 'M', 'S')}
          //formate to show
          onFinish={() => alert('finished')}
          //on Finish call
          onPress={() => alert('hello')}
          
          size={20}
        />
      </View>
    );
  }
}