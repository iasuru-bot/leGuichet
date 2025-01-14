import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

interface CardProps {
  imageUrl: string;
  category: string;
  heading: string;
  authorName: string;
  authorDate: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, category, heading, authorName, authorDate }) => {
  return (
    <View style={styles.card}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.cardImage}
        imageStyle={styles.cardImageStyle}
      />
      <Text style={styles.category}>{category}</Text>
      <TouchableOpacity>
        <Text style={styles.heading}>{heading}</Text>
      </TouchableOpacity>
      <View style={styles.authorContainer}>
        <Text style={styles.author}>
          By <Text style={styles.name}>{authorName}</Text> {authorDate}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 190,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 130,
    borderRadius: 6,
  },
  cardImageStyle: {
    borderRadius: 6,
  },
  category: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: '600',
    color: 'rgb(63, 121, 230)',
    paddingBottom: 10,
  },
  heading: {
    fontWeight: '600',
    color: 'rgb(88, 87, 87)',
    paddingBottom: 7,
  },
  authorContainer: {
    paddingTop: 20,
  },
  author: {
    color: 'gray',
    fontWeight: '400',
    fontSize: 11,
  },
  name: {
    fontWeight: '600',
  },
});

export default Card;
