import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TextInput, Button, ScrollView, ImageBackground } from 'react-native';
import axios from 'axios';

// Função para garantir que valores nulos ou indefinidos sejam substituídos por 'Unknown'
const getValueOrUnknown = (value) => {
  return (value && value !== '') ? value : 'Unknown'; // Retorna o valor se válido, senão retorna 'Unknown'
};

const CardSearch = () => {
  const [cardId, setCardId] = useState('');
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCard = async () => {
    if (!cardId.trim()) {
      setError('Por favor insira o ID da carta');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${cardId}`);
      setCard(response.data.data[0]); 
    } catch (error) {
      setError('Falha ao buscar detalhes do cartão');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground 
      source={require('./../assets/fundo.webp')} 
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Procure sua carta</Text>
        <TextInput
          style={styles.input}
          placeholder="Coloque o ID da carta"
          keyboardType="numeric"
          value={cardId}
          onChangeText={setCardId}
        />
        <Button title="Procurar" onPress={fetchCard} />

        {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />}
        {error && <Text style={styles.errorText}>{error}</Text>}
        
        {card && (
          <View style={styles.cardContainer}>
            <Image source={{ uri: getValueOrUnknown(card.card_images[0]?.image_url) }} style={styles.cardImage} />
            <Text style={styles.cardName}>{getValueOrUnknown(card.name)}</Text>
            <Text style={styles.cardDescription}>Tipo: {getValueOrUnknown(card.type)}</Text>
            <Text style={styles.cardDescription}>Level: {getValueOrUnknown(card.level)}</Text>
            <Text style={styles.cardDescription}>Ataque: {getValueOrUnknown(card.atk)}</Text>
            <Text style={styles.cardDescription}>Defesa: {getValueOrUnknown(card.def)}</Text>
            <Text style={styles.cardDescription}>Atributo: {getValueOrUnknown(card.attribute)}</Text>
            <Text style={styles.cardDescription}>Raridade: {getValueOrUnknown(card.card_sets?.[0]?.rarity)}</Text>

            <Text style={styles.cardDescription}>{getValueOrUnknown(card.desc)}</Text>
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
    backgroundColor: 'white',
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
  },
  cardContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  cardImage: {
    width: 200,
    height: 300,
    borderRadius: 8,
  },
  cardName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  cardDescription: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    
  },
});

export default CardSearch;
