import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { AnnonceType } from '@/types/GlobalType';
import CustomReportButton from '@/components/CustomReportButton';
import { Redirect, useNavigation } from 'expo-router';
import { HomeScreenNavigationProp } from '@/types/navigation';
import { endpoint } from '@/constants/Other';

const Annonce: React.FC<AnnonceType> = ({ titre, Categorie, description, Utilisateur, datePublication, statut, prix, filePath, id }) => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const headingColor = useThemeColor({}, 'tertiary');
  const primaryColor = useThemeColor({}, 'primary');
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const onPress = () => {
    navigation.navigate('ReportPage', { annonceId: id });
  };

  const createUri = endpoint + "/public/serve/" + filePath.split('/').pop();

  return (

    <View style={[styles.annonce, { backgroundColor, borderColor: primaryColor }]}>
      <CustomReportButton onPress={onPress} />
      <Text style={[styles.titre, { color: headingColor }]}>{titre}</Text>
      <Text style={[styles.categorie, { color: primaryColor }]}><Text style={styles.label}>Catégorie:</Text> {Categorie.nom}</Text>
      <Image source={{ uri: createUri }} style={styles.image} />
      <Text style={[styles.prix, { color: textColor }]}>{prix} €</Text>
      <Text style={[styles.description, { color: textColor }]}>{description}</Text>
      <Text style={[styles.datePublication, { color: textColor }]}><Text style={styles.label}>Date de publication:</Text> {new Date(datePublication).toLocaleDateString()}</Text>
      <Text style={[styles.auteur, { color: textColor }]}><Text style={styles.label}>Publié par:</Text> {Utilisateur.prenom + Utilisateur.nom}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  annonce: {
    borderWidth: 3,
    padding: 16,
    marginVertical: 16,
    borderRadius: 8,
    width: '100%',
  },
  titre: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  categorie: {
    marginVertical: 8,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginVertical: 8,
  },
  datePublication: {
    marginVertical: 8,
  },
  auteur: {
    marginVertical: 8,
  },
  label: {
    fontWeight: 'bold',
  },
  prix: {
    textTransform: 'uppercase',
    fontSize: 26,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 18,
  },
  description: {
    fontSize: 16,
    paddingBottom: 25,
  }
});

export default Annonce;