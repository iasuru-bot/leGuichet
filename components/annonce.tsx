import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CardType } from '@/types/CardType';

const Annonce: React.FC<CardType> = ({ heading, category, imageUrl, authorDate, authorName }) => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const headingColor = useThemeColor({}, 'tertiary');
  const primaryColor = useThemeColor({}, 'primary');

  return (
    <View style={[styles.annonce, { backgroundColor, borderColor: primaryColor }]}>
      <Text style={[styles.titre, { color: headingColor }]}>{heading}</Text>
      <Text style={[styles.categorie, { color: primaryColor }]}><Text style={styles.label}>Catégorie:</Text> {category}</Text>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={[styles.datePublication, { color: textColor }]}><Text style={styles.label}>Date de publication:</Text> {authorDate}</Text>
      <Text style={[styles.auteur, { color: textColor }]}><Text style={styles.label}>Publié par:</Text> {authorName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  annonce: {
    borderWidth: 3,
    padding: 16,
    marginVertical: 16,
    borderRadius: 8,
    width: '100%', // Ensure the component takes full width of the parent
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
    height: 400,
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
});

export default Annonce;