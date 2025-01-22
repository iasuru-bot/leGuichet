import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { SignalementType } from '@/types/GlobalType';
import ReportItem from './ReportItem';

interface ReportListProps {
  signalements: SignalementType[];
  onDelete?: (report: SignalementType) => void;
}

const ReportList: React.FC<ReportListProps> = ({ signalements, onDelete }) => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');

  const renderItem = ({ item }: { item: SignalementType }) => (
    <ReportItem report={item} onDelete={onDelete ? () => onDelete(item) : undefined} />
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: primaryColor }]}>Signalements</Text>
      <FlatList
        data={signalements}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
});

export default ReportList;