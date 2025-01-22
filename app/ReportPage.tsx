import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import ReportForm from '@/components/ReportForm';
import ReportList from '@/components/ReportList';
import { fetchData } from '@/hooks/fetchData';
import { useThemeColor } from '@/hooks/useThemeColor';

import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';

type ReportPageRouteProp = RouteProp<RootStackParamList, 'ReportPage'>;

const ReportPage = () => {
  const route = useRoute<ReportPageRouteProp>();
  const { annonceId }: any = route.params;
  const [signalements, setSignalements] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const backgroundColor = useThemeColor({}, 'background');
  const primaryColor = useThemeColor({}, 'primary');

  useEffect(() => {
    const fetchSignalements = async () => {
      try {
        const responseSignalements = await fetchData(`/annonce/${annonceId}/signalements`, 'GET');
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

      {!showForm && <><ReportList signalements={signalements} /><Button title="Signaler l'annonce" onPress={() => setShowForm(true)} color={primaryColor} /></>}
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