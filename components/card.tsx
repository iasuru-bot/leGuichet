import React from 'react';
import { View, Text, ImageBackground, StyleSheet,Image, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CardType } from '@/types/CardType';

interface CardProps extends CardType {
  onPress: () => void;  
}

const Card: React.FC<CardProps> = ({ imageUrl, category, heading, authorName, authorDate, onPress }) => {
  
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const categoryColor = useThemeColor({}, 'primary');
  const headingColor = useThemeColor({}, 'tertiary');
  const authorColor = useThemeColor({}, 'gray');

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor ,borderColor:categoryColor }]} onPress={onPress}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.cardImage}
      />
      <Text style={[styles.category, { color: categoryColor }]}>{category}</Text>
      <Text style={[styles.heading, { color: headingColor }]}>{heading}</Text>
      <View style={styles.authorContainer}>
        <Text style={[styles.author, { color: authorColor }]}>
          By <Text style={styles.name}>{authorName}</Text> {authorDate}
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
