import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressCounterProps {
  completed: number;
  total: number;
}

export function ProgressCounter({ completed, total }: ProgressCounterProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {completed}/{total} objectifs terminés ({percentage}%)
      </Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  text: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 8,
  },
  track: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#22c55e',
    borderRadius: 4,
  },
});
