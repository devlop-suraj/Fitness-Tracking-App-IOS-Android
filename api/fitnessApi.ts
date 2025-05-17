import { ActivityData, WeeklyActivityData, UserProfile } from '@/types/fitness';

// Mock data for daily activity
const mockDailyActivity: ActivityData = {
  date: new Date().toISOString(),
  steps: 7842,
  calories: 1875,
  distance: 5.3,
  activeMinutes: 42,
  goals: {
    steps: 10000,
    calories: 2500,
    activeMinutes: 30
  }
};

// Mock data for weekly activity
const mockWeeklyActivity: WeeklyActivityData = {
  startDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  endDate: new Date().toISOString(),
  dailySteps: [5231, 7842, 10327, 4521, 8732, 6543, 7842],
  dailyCalories: [1560, 1875, 2340, 1430, 2050, 1720, 1875],
  dailyActiveMinutes: [25, 42, 65, 20, 55, 35, 42],
  totalSteps: 51038,
  totalCalories: 12850,
  avgActiveMinutes: 40
};

// Mock user profile
const mockUserProfile: UserProfile = {
  id: 'user-1',
  name: 'Alex Johnson',
  age: 32,
  weight: 74.5,
  height: 178,
  goals: {
    steps: 10000,
    calories: 2500,
    activeMinutes: 30
  }
};

// Simulated API call delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch daily activity data
 */
export const fetchDailyActivity = async (): Promise<ActivityData> => {
  await delay(800);
  return mockDailyActivity;
};

/**
 * Fetch weekly activity data
 */
export const fetchWeeklyActivity = async (): Promise<WeeklyActivityData> => {
  await delay(1000);
  return mockWeeklyActivity;
};

/**
 * Fetch user profile data
 */
export const fetchUserProfile = async (): Promise<UserProfile> => {
  await delay(600);
  return mockUserProfile;
};

/**
 * Update user profile data
 */
export const updateUserProfile = async (profile: UserProfile): Promise<UserProfile> => {
  await delay(1200);
  // In a real app, this would send the data to a backend
  return profile;
};