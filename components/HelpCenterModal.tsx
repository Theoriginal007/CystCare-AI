
import React from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';

interface HelpCenterModalProps {
  visible: boolean;
  onClose: () => void;
}

export function HelpCenterModal({ visible, onClose }: HelpCenterModalProps) {
  const { colors, isDark } = useTheme();
  
  const faqData = [
    {
      question: 'What are ovarian cysts?',
      answer: 'Ovarian cysts are fluid-filled sacs that develop on or inside an ovary. Most are harmless and resolve on their own.'
    },
    {
      question: 'How accurate are the AI predictions?',
      answer: 'Our AI model has been trained on extensive medical datasets and provides 85-90% accuracy in growth predictions.'
    },
    {
      question: 'Can I share my data with my doctor?',
      answer: 'Yes, you can export your health data and predictions to share with your healthcare provider.'
    },
    {
      question: 'Is my data secure?',
      answer: 'All data is encrypted end-to-end and stored securely. We never share personal health information without consent.'
    }
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={{ flex: 1, backgroundColor: colors.background }}>
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
              ❓ Help Center
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
          {faqData.map((faq, index) => (
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
              <Text style={{ 
                fontSize: 16, 
                fontWeight: 'bold', 
                color: colors.text,
                marginBottom: 10 
              }}>
                {faq.question}
              </Text>
              <Text style={{ 
                fontSize: 14, 
                color: colors.textSecondary,
                lineHeight: 20 
              }}>
                {faq.answer}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
}
