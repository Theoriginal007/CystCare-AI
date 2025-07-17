
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { PersonalizedTreatmentPlan } from '@/components/PersonalizedTreatmentPlan';

const { width } = Dimensions.get('window');

interface TreatmentOption {
  id: number;
  type: string;
  title: string;
  description: string;
  recommendation: string;
  cost: string;
  duration: string;
  icon: string;
  color: readonly [string, string];
  effectiveness: string;
  sideEffects: string[];
  eligibility: string;
}

export default function TreatmentScreen() {
  const { t } = useLanguage();
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentOption | null>(null);

  const treatmentOptions: TreatmentOption[] = [
    {
      id: 1,
      type: 'monitoring',
      title: 'Active Monitoring',
      description: 'Regular ultrasound checkups every 3 months to track cyst changes',
      recommendation: 'Recommended for low-risk functional cysts under 5cm',
      cost: 'KES 2,500/visit',
      duration: '6-12 months',
      icon: '👁️',
      color: ['#4facfe', '#00f2fe'] as const,
      effectiveness: '85% success rate for functional cysts',
      sideEffects: ['None'],
      eligibility: 'Suitable for asymptomatic patients with small cysts'
    },
    {
      id: 2,
      type: 'medication',
      title: 'Hormonal Therapy',
      description: 'Birth control pills or hormone therapy to regulate cycles and prevent new cysts',
      recommendation: 'Effective for functional cysts and symptom management',
      cost: 'KES 1,200/month',
      duration: '3-6 months',
      icon: '💊',
      color: ['#f093fb', '#f5576c'] as const,
      effectiveness: '70% reduction in new cyst formation',
      sideEffects: ['Nausea', 'Mood changes', 'Weight gain'],
      eligibility: 'For premenopausal women with recurrent cysts'
    },
    {
      id: 3,
      type: 'minimally_invasive',
      title: 'Laparoscopic Surgery',
      description: 'Minimally invasive keyhole surgery to remove complex or large cysts',
      recommendation: 'For cysts larger than 5cm or showing suspicious features',
      cost: 'KES 150,000-250,000',
      duration: '1-2 hours',
      icon: '🏥',
      color: ['#667eea', '#764ba2'] as const,
      effectiveness: '95% success rate with minimal recurrence',
      sideEffects: ['Temporary pain', 'Small scars', 'Rare complications'],
      eligibility: 'For persistent, large, or complex cysts'
    },
    {
      id: 4,
      type: 'lifestyle',
      title: 'Lifestyle Management',
      description: 'Dietary changes, exercise, and stress management to support overall health',
      recommendation: 'Complementary approach for all cyst types',
      cost: 'KES 500-2,000/month',
      duration: 'Ongoing',
      icon: '🏃‍♀️',
      color: ['#43e97b', '#38f9d7'] as const,
      effectiveness: '50% improvement in symptoms',
      sideEffects: ['None'],
      eligibility: 'Suitable for all patients as supportive care'
    }
  ];

  const handlePayment = (treatment: TreatmentOption) => {
    Alert.alert(
      'M-Pesa Payment',
      `Proceed with payment for ${treatment.title}?\nCost: ${treatment.cost}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Proceed', onPress: () => {
          Alert.alert('Success', 'Payment initiated. Check your phone for M-Pesa prompt.');
        }}
      ]
    );
  };

  const findSpecialists = () => {
    Alert.alert(
      'Find Specialists',
      'This feature will help you locate gynecologists and specialists in your area.',
      [
        { text: 'OK' }
      ]
    );
  };

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: '#f8f9ff' }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* Header */}
      <LinearGradient
        colors={['#F4D3E5', '#A3327A'] as const}
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
          💊 Treatment Recommendation
        </Text>
        <Text style={{ 
          fontSize: 16, 
          color: '#A3327A' 
        }}>
          Personalized treatment plans based on your data
        </Text>
      </LinearGradient>

      <View style={{ padding: 20 }}>
        <Text style={{ 
          fontSize: 20, 
          fontWeight: 'bold', 
          color: '#333', 
          marginBottom: 20 
        }}>
          🎯 Recommended Treatment Options
        </Text>

        {treatmentOptions.map((treatment) => (
          <TouchableOpacity
            key={treatment.id}
            onPress={() => setSelectedTreatment(selectedTreatment?.id === treatment.id ? null : treatment)}
            style={{ marginBottom: 20 }}
          >
            <LinearGradient
              colors={treatment.color}
              style={{ 
                borderRadius: 20, 
                padding: 20,
                opacity: selectedTreatment?.id === treatment.id ? 1 : 0.9
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                <Text style={{ fontSize: 32, marginRight: 15 }}>{treatment.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ 
                    fontSize: 18, 
                    fontWeight: 'bold', 
                    color: 'white' 
                  }}>
                    {treatment.title}
                  </Text>
                  <Text style={{ 
                    fontSize: 14, 
                    color: 'rgba(255,255,255,0.95)' 
                  }}>
                    {treatment.recommendation}
                  </Text>
                </View>
              </View>

              <Text style={{ 
                fontSize: 14, 
                color: 'white', 
                marginBottom: 10 
              }}>
                {treatment.description}
              </Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <Text style={{ 
                  fontSize: 12, 
                  color: 'rgba(255,255,255,0.95)' 
                }}>
                  Cost: {treatment.cost}
                </Text>
                <Text style={{ 
                  fontSize: 12, 
                  color: 'rgba(255,255,255,0.95)' 
                }}>
                  Duration: {treatment.duration}
                </Text>
              </View>

              <Text style={{ 
                fontSize: 12, 
                color: 'white',
                fontWeight: 'bold'
              }}>
                Effectiveness: {treatment.effectiveness}
              </Text>

              {selectedTreatment?.id === treatment.id && (
                <View style={{ 
                  marginTop: 15, 
                  padding: 15, 
                  backgroundColor: 'rgba(255,255,255,0.2)', 
                  borderRadius: 15 
                }}>
                  <Text style={{ 
                    color: 'white', 
                    fontWeight: 'bold', 
                    marginBottom: 10 
                  }}>
                    📋 Detailed Information:
                  </Text>
                  
                  <Text style={{ 
                    color: 'white', 
                    marginBottom: 8,
                    fontSize: 13
                  }}>
                    <Text style={{ fontWeight: 'bold' }}>Eligibility:</Text> {treatment.eligibility}
                  </Text>
                  
                  <Text style={{ 
                    color: 'white', 
                    marginBottom: 8,
                    fontSize: 13
                  }}>
                    <Text style={{ fontWeight: 'bold' }}>Side Effects:</Text> {treatment.sideEffects.join(', ')}
                  </Text>
                  
                  <Text style={{ 
                    color: 'white', 
                    fontWeight: 'bold', 
                    marginBottom: 10,
                    marginTop: 10
                  }}>
                    Next Steps:
                  </Text>
                  <Text style={{ 
                    color: 'white', 
                    marginBottom: 15,
                    lineHeight: 18,
                    fontSize: 13
                  }}>
                    • Consult with a specialist{'\n'}
                    • Schedule initial appointment{'\n'}
                    • Complete payment process{'\n'}
                    • Begin treatment plan{'\n'}
                    • Follow-up monitoring
                  </Text>
                  
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                      onPress={() => router.push('/(patient)/chat')}
                      style={{ 
                        backgroundColor: 'rgba(255,255,255,0.3)', 
                        borderRadius: 10, 
                        paddingHorizontal: 15, 
                        paddingVertical: 10,
                        flex: 0.3
                      }}
                    >
                      <Text style={{ 
                        color: 'white', 
                        fontWeight: 'bold', 
                        textAlign: 'center',
                        fontSize: 12
                      }}>
                        💬 Ask AI
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={findSpecialists}
                      style={{ 
                        backgroundColor: 'rgba(255,255,255,0.3)', 
                        borderRadius: 10, 
                        paddingHorizontal: 15, 
                        paddingVertical: 10,
                        flex: 0.3
                      }}
                    >
                      <Text style={{ 
                        color: 'white', 
                        fontWeight: 'bold', 
                        textAlign: 'center',
                        fontSize: 12
                      }}>
                        🔍 Find Docs
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handlePayment(treatment)}
                      style={{ 
                        backgroundColor: 'white', 
                        borderRadius: 10, 
                        paddingHorizontal: 15, 
                        paddingVertical: 10,
                        flex: 0.3
                      }}
                    >
                      <Text style={{ 
                        color: treatment.color[0], 
                        fontWeight: 'bold', 
                        textAlign: 'center',
                        fontSize: 12
                      }}>
                        💳 Pay Now
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>
        ))}

        {/* Personalized Treatment Plan */}
        <PersonalizedTreatmentPlan />

        {/* Advanced Treatment Analytics */}
        <View style={{ 
          backgroundColor: 'white', 
          borderRadius: 20, 
          padding: 20, 
          marginHorizontal: 20,
          marginTop: 20,
          shadowColor: '#000', 
          shadowOffset: { width: 0, height: 2 }, 
          shadowOpacity: 0.1, 
          shadowRadius: 8, 
          elevation: 3 
        }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: 'bold', 
            color: '#333', 
            marginBottom: 15 
          }}>
            🔬 Precision Medicine Analytics
          </Text>
          
          <Text style={{ fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 15 }}>
            Our AI analyzes your genetic profile, medical history, and real-time biomarkers to recommend the most effective treatment protocols with minimal side effects.
          </Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
            <TouchableOpacity
              onPress={() => Alert.alert('Genetic Analysis', 'Upload genetic test results for personalized medicine recommendations.')}
              style={{ 
                backgroundColor: '#8b5cf6', 
                borderRadius: 10, 
                padding: 12, 
                flex: 0.48,
                alignItems: 'center'
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>
                🧬 Genetic Profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Alert.alert('Biomarker Tracking', 'Real-time biomarker monitoring and correlation analysis.')}
              style={{ 
                backgroundColor: '#06b6d4', 
                borderRadius: 10, 
                padding: 12, 
                flex: 0.48,
                alignItems: 'center'
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>
                📊 Biomarkers
              </Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            onPress={() => Alert.alert('Treatment Optimizer', 'AI-powered treatment optimization based on your unique profile.')}
            style={{ 
              backgroundColor: '#667eea', 
              borderRadius: 10, 
              padding: 12, 
              alignItems: 'center' 
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              🎯 Optimize My Treatment Plan
            </Text>
          </TouchableOpacity>
        </View>

        {/* Emergency Contact */}
        <View style={{ 
          backgroundColor: '#ff6b6b', 
          borderRadius: 20, 
          padding: 20, 
          marginTop: 20 
        }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: 'bold', 
            color: 'white', 
            marginBottom: 10 
          }}>
            🚨 Emergency Contact
          </Text>
          <Text style={{ 
            color: 'rgba(255,255,255,0.9)', 
            marginBottom: 15,
            lineHeight: 18
          }}>
            If you experience severe abdominal pain, fever, vomiting, or unusual symptoms, contact emergency services immediately.
          </Text>
          <TouchableOpacity
            onPress={() => Alert.alert('Emergency Call', 'This would initiate an emergency call in a real app.')}
            style={{ 
              backgroundColor: 'white', 
              borderRadius: 10, 
              padding: 15, 
              alignItems: 'center' 
            }}
          >
            <Text style={{ 
              color: '#ff6b6b', 
              fontWeight: 'bold', 
              fontSize: 16 
            }}>
              📞 Call Emergency: 911
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
