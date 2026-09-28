import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { useTasks } from '@/context/TaskContext';
import type { TaskPriority } from '@/types/task';

const priorities: TaskPriority[] = ['low', 'medium', 'high'];
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getTask, updateTask } = useTasks();
  const task = getTask(id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');

  useEffect(() => {
    if (!task) return;
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
    setPriority(task.priority);
  }, [task]);

  if (!task) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Task not found</Text>
        <Pressable onPress={() => router.back()}><Text style={styles.link}>Go back</Text></Pressable>
      </View>
    );
  }

  const save = () => {
    const cleanTitle = title.trim();
    const cleanDueDate = dueDate.trim();

    if (!cleanTitle) {
      Alert.alert('Task title required', 'Please enter a title for your task.');
      return;
    }

    if (cleanDueDate && !isoDatePattern.test(cleanDueDate)) {
      Alert.alert('Invalid due date', 'Use the YYYY-MM-DD format.');
      return;
    }

    updateTask(task.id, {
      title: cleanTitle,
      description: description.trim(),
      dueDate: cleanDueDate,
      priority,
    });

    router.back();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Edit task</Text>
        <Text style={styles.subtitle}>Update the details and keep your task list current.</Text>

        <Text style={styles.label}>Title</Text>
        <TextInput value={title} onChangeText={setTitle} style={styles.input} autoFocus />

        <Text style={styles.label}>Description</Text>
        <TextInput value={description} onChangeText={setDescription} style={[styles.input, styles.textarea]} multiline textAlignVertical="top" />

        <Text style={styles.label}>Due date</Text>
        <TextInput value={dueDate} onChangeText={setDueDate} placeholder="YYYY-MM-DD (optional)" placeholderTextColor="#94a3b8" style={styles.input} />

        <Text style={styles.label}>Priority</Text>
        <View style={styles.priorityRow}>
          {priorities.map((item) => (
            <Pressable key={item} onPress={() => setPriority(item)} style={[styles.priorityButton, priority === item && styles.priorityActive]}>
              <Text style={[styles.priorityText, priority === item && styles.priorityTextActive]}>{item[0].toUpperCase() + item.slice(1)}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable onPress={save} style={styles.saveButton}>
          <Text style={styles.saveText}>Save Changes</Text>
        </Pressable>
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
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' },
  notFound: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  link: { marginTop: 10, color: '#2563eb', fontWeight: '700' },
});
