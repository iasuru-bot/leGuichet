import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import Annonce from '@/components/annonce';
import { useSession } from './SessionContext';
import { useThemeColor } from '@/hooks/useThemeColor';

type AnnoncePageRouteProp = RouteProp<RootStackParamList, 'Annonce'>;

const AnnoncePage = () => {
  const route = useRoute<AnnoncePageRouteProp>();
  const { id } = route.params;
  const { cards } = useSession();

  const primaryColor = useThemeColor({}, 'primary');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  // Fetch the annonce data based on the id from the session
  const annonceData = cards.find((card) => card.id === id);

  if (!annonceData) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <Text style={styles.errorText}>Annonce not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.centeredView}>
          <Annonce {...annonceData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    width: '95%',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AnnoncePage;