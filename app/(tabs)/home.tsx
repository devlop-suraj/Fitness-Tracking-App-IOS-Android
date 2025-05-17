import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format } from 'date-fns';
import { theme } from '@/constants/theme';
import { ActivityRing } from '@/components/ActivityRing';
import { StatsCard } from '@/components/StatsCard';
import { DailyGoal } from '@/components/DailyGoal';
import { fetchDailyActivity } from '@/api/fitnessApi';
import { ActivityData } from '@/types/fitness';

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [activityData, setActivityData] = useState<ActivityData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadActivityData = async () => {
      try {
        setLoading(true);
        const data = await fetchDailyActivity();
        setActivityData(data);
        setError(null);
      } catch (err) {
        setError('Unable to load activity data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadActivityData();
  }, []);

  // Get current date in "Monday, June 10" format
  const currentDate = format(new Date(), 'EEEE, MMMM d');

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary[600]} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.date}>{currentDate}</Text>
          <Text style={styles.title}>Daily Activity</Text>
        </View>

        <View style={styles.ringContainer}>
          <ActivityRing 
            steps={activityData?.steps || 0} 
            goal={activityData?.goals.steps || 10000} 
          />
        </View>

        <View style={styles.statsContainer}>
          <StatsCard 
            title="Steps"
            value={activityData?.steps.toLocaleString() || '0'}
            icon="footprints"
            color={theme.colors.primary[500]}
          />
          <StatsCard 
            title="Calories"
            value={activityData?.calories.toLocaleString() || '0'}
            icon="flame"
            color={theme.colors.orange[500]}
          />
          <StatsCard 
            title="Distance"
            value={`${activityData?.distance.toFixed(2) || '0'} km`}
            icon="map-pin"
            color={theme.colors.purple[500]}
          />
          <StatsCard 
            title="Active Min"
            value={activityData?.activeMinutes.toString() || '0'}
            icon="timer"
            color={theme.colors.green[500]}
          />
        </View>

        <View style={styles.goalsSection}>
          <Text style={styles.sectionTitle}>Daily Goals</Text>
          <View style={styles.goalsList}>
            <DailyGoal 
              title="Steps" 
              current={activityData?.steps || 0} 
              goal={activityData?.goals.steps || 10000}
              color={theme.colors.primary[500]}
            />
            <DailyGoal 
              title="Active Minutes" 
              current={activityData?.activeMinutes || 0} 
              goal={activityData?.goals.activeMinutes || 30}
              color={theme.colors.purple[500]}
            />
            <DailyGoal 
              title="Calories" 
              current={activityData?.calories || 0} 
              goal={activityData?.goals.calories || 2500}
              color={theme.colors.orange[500]}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.error[500],
    textAlign: 'center',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[500],
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: theme.colors.gray[900],
  },
  ringContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  goalsSection: {
    marginTop: 32,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: theme.colors.gray[900],
    marginBottom: 16,
  },
  goalsList: {
    gap: 16,
  },
});