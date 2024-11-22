import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Button } from 'react-native';
import { signOut } from 'firebase/auth';  
import { auth } from './../firebase';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation(); 

  const handleLogout = async () => {
    try {
      await signOut(auth);  
      //navigation.replace('Login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
    }
  };

  return (
    <ImageBackground 
      source={require('./../assets/back.jpg')} 
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Bem-vindo ao Yu-Gi-Oh! Localizador de cartões de Yu-Gi-Oh</Text>
        <View style={styles.cont}>
          <Text style={styles.subtitle}>Descubra seus cartões favoritos</Text>
          <View style={styles.cardContainer}>
            <Text style={styles.cardText}>Explore o mundo de Yu-Gi-Oh! com facilidade.</Text>
            <Text style={styles.cardText}>Para achar um ID:</Text>
            <Text style={styles.cardText}>Use o endpoint https://db.ygoprodeck.com/api/v7/cardinfo.php.</Text>
          </View>
        </View>

        {/* Botão de Logout */}
        <View style={styles.logoutButtonContainer}>
          <Button title="Logout" onPress={handleLogout} color="green" />
        </View>

      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
  },
  cont: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 250,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
  cardContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  logoutButtonContainer: {
    marginTop: 25,
    width: '80%',
  }
});

export default Home;
