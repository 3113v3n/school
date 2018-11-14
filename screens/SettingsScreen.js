import React from 'react';

import ProfileScreen from './ProfileScreen';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    
    return <ProfileScreen />;
  }
}
