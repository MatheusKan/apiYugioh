import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ImageBackground, Modal, Pressable } from 'react-native';
import axios from 'axios';

const API_BASE_URL = 'https://db.ygoprodeck.com/api/v7/';

const getValueOrUnknown = (value) => {
  return (value && value !== '') ? value : 'Unknown';
};

const fetchCards = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}cardinfo.php`);
    return response.data.data;
  } catch (error) {
    console.error('Erro ao buscar cartas:', error);
    return [];
  }
};

const CardList = ({ navigation }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const getCards = async () => {
      const data = await fetchCards();
      setCards(data);
      setLoading(false);
    };

    getCards();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const handleCardPress = (card) => {
    setSelectedCard(card);
    setModalVisible(true);
  };64163367

  const renderCardDetails = () => {
    if (!selectedCard) return null;

    return (
      <View style={styles.modalContent}>
        <Image source={{ uri: getValueOrUnknown(selectedCard.card_images[0]?.image_url) }} style={styles.modalImage} />
        <Text style={styles.modalTitle}>{getValueOrUnknown(selectedCard.name)}</Text>
        <Text style={styles.modalDescription}>ID: {getValueOrUnknown(selectedCard.id)}</Text>
        <Text style={styles.modalDescription}>Tipo: {getValueOrUnknown(selectedCard.type)}</Text>
        <Text style={styles.modalDescription}>Ataque: {getValueOrUnknown(selectedCard.atk)}</Text>
        <Text style={styles.modalDescription}>Defesa: {getValueOrUnknown(selectedCard.def)}</Text>
        <Text style={styles.modalDescription}>Atributo: {getValueOrUnknown(selectedCard.attribute)}</Text>
        <Text style={styles.modalDescription}>Level: {getValueOrUnknown(selectedCard.level)}</Text>
        <Text style={styles.modalDescription}>{getValueOrUnknown(selectedCard.desc)}</Text>
        <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
          <Text style={styles.modalButtonText}>Close</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <ImageBackground source={require('./../assets/fundo.png')} style={styles.backgroundImage}>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCardPress(item)}>
            <View style={styles.cardContainer}>
              <Image source={{ uri: getValueOrUnknown(item.card_images[0]?.image_url) }} style={styles.cardImage} />
              <Text style={styles.cardName}>{getValueOrUnknown(item.name)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          {renderCardDetails()}
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
  },
  cardContainer: {
    margin: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    width: 250,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: 150,
    height: 220,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  cardName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 150,
    height: 220,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  modalTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalDescription: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CardList;
