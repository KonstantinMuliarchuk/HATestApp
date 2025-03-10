import {Provider} from 'react-redux';
import {store} from '../store';
import {NavigationContainer} from '@react-navigation/native';
import {CollectedRewardsScreen, RewardsScreen} from '../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="RewardsScreen">
          <Stack.Screen
            name="RewardsScreen"
            component={RewardsScreen}
            options={{title: 'Rewards'}}
          />
          <Stack.Screen
            name="CollectedRewardsScreen"
            component={CollectedRewardsScreen}
            options={{title: 'Collected Rewards'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default AppNavigator;
