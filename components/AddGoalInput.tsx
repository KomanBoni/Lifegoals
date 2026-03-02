import React, { useState } from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity, Text, Keyboard} from 'react-native';

interface AddGoalInputProps {
  onAdd: (title: string) => void;
}

export function AddGoalInput({ onAdd }: AddGoalInputProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    const trimmed = title.trim();
    if (trimmed) {
      onAdd(trimmed);
      setTitle('');
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Met ton objectif et respecte le "
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
        maxLength={200}
      />
      <TouchableOpacity
        style={[styles.button, !title.trim() && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!title.trim()}
      >
        <Text style={styles.buttonText}>Ajouter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    paddingHorizontal: 16,
    height: 44,
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: '#94a3b8',
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
