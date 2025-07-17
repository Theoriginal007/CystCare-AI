import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';

interface RiskFactor {
  name: string;
  value: number;
  weight: number;
  status: 'low' | 'medium' | 'high';
}

interface AdvancedPrediction {
  riskScore: number;
  confidenceLevel: number;
  timeToGrowth: string;
  malignancyRisk: number;
  complications: string[];
  recommendations: string[];
  monitoring: {
    frequency: string;
    nextScan: string;
    biomarkers: string[];
  };
  lifestyle: {
    diet: string[];
    exercise: string[];
    stress: string[];
  };
}

export function AdvancedPredictionEngine() {
  const { colors } = useTheme();
  const [prediction, setPrediction] = useState<AdvancedPrediction | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const riskFactors: RiskFactor[] = [
    { name: 'Age Factor', value: 0.25, weight: 15, status: 'low' },
    { name: 'Cyst Size', value: 0.65, weight: 30, status: 'medium' },
    { name: 'Family History', value: 0.15, weight: 20, status: 'low' },
    { name: 'Hormonal Profile', value: 0.45, weight: 25, status: 'medium' },
    { name: 'Previous Surgery', value: 0.05, weight: 10, status: 'low' }
  ];

  const runAdvancedAnalysis = () => {
    setIsAnalyzing(true);
    
    // Simulate advanced AI analysis
    setTimeout(() => {
      const totalRisk = riskFactors.reduce((sum, factor) => 
        sum + (factor.value * factor.weight), 0) / 100;
      
      const mockPrediction: AdvancedPrediction = {
        riskScore: Math.round(totalRisk * 100),
        confidenceLevel: 94,
        timeToGrowth: '6-8 months',
        malignancyRisk: 2.3,
        complications: ['Ovarian torsion risk: 1.2%', 'Rupture probability: 0.8%'],
        recommendations: [
          'Continue current monitoring protocol',
          'Consider hormonal therapy evaluation',
          'Lifestyle modifications recommended'
        ],
        monitoring: {
          frequency: 'Every 3 months',
          nextScan: '2024-06-15',
          biomarkers: ['CA-125', 'HE4', 'ROMA index']
        },
        lifestyle: {
          diet: ['Reduce processed foods', 'Increase omega-3 intake', 'Limit caffeine'],
          exercise: ['Gentle yoga 3x/week', 'Walking 30min daily', 'Pelvic floor exercises'],
          stress: ['Meditation 10min daily', 'Adequate sleep 7-8hrs', 'Stress counseling']
        }
      };
      
      setPrediction(mockPrediction);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getRiskColor = (value: number) => {
    if (value < 30) return '#22c55e';
    if (value < 60) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <View style={{ backgroundColor: colors.card, borderRadius: 20, padding: 20, margin: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text, marginBottom: 15 }}>
        🧠 Advanced AI Prediction Engine
      </Text>

      {/* Risk Factor Analysis */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 10 }}>
          Risk Factor Analysis
        </Text>
        {riskFactors.map((factor, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
              <Text style={{ color: colors.text, fontSize: 14 }}>{factor.name}</Text>
              <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
                Weight: {factor.weight}%
              </Text>
            </View>
            <View style={{ 
              height: 8, 
              backgroundColor: colors.border, 
              borderRadius: 4,
              overflow: 'hidden'
            }}>
              <View style={{
                height: '100%',
                width: `${factor.value * 100}%`,
                backgroundColor: getRiskColor(factor.value * 100)
              }} />
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        onPress={runAdvancedAnalysis}
        disabled={isAnalyzing}
        style={{
          backgroundColor: isAnalyzing ? colors.border : colors.primary,
          borderRadius: 15,
          padding: 15,
          alignItems: 'center',
          marginBottom: 20
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
          {isAnalyzing ? '🔄 Analyzing with AI...' : '🚀 Run Advanced Analysis'}
        </Text>
      </TouchableOpacity>

      {prediction && (
        <ScrollView style={{ maxHeight: 400 }}>
          <LinearGradient
            colors={[getRiskColor(prediction.riskScore), getRiskColor(prediction.riskScore)]}
            style={{ borderRadius: 15, padding: 20, marginBottom: 15, opacity: 0.9 }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', marginBottom: 10 }}>
              🎯 Comprehensive Risk Assessment
            </Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
              {prediction.riskScore}% Overall Risk
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14 }}>
              Confidence: {prediction.confidenceLevel}% | Malignancy Risk: {prediction.malignancyRisk}%
            </Text>
          </LinearGradient>

          <View style={{ backgroundColor: colors.surface, borderRadius: 15, padding: 15, marginBottom: 15 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 10 }}>
              📊 Detailed Insights
            </Text>
            <Text style={{ color: colors.textSecondary, marginBottom: 5 }}>
              Predicted Growth Timeline: {prediction.timeToGrowth}
            </Text>
            <Text style={{ color: colors.textSecondary, marginBottom: 5 }}>
              Next Monitoring: {prediction.monitoring.nextScan}
            </Text>
            <Text style={{ color: colors.textSecondary }}>
              Recommended Frequency: {prediction.monitoring.frequency}
            </Text>
          </View>

          <View style={{ backgroundColor: colors.surface, borderRadius: 15, padding: 15, marginBottom: 15 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 10 }}>
              🔬 Biomarker Monitoring
            </Text>
            {prediction.monitoring.biomarkers.map((marker, index) => (
              <Text key={index} style={{ color: colors.textSecondary, marginBottom: 3 }}>
                • {marker}
              </Text>
            ))}
          </View>

          <View style={{ backgroundColor: colors.surface, borderRadius: 15, padding: 15, marginBottom: 15 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 10 }}>
              💡 Personalized Recommendations
            </Text>
            {prediction.recommendations.map((rec, index) => (
              <Text key={index} style={{ color: colors.textSecondary, marginBottom: 5 }}>
                • {rec}
              </Text>
            ))}
          </View>

          <View style={{ backgroundColor: colors.surface, borderRadius: 15, padding: 15 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 10 }}>
              🌱 Lifestyle Optimization
            </Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.primary, marginBottom: 5 }}>Diet:</Text>
            {prediction.lifestyle.diet.map((item, index) => (
              <Text key={index} style={{ color: colors.textSecondary, fontSize: 13, marginBottom: 2 }}>
                • {item}
              </Text>
            ))}
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.primary, marginTop: 10, marginBottom: 5 }}>Exercise:</Text>
            {prediction.lifestyle.exercise.map((item, index) => (
              <Text key={index} style={{ color: colors.textSecondary, fontSize: 13, marginBottom: 2 }}>
                • {item}
              </Text>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}