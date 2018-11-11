import React, {Component} from 'react'
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'
import axios from "react-native-axios";
import {saveItem} from "../utils/AsynUtils";
import {IS_ACCOUNT_ACTIVATED} from "../utils/Constants";

export default class ActivateCode extends Component {

  constructor(props) {
    super(props)
    this.state={
      codes: [],
      inputCode: '',
      account: '',
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

  _checkValidation() {
    const {
      codes,
      inputCode,
      account
    } = this.state
    for (var index in codes) {
      console.log(codes[index])
      if (codes[index].telegramId && codes[index].telegramId.toLowerCase() === account.toLowerCase() &&
        codes[index].code && codes[index].code.toLowerCase() === inputCode.toLowerCase()) {
        return true
      }
    }
    return false
  }

  _onPressActivate() {
    const {
      codes,
      inputCode,
      account
    } = this.state

    if (codes.length !== 0 && inputCode.length !== 0 && account.length !== 0 && this._checkValidation()) {
      console.log('valid')
      this.setState({
        isInvalidCode: false
      })
      saveItem(IS_ACCOUNT_ACTIVATED, 'true')
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
          Nhập mã kích hoạt
        </Text>

        <View style={{height: 40, width: '90%', flexDirection: 'row', alignItems:'center', margin: 30}}>
          <Text style={{fontSize: 16,  color: 'rgb(44,62,80)', fontFamily: 'Avenir-Book', flex: 1}}>
            Tài khoản telegram
          </Text>

          <View style={{height: 40, flex: 1, borderRadius: 4, borderWidth: 1, borderColor: 'rgb(44,62,80)',
            paddingHorizontal: 12, alignItems:'center', flexDirection: 'row'}}>
            <Text style={{fontSize: 14,  color: 'rgb(44,62,80)', fontFamily: 'Avenir-Book'}}>
              @
            </Text>
            <TextInput
              style={{marginLeft: 12, flex: 1, fontSize: 14,  color: 'rgb(44,62,80)', fontFamily: 'Avenir-Book'}}
              multiline={false}
              onChangeText={(text) => this.setState({
                account: text
              })}
              value={this.state.account}
            />
          </View>
        </View>

        <View style={{height: 40, width: '90%', flexDirection: 'row', alignItems:'center'}}>
          <Text style={{fontSize: 16,  color: 'rgb(44,62,80)', fontFamily: 'Avenir-Book', flex: 1}}>
            Mã kích hoạt
          </Text>

          <TextInput
            style={{height: 40, flex: 1, borderRadius: 4, borderWidth: 1, borderColor: 'rgb(44,62,80)',
              paddingHorizontal: 12, justifyContent:'center', fontSize: 14,  color: 'rgb(44,62,80)', fontFamily: 'Avenir-Book'}}
            multiline={false}
            onChangeText={(text) => this.setState({
              inputCode: text
            })}
            value={this.state.inputCode}
          />
        </View>

        {
          this.state.isInvalidCode &&
          <Text style={{fontSize: 12, color: 'red', fontFamily: 'Avenir-Book', marginTop: 8}}>
            Tài khoản hoặc mã không hợp lệ!
          </Text>
        }

        <TouchableOpacity
          style={{width: 100, height: 40, marginTop: 30, borderRadius: 4,
          backgroundColor: '#053856', alignItems: 'center', justifyContent:'center'}}
          onPress={() => this._onPressActivate()}
        >
          <Text style={{fontSize: 16, color: 'white', fontFamily: 'Avenir-Book'}}>
            Kích hoạt
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}