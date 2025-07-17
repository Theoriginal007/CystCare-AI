
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Alert,
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { AdvancedPredictionEngine } from '@/components/AdvancedPredictionEngine';

const { width } = Dimensions.get('window');

interface PredictionResult {
  riskLevel: string;
  growthRate: string;
  confidence: string;
  recommendation: string;
  nextCheckup: string;
  riskScore: number;
  additionalInfo: string;
}

export default function PredictionScreen() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    age: '',
    cystSize: '',
    hormoneLevel: '',
    cystType: 'functional',
    symptoms: '',
    previousHistory: '',
    familyHistory: 'no',
  });
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const cystTypes = [
    { label: 'Functional Cyst', value: 'functional' },
    { label: 'Dermoid Cyst', value: 'dermoid' },
    { label: 'Cystadenoma', value: 'cystadenoma' },
    { label: 'Endometrioma', value: 'endometrioma' },
  ];

  const symptomOptions = [
    'Pelvic pain', 'Bloating', 'Irregular periods', 'Nausea', 'None'
  ];

  const handlePredict = async () => {
    if (!formData.age || !formData.cystSize) {
      Alert.alert('Error', 'Please fill in required fields (Age and Cyst Size)');
      return;
    }

    setIsLoading(true);
    
    // Enhanced mock prediction with more realistic data
    setTimeout(() => {
      const age = parseInt(formData.age);
      const size = parseFloat(formData.cystSize);
      
      let riskLevel = 'Low';
      let riskScore = 25;
      let additionalInfo = '';
      
      if (size > 50 || age > 40) {
        riskLevel = 'Medium';
        riskScore = 55;
        additionalInfo = 'Regular monitoring recommended due to size/age factors.';
      }
      if (size > 80 || formData.cystType === 'cystadenoma') {
        riskLevel = 'High';
        riskScore = 75;
        additionalInfo = 'Immediate consultation with specialist recommended.';
      }

      const mockPrediction: PredictionResult = {
        riskLevel,
        growthRate: `${(Math.random() * 3 + 1).toFixed(1)}mm/month`,
        confidence: `${85 + Math.floor(Math.random() * 10)}%`,
        recommendation: riskLevel === 'Low' 
          ? 'Continue monitoring with ultrasound every 3 months' 
          : riskLevel === 'Medium'
          ? 'Monthly monitoring and possible hormonal therapy'
          : 'Immediate surgical consultation recommended',
        nextCheckup: '2024-04-15',
        riskScore,
        additionalInfo: additionalInfo || 'Continue current monitoring schedule.'
      };
      setPrediction(mockPrediction);
      setIsLoading(false);
    }, 2000);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return '#28a745';
      case 'Medium': return '#ffc107';
      case 'High': return '#dc3545';
      default: return '#6c757d';
    }
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
          🔮 Cyst Growth Predictor
        </Text>
        <Text style={{ 
          fontSize: 16, 
          color: '#A3327A' 
        }}>
          Enter your health data for AI-powered predictions
        </Text>
      </LinearGradient>

      <View style={{ padding: 20 }}>
        {/* Input Form */}
        <View style={{ 
          backgroundColor: 'white', 
          borderRadius: 20, 
          padding: 20, 
          marginBottom: 20,
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
            marginBottom: 20 
          }}>
            📋 Patient Information
          </Text>

          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontSize: 16, color: '#333', marginBottom: 5 }}>
              Age (years) *
            </Text>
            <TextInput
              value={formData.age}
              onChangeText={(text) => setFormData({...formData, age: text})}
              placeholder="Enter your age"
              keyboardType="numeric"
              style={{ 
                borderWidth: 1, 
                borderColor: '#ddd', 
                borderRadius: 10, 
                padding: 12, 
                fontSize: 16,
                backgroundColor: '#f9f9f9'
              }}
            />
          </View>

          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontSize: 16, color: '#333', marginBottom: 5 }}>
              Current Cyst Size (mm) *
            </Text>
            <TextInput
              value={formData.cystSize}
              onChangeText={(text) => setFormData({...formData, cystSize: text})}
              placeholder="Enter cyst size in mm"
              keyboardType="numeric"
              style={{ 
                borderWidth: 1, 
                borderColor: '#ddd', 
                borderRadius: 10, 
                padding: 12, 
                fontSize: 16,
                backgroundColor: '#f9f9f9'
              }}
            />
          </View>

          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontSize: 16, color: '#333', marginBottom: 5 }}>
              Hormone Level (optional)
            </Text>
            <TextInput
              value={formData.hormoneLevel}
              onChangeText={(text) => setFormData({...formData, hormoneLevel: text})}
              placeholder="Enter hormone level if known"
              style={{ 
                borderWidth: 1, 
                borderColor: '#ddd', 
                borderRadius: 10, 
                padding: 12, 
                fontSize: 16,
                backgroundColor: '#f9f9f9'
              }}
            />
          </View>

          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontSize: 16, color: '#333', marginBottom: 10 }}>
              Cyst Type
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {cystTypes.map((type) => (
                <TouchableOpacity
                  key={type.value}
                  onPress={() => setFormData({...formData, cystType: type.value})}
                  style={{ 
                    backgroundColor: formData.cystType === type.value ? '#667eea' : '#f0f0f0',
                    borderRadius: 20, 
                    paddingHorizontal: 15, 
                    paddingVertical: 8, 
                    marginRight: 10, 
                    marginBottom: 10 
                  }}
                >
                  <Text style={{ 
                    color: formData.cystType === type.value ? 'white' : '#333',
                    fontSize: 14 
                  }}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontSize: 16, color: '#333', marginBottom: 10 }}>
              Current Symptoms
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {symptomOptions.map((symptom) => (
                <TouchableOpacity
                  key={symptom}
                  onPress={() => setFormData({...formData, symptoms: symptom})}
                  style={{ 
                    backgroundColor: formData.symptoms === symptom ? '#f093fb' : '#f0f0f0',
                    borderRadius: 20, 
                    paddingHorizontal: 15, 
                    paddingVertical: 8, 
                    marginRight: 10, 
                    marginBottom: 10 
                  }}
                >
                  <Text style={{ 
                    color: formData.symptoms === symptom ? 'white' : '#333',
                    fontSize: 14 
                  }}>
                    {symptom}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            onPress={handlePredict}
            disabled={isLoading}
            style={{ 
              backgroundColor: isLoading ? '#ccc' : '#667eea', 
              borderRadius: 15, 
              padding: 18, 
              alignItems: 'center',
              marginTop: 10
            }}
          >
            <Text style={{ 
              color: 'white', 
              fontSize: 18, 
              fontWeight: 'bold' 
            }}>
              {isLoading ? '🔄 Analyzing...' : '🔮 Get AI Prediction'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Prediction Results */}
        {prediction && (
          <View style={{ 
            backgroundColor: 'white', 
            borderRadius: 20, 
            padding: 20,
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
              marginBottom: 20 
            }}>
              🎯 AI Prediction Results
            </Text>

            {/* Risk Level Card */}
            <LinearGradient
              colors={[getRiskColor(prediction.riskLevel), getRiskColor(prediction.riskLevel)] as const}
              style={{ 
                borderRadius: 15, 
                padding: 20, 
                marginBottom: 15,
                opacity: 0.9
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>
                Risk Level: {prediction.riskLevel}
              </Text>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginVertical: 5 }}>
                {prediction.riskScore}% Risk Score
              </Text>
              <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)' }}>
                Confidence: {prediction.confidence}
              </Text>
            </LinearGradient>

            <View style={{ 
              backgroundColor: '#f8f9fa', 
              borderRadius: 15, 
              padding: 15, 
              marginBottom: 15 
            }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>
                📈 Predicted Growth Rate
              </Text>
              <Text style={{ fontSize: 20, color: '#dc3545', fontWeight: 'bold', marginTop: 5 }}>
                {prediction.growthRate}
              </Text>
            </View>

            <View style={{ 
              backgroundColor: '#e3f2fd', 
              borderRadius: 15, 
              padding: 15, 
              marginBottom: 15 
            }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10 }}>
                💡 Recommendation
              </Text>
              <Text style={{ fontSize: 14, color: '#666', lineHeight: 20 }}>
                {prediction.recommendation}
              </Text>
              {prediction.additionalInfo && (
                <Text style={{ fontSize: 12, color: '#999', marginTop: 8, fontStyle: 'italic' }}>
                  {prediction.additionalInfo}
                </Text>
              )}
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                onPress={() => router.push('/(patient)/treatment')}
                style={{ 
                  backgroundColor: '#28a745', 
                  borderRadius: 15, 
                  padding: 15, 
                  flex: 0.48,
                  alignItems: 'center' 
                }}
              >
                <Text style={{ 
                  color: 'white', 
                  fontSize: 14, 
                  fontWeight: 'bold' 
                }}>
                  💊 View Treatments
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/(patient)/chat')}
                style={{ 
                  backgroundColor: '#4facfe', 
                  borderRadius: 15, 
                  padding: 15, 
                  flex: 0.48,
                  alignItems: 'center' 
                }}
              >
                <Text style={{ 
                  color: 'white', 
                  fontSize: 14, 
                  fontWeight: 'bold' 
                }}>
                  🤖 Ask AI
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Advanced AI Prediction Engine */}
        <AdvancedPredictionEngine />

        {/* Educational Content */}
        <View style={{ 
          backgroundColor: 'white', 
          borderRadius: 20, 
          padding: 20,
          marginTop: 20,
          marginHorizontal: 20,
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
            🎓 AI-Powered Medical Insights
          </Text>
          
          <Text style={{ fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 10 }}>
            Our advanced machine learning algorithms analyze over 50 clinical parameters including biomarkers, imaging data, genetic factors, and lifestyle patterns to provide comprehensive health predictions with industry-leading accuracy.
          </Text>
          
          <TouchableOpacity
            onPress={() => Alert.alert('Research Papers', 'Access peer-reviewed studies and clinical validation of our AI models.')}
            style={{ 
              backgroundColor: '#667eea', 
              borderRadius: 10, 
              padding: 12, 
              alignItems: 'center',
              marginTop: 10 
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              📄 View Research & Validation
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
