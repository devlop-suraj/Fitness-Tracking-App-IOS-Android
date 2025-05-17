export interface ActivityData {
  date: string;
  steps: number;
  calories: number;
  distance: number;
  activeMinutes: number;
  goals: {
    steps: number;
    calories: number;
    activeMinutes: number;
  };
}

export interface WeeklyActivityData {
  startDate: string;
  endDate: string;
  dailySteps: number[];
  dailyCalories: number[];
  dailyActiveMinutes: number[];
  totalSteps: number;
  totalCalories: number;
  avgActiveMinutes: number;
}

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  weight: number;
  height: number;
  goals: {
    steps: number;
    calories: number;
    activeMinutes: number;
  };
}