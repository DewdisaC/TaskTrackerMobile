import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { useTasks } from '@/context/TaskContext';
import type { TaskPriority } from '@/types/task';

export default function AddTaskScreen() {
  const router = useRouter();
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');

  const submit = () => {
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      Alert.alert('Task title required', 'Please enter a title for your task.');
      return;
    }
    addTask({ title: cleanTitle, description: description.trim(), dueDate: dueDate.trim(), priority });
    router.back();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Create a task</Text>
        <Text style={styles.subtitle}>Add the details you need to stay organized.</Text>

        <Text style={styles.label}>Title</Text>
        <TextInput value={title} onChangeText={setTitle} placeholder="e.g. Finish project report" placeholderTextColor="#94a3b8" style={styles.input} autoFocus />

        <Text style={styles.label}>Description</Text>
        <TextInput value={description} onChangeText={setDescription} placeholder="Add more context (optional)" placeholderTextColor="#94a3b8" style={[styles.input, styles.textarea]} multiline textAlignVertical="top" />

        <Text style={styles.label}>Due date</Text>
        <TextInput value={dueDate} onChangeText={setDueDate} placeholder="YYYY-MM-DD (optional)" placeholderTextColor="#94a3b8" style={styles.input} />

        <Text style={styles.label}>Priority</Text>
        <View style={styles.priorityRow}>
          {(['low', 'medium', 'high'] as TaskPriority[]).map((item) => (
            <Pressable key={item} onPress={() => setPriority(item)} style={[styles.priorityButton, priority === item && styles.priorityActive]}>
              <Text style={[styles.priorityText, priority === item && styles.priorityTextActive]}>{item[0].toUpperCase() + item.slice(1)}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable onPress={submit} style={styles.saveButton}><Text style={styles.saveText}>Create Task</Text></Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { padding: 22, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: '800', color: '#0f172a' },
  subtitle: { marginTop: 6, color: '#64748b', lineHeight: 20, marginBottom: 26 },
  label: { fontSize: 13, fontWeight: '700', color: '#334155', marginBottom: 8, marginTop: 15 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#dbe1e8', borderRadius: 13, paddingHorizontal: 14, paddingVertical: 13, fontSize: 15, color: '#0f172a' },
  textarea: { minHeight: 105, paddingTop: 13 },
  priorityRow: { flexDirection: 'row', gap: 9 },
  priorityButton: { flex: 1, borderRadius: 12, borderWidth: 1, borderColor: '#dbe1e8', backgroundColor: '#fff', paddingVertical: 13, alignItems: 'center' },
  priorityActive: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  priorityText: { fontWeight: '700', color: '#64748b' },
  priorityTextActive: { color: '#fff' },
  saveButton: { marginTop: 30, backgroundColor: '#2563eb', borderRadius: 14, alignItems: 'center', paddingVertical: 15 },
  saveText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});
