
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SignInScreen() {
  const { signIn } = useAuth();
  const { t } = useLanguage();
  const { type } = useLocalSearchParams();
  const userType = type as 'patient' | 'doctor';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await signIn(email, password, userType);
      if (userType === 'patient') {
        router.replace('/(patient)/');
      } else {
        router.replace('/(doctor)/');
      }
    } catch (error) {
      Alert.alert('Error', 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, justifyContent: 'center' }}>
          <Text style={{ 
            fontSize: 28, 
            fontWeight: 'bold', 
            color: 'white', 
            textAlign: 'center', 
            marginBottom: 10 
          }}>
            {userType === 'patient' ? '👤' : '👨‍⚕️'} Sign In
          </Text>
          
          <Text style={{ 
            fontSize: 18, 
            color: 'rgba(255,255,255,0.8)', 
            textAlign: 'center', 
            marginBottom: 40 
          }}>
            {userType === 'patient' ? 'Patient' : 'Doctor'} Portal
          </Text>

          <View style={{ 
            backgroundColor: 'rgba(255,255,255,0.1)', 
            borderRadius: 15, 
            padding: 20, 
            marginBottom: 30 
          }}>
            <TextInput
              placeholder="Email Address"
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{ 
                color: 'white', 
                fontSize: 16, 
                marginBottom: 20, 
                borderBottomWidth: 1, 
                borderBottomColor: 'rgba(255,255,255,0.3)', 
                paddingBottom: 10 
              }}
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={{ 
                color: 'white', 
                fontSize: 16, 
                borderBottomWidth: 1, 
                borderBottomColor: 'rgba(255,255,255,0.3)', 
                paddingBottom: 10 
              }}
            />
          </View>

          <TouchableOpacity
            onPress={handleSignIn}
            disabled={isLoading}
            style={{ 
              backgroundColor: 'white', 
              padding: 18, 
              borderRadius: 25, 
              alignItems: 'center', 
              marginBottom: 20,
              opacity: isLoading ? 0.7 : 1
            }}
          >
            <Text style={{ 
              color: '#667eea', 
              fontSize: 18, 
              fontWeight: 'bold' 
            }}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push(`/(auth)/sign-up?type=${userType}`)}
            style={{ 
              alignItems: 'center', 
              marginBottom: 20 
            }}
          >
            <Text style={{ 
              color: 'rgba(255,255,255,0.8)', 
              fontSize: 16 
            }}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            style={{ 
              alignItems: 'center' 
            }}
          >
            <Text style={{ 
              color: 'rgba(255,255,255,0.6)', 
              fontSize: 14 
            }}>
              ← Back to Portal Selection
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
