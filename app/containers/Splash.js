import React, {Component} from 'react'
import {
  View,
  Image
} from 'react-native'
import {getItem} from "../utils/AsynUtils";
import {IS_ACCOUNT_ACTIVATED} from "../utils/Constants";

export default class Splash extends Component {

  componentDidMount() {
    getItem(IS_ACCOUNT_ACTIVATED).then((isActivated) => {
      if (isActivated === 'true') {
        setTimeout(() => this.props.navigation.navigate('homeNavigator'), 2000)
      } else {
        setTimeout(() => this.props.navigation.navigate('activateCodeNavigator'), 2000)
      }
    }).catch((err) => {
      setTimeout(() => this.props.navigation.navigate('activateCodeNavigator'), 2000)
    })
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