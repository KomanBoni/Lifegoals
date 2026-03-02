import React, { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import type { Goal, GoalStatus } from '../types/goal';
import { generateId } from '../utils/id';
import { AddGoalInput } from '../components/AddGoalInput';

const STATUS_LABELS: Record<GoalStatus, string> = {
  progress: 'En cours',
  completed: 'Terminé',
  abandoned: 'Abandonné',
};

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

  const cycleStatus = (goal: Goal): GoalStatus => {
    if (goal.status === 'progress') return 'completed';
    if (goal.status === 'completed') return 'abandoned';
    return 'progress';
  };

  const handleDeletePress = (goal: Goal) => {
    Alert.alert(
      'Supprimer l\'objectif',
      `Voulez-vous vraiment supprimer « ${goal.title} » ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive', onPress: () => deleteGoal(goal.id) },
      ]
    );
  };

  const renderItem = ({ item }: { item: Goal }) => (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemStatus}>{STATUS_LABELS[item.status]}</Text>
      <View style={styles.itemActions}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => updateGoalStatus(item.id, cycleStatus(item))}
        >
          <Text style={styles.actionBtnText}>Changer → {STATUS_LABELS[cycleStatus(item)]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, styles.actionBtnDanger]}
          onPress={() => handleDeletePress(item)}
        >
          <Text style={styles.actionBtnText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  item: {
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 4,
  },
  itemStatus: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 12,
  },
  itemActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
  },
  actionBtnDanger: {
    backgroundColor: '#fee2e2',
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
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
