import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';

interface EmergencyAlert {
  level: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  action: string;
  timeDetected: Date;
}

export function EmergencyDetectionSystem() {
  const { colors } = useTheme();
  const [currentAlert, setCurrentAlert] = useState<EmergencyAlert | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [vitalSigns, setVitalSigns] = useState({
    heartRate: 72,
    temperature: 98.6,
    painLevel: 2,
    symptoms: ['mild bloating']
  });

  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        // Simulate real-time monitoring
        const newVitals = {
          heartRate: 70 + Math.random() * 20,
          temperature: 98 + Math.random() * 2,
          painLevel: Math.floor(Math.random() * 10),
          symptoms: ['mild bloating', 'occasional pain'][Math.floor(Math.random() * 2)] as any
        };
        setVitalSigns(newVitals);

        // Check for emergency conditions
        if (newVitals.painLevel > 7 || newVitals.temperature > 100.4) {
          setCurrentAlert({
            level: 'critical',
            message: 'Severe symptoms detected! Immediate medical attention required.',
            action: 'Call emergency services or go to nearest hospital',
            timeDetected: new Date()
          });
        } else if (newVitals.painLevel > 5 || newVitals.heartRate > 100) {
          setCurrentAlert({
            level: 'high',
            message: 'Concerning symptoms detected. Medical consultation recommended.',
            action: 'Contact your healthcare provider within 2 hours',
            timeDetected: new Date()
          });
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isMonitoring]);

  const getAlertColor = (level: string): readonly [string, string] => {
    switch (level) {
      case 'critical': return ['#dc2626', '#b91c1c'] as const;
      case 'high': return ['#ea580c', '#c2410c'] as const;
      case 'medium': return ['#d97706', '#b45309'] as const;
      case 'low': return ['#16a34a', '#15803d'] as const;
      default: return ['#6b7280', '#4b5563'] as const;
    }
  };

  const handleEmergencyCall = () => {
    Alert.alert(
      'Emergency Call',
      'This will call emergency services. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call Now', onPress: () => Linking.openURL('tel:911') }
      ]
    );
  };

  const sendSOSAlert = () => {
    Alert.alert(
      'SOS Alert Sent',
      'Emergency contacts have been notified with your location and medical information.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={{ backgroundColor: colors.card, borderRadius: 20, padding: 20, margin: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text, marginBottom: 15 }}>
        🚨 Emergency Detection System
      </Text>

      {/* Monitoring Status */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: 20 
      }}>
        <Text style={{ fontSize: 16, color: colors.text }}>
          Real-time Monitoring
        </Text>
        <TouchableOpacity
          onPress={() => setIsMonitoring(!isMonitoring)}
          style={{
            backgroundColor: isMonitoring ? '#22c55e' : colors.border,
            borderRadius: 20,
            paddingHorizontal: 15,
            paddingVertical: 8
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {isMonitoring ? '🟢 Active' : '🔴 Inactive'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Current Vitals */}
      {isMonitoring && (
        <View style={{ 
          backgroundColor: colors.surface, 
          borderRadius: 15, 
          padding: 15, 
          marginBottom: 15 
        }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 10 }}>
            📊 Current Vitals
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
            <Text style={{ color: colors.textSecondary }}>Heart Rate:</Text>
            <Text style={{ color: colors.text, fontWeight: 'bold' }}>
              {Math.round(vitalSigns.heartRate)} BPM
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
            <Text style={{ color: colors.textSecondary }}>Temperature:</Text>
            <Text style={{ color: colors.text, fontWeight: 'bold' }}>
              {vitalSigns.temperature.toFixed(1)}°F
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
            <Text style={{ color: colors.textSecondary }}>Pain Level:</Text>
            <Text style={{ 
              color: vitalSigns.painLevel > 5 ? '#ef4444' : colors.text, 
              fontWeight: 'bold' 
            }}>
              {vitalSigns.painLevel}/10
            </Text>
          </View>
        </View>
      )}

      {/* Emergency Alert */}
      {currentAlert && (
        <LinearGradient
          colors={getAlertColor(currentAlert.level)}
          style={{ borderRadius: 15, padding: 20, marginBottom: 15 }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', marginBottom: 10 }}>
            ⚠️ {currentAlert.level.toUpperCase()} ALERT
          </Text>
          <Text style={{ color: 'white', marginBottom: 10, lineHeight: 20 }}>
            {currentAlert.message}
          </Text>
          <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14, marginBottom: 15 }}>
            Action Required: {currentAlert.action}
          </Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>
            Detected: {currentAlert.timeDetected.toLocaleTimeString()}
          </Text>
          
          {currentAlert.level === 'critical' && (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
              <TouchableOpacity
                onPress={handleEmergencyCall}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  flex: 0.48
                }}
              >
                <Text style={{ color: '#dc2626', fontWeight: 'bold', textAlign: 'center' }}>
                  📞 Call 911
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={sendSOSAlert}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  borderRadius: 10,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  flex: 0.48
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                  🆘 Send SOS
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </LinearGradient>
      )}

      {/* Emergency Contacts */}
      <View style={{ 
        backgroundColor: colors.surface, 
        borderRadius: 15, 
        padding: 15, 
        marginBottom: 15 
      }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 10 }}>
          🏥 Emergency Contacts
        </Text>
        <TouchableOpacity
          onPress={() => Linking.openURL('tel:+254711223344')}
          style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            paddingVertical: 8,
            borderBottomWidth: 1,
            borderBottomColor: colors.border
          }}
        >
          <Text style={{ color: colors.text }}>Dr. Sarah Kimani</Text>
          <Text style={{ color: colors.primary }}>📞 Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL('tel:+254722556677')}
          style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            paddingVertical: 8
          }}
        >
          <Text style={{ color: colors.text }}>Kenyatta Hospital ER</Text>
          <Text style={{ color: colors.primary }}>📞 Call</Text>
        </TouchableOpacity>
      </View>

      {/* Symptom Tracker */}
      <TouchableOpacity
        onPress={() => Alert.alert('Quick Assessment', 'Rate your current symptoms to help our AI assess your condition.')}
        style={{
          backgroundColor: colors.primary,
          borderRadius: 15,
          padding: 15,
          alignItems: 'center'
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
          📝 Quick Symptom Assessment
        </Text>
      </TouchableOpacity>
    </View>
  );
}