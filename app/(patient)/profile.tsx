
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Switch } from '@/components/ui/Switch';
import { HealthHistoryModal } from '@/components/HealthHistoryModal';
import { HelpCenterModal } from '@/components/HelpCenterModal';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const { colors, isDark, theme, setTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);
  const [healthHistoryVisible, setHealthHistoryVisible] = useState(false);
  const [helpCenterVisible, setHelpCenterVisible] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' },
    { code: 'luo', name: 'Dholuo', flag: '🇰🇪' },
    { code: 'ki', name: 'Gĩkũyũ', flag: '🇰🇪' },
    { code: 'kam', name: 'Kamba', flag: '🇰🇪' },
    { code: 'guz', name: 'Kisii', flag: '🇰🇪' },
    { code: 'kal', name: 'Kalenjin', flag: '🇰🇪' },
    { code: 'mas', name: 'Maasai', flag: '🇰🇪' },
    { code: 'luy', name: 'Luhya', flag: '🇰🇪' },
    { code: 'mer', name: 'Meru', flag: '🇰🇪' },
    { code: 'som', name: 'Somali', flag: '🇸🇴' },
  ];

  const themeOptions = [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'system', label: 'System', icon: '📱' }
  ];

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', onPress: () => {
          signOut();
          router.replace('/(auth)/');
        }}
      ]
    );
  };

  const showPrivacyPolicy = () => {
    Alert.alert(
      'Privacy Policy',
      'Our Privacy Policy ensures your health data is protected with end-to-end encryption. We never share personal health information without explicit consent. You have full control over your data and can request deletion at any time.\n\nKey Points:\n• Data encryption at rest and in transit\n• HIPAA compliance\n• No third-party data sales\n• User-controlled data sharing\n• Regular security audits',
      [{ text: 'OK' }]
    );
  };

  const showTermsConditions = () => {
    Alert.alert(
      'Terms & Conditions',
      'By using this app, you agree to:\n\n• Use the service for informational purposes only\n• Consult healthcare professionals for medical decisions\n• Provide accurate health information\n• Respect intellectual property rights\n• Follow community guidelines\n\nThe app provides AI-assisted health insights but does not replace professional medical advice. Always consult qualified healthcare providers for diagnosis and treatment decisions.',
      [{ text: 'I Understand' }]
    );
  };

  const showAbout = () => {
    Alert.alert(
      'About CystCare AI',
      'Version 1.0.0\n\nCystCare AI is an advanced health management platform specializing in ovarian cyst monitoring and treatment prediction. Our AI models are trained on extensive medical datasets to provide personalized health insights.\n\nDeveloped by: HealthTech Innovations\nLast Updated: March 2024\nSupport: support@cystcare.app',
      [{ text: 'OK' }]
    );
  };

  return (
    <>
      <ScrollView 
        style={{ flex: 1, backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <LinearGradient
          colors={['#F4D3E5', '#A3327A']}
          style={{ 
            padding: 20, 
            paddingTop: 60, 
            borderBottomLeftRadius: 30, 
            borderBottomRightRadius: 30,
            alignItems: 'center'
          }}
        >
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: 'rgba(255,255,255,0.3)',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 15
          }}>
            <Text style={{ fontSize: 32, color: 'white' }}>👤</Text>
          </View>
          <Text style={{ 
            fontSize: 24, 
            fontWeight: 'bold', 
            color: '#A3327A', 
            marginBottom: 5 
          }}>
            Test Patient
          </Text>
          <Text style={{ 
            fontSize: 16, 
            color: '#A3327A' 
          }}>
            {user?.email}
          </Text>
          <TouchableOpacity
            onPress={() => Alert.alert('Edit Profile', 'Profile editing feature coming soon!')}
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: 20,
              paddingHorizontal: 20,
              paddingVertical: 8,
              marginTop: 10
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>✏️ Edit Profile</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={{ padding: 20 }}>
          {/* Health Summary */}
          <View style={{ 
            backgroundColor: colors.card, 
            borderRadius: 20, 
            padding: 20, 
            marginBottom: 20,
            borderWidth: 1,
            borderColor: colors.border
          }}>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: 'bold', 
              color: colors.text, 
              marginBottom: 15 
            }}>
              📊 Health Summary
            </Text>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text style={{ color: colors.textSecondary }}>Last Checkup:</Text>
              <Text style={{ fontWeight: 'bold', color: colors.text }}>2 days ago</Text>
            </View>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text style={{ color: colors.textSecondary }}>Risk Level:</Text>
              <Text style={{ fontWeight: 'bold', color: '#22c55e' }}>Low</Text>
            </View>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text style={{ color: colors.textSecondary }}>Next Appointment:</Text>
              <Text style={{ fontWeight: 'bold', color: colors.primary }}>Mar 15, 2024</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
              <Text style={{ color: colors.textSecondary }}>Total Predictions:</Text>
              <Text style={{ fontWeight: 'bold', color: colors.text }}>12</Text>
            </View>

            <TouchableOpacity
              onPress={() => setHealthHistoryVisible(true)}
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
                📋 View Full Health History
              </Text>
            </TouchableOpacity>
          </View>

          {/* Theme Settings */}
          <View style={{ 
            backgroundColor: colors.card, 
            borderRadius: 20, 
            padding: 20, 
            marginBottom: 20,
            borderWidth: 1,
            borderColor: colors.border
          }}>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: 'bold', 
              color: colors.text, 
              marginBottom: 15 
            }}>
              🎨 Appearance
            </Text>
            
            {themeOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => setTheme(option.value as any)}
                style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  paddingVertical: 12, 
                  borderBottomWidth: 1, 
                  borderBottomColor: colors.border 
                }}
              >
                <Text style={{ fontSize: 24, marginRight: 15 }}>{option.icon}</Text>
                <Text style={{ 
                  fontSize: 16, 
                  color: colors.text, 
                  flex: 1 
                }}>
                  {option.label}
                </Text>
                {theme === option.value && (
                  <Text style={{ fontSize: 18, color: colors.primary }}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Settings */}
          <View style={{ 
            backgroundColor: colors.card, 
            borderRadius: 20, 
            padding: 20, 
            marginBottom: 20,
            borderWidth: 1,
            borderColor: colors.border
          }}>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: 'bold', 
              color: colors.text, 
              marginBottom: 15 
            }}>
              ⚙️ Settings
            </Text>
            
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              paddingVertical: 12, 
              borderBottomWidth: 1, 
              borderBottomColor: colors.border 
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 20, marginRight: 15 }}>🔔</Text>
                <Text style={{ fontSize: 16, color: colors.text }}>
                  Push Notifications
                </Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
              />
            </View>

            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              paddingVertical: 12, 
              borderBottomWidth: 1, 
              borderBottomColor: colors.border 
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 20, marginRight: 15 }}>🔐</Text>
                <Text style={{ fontSize: 16, color: colors.text }}>
                  Biometric Login
                </Text>
              </View>
              <Switch
                value={biometricEnabled}
                onValueChange={setBiometricEnabled}
              />
            </View>

            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              paddingVertical: 12
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 20, marginRight: 15 }}>📊</Text>
                <Text style={{ fontSize: 16, color: colors.text }}>
                  Anonymous Data Sharing
                </Text>
              </View>
              <Switch
                value={dataSharing}
                onValueChange={setDataSharing}
              />
            </View>
          </View>

          {/* Language Settings */}
          <View style={{ 
            backgroundColor: colors.card, 
            borderRadius: 20, 
            padding: 20, 
            marginBottom: 20,
            borderWidth: 1,
            borderColor: colors.border
          }}>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: 'bold', 
              color: colors.text, 
              marginBottom: 15 
            }}>
              🌐 Language & Region
            </Text>
            
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                onPress={() => setLanguage(lang.code as any)}
                style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  paddingVertical: 12, 
                  borderBottomWidth: 1, 
                  borderBottomColor: colors.border 
                }}
              >
                <Text style={{ fontSize: 24, marginRight: 15 }}>{lang.flag}</Text>
                <Text style={{ 
                  fontSize: 16, 
                  color: colors.text, 
                  flex: 1 
                }}>
                  {lang.name}
                </Text>
                {language === lang.code && (
                  <Text style={{ fontSize: 18, color: colors.primary }}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Support & Legal */}
          <View style={{ 
            backgroundColor: colors.card, 
            borderRadius: 20, 
            padding: 20, 
            marginBottom: 20,
            borderWidth: 1,
            borderColor: colors.border
          }}>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: 'bold', 
              color: colors.text, 
              marginBottom: 15 
            }}>
              📚 Support & Legal
            </Text>
            
            <TouchableOpacity
              onPress={() => router.push('/(patient)/chat')}
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                paddingVertical: 12, 
                borderBottomWidth: 1, 
                borderBottomColor: colors.border 
              }}
            >
              <Text style={{ fontSize: 20, marginRight: 15 }}>💬</Text>
              <Text style={{ fontSize: 16, color: colors.text, flex: 1 }}>
                Chat with AI Assistant
              </Text>
              <Text style={{ color: colors.primary }}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setHelpCenterVisible(true)}
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                paddingVertical: 12, 
                borderBottomWidth: 1, 
                borderBottomColor: colors.border 
              }}
            >
              <Text style={{ fontSize: 20, marginRight: 15 }}>❓</Text>
              <Text style={{ fontSize: 16, color: colors.text, flex: 1 }}>
                Help Center & FAQs
              </Text>
              <Text style={{ color: colors.primary }}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={showPrivacyPolicy}
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                paddingVertical: 12, 
                borderBottomWidth: 1, 
                borderBottomColor: colors.border 
              }}
            >
              <Text style={{ fontSize: 20, marginRight: 15 }}>🔒</Text>
              <Text style={{ fontSize: 16, color: colors.text, flex: 1 }}>
                Privacy Policy
              </Text>
              <Text style={{ color: colors.primary }}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={showTermsConditions}
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                paddingVertical: 12, 
                borderBottomWidth: 1, 
                borderBottomColor: colors.border 
              }}
            >
              <Text style={{ fontSize: 20, marginRight: 15 }}>📄</Text>
              <Text style={{ fontSize: 16, color: colors.text, flex: 1 }}>
                Terms & Conditions
              </Text>
              <Text style={{ color: colors.primary }}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={showAbout}
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                paddingVertical: 12
              }}
            >
              <Text style={{ fontSize: 20, marginRight: 15 }}>ℹ️</Text>
              <Text style={{ fontSize: 16, color: colors.text, flex: 1 }}>
                About CystCare AI
              </Text>
              <Text style={{ color: colors.primary }}>→</Text>
            </TouchableOpacity>
          </View>

          {/* Data Management */}
          <View style={{ 
            backgroundColor: colors.card, 
            borderRadius: 20, 
            padding: 20, 
            marginBottom: 20,
            borderWidth: 1,
            borderColor: colors.border
          }}>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: 'bold', 
              color: colors.text, 
              marginBottom: 15 
            }}>
              💾 Data Management
            </Text>
            
            <TouchableOpacity
              onPress={() => Alert.alert('Export Data', 'Your health data will be exported in a secure format. This may take a few minutes.')}
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                paddingVertical: 12, 
                borderBottomWidth: 1, 
                borderBottomColor: colors.border 
              }}
            >
              <Text style={{ fontSize: 20, marginRight: 15 }}>📤</Text>
              <Text style={{ fontSize: 16, color: colors.text, flex: 1 }}>
                Export My Data
              </Text>
              <Text style={{ color: colors.primary }}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Alert.alert('Delete Account', 'This action cannot be undone. All your data will be permanently deleted.', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => Alert.alert('Account Deleted', 'Your account has been scheduled for deletion.') }
              ])}
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                paddingVertical: 12
              }}
            >
              <Text style={{ fontSize: 20, marginRight: 15 }}>🗑️</Text>
              <Text style={{ fontSize: 16, color: '#ef4444', flex: 1 }}>
                Delete Account
              </Text>
              <Text style={{ color: '#ef4444' }}>→</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Out */}
          <TouchableOpacity
            onPress={handleSignOut}
            style={{ 
              backgroundColor: '#ef4444', 
              borderRadius: 20, 
              padding: 20, 
              alignItems: 'center',
              marginBottom: 40
            }}
          >
            <Text style={{ 
              fontSize: 18, 
              fontWeight: 'bold', 
              color: 'white' 
            }}>
              🚪 Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <HealthHistoryModal 
        visible={healthHistoryVisible}
        onClose={() => setHealthHistoryVisible(false)}
      />
      
      <HelpCenterModal 
        visible={helpCenterVisible}
        onClose={() => setHelpCenterVisible(false)}
      />
    </>
  );
}
