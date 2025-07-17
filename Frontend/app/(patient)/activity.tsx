import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

interface Activity {
  id: string;
  type: 'prediction' | 'appointment' | 'medication' | 'symptom' | 'test';
  title: string;
  description: string;
  date: string;
  time: string;
  details: any;
  icon: string;
}

export default function ActivityScreen() {
  const { t, language } = useLanguage();
  const { colors, isDark } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const activities: Activity[] = [
    {
      id: '1',
      type: 'prediction',
      title: language === 'sw' ? 'Utabiri wa AI Umefanywa' : 'AI Prediction Generated',
      description: language === 'sw' ? 'Hatari ya kiwango cha chini imeonyeshwa kwa cyst ya 45mm' : 'Low risk level predicted for 45mm cyst',
      date: '2024-03-12',
      time: '10:30 AM',
      icon: '🔮',
      details: {
        riskLevel: 'Low',
        riskScore: 25,
        cystSize: '45mm',
        recommendation: language === 'sw' ? 'Endelea na ufuatiliaji wa kila miezi 3' : 'Continue monitoring every 3 months'
      }
    },
    {
      id: '2',
      type: 'appointment',
      title: language === 'sw' ? 'Miadi Imeratibwa' : 'Appointment Scheduled',
      description: language === 'sw' ? 'Ufuatiliaji na Dk. Sarah Johnson' : 'Follow-up with Dr. Sarah Johnson',
      date: '2024-03-10',
      time: '2:15 PM',
      icon: '📅',
      details: {
        doctor: 'Dr. Sarah Johnson',
        specialty: language === 'sw' ? 'Mzazi' : 'Gynecologist',
        clinic: language === 'sw' ? 'Hospitali ya Nairobi' : 'Nairobi Hospital',
        appointmentDate: '2024-03-15',
        type: language === 'sw' ? 'Ufuatiliaji' : 'Follow-up'
      }
    },
    {
      id: '3',
      type: 'symptom',
      title: language === 'sw' ? 'Dalili Zimeongezwa' : 'Symptoms Logged',
      description: language === 'sw' ? 'Maumivu ya tumbo na mvimbo vimeripotiwa' : 'Pelvic pain and bloating reported',
      date: '2024-03-08',
      time: '8:45 AM',
      icon: '📝',
      details: {
        symptoms: [
          language === 'sw' ? 'Maumivu ya tumbo (kiwango cha 6/10)' : 'Pelvic pain (level 6/10)',
          language === 'sw' ? 'Mvimbo' : 'Bloating',
          language === 'sw' ? 'Uchovu' : 'Fatigue'
        ],
        severity: 'Moderate',
        duration: language === 'sw' ? 'Siku 3' : '3 days'
      }
    },
    {
      id: '4',
      type: 'test',
      title: language === 'sw' ? 'Matokeo ya Ultrasound' : 'Ultrasound Results',
      description: language === 'sw' ? 'Cyst ya ovari imegunduliwa - 45mm' : 'Ovarian cyst detected - 45mm',
      date: '2024-03-05',
      time: '11:20 AM',
      icon: '🔬',
      details: {
        testType: 'Pelvic Ultrasound',
        findings: language === 'sw' ? 'Cyst ya functional katika ovari ya kushoto, 45mm' : 'Functional cyst in left ovary, 45mm',
        radiologist: 'Dr. Michael Chen',
        recommendation: language === 'sw' ? 'Ufuatiliaji baada ya miezi 3' : 'Follow-up in 3 months'
      }
    },
    {
      id: '5',
      type: 'medication',
      title: language === 'sw' ? 'Dawa Zimeanza' : 'Medication Started',
      description: language === 'sw' ? 'Ibuprofen kwa maumivu' : 'Ibuprofen for pain management',
      date: '2024-03-03',
      time: '6:30 PM',
      icon: '💊',
      details: {
        medication: 'Ibuprofen 400mg',
        dosage: language === 'sw' ? 'Mara mbili kwa siku' : 'Twice daily',
        duration: language === 'sw' ? 'Wiki 2' : '2 weeks',
        purpose: language === 'sw' ? 'Kudhibiti maumivu ya tumbo' : 'Pelvic pain management'
      }
    },
    {
      id: '6',
      type: 'appointment',
      title: language === 'sw' ? 'Miadi Imekamilika' : 'Appointment Completed',
      description: language === 'sw' ? 'Uchunguzi wa kwanza na Dk. Emily Rodriguez' : 'Initial consultation with Dr. Emily Rodriguez',
      date: '2024-02-28',
      time: '11:00 AM',
      icon: '✅',
      details: {
        doctor: 'Dr. Emily Rodriguez',
        clinic: language === 'sw' ? 'Kliniki ya MP Shah' : 'MP Shah Hospital',
        diagnosis: language === 'sw' ? 'Cyst ya ovari imegunduliwa' : 'Ovarian cyst detected',
        nextSteps: language === 'sw' ? 'Ultrasound na ufuatiliaji' : 'Ultrasound and monitoring'
      }
    }
  ];

  const filters = [
    { key: 'all', label: language === 'sw' ? 'Zote' : 'All' },
    { key: 'prediction', label: language === 'sw' ? 'Utabiri' : 'Predictions' },
    { key: 'appointment', label: language === 'sw' ? 'Miadi' : 'Appointments' },
    { key: 'test', label: language === 'sw' ? 'Vipimo' : 'Tests' },
    { key: 'symptom', label: language === 'sw' ? 'Dalili' : 'Symptoms' },
    { key: 'medication', label: language === 'sw' ? 'Dawa' : 'Medication' }
  ];

  const filteredActivities = selectedFilter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === selectedFilter);

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'prediction': return ['#667eea', '#764ba2'];
      case 'appointment': return ['#4facfe', '#00f2fe'];
      case 'test': return ['#43e97b', '#38f9d7'];
      case 'symptom': return ['#fa709a', '#fee140'];
      case 'medication': return ['#a8edea', '#fed6e3'];
      default: return [colors.primary, colors.primary];
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === 'sw' ? 'sw-KE' : 'en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const renderActivityDetails = (activity: Activity) => {
    switch (activity.type) {
      case 'prediction':
        return (
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 14, color: colors.text, marginBottom: 5 }}>
              <Text style={{ fontWeight: 'bold' }}>{language === 'sw' ? 'Kiwango cha Hatari:' : 'Risk Level:'}</Text> {activity.details.riskLevel}
            </Text>
            <Text style={{ fontSize: 14, color: colors.text, marginBottom: 5 }}>
              <Text style={{ fontWeight: 'bold' }}>{language === 'sw' ? 'Alama za Hatari:' : 'Risk Score:'}</Text> {activity.details.riskScore}%
            </Text>
            <Text style={{ fontSize: 14, color: colors.text }}>
              <Text style={{ fontWeight: 'bold' }}>{language === 'sw' ? 'Ukubwa wa Cyst:' : 'Cyst Size:'}</Text> {activity.details.cystSize}
            </Text>
          </View>
        );
      case 'appointment':
        return (
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 14, color: colors.text, marginBottom: 5 }}>
              <Text style={{ fontWeight: 'bold' }}>{language === 'sw' ? 'Daktari:' : 'Doctor:'}</Text> {activity.details.doctor}
            </Text>
            <Text style={{ fontSize: 14, color: colors.text, marginBottom: 5 }}>
              <Text style={{ fontWeight: 'bold' }}>{language === 'sw' ? 'Kliniki:' : 'Clinic:'}</Text> {activity.details.clinic}
            </Text>
            {activity.details.appointmentDate && (
              <Text style={{ fontSize: 14, color: colors.text }}>
                <Text style={{ fontWeight: 'bold' }}>{language === 'sw' ? 'Tarehe:' : 'Date:'}</Text> {formatDate(activity.details.appointmentDate)}
              </Text>
            )}
          </View>
        );
      case 'test':
        return (
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 14, color: colors.text, marginBottom: 5 }}>
              <Text style={{ fontWeight: 'bold' }}>{language === 'sw' ? 'Aina ya Kipimo:' : 'Test Type:'}</Text> {activity.details.testType}
            </Text>
            <Text style={{ fontSize: 14, color: colors.text, marginBottom: 5 }}>
              <Text style={{ fontWeight: 'bold' }}>{language === 'sw' ? 'Matokeo:' : 'Findings:'}</Text> {activity.details.findings}
            </Text>
            <Text style={{ fontSize: 14, color: colors.text }}>
              <Text style={{ fontWeight: 'bold' }}>{language === 'sw' ? 'Daktari:' : 'Doctor:'}</Text> {activity.details.radiologist}
            </Text>
          </View>
        );
      case 'symptom':
        return (
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.text, marginBottom: 5 }}>
              {language === 'sw' ? 'Dalili:' : 'Symptoms:'}
            </Text>
            {activity.details.symptoms.map((symptom: string, index: number) => (
              <Text key={index} style={{ fontSize: 13, color: colors.textSecondary, marginLeft: 10 }}>
                • {symptom}
              </Text>
            ))}
            <Text style={{ fontSize: 14, color: colors.text, marginTop: 5 }}>
              <Text style={{ fontWeight: 'bold' }}>{language === 'sw' ? 'Muda:' : 'Duration:'}</Text> {activity.details.duration}
            </Text>
          </View>
        );
      case 'medication':
        return (
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 14, color: colors.text, marginBottom: 5 }}>
              <Text style={{ fontWeight: 'bold' }}>{language === 'sw' ? 'Dawa:' : 'Medication:'}</Text> {activity.details.medication}
            </Text>
            <Text style={{ fontSize: 14, color: colors.text, marginBottom: 5 }}>
              <Text style={{ fontWeight: 'bold' }}>{language === 'sw' ? 'Kipimo:' : 'Dosage:'}</Text> {activity.details.dosage}
            </Text>
            <Text style={{ fontSize: 14, color: colors.text }}>
              <Text style={{ fontWeight: 'bold' }}>{language === 'sw' ? 'Lengo:' : 'Purpose:'}</Text> {activity.details.purpose}
            </Text>
          </View>
        );
      default:
        return null;
    }
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
          📊 {language === 'sw' ? 'Shughuli Zangu' : 'My Activity'}
        </Text>
        <Text style={{ 
          fontSize: 16, 
          color: 'rgba(255,255,255,0.8)' 
        }}>
          {language === 'sw' ? 'Fuatilia shughuli zako zote za kimatibabu' : 'Track all your health activities and progress'}
        </Text>
      </LinearGradient>

      <View style={{ padding: 20 }}>
        {/* Filter Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 20 }}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              onPress={() => setSelectedFilter(filter.key)}
              style={{ 
                backgroundColor: selectedFilter === filter.key ? colors.primary : colors.surface,
                borderRadius: 20, 
                paddingHorizontal: 15, 
                paddingVertical: 10, 
                marginRight: 10,
                borderWidth: 1,
                borderColor: selectedFilter === filter.key ? colors.primary : colors.border
              }}
            >
              <Text style={{ 
                color: selectedFilter === filter.key ? 'white' : colors.textSecondary,
                fontSize: 14,
                fontWeight: '500'
              }}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Activity Timeline */}
        <Text style={{ 
          fontSize: 20, 
          fontWeight: 'bold', 
          color: colors.text, 
          marginBottom: 20 
        }}>
          📈 {language === 'sw' ? 'Ratiba ya Shughuli' : 'Activity Timeline'}
        </Text>

        {filteredActivities.map((activity, index) => (
          <View key={activity.id} style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              {/* Timeline Indicator */}
              <View style={{ alignItems: 'center', marginRight: 15 }}>
                <LinearGradient
                  colors={getActivityColor(activity.type) as [string, string]}
                  style={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: 20, 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                  }}
                >
                  <Text style={{ fontSize: 18 }}>{activity.icon}</Text>
                </LinearGradient>
                {index < filteredActivities.length - 1 && (
                  <View style={{ 
                    width: 2, 
                    height: 40, 
                    backgroundColor: colors.border, 
                    marginTop: 10 
                  }} />
                )}
              </View>

              {/* Activity Card */}
              <View style={{ 
                flex: 1,
                backgroundColor: colors.card, 
                borderRadius: 15, 
                padding: 15,
                borderWidth: 1,
                borderColor: colors.border
              }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                  <Text style={{ 
                    fontSize: 16, 
                    fontWeight: 'bold', 
                    color: colors.text,
                    flex: 1
                  }}>
                    {activity.title}
                  </Text>
                  <Text style={{ 
                    fontSize: 12, 
                    color: colors.textSecondary 
                  }}>
                    {formatDate(activity.date)}
                  </Text>
                </View>
                
                <Text style={{ 
                  fontSize: 14, 
                  color: colors.textSecondary,
                  marginBottom: 5
                }}>
                  {activity.description}
                </Text>
                
                <Text style={{ 
                  fontSize: 12, 
                  color: colors.textSecondary,
                  marginBottom: 10
                }}>
                  🕐 {activity.time}
                </Text>

                {renderActivityDetails(activity)}
              </View>
            </View>
          </View>
        ))}

        {filteredActivities.length === 0 && (
          <View style={{ 
            backgroundColor: colors.card, 
            borderRadius: 20, 
            padding: 40, 
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.border
          }}>
            <Text style={{ fontSize: 48, marginBottom: 15 }}>📊</Text>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: 'bold', 
              color: colors.text, 
              textAlign: 'center',
              marginBottom: 10
            }}>
              {language === 'sw' ? 'Hakuna Shughuli' : 'No Activities'}
            </Text>
            <Text style={{ 
              fontSize: 14, 
              color: colors.textSecondary, 
              textAlign: 'center' 
            }}>
              {language === 'sw' 
                ? 'Shughuli zako za kimatibabu zitaonyeshwa hapa.'
                : 'Your health activities will appear here.'
              }
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}