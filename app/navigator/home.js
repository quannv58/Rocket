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
  guide: {
    screen: Guide,
  },
  contactUs: {
    screen: ContactUs,
  },
  signal: {
    screen: Signals,
  },
  payment: {
    screen: Payment,
  }
}, {
  initialRouteName: 'tool',
});

export default Home;