
import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

interface HealthHistoryModalProps {
  visible: boolean;
  onClose: () => void;
}

export function HealthHistoryModal({ visible, onClose }: HealthHistoryModalProps) {
  const { colors, isDark } = useTheme();
  
  const healthHistory = [
    {
      date: '2024-01-15',
      type: 'Checkup',
      doctor: 'Dr. Sarah Johnson',
      findings: 'Small functional cyst detected (2.5cm)',
      action: 'Regular monitoring recommended'
    },
    {
      date: '2023-12-01',
      type: 'Ultrasound',
      doctor: 'Dr. Michael Chen',
      findings: 'No abnormalities detected',
      action: 'Continue routine screening'
    },
    {
      date: '2023-10-20',
      type: 'Consultation',
      doctor: 'Dr. Sarah Johnson',
      findings: 'Discussed family history and symptoms',
      action: 'Scheduled follow-up ultrasound'
    }
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {/* Header */}
        <LinearGradient
          colors={isDark ? ['#1f2937', '#374151'] : ['#6366f1', '#8b5cf6']}
          style={{
            padding: 20,
            paddingTop: 60,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
              📋 Health History
            </Text>
            <TouchableOpacity
              onPress={onClose}
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 20,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>✕</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <ScrollView style={{ flex: 1, padding: 20 }}>
          {healthHistory.map((record, index) => (
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
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text }}>
                  {record.type}
                </Text>
                <Text style={{ fontSize: 14, color: colors.textSecondary }}>
                  {record.date}
                </Text>
              </View>
              
              <Text style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 5 }}>
                Provider: {record.doctor}
              </Text>
              
              <Text style={{ fontSize: 14, color: colors.text, marginBottom: 10 }}>
                Findings: {record.findings}
              </Text>
              
              <Text style={{ fontSize: 14, color: colors.primary, fontWeight: '500' }}>
                Action: {record.action}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
}
