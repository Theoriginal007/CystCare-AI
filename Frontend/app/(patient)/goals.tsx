import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Alert,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'diet' | 'exercise' | 'medication' | 'monitoring' | 'stress';
  target: string;
  progress: number;
  dueDate: string;
  completed: boolean;
  icon: string;
}

export default function GoalsScreen() {
  const { t, language } = useLanguage();
  const { colors, isDark } = useTheme();
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: language === 'sw' ? 'Kula Chakula Chenye Afya' : 'Eat Healthy Diet',
      description: language === 'sw' ? 'Kula mboga na matunda zaidi, punguza sukari' : 'Include more vegetables and fruits, reduce sugar intake',
      category: 'diet',
      target: language === 'sw' ? '5 portions za mboga na matunda kwa siku' : '5 servings of fruits and vegetables daily',
      progress: 70,
      dueDate: '2024-04-15',
      completed: false,
      icon: '🥗'
    },
    {
      id: '2',
      title: language === 'sw' ? 'Mazoezi ya Kawaida' : 'Regular Exercise',
      description: language === 'sw' ? 'Fanya mazoezi ya upole kwa dakika 30 kwa siku' : 'Gentle exercise for 30 minutes daily',
      category: 'exercise',
      target: language === 'sw' ? 'Dakika 30 kwa siku' : '30 minutes per day',
      progress: 45,
      dueDate: '2024-04-30',
      completed: false,
      icon: '🏃‍♀️'
    },
    {
      id: '3',
      title: language === 'sw' ? 'Kufuatilia Dalili' : 'Track Symptoms',
      description: language === 'sw' ? 'Rekodi dalili na maumivu kila siku' : 'Record daily symptoms and pain levels',
      category: 'monitoring',
      target: language === 'sw' ? 'Kila siku kwa mwezi mmoja' : 'Daily for one month',
      progress: 85,
      dueDate: '2024-03-31',
      completed: false,
      icon: '📝'
    },
    {
      id: '4',
      title: language === 'sw' ? 'Kupunguza Stress' : 'Stress Management',
      description: language === 'sw' ? 'Fanya mazoezi ya kupumua na meditation' : 'Practice breathing exercises and meditation',
      category: 'stress',
      target: language === 'sw' ? 'Dakika 15 kwa siku' : '15 minutes daily',
      progress: 30,
      dueDate: '2024-04-20',
      completed: false,
      icon: '🧘‍♀️'
    }
  ]);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'diet' as Goal['category'],
    target: '',
    dueDate: ''
  });

  const goalCategories = [
    { key: 'diet', label: language === 'sw' ? 'Lishe' : 'Diet', icon: '🥗', color: ['#43e97b', '#38f9d7'] },
    { key: 'exercise', label: language === 'sw' ? 'Mazoezi' : 'Exercise', icon: '🏃‍♀️', color: ['#fa709a', '#fee140'] },
    { key: 'medication', label: language === 'sw' ? 'Dawa' : 'Medication', icon: '💊', color: ['#a8edea', '#fed6e3'] },
    { key: 'monitoring', label: language === 'sw' ? 'Ufuatiliaji' : 'Monitoring', icon: '📊', color: ['#667eea', '#764ba2'] },
    { key: 'stress', label: language === 'sw' ? 'Stress' : 'Stress', icon: '🧘‍♀️', color: ['#ffecd2', '#fcb69f'] }
  ];

  const getProgressColor = (progress: number) => {
    if (progress < 30) return '#ff6b6b';
    if (progress < 70) return '#ffa500';
    return '#28a745';
  };

  const getCategoryColor = (category: string) => {
    const cat = goalCategories.find(c => c.key === category);
    return cat ? cat.color : [colors.primary, colors.primary];
  };

  const updateGoalProgress = (goalId: string, newProgress: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, progress: Math.min(100, Math.max(0, newProgress)), completed: newProgress >= 100 }
        : goal
    ));
  };

  const addNewGoal = () => {
    if (!newGoal.title || !newGoal.target) {
      Alert.alert(
        language === 'sw' ? 'Kosa' : 'Error',
        language === 'sw' ? 'Tafadhali jaza sehemu zote muhimu' : 'Please fill in all required fields'
      );
      return;
    }

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      category: newGoal.category,
      target: newGoal.target,
      progress: 0,
      dueDate: newGoal.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      completed: false,
      icon: goalCategories.find(c => c.key === newGoal.category)?.icon || '🎯'
    };

    setGoals([...goals, goal]);
    setNewGoal({ title: '', description: '', category: 'diet', target: '', dueDate: '' });
    setShowAddGoal(false);
    
    Alert.alert(
      language === 'sw' ? 'Lengo Limeongezwa!' : 'Goal Added!',
      language === 'sw' ? 'Lengo lako jipya limeongezwa kikamilifu.' : 'Your new goal has been added successfully.'
    );
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === 'sw' ? 'sw-KE' : 'en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDaysUntilDue = (dateStr: string) => {
    const today = new Date();
    const dueDate = new Date(dateStr);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* Header */}
      <LinearGradient
        colors={isDark ? ['#4c1d95', '#5b21b6'] : ['#7c3aed', '#a855f7']}
        style={{ 
          padding: 20, 
          paddingTop: 60, 
          borderBottomLeftRadius: 30, 
          borderBottomRightRadius: 30 
        }}
      >
        <Text style={{ 
          fontSize: 24, 
          fontWeight: 'bold', 
          color: 'white', 
          marginBottom: 5 
        }}>
          🎯 {language === 'sw' ? 'Malengo Yangu' : 'My Health Goals'}
        </Text>
        <Text style={{ 
          fontSize: 16, 
          color: 'rgba(255,255,255,0.8)' 
        }}>
          {language === 'sw' ? 'Weka na fuatilia malengo ya kuboresha afya yako' : 'Set and track goals to improve your health'}
        </Text>
      </LinearGradient>

      <View style={{ padding: 20 }}>
        {/* Progress Overview */}
        <View style={{ 
          backgroundColor: colors.card, 
          borderRadius: 20, 
          padding: 20, 
          marginBottom: 20,
          borderWidth: 1,
          borderColor: colors.border
        }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: 'bold', 
            color: colors.text, 
            marginBottom: 15 
          }}>
            📊 {language === 'sw' ? 'Muhtasari wa Maendeleo' : 'Progress Overview'}
          </Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.primary }}>
                {goals.filter(g => g.completed).length}
              </Text>
              <Text style={{ fontSize: 12, color: colors.textSecondary }}>
                {language === 'sw' ? 'Zimekamilika' : 'Completed'}
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#ffa500' }}>
                {goals.filter(g => !g.completed && g.progress > 0).length}
              </Text>
              <Text style={{ fontSize: 12, color: colors.textSecondary }}>
                {language === 'sw' ? 'Zinaendelea' : 'In Progress'}
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#ff6b6b' }}>
                {goals.filter(g => g.progress === 0).length}
              </Text>
              <Text style={{ fontSize: 12, color: colors.textSecondary }}>
                {language === 'sw' ? 'Hazijaanza' : 'Not Started'}
              </Text>
            </View>
          </View>
        </View>

        {/* Goals List */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ 
            fontSize: 20, 
            fontWeight: 'bold', 
            color: colors.text 
          }}>
            🎯 {language === 'sw' ? 'Malengo Yangu' : 'My Goals'}
          </Text>
          <TouchableOpacity
            onPress={() => setShowAddGoal(!showAddGoal)}
            style={{ 
              backgroundColor: colors.primary, 
              borderRadius: 20, 
              paddingHorizontal: 15, 
              paddingVertical: 8 
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>
              ➕ {language === 'sw' ? 'Ongeza' : 'Add Goal'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Add Goal Form */}
        {showAddGoal && (
          <View style={{ 
            backgroundColor: colors.card, 
            borderRadius: 20, 
            padding: 20, 
            marginBottom: 20,
            borderWidth: 1,
            borderColor: colors.border
          }}>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: 'bold', 
              color: colors.text, 
              marginBottom: 15 
            }}>
              ➕ {language === 'sw' ? 'Ongeza Lengo Jipya' : 'Add New Goal'}
            </Text>

            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontSize: 14, color: colors.text, marginBottom: 5 }}>
                {language === 'sw' ? 'Jina la Lengo *' : 'Goal Title *'}
              </Text>
              <TextInput
                value={newGoal.title}
                onChangeText={(text) => setNewGoal({...newGoal, title: text})}
                placeholder={language === 'sw' ? 'Andika jina la lengo lako' : 'Enter your goal title'}
                placeholderTextColor={colors.textSecondary}
                style={{ 
                  borderWidth: 1, 
                  borderColor: colors.border, 
                  borderRadius: 10, 
                  padding: 12, 
                  fontSize: 16,
                  backgroundColor: colors.surface,
                  color: colors.text
                }}
              />
            </View>

            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontSize: 14, color: colors.text, marginBottom: 5 }}>
                {language === 'sw' ? 'Maelezo' : 'Description'}
              </Text>
              <TextInput
                value={newGoal.description}
                onChangeText={(text) => setNewGoal({...newGoal, description: text})}
                placeholder={language === 'sw' ? 'Elezea lengo lako' : 'Describe your goal'}
                placeholderTextColor={colors.textSecondary}
                multiline
                style={{ 
                  borderWidth: 1, 
                  borderColor: colors.border, 
                  borderRadius: 10, 
                  padding: 12, 
                  fontSize: 16,
                  backgroundColor: colors.surface,
                  color: colors.text,
                  minHeight: 80
                }}
              />
            </View>

            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontSize: 14, color: colors.text, marginBottom: 10 }}>
                {language === 'sw' ? 'Kategoria' : 'Category'}
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {goalCategories.map((category) => (
                  <TouchableOpacity
                    key={category.key}
                    onPress={() => setNewGoal({...newGoal, category: category.key as Goal['category']})}
                    style={{ 
                      backgroundColor: newGoal.category === category.key ? colors.primary : colors.surface,
                      borderRadius: 20, 
                      paddingHorizontal: 15, 
                      paddingVertical: 8, 
                      marginRight: 10, 
                      marginBottom: 10,
                      borderWidth: 1,
                      borderColor: newGoal.category === category.key ? colors.primary : colors.border
                    }}
                  >
                    <Text style={{ 
                      color: newGoal.category === category.key ? 'white' : colors.textSecondary,
                      fontSize: 14,
                      fontWeight: '500'
                    }}>
                      {category.icon} {category.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontSize: 14, color: colors.text, marginBottom: 5 }}>
                {language === 'sw' ? 'Lengo *' : 'Target *'}
              </Text>
              <TextInput
                value={newGoal.target}
                onChangeText={(text) => setNewGoal({...newGoal, target: text})}
                placeholder={language === 'sw' ? 'Kwa mfano: Dakika 30 kwa siku' : 'e.g., 30 minutes daily'}
                placeholderTextColor={colors.textSecondary}
                style={{ 
                  borderWidth: 1, 
                  borderColor: colors.border, 
                  borderRadius: 10, 
                  padding: 12, 
                  fontSize: 16,
                  backgroundColor: colors.surface,
                  color: colors.text
                }}
              />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                onPress={() => setShowAddGoal(false)}
                style={{ 
                  backgroundColor: colors.surface, 
                  borderRadius: 15, 
                  padding: 12, 
                  flex: 0.45,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: colors.border
                }}
              >
                <Text style={{ color: colors.textSecondary, fontWeight: 'bold' }}>
                  {language === 'sw' ? 'Ghairi' : 'Cancel'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={addNewGoal}
                style={{ 
                  backgroundColor: colors.primary, 
                  borderRadius: 15, 
                  padding: 12, 
                  flex: 0.45,
                  alignItems: 'center'
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  {language === 'sw' ? 'Ongeza Lengo' : 'Add Goal'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Goals */}
        {goals.map((goal) => (
          <View
            key={goal.id}
            style={{ 
              backgroundColor: colors.card, 
              borderRadius: 20, 
              padding: 20, 
              marginBottom: 15,
              borderWidth: 1,
              borderColor: colors.border
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 15 }}>
              <LinearGradient
                colors={getCategoryColor(goal.category) as [string, string]}
                style={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: 20, 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  marginRight: 15
                }}
              >
                <Text style={{ fontSize: 18 }}>{goal.icon}</Text>
              </LinearGradient>
              
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Text style={{ 
                    fontSize: 16, 
                    fontWeight: 'bold', 
                    color: colors.text,
                    flex: 1
                  }}>
                    {goal.title}
                  </Text>
                  {goal.completed && (
                    <View style={{ 
                      backgroundColor: '#28a745', 
                      borderRadius: 10, 
                      paddingHorizontal: 8, 
                      paddingVertical: 4 
                    }}>
                      <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                        ✓ {language === 'sw' ? 'Imekamilika' : 'Completed'}
                      </Text>
                    </View>
                  )}
                </View>
                <Text style={{ 
                  fontSize: 14, 
                  color: colors.textSecondary,
                  marginTop: 5
                }}>
                  {goal.description}
                </Text>
              </View>
            </View>

            <View style={{ marginBottom: 15 }}>
              <Text style={{ 
                fontSize: 14, 
                fontWeight: 'bold', 
                color: colors.text,
                marginBottom: 5
              }}>
                🎯 {language === 'sw' ? 'Lengo:' : 'Target:'} {goal.target}
              </Text>
              
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <View style={{ 
                  flex: 1,
                  height: 8,
                  backgroundColor: colors.surface,
                  borderRadius: 4,
                  marginRight: 10
                }}>
                  <View style={{ 
                    width: `${goal.progress}%`,
                    height: '100%',
                    backgroundColor: getProgressColor(goal.progress),
                    borderRadius: 4
                  }} />
                </View>
                <Text style={{ 
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: getProgressColor(goal.progress)
                }}>
                  {goal.progress}%
                </Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ 
                  fontSize: 12, 
                  color: colors.textSecondary 
                }}>
                  📅 {language === 'sw' ? 'Mwisho:' : 'Due:'} {formatDate(goal.dueDate)}
                </Text>
                <Text style={{ 
                  fontSize: 12, 
                  color: getDaysUntilDue(goal.dueDate) < 0 ? '#ff6b6b' : colors.textSecondary 
                }}>
                  {getDaysUntilDue(goal.dueDate) >= 0 
                    ? `${getDaysUntilDue(goal.dueDate)} ${language === 'sw' ? 'siku zimesalia' : 'days left'}`
                    : `${Math.abs(getDaysUntilDue(goal.dueDate))} ${language === 'sw' ? 'siku zimepita' : 'days overdue'}`
                  }
                </Text>
              </View>
            </View>

            {!goal.completed && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity
                  onPress={() => updateGoalProgress(goal.id, goal.progress - 10)}
                  style={{ 
                    backgroundColor: '#ff6b6b', 
                    borderRadius: 15, 
                    padding: 10, 
                    flex: 0.3,
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>
                    -10%
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => updateGoalProgress(goal.id, goal.progress + 10)}
                  style={{ 
                    backgroundColor: '#28a745', 
                    borderRadius: 15, 
                    padding: 10, 
                    flex: 0.3,
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>
                    +10%
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => updateGoalProgress(goal.id, 100)}
                  style={{ 
                    backgroundColor: colors.primary, 
                    borderRadius: 15, 
                    padding: 10, 
                    flex: 0.3,
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>
                    ✓ {language === 'sw' ? 'Maliza' : 'Complete'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}

        {goals.length === 0 && (
          <View style={{ 
            backgroundColor: colors.card, 
            borderRadius: 20, 
            padding: 40, 
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.border
          }}>
            <Text style={{ fontSize: 48, marginBottom: 15 }}>🎯</Text>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: 'bold', 
              color: colors.text, 
              textAlign: 'center',
              marginBottom: 10
            }}>
              {language === 'sw' ? 'Hakuna Malengo' : 'No Goals Set'}
            </Text>
            <Text style={{ 
              fontSize: 14, 
              color: colors.textSecondary, 
              textAlign: 'center' 
            }}>
              {language === 'sw' 
                ? 'Anza kwa kuweka lengo la kwanza la afya yako.'
                : 'Start by setting your first health goal.'
              }
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}