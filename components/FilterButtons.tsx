import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export type FilterStatus = 'all' | 'progress' | 'completed';

interface FilterButtonsProps {
  activeFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

const FILTERS: { key: FilterStatus; label: string }[] = [
  { key: 'all', label: 'Tous' },
  { key: 'progress', label: 'En cours' },
  { key: 'completed', label: 'Terminés' },
];

export function FilterButtons({ activeFilter, onFilterChange }: FilterButtonsProps) {
  return (
    <View style={styles.container}>
      {FILTERS.map(({ key, label }) => (
        <TouchableOpacity
          key={key}
          style={[styles.button, activeFilter === key && styles.buttonActive]}
          onPress={() => onFilterChange(key)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.buttonText,
              activeFilter === key && styles.buttonTextActive,
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#2563eb',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#475569',
  },
  buttonTextActive: {
    color: '#fff',
  },
});
