
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AuthHomeScreen() {
  const { t } = useLanguage();

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ 
          fontSize: 32, 
          fontWeight: 'bold', 
          color: 'white', 
          textAlign: 'center', 
          marginBottom: 10 
        }}>
          🏥 CystCare AI
        </Text>
        
        <Text style={{ 
          fontSize: 18, 
          color: 'rgba(255,255,255,0.9)', 
          textAlign: 'center', 
          marginBottom: 50 
        }}>
          Choose your account type
        </Text>

        <TouchableOpacity
          onPress={() => router.push('/(auth)/sign-in?type=patient')}
          style={{ 
            backgroundColor: 'rgba(255,255,255,0.2)', 
            padding: 25, 
            borderRadius: 20, 
            marginBottom: 20, 
            width: '100%', 
            alignItems: 'center' 
          }}
        >
          <Text style={{ fontSize: 24, marginBottom: 10 }}>👤</Text>
          <Text style={{ 
            fontSize: 20, 
            fontWeight: 'bold', 
            color: 'white', 
            marginBottom: 5 
          }}>
            {t('patient')} Portal
          </Text>
          <Text style={{ 
            fontSize: 14, 
            color: 'rgba(255,255,255,0.8)', 
            textAlign: 'center' 
          }}>
            Track your health, get predictions & recommendations
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/(auth)/sign-in?type=doctor')}
          style={{ 
            backgroundColor: 'rgba(255,255,255,0.2)', 
            padding: 25, 
            borderRadius: 20, 
            width: '100%', 
            alignItems: 'center' 
          }}
        >
          <Text style={{ fontSize: 24, marginBottom: 10 }}>👨‍⚕️</Text>
          <Text style={{ 
            fontSize: 20, 
            fontWeight: 'bold', 
            color: 'white', 
            marginBottom: 5 
          }}>
            {t('doctor')} Portal
          </Text>
          <Text style={{ 
            fontSize: 14, 
            color: 'rgba(255,255,255,0.8)', 
            textAlign: 'center' 
          }}>
            Clinical decision support & patient management
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          style={{ 
            marginTop: 30, 
            padding: 15 
          }}
        >
          <Text style={{ 
            color: 'rgba(255,255,255,0.8)', 
            fontSize: 16 
          }}>
            ← Back to Language Selection
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
