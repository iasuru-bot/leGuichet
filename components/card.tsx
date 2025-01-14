import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface CardProps {
  imageUrl: string;
  category: string;
  heading: string;
  authorName: string;
  authorDate: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, category, heading, authorName, authorDate }) => {
  // Utilisation des couleurs dynamiques
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const categoryColor = useThemeColor({}, 'primary');
  const headingColor = useThemeColor({}, 'secondary');
  const authorColor = useThemeColor({}, 'gray');

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.cardImage}
        imageStyle={styles.cardImageStyle}
      />
      <Text style={[styles.category, { color: categoryColor }]}>{category}</Text>
      <TouchableOpacity>
        <Text style={[styles.heading, { color: headingColor }]}>{heading}</Text>
      </TouchableOpacity>
      <View style={styles.authorContainer}>
        <Text style={[styles.author, { color: authorColor }]}>
          By <Text style={styles.name}>{authorName}</Text> {authorDate}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 190,
    padding: 8,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    height:280
  },
  cardImage: {
    width: '100%',
    height: 140,
    borderRadius: 6,
  },
  cardImageStyle: {
    borderRadius: 6,
  },
  category: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: '600',
    paddingBottom: 10,
  },
  heading: {
    fontWeight: '600',
    paddingBottom: 7,
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
});

export default Card;
