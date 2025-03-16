import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import Splashscreen from './Splashscreen';
import Loginscreen from './Loginscreen';
import Homescreen from './Homescreen';
import Forgetpass from './Forgetpass';
import Sign from './sign';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator id={undefined} initialRouteName="Splashscreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splashscreen" component={Splashscreen} />
        <Stack.Screen name="Loginscreen" component={Loginscreen} />
        <Stack.Screen name="HomeScreen" component={Homescreen} />  {/* FIXED CASE SENSITIVITY */}
        <Stack.Screen name="Forgetpass" component={Forgetpass} />
        <Stack.Screen name="Sign" component={Sign} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
