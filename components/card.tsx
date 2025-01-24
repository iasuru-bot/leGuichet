import React from 'react';
import { View, Text, ImageBackground, StyleSheet,Image, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { AnnonceType } from '@/types/GlobalType';
import { endpoint } from '@/constants/Other';

interface CardProps extends AnnonceType {
  onPress: () => void;  
}

const Card: React.FC<CardProps> = ({ filePath, Categorie, titre, Utilisateur, datePublication, prix, onPress }) => {
  
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const categoryColor = useThemeColor({}, 'primary');
  const headingColor = useThemeColor({}, 'tertiary');
  const authorColor = useThemeColor({}, 'gray');

  const createUri = endpoint + "/public/serve/" + filePath.split('/').pop();
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor ,borderColor:categoryColor }]} onPress={onPress}>
      <Image
        source={{ uri: createUri }}
        style={styles.cardImage}
      />
      <Text style={[styles.category, { color: categoryColor }]}>{Categorie.nom}</Text>
      <Text style={[styles.heading, { color: headingColor }]}>{titre}</Text>
      <View style={styles.authorContainer}>
        <Text style={[styles.prix, { color: authorColor }]}>
          {prix} €</Text>
        <Text style={[styles.author, { color: authorColor }]}>
          By <Text style={styles.name}>{Utilisateur.nom + Utilisateur.prenom}</Text> {new Date(datePublication).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 'auto',
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    height: 300,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginVertical: 8,
  },
  category: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: '600',
    paddingBottom: 10,
  },
  heading: {
    fontWeight: '600',
    paddingBottom: 0 ,
  },
  authorContainer: {
    paddingTop: 20,
  },
  author: {
    fontWeight: '400',
    fontSize: 11,
  },
  name: {
    fontWeight: '600',
  },
  prix: {
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: '600',
    paddingBottom: 4,
  },
});

export default Card;
