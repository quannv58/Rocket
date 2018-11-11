import {createStackNavigator} from "react-navigation";
import Splash from '../containers/Splash'
import ActivateCode from '../containers/ActivateCode'
import Home from './home'

const Root = createStackNavigator({
  splashNavigator: {
    screen: Splash,
    navigationOptions: {
      header: null,
    }
  },
  activateCodeNavigator: {
    screen: ActivateCode,
    navigationOptions: {
      header: null,
    }
  },
  homeNavigator: {
    screen: Home,
    navigationOptions: {
      header: null,
    }
  }
}, {
  initialRouteName: 'splashNavigator',
  navigationOptions: {
    gesturesEnabled: false
  }
});

export default Root;
