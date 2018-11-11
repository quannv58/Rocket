import ContactUs from '../containers/ContactUs'
import Tool from '../containers/Tool'
import Guide from '../containers/Guide'
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
  }
}, {
  initialRouteName: 'tool',
});

export default Home;