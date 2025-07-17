
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  Alert 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { EmergencyDetectionSystem } from '@/components/EmergencyDetectionSystem';
import { AIHealthCoach } from '@/components/AIHealthCoach';

const { width } = Dimensions.get('window');

export default function PatientHomeScreen() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { colors, isDark } = useTheme();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting(t('goodMorning'));
    } else if (hour < 17) {
      setGreeting(t('goodAfternoon'));
    } else {
      setGreeting(t('goodEvening'));
    }
  }, [t]);

  const quickActions = [
    {
      title: t('cystGrowthPredictor'),
      subtitle: 'Get AI-powered growth predictions',
      icon: '🔮',
      route: '/(patient)/prediction',
      gradient: (isDark ? ['#A3327A', '#D1A3C9'] : ['#F4D3E5', '#A3327A']) as readonly [string, string, ...string[]]
    },
    {
      title: t('treatmentRecommendation'),
      subtitle: 'Personalized treatment plans',
      icon: '💜',
      route: '/(patient)/treatment',
      gradient: (isDark ? ['#A3327A', '#B85A92'] : ['#D1A3C9', '#A3327A']) as readonly [string, string, ...string[]]
    },
    {
      title: t('healthChat'),
      subtitle: 'Ask our AI assistant',
      icon: '✨',
      route: '/(patient)/chat',
      gradient: (isDark ? ['#B85A92', '#A3327A'] : ['#F4D3E5', '#B85A92']) as readonly [string, string, ...string[]]
    },
    {
      title: t('findClinics'),
      subtitle: 'Nearby healthcare providers',
      icon: '🏥',
      route: '/(patient)/clinics',
      gradient: ['#A3327A', '#D1A3C9'] as const
    }
  ];

  const healthTips = [
    {
      title: t('stayHydrated'),
      description: 'Drink at least 8 glasses of water daily to support overall health',
      icon: '💧'
    },
    {
      title: t('regularExercise'),
      description: 'Light exercises can help reduce cyst-related discomfort',
      icon: '🏃‍♀️'
    },
    {
      title: t('healthyDiet'),
      description: 'Reduce processed foods and increase fruits and vegetables',
      icon: '🥗'
    }
  ];

  const upcomingAppointments = [
    {
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Gynecologist',
      date: 'March 15, 2024',
      time: '10:30 AM',
      type: 'Follow-up'
    },
    {
      doctor: 'Dr. Michael Chen',
      specialty: 'Radiologist',
      date: 'March 22, 2024',
      time: '2:00 PM',
      type: 'Ultrasound'
    }
  ];

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* Header */}
      <LinearGradient
        colors={isDark ? ['#A3327A', '#D1A3C9'] : ['#F4D3E5', '#D1A3C9']}
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
          color: '#A3327A', 
          marginBottom: 5 
        }}>
          {greeting}! 👋
        </Text>
        <Text style={{ 
          fontSize: 16, 
          color: '#A3327A' 
        }}>
          {t('howAreYou')}
        </Text>
        
        {/* Health Status Card */}
        <View style={{ 
          backgroundColor: 'rgba(255,255,255,0.15)', 
          borderRadius: 15, 
          padding: 20, 
          marginTop: 20 
        }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: 'bold', 
            color: 'white', 
            marginBottom: 10 
          }}>
            {t('healthStatus')}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity 
              style={{ alignItems: 'center' }}
              onPress={() => router.push('/(patient)/prediction')}
            >
              <Text style={{ fontSize: 24, color: 'white' }}>📈</Text>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>Monitoring</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{ alignItems: 'center' }}
              onPress={() => Alert.alert('Last Check', 'Your last checkup was 2 days ago. Everything looks good!')}
            >
              <Text style={{ fontSize: 24, color: 'white' }}>✅</Text>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>Last Check</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{ alignItems: 'center' }}
              onPress={() => router.push('/(patient)/treatment')}
            >
              <Text style={{ fontSize: 24, color: 'white' }}>🎯</Text>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>Goal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={{ padding: 20 }}>
        <Text style={{ 
          fontSize: 20, 
          fontWeight: 'bold', 
          color: colors.text, 
          marginBottom: 20 
        }}>
          {t('quickActions')}
        </Text>
        
        <View style={{ 
          flexDirection: 'row', 
          flexWrap: 'wrap', 
          justifyContent: 'space-between' 
        }}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(action.route as any)}
              style={{ 
                width: width * 0.43, 
                marginBottom: 15 
              }}
            >
              <LinearGradient
                colors={action.gradient}
                style={{ 
                  borderRadius: 20, 
                  padding: 20, 
                  alignItems: 'center', 
                  minHeight: 140 
                }}
              >
                <Text style={{ fontSize: 32, marginBottom: 10 }}>{action.icon}</Text>
                <Text style={{ 
                  fontSize: 16, 
                  fontWeight: 'bold', 
                  color: 'white', 
                  textAlign: 'center', 
                  marginBottom: 5 
                }}>
                  {action.title}
                </Text>
                <Text style={{ 
                  fontSize: 12, 
                  color: 'rgba(255,255,255,0.8)', 
                  textAlign: 'center' 
                }}>
                  {action.subtitle}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Upcoming Appointments */}
      <View style={{ padding: 20, paddingTop: 0 }}>
        <Text style={{ 
          fontSize: 20, 
          fontWeight: 'bold', 
          color: colors.text, 
          marginBottom: 15 
        }}>
          {t('upcomingAppointments')}
        </Text>
        
        {upcomingAppointments.map((appointment, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push('/(patient)/appointments')}
            style={{
              backgroundColor: colors.card, 
              borderRadius: 15, 
              padding: 20, 
              marginBottom: 15,
              borderWidth: 1,
              borderColor: colors.border
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text }}>
                  {appointment.doctor}
                </Text>
                <Text style={{ fontSize: 14, color: colors.textSecondary, marginVertical: 2 }}>
                  {appointment.specialty} • {appointment.type}
                </Text>
                <Text style={{ fontSize: 14, color: colors.primary }}>
                  {appointment.date} at {appointment.time}
                </Text>
              </View>
              <Text style={{ fontSize: 24 }}>📅</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Health Tips */}
      <View style={{ padding: 20, paddingTop: 0 }}>
        <Text style={{ 
          fontSize: 20, 
          fontWeight: 'bold', 
          color: colors.text, 
          marginBottom: 15 
        }}>
          {t('dailyHealthTips')}
        </Text>
        
        {healthTips.map((tip, index) => (
          <View
            key={index}
            style={{ 
              backgroundColor: colors.card, 
              borderRadius: 15, 
              padding: 20, 
              marginBottom: 15,
              borderWidth: 1,
              borderColor: colors.border
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ fontSize: 24, marginRight: 15 }}>{tip.icon}</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text, flex: 1 }}>
                {tip.title}
              </Text>
            </View>
            <Text style={{ fontSize: 14, color: colors.textSecondary, lineHeight: 20 }}>
              {tip.description}
            </Text>
          </View>
        ))}
      </View>

      {/* AI Health Coach */}
      <AIHealthCoach />

      {/* Emergency Detection System */}
      <EmergencyDetectionSystem />

      {/* Recent Activity */}
      <View style={{ padding: 20, paddingTop: 0 }}>
        <Text style={{ 
          fontSize: 20, 
          fontWeight: 'bold', 
          color: colors.text, 
          marginBottom: 15 
        }}>
          🔬 {t('advancedHealthAnalytics')}
        </Text>
        
        <View style={{ 
          backgroundColor: colors.card, 
          borderRadius: 15, 
          padding: 20,
          borderWidth: 1,
          borderColor: colors.border,
          marginBottom: 15
        }}>
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            marginBottom: 15 
          }}>
            <Text style={{ fontSize: 24, marginRight: 15 }}>🧬</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ 
                fontSize: 16, 
                fontWeight: 'bold', 
                color: colors.text 
              }}>
                {t('aiRiskAssessment')}
              </Text>
              <Text style={{ 
                fontSize: 14, 
                color: colors.textSecondary 
              }}>
                Real-time analysis • 94% confidence
              </Text>
            </View>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: 'bold', 
              color: '#22c55e' 
            }}>
              {t('lowRisk')}
            </Text>
          </View>
          
          <TouchableOpacity
            onPress={() => router.push('/(patient)/prediction')}
            style={{
              backgroundColor: colors.primary, 
              borderRadius: 10, 
              padding: 12, 
              alignItems: 'center' 
            }}
          >
            <Text style={{ 
              color: 'white', 
              fontWeight: 'bold' 
            }}>
              🚀 {t('runAdvancedAnalysis')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ 
          backgroundColor: colors.card, 
          borderRadius: 15, 
          padding: 20,
          borderWidth: 1,
          borderColor: colors.border
        }}>
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            marginBottom: 15 
          }}>
            <Text style={{ fontSize: 24, marginRight: 15 }}>📊</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ 
                fontSize: 16, 
                fontWeight: 'bold', 
                color: colors.text 
              }}>
                {t('healthTrends')}
              </Text>
              <Text style={{ 
                fontSize: 14, 
                color: colors.textSecondary 
              }}>
                Track improvements over time
              </Text>
            </View>
          </View>
          
          <TouchableOpacity
            onPress={() => router.push('/(patient)/activity')}
            style={{
              backgroundColor: colors.secondary, 
              borderRadius: 10, 
              padding: 12, 
              alignItems: 'center' 
            }}
          >
            <Text style={{ 
              color: 'white', 
              fontWeight: 'bold' 
            }}>
              📈 {t('viewAnalytics')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
