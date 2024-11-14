import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth'; // Monitoramento de autenticação
import { auth } from '../firebase'; // Importando o Firebase

import Home from './../components/Home';
import CardList from './../components/CardList';
import ApiYugioh from './../components/ApiYugioh';
import AuthScreen from './../components/AuthScreen'; // Tela de login

const Tab = createBottomTabNavigator();

function AppNavegacao() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Monitorando o estado de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); // Usuário logado
      } else {
        setIsAuthenticated(false); // Usuário não logado
      }
    });

    // Limpando o listener ao desmontar o componente
    return unsubscribe;
  }, []);

  if (!isAuthenticated) {
    // Se não estiver autenticado, exibe a tela de login
    return (
      <NavigationContainer>
        <AuthScreen />
      </NavigationContainer>
    );
  }

  // Se estiver autenticado, exibe a navegação com abas
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Lista de Cards') {
              iconName = focused
                ? require('./../assets/iconeyugioh.jpg')
                : require('./../assets/iconeyugioh.jpg');
            } else if (route.name === 'Pesquisa de Cards') {
              iconName = focused
                ? require('./../assets/Yugioh_Card_Back.jpg')
                : require('./../assets/Yugioh_Card_Back.jpg');
            }

            return <Image source={iconName} style={{ width: size, height: size }} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen name="Lista de Cards" component={CardList} />
        <Tab.Screen name="Pesquisa de Cards" component={ApiYugioh} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavegacao;
