import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Inventory from '../screens/Inventory';
import ItemDetails from '../screens/ItemDetails';

const screens = {
  Inventory: {
    screen: Inventory,
    navigationOptions: {
      title: 'wasteNot'
    }
  },
  ItemDetails: {
    screen: ItemDetails,
    navigationOptions: {
      title: 'Item Details'
    }
  }
}

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: { backgroundColor: 'teal' },
    headerTitleStyle: { fontWeight: 'bold', color: 'white' },
    headerBackTitle: null,
    headerBackTitleStyle: { color: 'white' }
  }
});

export default createAppContainer(HomeStack);