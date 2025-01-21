import React from 'react';
import { View, FlatList, SafeAreaView, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from './card';
import { CardTypeId } from '@/types/CardType';
import { HomeScreenNavigationProp } from '@/types/navigation';

interface CardListProps {
  cards: CardTypeId[];
}

const CardList: React.FC<CardListProps> = ({ cards }) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const screenWidth = Dimensions.get('window').width;
  const numColumns = screenWidth > 400 ? 2 : 1;

  const onCardPress = (id: string) => {
    navigation.navigate('Annonce', { id });
  };

  const renderCardItem = ({ item }: { item: CardTypeId }) => (
    <View style={[styles.card]}>
      <Card
        imageUrl={item.imageUrl}
        category={item.category}
        heading={item.heading}
        authorName={item.authorName}
        authorDate={item.authorDate}
        onPress={() => onCardPress(item.id)}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      <FlatList
        data={cards}
        renderItem={renderCardItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
        contentContainerStyle={styles.cardList}
        />
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    marginLeft: 6,
  },
  scrollView: {
    flex: 1,
  },
  cardList: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 6,
    alignSelf: 'center',
    width: '100%',
  }
});

export default CardList;