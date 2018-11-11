import ContactUs from '../containers/ContactUs'
import Tool from '../containers/Tool'
import Guide from '../containers/Guide'
import Payment from '../containers/Payment'
import Signals from '../containers/Signals'
import {createDrawerNavigator} from "react-navigation";

const Home = createDrawerNavigator({
  tool: {
    screen: Tool
  },
  signal: {
    screen: Signals,
  },
  guide: {
    screen: Guide,
  },
  payment: {
    screen: Payment,
  },
  contactUs: {
    screen: ContactUs,
  }
}, {
  initialRouteName: 'tool',
  drawerBackgroundColor: '#F6F6F6',
  contentOptions: {
    inactiveLabelStyle: {fontSize: 18, color: 'rgb(44,62,80)', fontFamily: 'Avenir-Book'},
    activeLabelStyle: {fontSize: 18, color: '#1f63d1', fontFamily: 'Avenir-Book'}
  }
});

export default Home;