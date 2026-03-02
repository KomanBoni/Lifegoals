import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import type { Goal, GoalStatus } from '../types/goal';

interface GoalItemProps {
  goal: Goal;
  onStatusChange: (id: string, status: GoalStatus) => void;
  onDelete: (id: string) => void;
}

const STATUS_LABELS: Record<GoalStatus, string> = {
  progress: 'En cours',
  completed: 'Terminé',
  abandoned: 'Abandonné',
};

const STATUS_COLORS: Record<GoalStatus, string> = {
  progress: '#2563eb',
  completed: '#22c55e',
  abandoned: '#64748b',
};

function cycleStatus(goal: Goal): GoalStatus {
  if (goal.status === 'progress') return 'completed';
  if (goal.status === 'completed') return 'abandoned';
  return 'progress';
}

export function GoalItem({ goal, onStatusChange, onDelete }: GoalItemProps) {
  const handleDelete = () => {
    Alert.alert(
      'Supprimer l\'objectif',
      `tu es sur de supprimer ton objectif « ${goal.title} » ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive', onPress: () => onDelete(goal.id) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            goal.status === 'completed' && styles.titleCompleted,
            goal.status === 'abandoned' && styles.titleAbandoned,
          ]}
          numberOfLines={2}
        >
          {goal.title}
        </Text>
        <View style={[styles.badge, { backgroundColor: STATUS_COLORS[goal.status] }]}>
          <Text style={styles.badgeText}>{STATUS_LABELS[goal.status]}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => onStatusChange(goal.id, cycleStatus(goal))}
        >
          <Text style={styles.actionBtnText}>
            Changer → {STATUS_LABELS[cycleStatus(goal)]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, styles.actionBtnDanger]}
          onPress={handleDelete}
        >
          <Text style={styles.actionBtnText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: '#64748b',
  },
  titleAbandoned: {
    color: '#94a3b8',
    fontStyle: 'italic',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  actions: {
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
});
