import React, { useCallback } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import CardList from '@/components/CardList';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useSession } from './SessionContext';
import { fetchData } from '@/hooks/fetchData';
import Navbar from '@/components/Navbar';
import { useLoading } from './LoadingContext';
import { useFocusEffect } from '@react-navigation/native';

const MesAnnoncesPage = () => {
  const { userInfo, mesAnnonces, setMesAnnonces } = useSession();
  const backgroundColor = useThemeColor({}, 'background');
  const primaryColor = useThemeColor({}, 'primary');
  const { setLoading } = useLoading();

  useFocusEffect(
    useCallback(() => {
      const fetchUserListings = async () => {
        try {
          const response = await fetchData(`/utilisateur/${userInfo?.id}/annonces`, 'GET', undefined, setLoading);
          setMesAnnonces(response);
        } catch (error) {
          console.error('Erreur lors de la récupération des annonces utilisateur:', error);
        }
      };

      fetchUserListings();
    }, [userInfo?.id, setLoading, setMesAnnonces])
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Titre de la page */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: primaryColor }]}>Mes Annonces</Text>
          </View>

          {/* Liste des annonces */}
          <CardList cards={mesAnnonces} editMode />

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

export default MesAnnoncesPage;
