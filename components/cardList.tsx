import React from 'react';
import { ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Card from './card';

interface CardData {
  id: string;
  imageUrl: string;
  category: string;
  heading: string;
  authorName: string;
  authorDate: string;
}

interface CardListProps {
  cards: CardData[];
}

const CardList: React.FC<CardListProps> = ({ cards }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {cards.map(card => (
          <Card
            key={card.id}
            imageUrl={card.imageUrl}
            category={card.category}
            heading={card.heading}
            authorName={card.authorName}
            authorDate={card.authorDate}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default CardList;
