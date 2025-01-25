import React from 'react';
import { View, FlatList, SafeAreaView, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from './Card';
import { HomeScreenNavigationProp } from '@/types/navigation';
import { AnnonceType } from '@/types/GlobalType';

interface CardListProps {
  cards: AnnonceType[];
  editMode?: boolean;
}

const CardList: React.FC<CardListProps> = ({ cards, editMode = false }) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const screenWidth = Dimensions.get('window').width;
  const numColumns = screenWidth > 400 ? 2 : 1;

  const onCardPress = (id: string) => {
    navigation.navigate('Annonce', { id });
  };

  const renderCardItem = ({ item }: { item: AnnonceType }) => (
    <View style={[styles.card]}>
      <Card
        filePath={item.filePath}
        Categorie={item.Categorie}
        titre={item.titre}
        Utilisateur={item.Utilisateur}
        datePublication={item.datePublication}
        onPress={() => onCardPress(item.id)} 
        id={item.id} 
        description={item.description} 
        prix={item.prix} 
        statut={item.statut}      
        editMode={editMode}
        />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cards}
        renderItem={renderCardItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
        contentContainerStyle={styles.cardList}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    marginLeft: 6,
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