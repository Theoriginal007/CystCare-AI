import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';

interface DailyInsight {
  type: 'nutrition' | 'exercise' | 'stress' | 'sleep' | 'medication';
  title: string;
  message: string;
  action: string;
  priority: 'low' | 'medium' | 'high';
  icon: string;
}

interface HealthGoal {
  id: string;
  title: string;
  target: string;
  current: number;
  targetValue: number;
  unit: string;
  deadline: string;
  progress: number;
}

export function AIHealthCoach() {
  const { colors } = useTheme();
  const [currentInsight, setCurrentInsight] = useState<DailyInsight | null>(null);
  const [healthGoals, setHealthGoals] = useState<HealthGoal[]>([]);
  const [weeklyScore, setWeeklyScore] = useState(0);

  const insights: DailyInsight[] = [
    {
      type: 'nutrition',
      title: 'Optimize Your Diet',
      message: 'Your inflammatory markers suggest reducing processed foods. Try adding turmeric and ginger to your meals today.',
      action: 'Log your meals for better tracking',
      priority: 'high',
      icon: '🥗'
    },
    {
      type: 'exercise',
      title: 'Movement Therapy',
      message: 'Light pelvic exercises can help reduce cyst-related discomfort. 10 minutes of gentle yoga is recommended.',
      action: 'Start guided session',
      priority: 'medium',
      icon: '🧘‍♀️'
    },
    {
      type: 'stress',
      title: 'Stress Management',
      message: 'Your stress levels may be affecting hormone balance. Try a 5-minute breathing exercise now.',
      action: 'Begin breathing exercise',
      priority: 'high',
      icon: '🧠'
    },
    {
      type: 'sleep',
      title: 'Sleep Optimization',
      message: 'Quality sleep supports hormone regulation. Aim for 7-8 hours tonight.',
      action: 'Set bedtime reminder',
      priority: 'medium',
      icon: '😴'
    }
  ];

  const mockGoals: HealthGoal[] = [
    {
      id: '1',
      title: 'Daily Water Intake',
      target: 'Drink 8 glasses of water daily',
      current: 6,
      targetValue: 8,
      unit: 'glasses',
      deadline: '2024-12-31',
      progress: 75
    },
    {
      id: '2',
      title: 'Exercise Routine',
      target: 'Exercise 4 times per week',
      current: 3,
      targetValue: 4,
      unit: 'sessions',
      deadline: '2024-12-31',
      progress: 75
    },
    {
      id: '3',
      title: 'Medication Adherence',
      target: 'Take medications on schedule',
      current: 95,
      targetValue: 100,
      unit: '%',
      deadline: '2024-12-31',
      progress: 95
    }
  ];

  useEffect(() => {
    // Simulate AI generating daily insights
    const randomInsight = insights[Math.floor(Math.random() * insights.length)];
    setCurrentInsight(randomInsight);
    setHealthGoals(mockGoals);
    setWeeklyScore(82);
  }, []);

  const getPriorityColor = (priority: string): readonly [string, string] => {
    switch (priority) {
      case 'high': return ['#ef4444', '#dc2626'] as const;
      case 'medium': return ['#f59e0b', '#d97706'] as const;
      case 'low': return ['#22c55e', '#16a34a'] as const;
      default: return ['#6b7280', '#4b5563'] as const;
    }
  };

  const startHealthAssessment = () => {
    Alert.alert(
      'AI Health Assessment',
      'I\'ll ask you a few questions about your current symptoms, mood, and activities to provide personalized recommendations.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Start Assessment', onPress: () => Alert.alert('Assessment', 'Feature coming soon!') }
      ]
    );
  };

  const updateGoal = (goalId: string) => {
    setHealthGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, current: Math.min(goal.current + 1, goal.targetValue), progress: Math.min(((goal.current + 1) / goal.targetValue) * 100, 100) }
        : goal
    ));
    Alert.alert('Great!', 'Goal progress updated. Keep up the good work!');
  };

  return (
    <View style={{ backgroundColor: colors.card, borderRadius: 20, padding: 20, margin: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text, marginBottom: 15 }}>
        🤖 AI Health Coach
      </Text>

      {/* Weekly Health Score */}
      <LinearGradient
        colors={(weeklyScore >= 80 ? ['#22c55e', '#16a34a'] : weeklyScore >= 60 ? ['#f59e0b', '#d97706'] : ['#ef4444', '#dc2626']) as readonly [string, string]}
        style={{ borderRadius: 15, padding: 20, marginBottom: 20 }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', marginBottom: 10 }}>
          📊 Weekly Health Score
        </Text>
        <Text style={{ fontSize: 36, fontWeight: 'bold', color: 'white', marginBottom: 5 }}>
          {weeklyScore}/100
        </Text>
        <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14 }}>
          {weeklyScore >= 80 ? 'Excellent progress!' : weeklyScore >= 60 ? 'Good progress, keep improving!' : 'Let\'s work on your health goals together!'}
        </Text>
      </LinearGradient>

      {/* Daily AI Insight */}
      {currentInsight && (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 10 }}>
            💡 Today's AI Insight
          </Text>
          <LinearGradient
            colors={getPriorityColor(currentInsight.priority)}
            style={{ borderRadius: 15, padding: 15, opacity: 0.9 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ fontSize: 24, marginRight: 10 }}>{currentInsight.icon}</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white', flex: 1 }}>
                {currentInsight.title}
              </Text>
            </View>
            <Text style={{ color: 'rgba(255,255,255,0.95)', marginBottom: 15, lineHeight: 20 }}>
              {currentInsight.message}
            </Text>
            <TouchableOpacity
              onPress={() => Alert.alert('Action', currentInsight.action)}
              style={{
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderRadius: 10,
                padding: 10,
                alignItems: 'center'
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                {currentInsight.action}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      )}

      {/* Health Goals */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 10 }}>
          🎯 Your Health Goals
        </Text>
        {healthGoals.map((goal) => (
          <View key={goal.id} style={{
            backgroundColor: colors.surface,
            borderRadius: 15,
            padding: 15,
            marginBottom: 10
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text, flex: 1 }}>
                {goal.title}
              </Text>
              <TouchableOpacity
                onPress={() => updateGoal(goal.id)}
                style={{
                  backgroundColor: colors.primary,
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 6
                }}
              >
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>Update</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={{ color: colors.textSecondary, marginBottom: 10, fontSize: 14 }}>
              {goal.current}/{goal.targetValue} {goal.unit}
            </Text>
            
            <View style={{
              height: 8,
              backgroundColor: colors.border,
              borderRadius: 4,
              overflow: 'hidden'
            }}>
              <View style={{
                height: '100%',
                width: `${goal.progress}%`,
                backgroundColor: goal.progress >= 80 ? '#22c55e' : goal.progress >= 50 ? '#f59e0b' : '#ef4444'
              }} />
            </View>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 10 }}>
          🚀 Quick Actions
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={startHealthAssessment}
            style={{
              backgroundColor: colors.primary,
              borderRadius: 10,
              padding: 10,
              flex: 0.48,
              alignItems: 'center'
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>
              📋 Assessment
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => Alert.alert('Mood Check', 'How are you feeling today?')}
            style={{
              backgroundColor: colors.secondary,
              borderRadius: 10,
              padding: 10,
              flex: 0.48,
              alignItems: 'center'
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>
              😊 Mood Check
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Progress Trends */}
      <TouchableOpacity
        onPress={() => Alert.alert('Progress Analytics', 'Detailed health analytics and trends coming soon!')}
        style={{
          backgroundColor: colors.surface,
          borderRadius: 15,
          padding: 15,
          alignItems: 'center'
        }}
      >
        <Text style={{ color: colors.text, fontWeight: 'bold', fontSize: 16 }}>
          📈 View Detailed Analytics
        </Text>
      </TouchableOpacity>
    </View>
  );
}