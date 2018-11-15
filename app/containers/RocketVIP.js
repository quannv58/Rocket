import React, {Component} from 'react'
import {
  View,
  WebView,
  TouchableOpacity,
  Text
} from 'react-native'
import CustomHeader from '../conponents/CustomHeader'

export default class RocketVIP extends Component {

  static navigationOptions = {
    drawerLabel: 'ROCKET VIP'
  };

  render () {
    const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=3, user-scalable=1'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#f2f4f7'}}>
        <CustomHeader
          icon={'menu'}
          title={'ROCKET VIP'}
          onButtonPress={() => this.props.navigation.openDrawer()}
        />

        <View style={{marginTop: 12, height: 40, alignItems: 'center'}}>
          <TouchableOpacity
            style={{width: 150, height: 40, alignItems: 'center',
              justifyContent: 'center', borderRadius: 4, backgroundColor: '#053856'}}
            onPress={() =>  this.props.navigation.push('activateCodeNavigator')}
          >
            <Text style={{fontSize: 16, color: 'white', fontFamily: 'Avenir-Book'}}>
              Nâng cấp VIP
            </Text>
          </TouchableOpacity>
        </View>

        <WebView
          source={{uri: 'http://167.179.65.85/vip.html'}}
          style={{margin: 12, flex: 1, height: '100%', backgroundColor: '#f2f4f7',}}
          scalesPageToFit={true}
          injectedJavaScript={INJECTEDJAVASCRIPT}
          scrollEnabled
        />
      </View>
    )
  }
}