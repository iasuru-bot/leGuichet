import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import Annonce from '@/components/Annonce';
import { useSession } from './SessionContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import CustomBackButton from '@/components/CustomBackButton';

import { fetchData } from '@/hooks/fetchData';

type AnnoncePageRouteProp = RouteProp<RootStackParamList, 'Annonce'>;

const AnnoncePage = () => {
  const route = useRoute<AnnoncePageRouteProp>();
  const { id } = route.params;
  const { cards ,setSignalements } = useSession();

  const primaryColor = useThemeColor({}, 'primary');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  // Fetch the annonce data based on the id from the session
  const annonceData = cards.find((card) => card.id === id);

  useEffect(() => {
    const fetchSignalements = async () => {
      try {
        const responseSignalements = await fetchData(`/annonce/${id}/signalements`, 'GET');
        setSignalements(responseSignalements);
      } catch (error) {
        console.error('Failed to fetch signalements:', error);
      }
    };

    fetchSignalements();
  }, [id]);

  if (!annonceData) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <Text style={styles.errorText}>Annonce not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <CustomBackButton/>
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