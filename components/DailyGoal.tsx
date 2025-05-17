import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

interface DailyGoalProps {
  title: string;
  current: number;
  goal: number;
  color: string;
}

export const DailyGoal: React.FC<DailyGoalProps> = ({ 
  title, 
  current, 
  goal,
  color 
}) => {
  const progress = Math.min(current / goal, 1);
  const percentage = Math.round(progress * 100);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.progress}>
          <Text style={styles.current}>{current.toLocaleString()}</Text>
          <Text style={styles.divider}> / </Text>
          <Text style={styles.goal}>{goal.toLocaleString()}</Text>
        </Text>
      </View>
      
      <View style={styles.progressBarContainer}>
        <View 
          style={[
            styles.progressBar, 
            { 
              width: `${percentage}%`,
              backgroundColor: percentage >= 100 ? theme.colors.success[500] : color
            }
          ]} 
        />
      </View>
      
      <Text style={styles.percentageText}>{percentage}% completed</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: theme.colors.gray[700],
  },
  progress: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  current: {
    fontFamily: 'Inter-SemiBold',
    color: theme.colors.gray[900],
  },
  divider: {
    color: theme.colors.gray[400],
  },
  goal: {
    color: theme.colors.gray[500],
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: theme.colors.gray[200],
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  percentageText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.gray[500],
    textAlign: 'right',
  },
});