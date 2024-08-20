import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './../components/Home';
import CardList from './../components/CardList';

import ApiYugioh from './../components/ApiYugioh';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

function AppNavegacao() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Lista de Cards') {
              iconName = focused
                ? require('./../assets/iconeyugioh.jpg')
                : require('./../assets/iconeyugioh.jpg');
            }  else if (route.name === 'Pesquisa de Cards') {
              iconName = focused
                ? require('./../assets/Yugioh_Card_Back.jpg')
                : require('./../assets/Yugioh_Card_Back.jpg');
            }

            return <Image source={iconName} style={{ width: size, height: size }} />;
          },
        })}
>
        <Tab.Screen name="Home" component={Home} options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }} />
        <Tab.Screen name="Lista de Cards" component={CardList} />
        <Tab.Screen name="Pesquisa de Cards" component={ApiYugioh} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavegacao;
  