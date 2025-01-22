import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import CardList from '@/components/CardList';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useSession } from './SessionContext';
import { fetchData } from '@/hooks/fetchData';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import { useLoading } from './LoadingContext';

const LandingPage = () => {
  const { cards, setCards  } = useSession();
  const [searchQuery, setSearchQuery] = useState('');

  const backgroundColor = useThemeColor({}, 'background');
  const primaryColor = useThemeColor({}, 'primary');
  const { setLoading } = useLoading();

  const handleSearchSubmit = async () => {
    try {
      const response = await fetchData(`/annonce/chercher?query=${searchQuery}`, 'GET',undefined, setLoading);
      setCards(response);
    } catch (error) {
      console.error('Failed to fetch search results:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Titre */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: primaryColor }]}>Le Bon Commerce</Text>
          </View>

          {/* Barre de recherche */}
          <View style={styles.searchBar}>
            <SearchBar value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearchSubmit}
            />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 30,
    paddingTop: 40,
    paddingHorizontal: 20,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchBar: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
  },
});

export default LandingPage;