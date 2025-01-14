import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from 'react-native'; import SearchBar from '@/components/searchBar';
import CardList from '@/components/cardList';
import Navbar from '@/components/navbar';
import Input from '@/components/input';

interface CardProps {
  id: string;
  imageUrl: string;
  category: string;
  heading: string;
  authorName: string;
  authorDate: string;
}

const cards: CardProps[] = [
  {
    imageUrl: 'https://via.placeholder.com/150',
    category: 'Immobilier',
    heading: 'Appartement T3 à louer en centre-ville',
    authorName: 'Marie Dupont',
    authorDate: '14 janvier 2025',
    id: '1',
  },
  {
    imageUrl: 'https://via.placeholder.com/150',
    category: 'Véhicules',
    heading: 'Peugeot 208 d’occasion - 2018',
    authorName: 'Jean Martin',
    authorDate: '12 janvier 2025',
    id: '2',
  },
  {
    imageUrl: 'https://via.placeholder.com/150',
    category: 'Electroménager',
    heading: 'Réfrigérateur Samsung presque neuf',
    authorName: 'Claire Petit',
    authorDate: '10 janvier 2025',
    id: '3',
  },
  {
    imageUrl: 'https://via.placeholder.com/150',
    category: 'Multimédia',
    heading: 'MacBook Pro 2020 - Très bon état',
    authorName: 'Antoine Bernard',
    authorDate: '8 janvier 2025',
    id: '4',
  },
  {
    imageUrl: 'https://via.placeholder.com/150',
    category: 'Loisirs',
    heading: 'Vélo VTT Rockrider 540',
    authorName: 'Luc Durand',
    authorDate: '5 janvier 2025',
    id: '5',
  },
  {
    imageUrl: 'https://via.placeholder.com/150',
    category: 'Mode',
    heading: 'Montre Fossil en cuir - Comme neuve',
    authorName: 'Julie Robert',
    authorDate: '2 janvier 2025',
    id: '6',
  },
];

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Titre */}
          <Text style={styles.title}>Bienvenue sur Find It</Text>

          {/* Barre de recherche */}
          <View style={styles.searchBar}>
            <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
          </View>

          {/* Liste des cartes */}
          <CardList cards={cards} />

          {/* Navbar */}
          <Navbar />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#023047', // Couleur de fond tirée du thème
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFB703',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  searchBar: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#8ECAE6',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#023047',
  },
  cardContainer: {
    paddingHorizontal: 16,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  navItem: {
    color: '#FFB703',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
