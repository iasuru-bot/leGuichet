import React from 'react';
import { FlatList, StyleSheet, SafeAreaView, View, Dimensions } from 'react-native';
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
  const screenWidth = Dimensions.get('window').width;

  // Dynamically determine the number of columns based on screen width
  const numColumns = screenWidth > 400 ? 2 : 1;

  const renderCardItem = ({ item }: { item: CardData }) => (
    <View style={[styles.card, numColumns === 2 && styles.twoColumnCard]}>
      <Card
        imageUrl={item.imageUrl}
        category={item.category}
        heading={item.heading}
        authorName={item.authorName}
        authorDate={item.authorDate}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cards}
        renderItem={renderCardItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
        contentContainerStyle={[
          styles.cardList,
          numColumns === 1 && styles.centerContent, // Center content for one column
        ]}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 12,
  },
  cardList: {
    paddingBottom: 16, // Add some padding at the bottom
  },
  row: {
    justifyContent: 'space-between', // Space between cards in a row
  },
  centerContent: {
    alignItems: 'center', // Center items horizontally
  },
  card: {
    flex: 1,
    margin: 6, // Space around each card
  },
  twoColumnCard: {
    maxWidth: '48%', // Adjust card width for two-column layout
  },
});

export default CardList;
