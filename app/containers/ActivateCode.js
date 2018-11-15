import React, {Component} from 'react'
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'
import axios from "react-native-axios";
import {saveItem, getItem} from "../utils/AsynUtils";
import {
  ACCOUNT_ACTIVATE,
  TYPE_VIP_ACCOUNT,
  ACCOUNT_VIP_0,
  ACCOUNT_VIP_1,
  ACCOUNT_VIP_2,
  ACCOUNT_VIP_3
} from "../utils/Constants";
import CustomHeader from '../conponents/CustomHeader'

export default class ActivateCode extends Component {

  constructor(props) {
    super(props)
    this.state={
      codes: [],
      inputCode: '',
      account: '',
      isInvalidCode: false,
      vipAccounts: {},
      isLoggedIn: false,
      isShowError: false,
      errorMessage: ''
    }
  }

  componentWillMount() {
    console.log('componentWillMount')
    getItem(ACCOUNT_ACTIVATE).then((value) => {
      console.log('value', value)
      if (value && value.length !== 0) {
        this.setState({
          isLoggedIn: true
        })
      }
    })
    axios.get('http://167.179.65.85/active_code.json', {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
      .then((response) => {
        console.log('response: ', response);
        this.setState({
          codes: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get('http://167.179.65.85/vip.json', {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
      .then((response) => {
        console.log('response: ', response);
        this.setState({
          vipAccounts: response.data
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

  _isVipAccount() {
    const {
      account,
      vipAccounts
    } = this.state

    for (var index in vipAccounts.vip1) {
      if (vipAccounts.vip1[index].toLowerCase() === account.toLowerCase()) {
        return ACCOUNT_VIP_1
      }
    }

    for (var index in vipAccounts.vip2) {
      if (vipAccounts.vip2[index].toLowerCase() === account.toLowerCase()) {
        return ACCOUNT_VIP_2
      }
    }

    for (var index in vipAccounts.vip3) {
      if (vipAccounts.vip3[index].toLowerCase() === account.toLowerCase()) {
        return ACCOUNT_VIP_3
      }
    }
    return ACCOUNT_VIP_0
  }

  _moveToHomePage() {
    this.setState({
      isShowError: false,
      errorMessage: ''
    })
    saveItem(ACCOUNT_ACTIVATE, this.state.account)
    saveItem(TYPE_VIP_ACCOUNT, this._isVipAccount()).then(() => {
      this.props.navigation.navigate('homeNavigator')
    })
  }

  _renderErrorPopup() {
    return(
      <View style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
      }}>
        <View style={{width: 250, height: 150, backgroundColor: 'white', borderRadius: 5, paddingHorizontal: 24,
          paddingVertical: 30, alignItems: 'center'}}>
          <Text style={{fontSize: 16, color: 'rgb(44,62,80)'}}>
            {this.state.errorMessage}
          </Text>

          <TouchableOpacity
            style={{width: 100, height: 32, backgroundColor: '#053856', borderRadius: 5,
              alignItems: 'center', justifyContent: 'center', marginTop: 24}}
            onPress={() => this._moveToHomePage()}
          >
            <Text style={{fontSize: 16, color: '#ffffff'}}>
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  _onPressActivate() {
    const {
      codes,
      inputCode,
      account
    } = this.state

    if (codes.length !== 0 && inputCode.length !== 0 && account.length !== 0 && this._checkValidation()) {
      this.setState({
        isInvalidCode: false,
        isShowError: true,
        errorMessage: this.state.isLoggedIn ? 'Nâng cấp thành công' : 'Kích hoạt thành công'
      })
    } else {
      this.setState({
        isInvalidCode: true
      })
    }
  }

  render () {
    return (
      <View style={{flex: 1, alignItems: 'center', backgroundColor: '#F6F6F6'}}>
        {
          this.state.isLoggedIn &&
            <CustomHeader
              icon={'back'}
              title={'Nâng cấp VIP'}
              onButtonPress={() => this.props.navigation.goBack()}
            />
        }
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

        {
          this.state.isShowError &&
          this._renderErrorPopup()
        }
      </View>
    )
  }
}