import React, {Component} from 'react'
import {
  View,
  WebView
} from 'react-native'
import CustomHeader from '../conponents/CustomHeader'

export default class Signals extends Component {

  static navigationOptions = {
    drawerLabel: 'Tín hiệu'
  };

  render () {
    const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=3, user-scalable=1'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#f2f4f7'}}>
        <CustomHeader
          icon={'menu'}
          title={'Tín hiệu'}
          onButtonPress={() => this.props.navigation.openDrawer()}
        />

        <WebView
          source={{uri: 'http://167.179.65.85/signal.html'}}
          style={{margin: 12, flex: 1, height: '100%', backgroundColor: '#f2f4f7',}}
          scalesPageToFit={true}
          injectedJavaScript={INJECTEDJAVASCRIPT}
          scrollEnabled
        />
      </View>
    )
  }
}