import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './../components/AuthScreen';
import Rotas from './AppNavegacao';


const Stack = createStackNavigator();

export default function RotaAcesso() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
            <Stack.Screen name="Rotas" component={Rotas} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
}
