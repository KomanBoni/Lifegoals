import React, { useState } from 'react';
import {View, FlatList, Text, StyleSheet, Platform, StatusBar} from 'react-native';
import type { Goal, GoalStatus } from '../types/goal';
import { generateId } from '../utils/id';
import { AddGoalInput } from '../components/AddGoalInput';
import { GoalItem } from '../components/GoalItem';

export function HomeScreen() {
  const [goals, setGoals] = useState<Goal[]>([]);

  const addGoal = (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setGoals((prev) => [
      ...prev,
      {
        id: generateId(),
        title: trimmed,
        status: 'progress',
        createdAt: Date.now(),
      },
    ]);
  };

  const updateGoalStatus = (id: string, status: GoalStatus) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, status } : g))
    );
  };

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const renderItem = ({ item }: { item: Goal }) => (
    <GoalItem
      goal={item}
      onStatusChange={updateGoalStatus}
      onDelete={deleteGoal}
    />
  );

  const keyExtractor = (item: Goal) => item.id;

  const ListEmptyComponent = () => (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>Tu es nul ta 0 objectif pour le moment</Text>
    </View>
  );

  const ListHeaderComponent = () => <AddGoalInput onAdd={addGoal} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={goals}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={ListEmptyComponent}
        ListHeaderComponent={ListHeaderComponent}
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
