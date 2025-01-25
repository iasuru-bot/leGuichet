import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import CardList from '@/components/CardList';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useSession } from './SessionContext';
import { fetchData } from '@/hooks/fetchData';
import Navbar from '@/components/Navbar';
import { useLoading } from './LoadingContext';
import { AnnonceType } from '@/types/GlobalType';

const MesAnnoncesPage = () => {
  const { userInfo, cards, setCards } = useSession();

  const annonces: AnnonceType[] = [
    {
      id: '1',
      titre: 'Maison à vendre',
      description: 'Belle maison familiale avec jardin et garage.',
      prix: 250000,
      datePublication: '2025-01-20',
      statut: 'Disponible',
      Categorie: {
        nom: 'Immobilier',
      },
      Utilisateur: {
        nom: 'Dupont',
        prenom: 'Jean',
      },
      filePath: 'uploads/images/maison.jpg',
    },
    {
      id: '2',
      titre: 'Voiture d’occasion',
      description: 'Voiture en bon état, peu de kilomètres parcourus.',
      prix: 15000,
      datePublication: '2025-01-15',
      statut: 'Disponible',
      Categorie: {
        nom: 'Véhicules',
      },
      Utilisateur: {
        nom: 'Martin',
        prenom: 'Lucie',
      },
      filePath: 'uploads/images/voiture.jpg',
    },
    {
      id: '3',
      titre: 'Ordinateur portable',
      description: 'Ordinateur portable puissant, idéal pour les professionnels.',
      prix: 1200,
      datePublication: '2025-01-10',
      statut: 'Vendu',
      Categorie: {
        nom: 'Électronique',
      },
      Utilisateur: {
        nom: 'Lemoine',
        prenom: 'Alice',
      },
      filePath: 'uploads/images/ordinateur.jpg',
    },
    {
      id: '4',
      titre: 'Vélo tout-terrain',
      description: 'Vélo robuste et léger, parfait pour les randonnées.',
      prix: 800,
      datePublication: '2025-01-08',
      statut: 'Disponible',
      Categorie: {
        nom: 'Sports',
      },
      Utilisateur: {
        nom: 'Durand',
        prenom: 'Paul',
      },
      filePath: 'uploads/images/velo.jpg',
    },
    {
      id: '5',
      titre: 'Canapé 3 places',
      description: 'Canapé confortable, presque neuf.',
      prix: 500,
      datePublication: '2025-01-05',
      statut: 'Disponible',
      Categorie: {
        nom: 'Mobilier',
      },
      Utilisateur: {
        nom: 'Bertrand',
        prenom: 'Claire',
      },
      filePath: 'uploads/images/canape.jpg',
    },
  ];

  const backgroundColor = useThemeColor({}, 'background');
  const primaryColor = useThemeColor({}, 'primary');
  const { setLoading } = useLoading();

  useEffect(() => {
    // Charger les annonces de l'utilisateur au montage
    const fetchUserListings = async () => {
      try {
        const response = await fetchData(`/utilisateur/${userInfo?.id}/annonces`, 'GET', undefined, setLoading);
        setCards(response);
      } catch (error) {
        console.error('Erreur lors de la récupération des annonces utilisateur:', error);
      }
    };

    fetchUserListings();
  }, [userInfo?.id, setLoading, setCards]);


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
          <CardList cards={annonces} editMode/>

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
