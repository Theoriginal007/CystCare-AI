
import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const { t } = useLanguage();

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={{ flex: 1 }}
    >
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 20 
      }}>
        <View style={{ 
          width: width * 0.8, 
          height: height * 0.3, 
          backgroundColor: 'rgba(255,255,255,0.1)', 
          borderRadius: 20, 
          justifyContent: 'center', 
          alignItems: 'center', 
          marginBottom: 40 
        }}>
          <Text style={{ 
            fontSize: 32, 
            fontWeight: 'bold', 
            color: 'white', 
            textAlign: 'center' 
          }}>
            🏥 CystCare AI
          </Text>
          <Text style={{ 
            fontSize: 16, 
            color: 'rgba(255,255,255,0.8)', 
            textAlign: 'center', 
            marginTop: 10 
          }}>
            Ovarian Cyst Growth Prediction & Treatment
          </Text>
        </View>

        <Text style={{ 
          fontSize: 24, 
          fontWeight: 'bold', 
          color: 'white', 
          textAlign: 'center', 
          marginBottom: 20 
        }}>
          {t('welcome')} to CystCare AI
        </Text>

        <Text style={{ 
          fontSize: 16, 
          color: 'rgba(255,255,255,0.9)', 
          textAlign: 'center', 
          marginBottom: 40, 
          lineHeight: 24 
        }}>
          AI-powered ovarian cyst growth prediction and personalized treatment recommendations for patients and healthcare providers.
        </Text>

        <TouchableOpacity
          onPress={() => router.push('/(onboarding)/language-selection')}
          style={{ 
            backgroundColor: 'white', 
            paddingHorizontal: 40, 
            paddingVertical: 15, 
            borderRadius: 25, 
            marginBottom: 20 
          }}
        >
          <Text style={{ 
            color: '#667eea', 
            fontSize: 18, 
            fontWeight: 'bold' 
          }}>
            Get Started
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/(auth)/')}
          style={{ 
            borderWidth: 2, 
            borderColor: 'white', 
            paddingHorizontal: 30, 
            paddingVertical: 12, 
            borderRadius: 25 
          }}
        >
          <Text style={{ 
            color: 'white', 
            fontSize: 16 
          }}>
            Already have an account?
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
