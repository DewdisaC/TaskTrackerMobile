import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';

import { TaskCard } from '@/components/TaskCard';
import { useTasks } from '@/context/TaskContext';

export default function HomeScreen() {
  const router = useRouter();
  const { tasks, loading, toggleTask } = useTasks();
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  useFocusEffect(useCallback(() => undefined, []));

  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.length - completed;
  const visibleTasks = useMemo(() => tasks.filter((task) => filter === 'all' || (filter === 'completed' ? task.completed : !task.completed)), [tasks, filter]);

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 350);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={visibleTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View>
                <Text style={styles.eyebrow}>TASK TRACKER</Text>
                <Text style={styles.heading}>Stay on top of your day.</Text>
              </View>
              <Pressable style={styles.addIcon} onPress={() => router.push('/add-task')}>
                <Ionicons name="add" size={24} color="#fff" />
              </Pressable>
            </View>
            <View style={styles.statsRow}>
              <View style={styles.statCard}><Text style={styles.statNumber}>{tasks.length}</Text><Text style={styles.statLabel}>Total</Text></View>
              <View style={styles.statCard}><Text style={styles.statNumber}>{pending}</Text><Text style={styles.statLabel}>Pending</Text></View>
              <View style={styles.statCard}><Text style={styles.statNumber}>{completed}</Text><Text style={styles.statLabel}>Done</Text></View>
            </View>
            <View style={styles.filters}>
              {(['all', 'pending', 'completed'] as const).map((item) => (
                <Pressable key={item} onPress={() => setFilter(item)} style={[styles.filter, filter === item && styles.filterActive]}>
                  <Text style={[styles.filterText, filter === item && styles.filterTextActive]}>{item[0].toUpperCase() + item.slice(1)}</Text>
                </Pressable>
              ))}
            </View>
            <Text style={styles.sectionTitle}>{filter === 'all' ? 'Your Tasks' : `${filter[0].toUpperCase()}${filter.slice(1)} Tasks`}</Text>
          </>
        }
        renderItem={({ item }) => <TaskCard task={item} onToggle={() => toggleTask(item.id)} onPress={() => router.push(`/task/${item.id}`)} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="checkmark-circle-outline" size={48} color="#2563eb" />
            <Text style={styles.emptyTitle}>{loading ? 'Loading tasks...' : 'No tasks here'}</Text>
            {!loading && <Text style={styles.emptyText}>Create a task to start organizing your day.</Text>}
          </View>
        }
      />
      <Pressable style={styles.fab} onPress={() => router.push('/add-task')}>
        <Ionicons name="add" size={28} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  list: { padding: 20, paddingBottom: 100 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 18, marginBottom: 22 },
  eyebrow: { fontSize: 11, fontWeight: '800', letterSpacing: 1.5, color: '#2563eb' },
  heading: { marginTop: 6, fontSize: 27, lineHeight: 33, fontWeight: '800', color: '#0f172a', maxWidth: 280 },
  addIcon: { width: 46, height: 46, borderRadius: 15, backgroundColor: '#2563eb', alignItems: 'center', justifyContent: 'center' },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 22 },
  statCard: { flex: 1, backgroundColor: '#fff', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: '#e5e7eb' },
  statNumber: { fontSize: 23, fontWeight: '800', color: '#0f172a' },
  statLabel: { marginTop: 4, fontSize: 12, color: '#64748b' },
  filters: { flexDirection: 'row', backgroundColor: '#e2e8f0', borderRadius: 12, padding: 4, marginBottom: 22 },
  filter: { flex: 1, paddingVertical: 9, borderRadius: 9, alignItems: 'center' },
  filterActive: { backgroundColor: '#fff' },
  filterText: { color: '#64748b', fontWeight: '600', fontSize: 12 },
  filterTextActive: { color: '#0f172a' },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a', marginBottom: 12 },
  empty: { alignItems: 'center', paddingVertical: 50, paddingHorizontal: 20 },
  emptyTitle: { marginTop: 14, fontSize: 18, fontWeight: '800', color: '#0f172a' },
  emptyText: { marginTop: 6, color: '#64748b', textAlign: 'center', lineHeight: 20 },
  fab: { position: 'absolute', right: 22, bottom: 24, width: 58, height: 58, borderRadius: 29, backgroundColor: '#2563eb', alignItems: 'center', justifyContent: 'center', elevation: 5, shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
});
