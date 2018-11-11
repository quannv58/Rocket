import React, {Component} from 'react'
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'
import axios from "react-native-axios";

export default class ActivateCode extends Component {

  constructor(props) {
    super(props)
    this.state={
      codes: [],
      inputCode: '',
      isInvalidCode: false
    }
  }

  componentWillMount() {
    axios.get('http://167.179.65.85/active_code.json')
      .then((response) => {
        console.log('response: ', response);
        this.setState({
          codes: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  _onPressActivate() {
    const {
      codes,
      inputCode
    } = this.state

    if (codes.length !== 0 && inputCode.length !== 0 && codes.includes(inputCode)) {
      this.setState({
        isInvalidCode: false
      })
      this.props.navigation.navigate('homeNavigator')
    } else {
      this.setState({
        isInvalidCode: true
      })
    }
  }

  render () {
    return (
      <View style={{flex: 1, alignItems: 'center', backgroundColor: '#F6F6F6'}}>
        <Image
          style={{width: 100, height: 100,marginTop: 60, resizeMode: 'contain'}}
          source={require('../assets/icon/lauch_screen.jpg')}
        />

        <Text style={{fontSize: 16,  color: 'rgb(44,62,80)', fontFamily: 'Avenir-Book', marginTop: 30}}>
          Enter the activation code
        </Text>

        <TextInput
          style={{height: 32, width: 200, borderRadius: 4, borderWidth: 1, borderColor: 'rgb(44,62,80)',
            paddingHorizontal: 12, justifyContent:'center', marginTop: 30}}
          multiline={false}
          onChangeText={(text) => this.setState({
            inputCode: text
          })}
          value={this.state.inputCode}
        />

        {
          this.state.isInvalidCode &&
          <Text style={{fontSize: 12, color: 'red', fontFamily: 'Avenir-Book', marginTop: 8}}>
            Invalid code!
          </Text>
        }

        <TouchableOpacity
          style={{width: 100, height: 32, marginTop: 30, borderRadius: 4,
          backgroundColor: '#053856', alignItems: 'center', justifyContent:'center'}}
          onPress={() => this._onPressActivate()}
        >
          <Text style={{fontSize: 16, color: 'white', fontFamily: 'Avenir-Book'}}>
            Activate
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}