import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import UserProvider from '../Context/UserProvider';

const Stack = createStackNavigator();

//Rota Login
import Login from '../Login';

//Rotas ADM
import AdmStack from './AdmStack'

//Rota PFV
import PfvStack from './PfvStack';

function Routes() {

  return(
    <NavigationContainer>
      <UserProvider>
        <Stack.Navigator initialRouteName={Login} headerMode={"none"} >
          
          <Stack.Screen name="Login" component={Login} options={{ headerTransparent: true, headerTitle: null }} />
          
          <Stack.Screen name="AdmStack" component={AdmStack} />

          <Stack.Screen name="PfvStack" component={PfvStack} />
          
        </Stack.Navigator>
      </UserProvider>
    </NavigationContainer>
  )
}

export default Routes;
