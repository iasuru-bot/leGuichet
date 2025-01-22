import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import ReportForm from '@/components/ReportForm';
import ReportList from '@/components/ReportList';
import { fetchData } from '@/hooks/fetchData';
import { useThemeColor } from '@/hooks/useThemeColor';

import { useLoading } from './LoadingContext';

import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';
import Button from '@/components/Button';

type ReportPageRouteProp = RouteProp<RootStackParamList, 'ReportPage'>;

const ReportPage = () => {
  const route = useRoute<ReportPageRouteProp>();
  const { annonceId }: any = route.params;
  const [signalements, setSignalements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { setLoading } = useLoading();

  const backgroundColor = useThemeColor({}, 'background');
  const primaryColor = useThemeColor({}, 'primary');

  useEffect(() => {
    const fetchSignalements = async () => {
      try {
        const responseSignalements = await fetchData(`/annonce/${annonceId}/signalements`, 'GET',undefined, setLoading);
        setSignalements(responseSignalements);
      } catch (error) {
        console.error('Failed to fetch signalements:', error);
      }
    };

    fetchSignalements();
  }, [annonceId]);

  const handleFormClose = () => {
    setShowForm(false);
    //fetchSignalements();
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>

      {!showForm && <><ReportList signalements={signalements} /><Button title="Signaler l'annonce" onPress={() => setShowForm(true)} /></>}
      {showForm && <ReportForm annonceId={annonceId} onClose={handleFormClose} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default ReportPage;