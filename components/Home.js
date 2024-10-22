import React from 'react';
import {
      View,
      Text,
      StyleSheet,
      ImageBackground,
      ScrollView
    } from 'react-native';
    
    const Home = () => {
      return (
        <ImageBackground 
          source={require('./../assets/back.jpg')} // Substitua pelo caminho da sua imagem
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
      cont:{
        justifyContent: 'center',
        flex: 1,
        marginTop: 250
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
    });
    
    export default Home;
    
    