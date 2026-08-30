import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useTasks } from '@/context/TaskContext';

const priorityColors = { low: '#16a34a', medium: '#d97706', high: '#dc2626' };

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getTask, toggleTask, deleteTask } = useTasks();
  const task = getTask(id);

  if (!task) {
    return <View style={styles.center}><Text style={styles.notFound}>Task not found</Text><Pressable onPress={() => router.back()}><Text style={styles.link}>Go back</Text></Pressable></View>;
  }

  const confirmDelete = () => Alert.alert('Delete task?', 'This action cannot be undone.', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Delete', style: 'destructive', onPress: () => { deleteTask(task.id); router.back(); } },
  ]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.topRow}>
          <View style={[styles.badge, { backgroundColor: priorityColors[task.priority] }]}><Text style={styles.badgeText}>{task.priority.toUpperCase()} PRIORITY</Text></View>
          {task.completed && <View style={styles.doneBadge}><Text style={styles.doneText}>COMPLETED</Text></View>}
        </View>
        <Text style={[styles.title, task.completed && styles.strike]}>{task.title}</Text>
        <Text style={styles.description}>{task.description || 'No description provided.'}</Text>
        {!!task.dueDate && <View style={styles.info}><Ionicons name="calendar-outline" size={20} color="#2563eb" /><View><Text style={styles.infoLabel}>Due date</Text><Text style={styles.infoValue}>{task.dueDate}</Text></View></View>}
      </View>

      <Pressable style={styles.completeButton} onPress={() => toggleTask(task.id)}>
        <Ionicons name={task.completed ? 'refresh' : 'checkmark-circle-outline'} size={22} color="#fff" />
        <Text style={styles.completeText}>{task.completed ? 'Mark as Pending' : 'Mark as Completed'}</Text>
      </Pressable>
      <Pressable style={styles.deleteButton} onPress={confirmDelete}>
        <Ionicons name="trash-outline" size={21} color="#dc2626" />
        <Text style={styles.deleteText}>Delete Task</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f8fafc' },
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#e5e7eb' },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  badge: { borderRadius: 7, paddingHorizontal: 8, paddingVertical: 5 },
  badgeText: { color: '#fff', fontSize: 9, fontWeight: '800' },
  doneBadge: { borderRadius: 7, paddingHorizontal: 8, paddingVertical: 5, backgroundColor: '#dcfce7' },
  doneText: { color: '#15803d', fontSize: 9, fontWeight: '800' },
  title: { marginTop: 20, fontSize: 27, lineHeight: 34, fontWeight: '800', color: '#0f172a' },
  strike: { textDecorationLine: 'line-through', color: '#94a3b8' },
  description: { marginTop: 12, color: '#64748b', lineHeight: 22, fontSize: 15 },
  info: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 24, paddingTop: 18, borderTopWidth: 1, borderTopColor: '#eef2f7' },
  infoLabel: { fontSize: 11, color: '#94a3b8' },
  infoValue: { marginTop: 2, fontSize: 14, fontWeight: '700', color: '#334155' },
  completeButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 18, backgroundColor: '#2563eb', borderRadius: 14, paddingVertical: 15 },
  completeText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  deleteButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 10, backgroundColor: '#fff', borderRadius: 14, paddingVertical: 14, borderWidth: 1, borderColor: '#fecaca' },
  deleteText: { color: '#dc2626', fontWeight: '800' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' },
  notFound: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  link: { marginTop: 10, color: '#2563eb', fontWeight: '700' },
});
