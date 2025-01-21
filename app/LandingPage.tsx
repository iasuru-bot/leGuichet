import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import SearchBar from '@/components/searchBar';
import CardList from '@/components/cardList';
import Navbar from '@/components/navbar';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useSession } from './SessionContext';

const LandingPage = () => {
  const { cards } = useSession();
  const [searchQuery, setSearchQuery] = useState('');

  const backgroundColor = useThemeColor({}, 'background');
  const primaryColor = useThemeColor({}, 'primary');

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