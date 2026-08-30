import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Task } from '@/types/task';

const priorityColors = {
  low: '#16a34a',
  medium: '#d97706',
  high: '#dc2626',
};

export function TaskCard({ task, onToggle, onPress }: { task: Task; onToggle: () => void; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <Pressable onPress={onToggle} hitSlop={10} style={[styles.check, task.completed && styles.checked]}>
        {task.completed && <Ionicons name="checkmark" size={16} color="#fff" />}
      </Pressable>
      <View style={styles.content}>
        <Text style={[styles.title, task.completed && styles.completed]} numberOfLines={1}>
          {task.title}
        </Text>
        {!!task.description && (
          <Text style={styles.description} numberOfLines={1}>
            {task.description}
          </Text>
        )}
        <View style={styles.meta}>
          <View style={[styles.priority, { backgroundColor: priorityColors[task.priority] }]}>
            <Text style={styles.priorityText}>{task.priority.toUpperCase()}</Text>
          </View>
          {!!task.dueDate && <Text style={styles.date}>Due {task.dueDate}</Text>}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#e5e7eb' },
  pressed: { opacity: 0.75 },
  check: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#9ca3af', alignItems: 'center', justifyContent: 'center' },
  checked: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  content: { flex: 1 },
  title: { fontSize: 16, fontWeight: '700', color: '#111827' },
  completed: { textDecorationLine: 'line-through', color: '#9ca3af' },
  description: { marginTop: 4, fontSize: 13, color: '#6b7280' },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 9 },
  priority: { borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3 },
  priorityText: { color: '#fff', fontSize: 9, fontWeight: '800' },
  date: { color: '#6b7280', fontSize: 11 },
});
