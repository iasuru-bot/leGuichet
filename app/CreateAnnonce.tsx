import React from 'react';
import { View, StyleSheet } from 'react-native';
import FormAnnonce from '@/components/FormAnnonce';
import { useThemeColor } from '@/hooks/useThemeColor';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Navbar from '@/components/Navbar';

type CreateAnnonceProps = {
  navigation: StackNavigationProp<any>;
  route: RouteProp<any>;
};

const CreateAnnonce: React.FC<CreateAnnonceProps> = ({ navigation }) => {
  const backgroundColor = useThemeColor({}, 'background');

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <FormAnnonce onClose={handleClose} />
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default CreateAnnonce;