import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

export default class CustomHeader extends Component {

  render () {
    const {
      icon,
      title
    } = this.props

    return (
      <View style={{height: 40, marginTop: 16, backgroundColor: '#F6F6F6', width: '100%'}}>
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom:0, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 16,  color: 'rgb(44,62,80)', fontFamily: 'Avenir-Book' }}>
            {title}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <TouchableOpacity
            style={{width: 120, height: 40, alignItems: 'center', flexDirection: 'row'}}
            onPress={() => {this.props.onButtonPress()}}
          >
            {
              icon === 'menu' &&
              <Image
                style={{width: 16, height: 16, marginLeft: 12, resizeMode: 'contain'}}
                source={require('../assets/icon/menu.png')}
              />
            }

            {
              icon === 'back' &&
              <Image
                style={{width: 16, height: 16, marginLeft: 12, resizeMode: 'contain'}}
                source={require('../assets/icon/back.png')}
              />
            }

            {
              icon === 'back' &&
              <Text style={{marginLeft: 12, fontSize: 16, color: 'rgb(44,62,80)', fontFamily: 'Avenir-Book'}}>
                Back
              </Text>
            }
          </TouchableOpacity>

          <View style={{flex: 1}}/>

          <Image
            style={{width: 40, height: 40, marginRight: 12}}
            resizeMode={'contain'}
            source={require('../assets/icon/lauch_screen.jpg')}
          />
        </View>

        <View
          style={{width: '100%', height: 1, backgroundColor: 'rgba(229,229,229,0.5)'}}
        />
      </View>
    )
  }
}