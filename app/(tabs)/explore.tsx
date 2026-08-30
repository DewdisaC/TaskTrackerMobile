import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useTasks } from '@/context/TaskContext';

export default function StatisticsScreen() {
  const { tasks } = useTasks();
  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.length - completed;
  const high = tasks.filter((task) => task.priority === 'high' && !task.completed).length;
  const completionRate = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.eyebrow}>OVERVIEW</Text>
      <Text style={styles.heading}>Your productivity</Text>
      <Text style={styles.subtitle}>A quick look at your current task progress.</Text>

      <View style={styles.hero}>
        <View style={styles.heroIcon}><Ionicons name="analytics" size={25} color="#fff" /></View>
        <View style={styles.heroCopy}><Text style={styles.heroValue}>{completionRate}%</Text><Text style={styles.heroLabel}>completion rate</Text></View>
      </View>

      <View style={styles.grid}>
        <View style={styles.card}><Text style={styles.number}>{tasks.length}</Text><Text style={styles.label}>Total tasks</Text></View>
        <View style={styles.card}><Text style={styles.number}>{completed}</Text><Text style={styles.label}>Completed</Text></View>
        <View style={styles.card}><Text style={styles.number}>{pending}</Text><Text style={styles.label}>Pending</Text></View>
        <View style={styles.card}><Text style={styles.number}>{high}</Text><Text style={styles.label}>High priority</Text></View>
      </View>

      <View style={styles.breakdown}>
        <Text style={styles.sectionTitle}>Progress</Text>
        <View style={styles.progressTrack}><View style={[styles.progress, { width: `${completionRate}%` }]} /></View>
        <View style={styles.progressLabels}><Text style={styles.label}>{completed} completed</Text><Text style={styles.label}>{pending} remaining</Text></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 28, backgroundColor: '#f8fafc', minHeight: '100%' },
  eyebrow: { fontSize: 11, fontWeight: '800', letterSpacing: 1.5, color: '#2563eb' },
  heading: { marginTop: 6, fontSize: 28, fontWeight: '800', color: '#0f172a' },
  subtitle: { marginTop: 7, color: '#64748b', lineHeight: 20 },
  hero: { flexDirection: 'row', alignItems: 'center', marginTop: 24, padding: 20, borderRadius: 20, backgroundColor: '#2563eb' },
  heroIcon: { width: 50, height: 50, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
  heroCopy: { marginLeft: 15 },
  heroValue: { color: '#fff', fontSize: 28, fontWeight: '800' },
  heroLabel: { color: '#dbeafe', marginTop: 2 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 14 },
  card: { width: '48%', flexGrow: 1, backgroundColor: '#fff', borderRadius: 16, padding: 18, borderWidth: 1, borderColor: '#e5e7eb' },
  number: { fontSize: 24, fontWeight: '800', color: '#0f172a' },
  label: { marginTop: 5, color: '#64748b', fontSize: 12 },
  breakdown: { marginTop: 14, backgroundColor: '#fff', borderRadius: 18, padding: 20, borderWidth: 1, borderColor: '#e5e7eb' },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: '#0f172a', marginBottom: 16 },
  progressTrack: { height: 10, borderRadius: 5, backgroundColor: '#e2e8f0', overflow: 'hidden' },
  progress: { height: '100%', backgroundColor: '#2563eb', borderRadius: 5 },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 9 },
});
