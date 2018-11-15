import React, {Component} from 'react'
import {
  View,
  Image
} from 'react-native'
import {getItem} from "../utils/AsynUtils";
import {ACCOUNT_ACTIVATE} from "../utils/Constants";
import axios from "react-native-axios";

export default class Splash extends Component {

  _isAccountAvailable(account, activeUsers) {
    for (var index in activeUsers) {
      if (activeUsers[index].toLowerCase() === account.toLowerCase()) {
        return true
      }
    }
    return false
  }

  componentWillMount() {
    axios.get('http://167.179.65.85/live_user.json', {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
      .then((response) => {
        const activeUsers = response.data
        getItem(ACCOUNT_ACTIVATE).then((account) => {
          if (this._isAccountAvailable(account, activeUsers)) {
            setTimeout(() => this.props.navigation.navigate('homeNavigator'), 2000)
          } else {
            setTimeout(() => this.props.navigation.navigate('activateCodeNavigator'), 2000)
          }
        }).catch((err) => {
          setTimeout(() => this.props.navigation.navigate('activateCodeNavigator'), 2000)
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render () {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F6F6F6'}}>
        <Image
          style={{width: 100, height: 100, resizeMode: 'contain'}}
          source={require('../assets/icon/lauch_screen.jpg')}
        />
      </View>
    )
  }
}