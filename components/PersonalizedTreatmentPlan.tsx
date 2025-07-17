import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';

interface TreatmentPhase {
  phase: number;
  name: string;
  duration: string;
  description: string;
  medications: string[];
  appointments: string[];
  lifestyle: string[];
  progress: number;
  status: 'pending' | 'active' | 'completed';
}

interface PersonalizedPlan {
  planId: string;
  patientProfile: string;
  totalDuration: string;
  successRate: number;
  phases: TreatmentPhase[];
  riskReduction: number;
  costEstimate: string;
}

export function PersonalizedTreatmentPlan() {
  const { colors } = useTheme();
  const [selectedPhase, setSelectedPhase] = useState<number>(1);
  const [planGenerated, setPlanGenerated] = useState(false);

  const mockPlan: PersonalizedPlan = {
    planId: 'CTP-2024-001',
    patientProfile: 'Low-risk functional cyst, age 28, no complications',
    totalDuration: '6-9 months',
    successRate: 87,
    riskReduction: 73,
    costEstimate: 'KES 45,000 - 65,000',
    phases: [
      {
        phase: 1,
        name: 'Initial Stabilization',
        duration: '0-6 weeks',
        description: 'Focus on symptom management and baseline establishment',
        medications: ['Ibuprofen 400mg (as needed)', 'Vitamin D3 2000IU daily'],
        appointments: ['Initial consultation', 'Baseline ultrasound', 'Blood work'],
        lifestyle: ['Low-impact exercise 3x/week', 'Anti-inflammatory diet', 'Stress reduction'],
        progress: 100,
        status: 'completed'
      },
      {
        phase: 2,
        name: 'Active Treatment',
        duration: '6 weeks - 4 months',
        description: 'Hormonal therapy and intensive monitoring',
        medications: ['Oral contraceptive (Yasmin)', 'Omega-3 supplements'],
        appointments: ['Monthly follow-ups', 'Ultrasound every 6 weeks'],
        lifestyle: ['Continued exercise routine', 'Dietary modifications', 'Sleep optimization'],
        progress: 45,
        status: 'active'
      },
      {
        phase: 3,
        name: 'Maintenance & Monitoring',
        duration: '4-9 months',
        description: 'Long-term monitoring and prevention strategies',
        medications: ['Continue hormonal therapy', 'Antioxidant supplements'],
        appointments: ['Quarterly check-ups', 'Biannual imaging'],
        lifestyle: ['Maintain exercise habits', 'Regular health monitoring'],
        progress: 0,
        status: 'pending'
      }
    ]
  };

  const generatePlan = () => {
    Alert.alert(
      'Generate Plan',
      'Creating your personalized treatment plan based on AI analysis...',
      [{ text: 'OK', onPress: () => setPlanGenerated(true) }]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#22c55e';
      case 'active': return '#3b82f6';
      case 'pending': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const scheduleAppointment = (appointment: string) => {
    Alert.alert(
      'Schedule Appointment',
      `Schedule: ${appointment}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Book Now', onPress: () => Alert.alert('Success', 'Appointment scheduled!') }
      ]
    );
  };

  return (
    <View style={{ backgroundColor: colors.card, borderRadius: 20, padding: 20, margin: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text, marginBottom: 15 }}>
        🎯 Personalized Treatment Plan
      </Text>

      {!planGenerated ? (
        <View>
          <Text style={{ color: colors.textSecondary, marginBottom: 20, lineHeight: 20 }}>
            Generate a comprehensive, AI-powered treatment plan tailored specifically to your condition, lifestyle, and medical history.
          </Text>
          <TouchableOpacity
            onPress={generatePlan}
            style={{
              backgroundColor: colors.primary,
              borderRadius: 15,
              padding: 15,
              alignItems: 'center'
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
              🚀 Generate My Plan
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={{ maxHeight: 500 }}>
          {/* Plan Overview */}
          <LinearGradient
            colors={['#3b82f6', '#1d4ed8']}
            style={{ borderRadius: 15, padding: 20, marginBottom: 20 }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', marginBottom: 10 }}>
              Plan Overview
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.9)', marginBottom: 5 }}>
              ID: {mockPlan.planId}
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.9)', marginBottom: 5 }}>
              Duration: {mockPlan.totalDuration}
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.9)', marginBottom: 5 }}>
              Success Rate: {mockPlan.successRate}%
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.9)', marginBottom: 5 }}>
              Risk Reduction: {mockPlan.riskReduction}%
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.9)' }}>
              Estimated Cost: {mockPlan.costEstimate}
            </Text>
          </LinearGradient>

          {/* Phase Navigation */}
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            {mockPlan.phases.map((phase) => (
              <TouchableOpacity
                key={phase.phase}
                onPress={() => setSelectedPhase(phase.phase)}
                style={{
                  flex: 1,
                  backgroundColor: selectedPhase === phase.phase ? colors.primary : colors.surface,
                  borderRadius: 10,
                  padding: 10,
                  marginHorizontal: 2,
                  alignItems: 'center'
                }}
              >
                <Text style={{
                  color: selectedPhase === phase.phase ? 'white' : colors.text,
                  fontWeight: 'bold',
                  fontSize: 12
                }}>
                  Phase {phase.phase}
                </Text>
                <View style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: getStatusColor(phase.status),
                  marginTop: 5
                }} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Selected Phase Details */}
          {mockPlan.phases.map((phase) => (
            selectedPhase === phase.phase && (
              <View key={phase.phase}>
                <View style={{
                  backgroundColor: colors.surface,
                  borderRadius: 15,
                  padding: 15,
                  marginBottom: 15
                }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: 5 }}>
                    {phase.name}
                  </Text>
                  <Text style={{ color: colors.textSecondary, marginBottom: 5 }}>
                    Duration: {phase.duration}
                  </Text>
                  <Text style={{ color: colors.textSecondary, marginBottom: 15 }}>
                    {phase.description}
                  </Text>
                  
                  {/* Progress Bar */}
                  <View style={{ marginBottom: 15 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                      <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.text }}>Progress</Text>
                      <Text style={{ fontSize: 14, color: colors.textSecondary }}>{phase.progress}%</Text>
                    </View>
                    <View style={{
                      height: 8,
                      backgroundColor: colors.border,
                      borderRadius: 4,
                      overflow: 'hidden'
                    }}>
                      <View style={{
                        height: '100%',
                        width: `${phase.progress}%`,
                        backgroundColor: getStatusColor(phase.status)
                      }} />
                    </View>
                  </View>
                </View>

                {/* Medications */}
                <View style={{
                  backgroundColor: colors.surface,
                  borderRadius: 15,
                  padding: 15,
                  marginBottom: 15
                }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 10 }}>
                    💊 Medications
                  </Text>
                  {phase.medications.map((med, index) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                      <Text style={{ color: colors.textSecondary, flex: 1 }}>• {med}</Text>
                      <TouchableOpacity
                        onPress={() => Alert.alert('Medication Info', `Details about ${med}`)}
                        style={{
                          backgroundColor: colors.primary,
                          borderRadius: 5,
                          paddingHorizontal: 8,
                          paddingVertical: 4
                        }}
                      >
                        <Text style={{ color: 'white', fontSize: 12 }}>ℹ️</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>

                {/* Appointments */}
                <View style={{
                  backgroundColor: colors.surface,
                  borderRadius: 15,
                  padding: 15,
                  marginBottom: 15
                }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 10 }}>
                    📅 Appointments
                  </Text>
                  {phase.appointments.map((apt, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => scheduleAppointment(apt)}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: 8,
                        borderBottomWidth: index < phase.appointments.length - 1 ? 1 : 0,
                        borderBottomColor: colors.border
                      }}
                    >
                      <Text style={{ color: colors.textSecondary, flex: 1 }}>• {apt}</Text>
                      <Text style={{ color: colors.primary, fontSize: 12 }}>Schedule →</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Lifestyle Recommendations */}
                <View style={{
                  backgroundColor: colors.surface,
                  borderRadius: 15,
                  padding: 15
                }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 10 }}>
                    🌱 Lifestyle
                  </Text>
                  {phase.lifestyle.map((item, index) => (
                    <Text key={index} style={{ color: colors.textSecondary, marginBottom: 5 }}>
                      • {item}
                    </Text>
                  ))}
                </View>
              </View>
            )
          ))}
        </ScrollView>
      )}
    </View>
  );
}