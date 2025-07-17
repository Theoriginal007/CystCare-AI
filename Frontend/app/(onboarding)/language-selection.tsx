
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';

type Language = 'en' | 'sw' | 'luo' | 'ki';

const languages = [
  { code: 'en' as Language, name: 'English', flag: '🇬🇧' },
  { code: 'sw' as Language, name: 'Kiswahili', flag: '🇰🇪' },
  { code: 'luo' as Language, name: 'Dholuo', flag: '🇰🇪' },
  { code: 'ki' as Language, name: 'Gĩkũyũ', flag: '🇰🇪' },
];

export default function LanguageSelectionScreen() {
  const { setLanguage } = useLanguage();

  const handleLanguageSelect = (langCode: Language) => {
    setLanguage(langCode);
    router.push('/(auth)/');
  };

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <Text style={{ 
          fontSize: 28, 
          fontWeight: 'bold', 
          color: 'white', 
          textAlign: 'center', 
          marginBottom: 20 
        }}>
          Choose Your Language
        </Text>
        
        <Text style={{ 
          fontSize: 16, 
          color: 'rgba(255,255,255,0.8)', 
          textAlign: 'center', 
          marginBottom: 40 
        }}>
          Select your preferred language for the best experience
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              onPress={() => handleLanguageSelect(lang.code)}
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                padding: 20, 
                borderRadius: 15, 
                marginBottom: 15, 
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'space-between' 
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 30, marginRight: 15 }}>{lang.flag}</Text>
                <Text style={{ 
                  fontSize: 18, 
                  fontWeight: 'bold', 
                  color: 'white' 
                }}>
                  {lang.name}
                </Text>
              </View>
              <Text style={{ fontSize: 20, color: 'white' }}>→</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}
