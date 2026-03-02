import React from 'react';
import { View, FlatList, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import type { Goal } from '../types/goal';

const GOALS: Goal[] = [];

export function HomeScreen() {
  const renderItem = () => null;
  const keyExtractor = (item: Goal) => item.id;

  const ListEmptyComponent = () => (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>Tu es nul ta 0 objectif pour le moment</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={GOALS}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  listContent: {
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) + 16 : 56,
    paddingBottom: 24,
  },
  empty: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
});
