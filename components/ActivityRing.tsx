import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Circle, G } from 'react-native-svg';
import { theme } from '@/constants/theme';

interface ActivityRingProps {
  steps: number;
  goal: number;
}

export const ActivityRing: React.FC<ActivityRingProps> = ({ steps, goal }) => {
  const radius = 100;
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(steps / goal, 1);
  const strokeDashoffset = circumference * (1 - progress);
  
  const formattedSteps = steps.toLocaleString();
  const percentage = Math.round(progress * 100);

  return (
    <View style={styles.container}>
      <Svg height={radius * 2 + strokeWidth} width={radius * 2 + strokeWidth}>
        <G transform={`translate(${(radius + strokeWidth / 2)}, ${(radius + strokeWidth / 2)})`}>
          {/* Background Circle */}
          <Circle
            r={radius}
            fill="transparent"
            stroke={theme.colors.gray[200]}
            strokeWidth={strokeWidth}
          />
          
          {/* Progress Circle */}
          <Circle
            r={radius}
            fill="transparent"
            stroke={percentage >= 100 ? theme.colors.success[500] : theme.colors.primary[500]}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90)"
          />
        </G>
      </Svg>
      
      <View style={styles.textContainer}>
        <Text style={styles.stepsText}>{formattedSteps}</Text>
        <Text style={styles.stepsLabel}>steps</Text>
        <Text style={styles.percentageText}>{percentage}% of goal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepsText: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    color: theme.colors.gray[900],
  },
  stepsLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.gray[500],
    marginTop: -5,
  },
  percentageText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.primary[600],
    marginTop: 8,
  },
});