import React, { useState, useMemo } from 'react';
import { View, FlatList, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import type { Goal } from '../types/goal';
import type { FilterStatus } from '../components/FilterButtons';
import { useGoals } from '../context/GoalsContext';
import { AddGoalInput } from '../components/AddGoalInput';
import { FilterButtons } from '../components/FilterButtons';
import { ProgressCounter } from '../components/ProgressCounter';
import { GoalItem } from '../components/GoalItem';

export function HomeScreen() {
  const { goals, addGoal, updateGoalStatus, updateGoalTitle, deleteGoal } = useGoals();
  const [filter, setFilter] = useState<FilterStatus>('all');

  const filteredGoals = useMemo(() => {
    if (filter === 'all') return goals;
    return goals.filter((g) => g.status === filter);
  }, [goals, filter]);

  const completedCount = useMemo(
    () => goals.filter((g) => g.status === 'completed').length,
    [goals]
  );

  const renderItem = ({ item }: { item: Goal }) => (
    <GoalItem
      goal={item}
      onStatusChange={updateGoalStatus}
      onUpdateTitle={updateGoalTitle}
      onDelete={deleteGoal}
    />
  );

  const keyExtractor = (item: Goal) => item.id;

  const ListEmptyComponent = () => (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>
        {filter === 'all'
          ? 'Tu es nul ta 0 objectif pour le moment'
          : `0 objectif c'est mauvais "${filter === 'progress' ? 'en cours' : 'terminé'}".`}
      </Text>
    </View>
  );

  const ListHeaderComponent = () => (
    <>
      <AddGoalInput onAdd={addGoal} />
      <FilterButtons activeFilter={filter} onFilterChange={setFilter} />
      <ProgressCounter completed={completedCount} total={goals.length} />
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredGoals}
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
