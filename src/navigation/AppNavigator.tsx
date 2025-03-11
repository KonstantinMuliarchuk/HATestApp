import {NavigationContainer} from '@react-navigation/native';
import {CollectedRewardsScreen, RewardsScreen} from '../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';

enableScreens();

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
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
  );
}

export default AppNavigator;
