
import React,{Component} from 'react';
import {View,Text,Button} from 'react-native'

import Calendar from 'react-native-calendar-select';
export default class calendar extends Component{

    constructor (props) {
        super(props);
        this.state = {
          startDate: new Date(2018, 9, 12),  
          endDate: new Date(2018, 9, 12)
        };
        this.confirmDate = this.confirmDate.bind(this);
        this.openCalendar = this.openCalendar.bind(this);
      }
      // when confirm button is clicked, an object is conveyed to outer component
      // contains following property:
      // startDate [Date Object], endDate [Date Object]
      // startMoment [Moment Object], endMoment [Moment Object]
      confirmDate({startDate, endDate, startMoment, endMoment}) {
        this.setState({
          startDate,
          endDate
        });
        this.props.navigation.navigate('myHome');
      }
      openCalendar() {
        this.calendar && this.calendar.open();
      }
 
      render() {
        
        let customI18n = {
          'w': ['', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
          'weekday': ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          'text': {
            'start': 'Check in',
            'end': 'Check out',
            'date': 'Date',
            'save': 'Confirm',
            'clear': 'Reset'
          },
          'date': 'DD / MM'  // date format
        };
        // optional property, too.
        let color = {
          subColor: '#f0f0f0'
        };
        return (
          <View style={{justifyContent:'center',alignItems:'center',paddingTop:40}}>
          
          <Button title="Open Calendar" onPress={this.openCalendar}/>
        
            
            <Calendar
              i18n="en"
              ref={(calendar) => {this.calendar = calendar;}}
              customI18n={customI18n}
              color={color}
              format="YYYYMMDD"
              minDate="20180912"
              maxDate="20300312"
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onConfirm={this.confirmDate}
            />
           
          </View>
        );
      }
}
