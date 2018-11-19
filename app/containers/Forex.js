import React, {Component} from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  WebView
} from 'react-native'
import CustomHeader from '../conponents/CustomHeader'
import axios from 'react-native-axios'
import {getItem} from "../utils/AsynUtils";
import {ACCOUNT_VIP_0, ACCOUNT_VIP_1, ACCOUNT_VIP_2, ACCOUNT_VIP_3, TYPE_VIP_ACCOUNT} from "../utils/Constants";

export default class Forex extends Component {
  constructor(props) {
    super(props)
    this.state={
      items: [],
      selectedItem: {}
    }
  }

  static navigationOptions = {
    drawerLabel: 'Forex'
  };

  componentWillMount() {
    getItem(TYPE_VIP_ACCOUNT).then((value) => {
      let url = ''
      switch (value) {
        case ACCOUNT_VIP_0:
          url = 'http://167.179.65.85/forex.json'
          break
        case ACCOUNT_VIP_1:
          url = 'http://167.179.65.85/forex_vip1.json'
          break
        case ACCOUNT_VIP_2:
          url = 'http://167.179.65.85/forex_vip2.json'
          break
        case ACCOUNT_VIP_3:
          url = 'http://167.179.65.85/forex_vip3.json'
          break
      }
      axios.get(url, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
        .then((response) => {
          this.setState({
            items: response.data,
            selectedItem: response.data[0]
          })
        })
        .catch((error) => {
          console.log(error);
        });
    })
  }

  _isItemSelected(item) {
    if (this.state.selectedItem && this.state.selectedItem.label === item.label) {
      return true
    } else {
      return false
    }
  }

  _renderItem(item) {
    return(
      <TouchableOpacity
        style={{height: 30, borderRadius: 5, paddingHorizontal: 16, alignItems: 'center', marginLeft: 16,
          justifyContent: 'center', backgroundColor: this._isItemSelected(item) ? '#053856' : '#4E4E4E'}}
        onPress={() => this.setState({
          selectedItem: item
        })}
      >
        <Text
          style={{fontSize: 14, color: 'white', maxLength: 25}}
          ellipsizeMode={'tail'}>
          {item.label}
        </Text>
      </TouchableOpacity>
    )
  }

  render () {
    const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=3, user-scalable=1'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#f2f4f7'}}>
        <CustomHeader
          icon={'menu'}
          title={'Forex'}
          onButtonPress={() => this.props.navigation.openDrawer()}
        />

        {this.state.selectedItem.link &&
        <WebView
          source={{uri: this.state.selectedItem.link}}
          style={{margin: 12, flex: 1, height: '100%', backgroundColor: '#f2f4f7',}}
          scalesPageToFit={true}
          injectedJavaScript={INJECTEDJAVASCRIPT}
          scrollEnabled
        />
        }

        <View style={{height: 40, justifyContent: 'center', backgroundColor: '#f2f4f7', position: 'absolute', top: 68, left: 0, right: 0}}>
          <FlatList
            data={this.state.items}
            extraData={this.state}
            renderItem={({item}) => this._renderItem(item)}
            horizontal={true}
          />
        </View>
      </View>
    )
  }
}