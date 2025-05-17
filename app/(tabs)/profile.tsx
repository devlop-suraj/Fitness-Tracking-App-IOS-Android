import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Platform, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/theme';
import { fetchUserProfile, updateUserProfile } from '@/api/fitnessApi';
import { UserProfile } from '@/types/fitness';
import { Settings, CreditCard as Edit2, Save, CircleCheck as CheckCircle } from 'lucide-react-native';

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [stepGoal, setStepGoal] = useState('');
  const [calorieGoal, setCalorieGoal] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchUserProfile();
        if (isMounted.current) {
          setProfile(data);
          setName(data.name);
          setAge(data.age.toString());
          setWeight(data.weight.toString());
          setHeight(data.height.toString());
          setStepGoal(data.goals.steps.toString());
          setCalorieGoal(data.goals.calories.toString());
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };
    
    loadProfile();

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted.current = false;
    };
  }, []);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setSaveSuccess(false);
  };

  const handleSave = async () => {
    if (!isMounted.current) return;
    
    setIsSaving(true);
    
    try {
      const updatedProfile = {
        ...profile,
        name,
        age: parseInt(age, 10),
        weight: parseFloat(weight),
        height: parseFloat(height),
        goals: {
          steps: parseInt(stepGoal, 10),
          calories: parseInt(calorieGoal, 10),
          activeMinutes: profile?.goals.activeMinutes || 30,
        }
      };
      
      await updateUserProfile(updatedProfile);
      
      if (isMounted.current) {
        setProfile(updatedProfile);
        setEditMode(false);
        setSaveSuccess(true);
        
        // Reset success message after a delay
        setTimeout(() => {
          if (isMounted.current) {
            setSaveSuccess(false);
          }
        }, 3000);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      if (isMounted.current) {
        setIsSaving(false);
      }
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, this would update the app's theme
  };

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={toggleEditMode}
          >
            {editMode ? (
              <Save color={theme.colors.primary[600]} size={24} />
            ) : (
              <Edit2 color={theme.colors.primary[600]} size={24} />
            )}
          </TouchableOpacity>
        </View>

        {saveSuccess && (
          <View style={styles.successMessage}>
            <CheckCircle color={theme.colors.success[500]} size={20} />
            <Text style={styles.successText}>Profile updated successfully!</Text>
          </View>
        )}
        
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{name.charAt(0)}</Text>
            </View>
            {!editMode ? (
              <Text style={styles.profileName}>{profile.name}</Text>
            ) : (
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Name"
              />
            )}
          </View>
          
          <View style={styles.profileDetails}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Age</Text>
              {!editMode ? (
                <Text style={styles.detailValue}>{profile.age} years</Text>
              ) : (
                <TextInput
                  style={styles.detailInput}
                  value={age}
                  onChangeText={setAge}
                  keyboardType="number-pad"
                  placeholder="Age"
                />
              )}
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Weight</Text>
              {!editMode ? (
                <Text style={styles.detailValue}>{profile.weight} kg</Text>
              ) : (
                <TextInput
                  style={styles.detailInput}
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="decimal-pad"
                  placeholder="Weight (kg)"
                />
              )}
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Height</Text>
              {!editMode ? (
                <Text style={styles.detailValue}>{profile.height} cm</Text>
              ) : (
                <TextInput
                  style={styles.detailInput}
                  value={height}
                  onChangeText={setHeight}
                  keyboardType="decimal-pad"
                  placeholder="Height (cm)"
                />
              )}
            </View>
          </View>
        </View>

        <View style={styles.goalsSection}>
          <Text style={styles.sectionTitle}>Fitness Goals</Text>
          
          <View style={styles.goalItem}>
            <Text style={styles.goalLabel}>Daily Steps</Text>
            {!editMode ? (
              <Text style={styles.goalValue}>{profile.goals.steps.toLocaleString()}</Text>
            ) : (
              <TextInput
                style={styles.goalInput}
                value={stepGoal}
                onChangeText={setStepGoal}
                keyboardType="number-pad"
                placeholder="Daily Steps Goal"
              />
            )}
          </View>
          
          <View style={styles.goalItem}>
            <Text style={styles.goalLabel}>Daily Calories</Text>
            {!editMode ? (
              <Text style={styles.goalValue}>{profile.goals.calories.toLocaleString()}</Text>
            ) : (
              <TextInput
                style={styles.goalInput}
                value={calorieGoal}
                onChangeText={setCalorieGoal}
                keyboardType="number-pad"
                placeholder="Daily Calories Goal"
              />
            )}
          </View>
          
          <View style={styles.goalItem}>
            <Text style={styles.goalLabel}>Active Minutes</Text>
            <Text style={styles.goalValue}>{profile.goals.activeMinutes} min</Text>
          </View>
        </View>
        
        <View style={[styles.settingsSection, { marginBottom: editMode ? 24 : 64 }]}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Settings size={20} color={theme.colors.gray[600]} />
              <Text style={styles.settingLabel}>Dark Mode</Text>
            </View>
            <Switch
              trackColor={{ false: theme.colors.gray[300], true: theme.colors.primary[400] }}
              thumbColor={isDarkMode ? theme.colors.primary[600] : theme.colors.gray[100]}
              ios_backgroundColor={theme.colors.gray[300]}
              onValueChange={toggleDarkMode}
              value={isDarkMode}
            />
          </View>
        </View>
        
        {editMode && (
          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={handleSave}
            disabled={isSaving}
          >
            <Text style={styles.saveButtonText}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Text>
          </TouchableOpacity>
        )}
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: theme.colors.gray[900],
  },
  editButton: {
    padding: 8,
  },
  successMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.success[50],
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 24,
    marginBottom: 16,
  },
  successText: {
    fontFamily: 'Inter-Medium',
    color: theme.colors.success[700],
    marginLeft: 8,
  },
  profileSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginHorizontal: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: theme.colors.primary[600],
  },
  profileName: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: theme.colors.gray[900],
  },
  input: {
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 12,
    width: '100%',
    textAlign: 'center',
  },
  profileDetails: {
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: theme.colors.gray[600],
  },
  detailValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.gray[900],
  },
  detailInput: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 12,
    width: 120,
    textAlign: 'right',
  },
  goalsSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: theme.colors.gray[900],
    marginBottom: 16,
  },
  goalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: theme.colors.gray[600],
  },
  goalValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.gray[900],
  },
  goalInput: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 12,
    width: 160,
    textAlign: 'right',
  },
  settingsSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: theme.colors.gray[700],
    marginLeft: 12,
  },
  saveButton: {
    backgroundColor: theme.colors.primary[600],
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 32,
    alignItems: 'center',
  },
  saveButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: 'white',
  },
});