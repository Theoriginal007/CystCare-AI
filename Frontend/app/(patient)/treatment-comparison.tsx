import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

interface Treatment {
  id: string;
  name: string;
  description: string;
  type: 'monitoring' | 'medication' | 'surgical' | 'lifestyle';
  cost: {
    min: number;
    max: number;
    currency: string;
  };
  effectiveness: number;
  riskLevel: 'low' | 'medium' | 'high';
  duration: string;
  suitableFor: string[];
  advantages: string[];
  disadvantages: string[];
  sideEffects: string[];
  recoveryTime?: string;
  icon: string;
}

export default function TreatmentComparisonScreen() {
  const { t, language } = useLanguage();
  const { colors, isDark } = useTheme();
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>([]);
  const [comparisonMode, setComparisonMode] = useState(false);

  const treatments: Treatment[] = [
    {
      id: '1',
      name: language === 'sw' ? 'Ufuatiliaji tu (Wait and Watch)' : 'Active Monitoring (Wait and Watch)',
      description: language === 'sw' ? 'Kufuatilia cyst kwa ultrasound bila matibabu ya haraka' : 'Monitoring the cyst with regular ultrasounds without immediate treatment',
      type: 'monitoring',
      cost: { min: 2500, max: 5000, currency: 'KES' },
      effectiveness: 85,
      riskLevel: 'low',
      duration: language === 'sw' ? 'Miezi 3-12' : '3-12 months',
      suitableFor: [
        language === 'sw' ? 'Cysts za functional chini ya 5cm' : 'Functional cysts under 5cm',
        language === 'sw' ? 'Wanawake wa umri wa kuzaa' : 'Reproductive age women',
        language === 'sw' ? 'Cysts zisizo na dalili' : 'Asymptomatic cysts'
      ],
      advantages: [
        language === 'sw' ? 'Hakuna hatari za upasuaji' : 'No surgical risks',
        language === 'sw' ? 'Bei nafuu' : 'Cost-effective',
        language === 'sw' ? 'Cysts nyingi hutoweka peke yao' : 'Many cysts resolve naturally'
      ],
      disadvantages: [
        language === 'sw' ? 'Kunazama kwa muda mrefu' : 'Takes longer time',
        language === 'sw' ? 'Dalili zinaweza kuendelea' : 'Symptoms may persist',
        language === 'sw' ? 'Kuhitaji vipimo mara kwa mara' : 'Requires regular monitoring'
      ],
      sideEffects: [language === 'sw' ? 'Hakuna' : 'None'],
      icon: '👁️'
    },
    {
      id: '2',
      name: language === 'sw' ? 'Matibabu ya Hormone' : 'Hormonal Therapy',
      description: language === 'sw' ? 'Vidonge vya kuzuia mimba au hormone therapy' : 'Birth control pills or hormone therapy',
      type: 'medication',
      cost: { min: 1200, max: 3000, currency: 'KES' },
      effectiveness: 70,
      riskLevel: 'low',
      duration: language === 'sw' ? 'Miezi 3-6' : '3-6 months',
      suitableFor: [
        language === 'sw' ? 'Cysts za functional zinazorudi' : 'Recurrent functional cysts',
        language === 'sw' ? 'Wanawake wenye PCOS' : 'Women with PCOS',
        language === 'sw' ? 'Wale wanaotaka kuzuia mimba' : 'Those wanting contraception'
      ],
      advantages: [
        language === 'sw' ? 'Huzuia cysts mpya' : 'Prevents new cysts',
        language === 'sw' ? 'Husaidia kudhibiti hedhi' : 'Helps regulate periods',
        language === 'sw' ? 'Hakuna upasuaji' : 'Non-surgical'
      ],
      disadvantages: [
        language === 'sw' ? 'Haifai kwa cysts zote' : 'Not suitable for all cyst types',
        language === 'sw' ? 'Madhara yanawezekana' : 'Possible side effects',
        language === 'sw' ? 'Haiwezi kuondoa cysts zilizopo' : 'Cannot remove existing cysts'
      ],
      sideEffects: [
        language === 'sw' ? 'Kichefuchefu' : 'Nausea',
        language === 'sw' ? 'Mabadiliko ya hali ya moyo' : 'Mood changes',
        language === 'sw' ? 'Ongezeko la uzito' : 'Weight gain'
      ],
      icon: '💊'
    },
    {
      id: '3',
      name: language === 'sw' ? 'Upasuaji wa Laparoscopy' : 'Laparoscopic Surgery',
      description: language === 'sw' ? 'Upasuaji wa kidogo kupitia mashimo madogo' : 'Minimally invasive surgery through small incisions',
      type: 'surgical',
      cost: { min: 150000, max: 300000, currency: 'KES' },
      effectiveness: 95,
      riskLevel: 'medium',
      duration: language === 'sw' ? 'Saa 1-3' : '1-3 hours',
      recoveryTime: language === 'sw' ? 'Wiki 2-4' : '2-4 weeks',
      suitableFor: [
        language === 'sw' ? 'Cysts kubwa zaidi ya 5cm' : 'Large cysts over 5cm',
        language === 'sw' ? 'Cysts za complex' : 'Complex cysts',
        language === 'sw' ? 'Dalili kali' : 'Severe symptoms'
      ],
      advantages: [
        language === 'sw' ? 'Ufanisi wa juu' : 'High success rate',
        language === 'sw' ? 'Kuondoa kamili kwa cyst' : 'Complete cyst removal',
        language === 'sw' ? 'Uponyaji wa haraka' : 'Quick recovery'
      ],
      disadvantages: [
        language === 'sw' ? 'Hatari za upasuaji' : 'Surgical risks',
        language === 'sw' ? 'Ghali zaidi' : 'More expensive',
        language === 'sw' ? 'Mahitaji ya kupumzika' : 'Recovery time needed'
      ],
      sideEffects: [
        language === 'sw' ? 'Maumivu ya muda mfupi' : 'Temporary pain',
        language === 'sw' ? 'Vidonda vidogo' : 'Small scars',
        language === 'sw' ? 'Matatizo madogo (adimu)' : 'Rare complications'
      ],
      icon: '🏥'
    },
    {
      id: '4',
      name: language === 'sw' ? 'Usimamizi wa Maisha' : 'Lifestyle Management',
      description: language === 'sw' ? 'Mabadiliko ya lishe, mazoezi na usimamizi wa stress' : 'Diet changes, exercise and stress management',
      type: 'lifestyle',
      cost: { min: 500, max: 5000, currency: 'KES' },
      effectiveness: 50,
      riskLevel: 'low',
      duration: language === 'sw' ? 'Mfululizo' : 'Ongoing',
      suitableFor: [
        language === 'sw' ? 'Wanawake wote wenye cysts' : 'All women with cysts',
        language === 'sw' ? 'Msaada wa ziada' : 'Complementary therapy',
        language === 'sw' ? 'Kuzuia cysts mpya' : 'Prevention of new cysts'
      ],
      advantages: [
        language === 'sw' ? 'Afya ya jumla inaboreka' : 'Overall health improvement',
        language === 'sw' ? 'Hakuna madhara' : 'No side effects',
        language === 'sw' ? 'Bei nafuu' : 'Cost-effective'
      ],
      disadvantages: [
        language === 'sw' ? 'Matokeo polepole' : 'Slow results',
        language === 'sw' ? 'Kuhitaji nidhamu' : 'Requires discipline',
        language === 'sw' ? 'Hayawezi kuondoa cysts kubwa' : 'Cannot remove large cysts'
      ],
      sideEffects: [language === 'sw' ? 'Hakuna' : 'None'],
      icon: '🏃‍♀️'
    },
    {
      id: '5',
      name: language === 'sw' ? 'Upasuaji wa Open Surgery' : 'Open Surgery (Laparotomy)',
      description: language === 'sw' ? 'Upasuaji wa jadi kwa cysts kubwa au ngumu' : 'Traditional surgery for large or complex cysts',
      type: 'surgical',
      cost: { min: 200000, max: 500000, currency: 'KES' },
      effectiveness: 98,
      riskLevel: 'high',
      duration: language === 'sw' ? 'Saa 2-4' : '2-4 hours',
      recoveryTime: language === 'sw' ? 'Wiki 6-8' : '6-8 weeks',
      suitableFor: [
        language === 'sw' ? 'Cysts kubwa sana (>10cm)' : 'Very large cysts (>10cm)',
        language === 'sw' ? 'Cysts za complex' : 'Complex cysts',
        language === 'sw' ? 'Washukiwa wa saratani' : 'Suspected malignancy'
      ],
      advantages: [
        language === 'sw' ? 'Ufanisi wa juu sana' : 'Very high success rate',
        language === 'sw' ? 'Uchunguzi kamili' : 'Complete examination',
        language === 'sw' ? 'Inafaa kwa hali ngumu' : 'Suitable for complex cases'
      ],
      disadvantages: [
        language === 'sw' ? 'Hatari kubwa za upasuaji' : 'Higher surgical risks',
        language === 'sw' ? 'Uponyaji wa muda mrefu' : 'Longer recovery',
        language === 'sw' ? 'Kovu kubwa' : 'Larger scar'
      ],
      sideEffects: [
        language === 'sw' ? 'Maumivu ya muda mrefu' : 'Longer-lasting pain',
        language === 'sw' ? 'Kovu la upasuaji' : 'Surgical scar',
        language === 'sw' ? 'Hatari za ambukizo' : 'Infection risk'
      ],
      icon: '🔬'
    }
  ];

  const toggleTreatmentSelection = (treatmentId: string) => {
    if (selectedTreatments.includes(treatmentId)) {
      setSelectedTreatments(selectedTreatments.filter(id => id !== treatmentId));
    } else if (selectedTreatments.length < 3) {
      setSelectedTreatments([...selectedTreatments, treatmentId]);
    } else {
      Alert.alert(
        language === 'sw' ? 'Kiwango cha Juu' : 'Maximum Reached',
        language === 'sw' ? 'Unaweza kulinganisha matibabu 3 tu kwa wakati mmoja.' : 'You can only compare up to 3 treatments at once.'
      );
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return '#28a745';
      case 'medium': return '#ffa500';
      case 'high': return '#dc3545';
      default: return colors.textSecondary;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'monitoring': return ['#4facfe', '#00f2fe'];
      case 'medication': return ['#a8edea', '#fed6e3'];
      case 'surgical': return ['#667eea', '#764ba2'];
      case 'lifestyle': return ['#43e97b', '#38f9d7'];
      default: return [colors.primary, colors.primary];
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return `${currency} ${amount.toLocaleString()}`;
  };

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* Header */}
      <LinearGradient
        colors={isDark ? ['#4c1d95', '#5b21b6'] : ['#7c3aed', '#a855f7']}
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
          color: 'white', 
          marginBottom: 5 
        }}>
          📊 {language === 'sw' ? 'Linganisha Matibabu' : 'Compare Treatments'}
        </Text>
        <Text style={{ 
          fontSize: 16, 
          color: 'rgba(255,255,255,0.8)' 
        }}>
          {language === 'sw' ? 'Linganisha chaguzi mbalimbali za matibabu' : 'Compare different treatment options side by side'}
        </Text>
      </LinearGradient>

      <View style={{ padding: 20 }}>
        {/* Instructions */}
        <View style={{ 
          backgroundColor: colors.surface, 
          borderRadius: 15, 
          padding: 15, 
          marginBottom: 20,
          borderWidth: 1,
          borderColor: colors.border
        }}>
          <Text style={{ 
            fontSize: 16, 
            fontWeight: 'bold', 
            color: colors.text, 
            marginBottom: 10 
          }}>
            💡 {language === 'sw' ? 'Jinsi ya Kutumia' : 'How to Use'}
          </Text>
          <Text style={{ 
            fontSize: 14, 
            color: colors.textSecondary, 
            lineHeight: 20 
          }}>
            {language === 'sw' 
              ? 'Chagua matibabu hadi 3 ili kulinganisha. Bofya kitufe cha "Linganisha" ili kuona jedwali la mlinganyo.'
              : 'Select up to 3 treatments to compare. Tap "Compare Selected" to view detailed comparison table.'
            }
          </Text>
        </View>

        {/* Selection Status */}
        {selectedTreatments.length > 0 && (
          <View style={{ 
            backgroundColor: colors.primary + '20', 
            borderRadius: 15, 
            padding: 15, 
            marginBottom: 20,
            borderWidth: 1,
            borderColor: colors.primary
          }}>
            <Text style={{ 
              fontSize: 14, 
              color: colors.primary, 
              fontWeight: 'bold',
              marginBottom: 5
            }}>
              {language === 'sw' ? 'Umechagua:' : 'Selected:'} {selectedTreatments.length}/3
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ 
                fontSize: 12, 
                color: colors.primary 
              }}>
                {selectedTreatments.map(id => 
                  treatments.find(t => t.id === id)?.name
                ).join(', ')}
              </Text>
              {selectedTreatments.length >= 2 && (
                <TouchableOpacity
                  onPress={() => setComparisonMode(true)}
                  style={{ 
                    backgroundColor: colors.primary, 
                    borderRadius: 10, 
                    paddingHorizontal: 12, 
                    paddingVertical: 6 
                  }}
                >
                  <Text style={{ 
                    color: 'white', 
                    fontSize: 12, 
                    fontWeight: 'bold' 
                  }}>
                    {language === 'sw' ? 'Linganisha' : 'Compare'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {!comparisonMode ? (
          // Treatment Selection View
          <>
            <Text style={{ 
              fontSize: 20, 
              fontWeight: 'bold', 
              color: colors.text, 
              marginBottom: 20 
            }}>
              🎯 {language === 'sw' ? 'Chagua Matibabu' : 'Select Treatments'}
            </Text>

            {treatments.map((treatment) => (
              <TouchableOpacity
                key={treatment.id}
                onPress={() => toggleTreatmentSelection(treatment.id)}
                style={{ 
                  backgroundColor: colors.card, 
                  borderRadius: 20, 
                  padding: 20, 
                  marginBottom: 15,
                  borderWidth: 2,
                  borderColor: selectedTreatments.includes(treatment.id) ? colors.primary : colors.border
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 15 }}>
                  <LinearGradient
                    colors={getTypeColor(treatment.type) as [string, string]}
                    style={{ 
                      width: 50, 
                      height: 50, 
                      borderRadius: 25, 
                      justifyContent: 'center', 
                      alignItems: 'center',
                      marginRight: 15
                    }}
                  >
                    <Text style={{ fontSize: 24 }}>{treatment.icon}</Text>
                  </LinearGradient>
                  
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Text style={{ 
                        fontSize: 16, 
                        fontWeight: 'bold', 
                        color: colors.text,
                        flex: 1,
                        marginRight: 10
                      }}>
                        {treatment.name}
                      </Text>
                      {selectedTreatments.includes(treatment.id) && (
                        <View style={{ 
                          backgroundColor: colors.primary, 
                          borderRadius: 12, 
                          width: 24, 
                          height: 24, 
                          justifyContent: 'center', 
                          alignItems: 'center' 
                        }}>
                          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>✓</Text>
                        </View>
                      )}
                    </View>
                    
                    <Text style={{ 
                      fontSize: 14, 
                      color: colors.textSecondary,
                      marginTop: 5,
                      lineHeight: 20
                    }}>
                      {treatment.description}
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                  <View>
                    <Text style={{ fontSize: 12, color: colors.textSecondary }}>
                      {language === 'sw' ? 'Ufanisi' : 'Effectiveness'}
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.primary }}>
                      {treatment.effectiveness}%
                    </Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 12, color: colors.textSecondary }}>
                      {language === 'sw' ? 'Hatari' : 'Risk Level'}
                    </Text>
                    <Text style={{ 
                      fontSize: 14, 
                      fontWeight: 'bold', 
                      color: getRiskColor(treatment.riskLevel),
                      textTransform: 'capitalize'
                    }}>
                      {treatment.riskLevel}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 12, color: colors.textSecondary }}>
                      {language === 'sw' ? 'Bei' : 'Cost'}
                    </Text>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.text }}>
                      {formatCurrency(treatment.cost.min, treatment.cost.currency)}
                      {treatment.cost.min !== treatment.cost.max && '+'}
                    </Text>
                  </View>
                </View>

                <Text style={{ 
                  fontSize: 12, 
                  color: colors.textSecondary,
                  textAlign: 'center',
                  marginTop: 10
                }}>
                  {language === 'sw' ? 'Bofya ili kuchagua' : 'Tap to select'}
                </Text>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          // Comparison View
          <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <Text style={{ 
                fontSize: 20, 
                fontWeight: 'bold', 
                color: colors.text 
              }}>
                📊 {language === 'sw' ? 'Mlinganyo' : 'Comparison'}
              </Text>
              <TouchableOpacity
                onPress={() => setComparisonMode(false)}
                style={{ 
                  backgroundColor: colors.surface, 
                  borderRadius: 15, 
                  paddingHorizontal: 15, 
                  paddingVertical: 8,
                  borderWidth: 1,
                  borderColor: colors.border
                }}
              >
                <Text style={{ color: colors.textSecondary, fontWeight: 'bold', fontSize: 14 }}>
                  ← {language === 'sw' ? 'Rudi' : 'Back'}
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: 'row' }}>
                {/* Comparison Headers */}
                <View style={{ width: 120, marginRight: 10 }}>
                  {[
                    language === 'sw' ? 'Jina' : 'Name',
                    language === 'sw' ? 'Ufanisi' : 'Effectiveness',
                    language === 'sw' ? 'Bei' : 'Cost',
                    language === 'sw' ? 'Hatari' : 'Risk',
                    language === 'sw' ? 'Muda' : 'Duration',
                    language === 'sw' ? 'Faida' : 'Advantages',
                    language === 'sw' ? 'Hasara' : 'Disadvantages',
                    language === 'sw' ? 'Madhara' : 'Side Effects'
                  ].map((header, index) => (
                    <View key={index} style={{ 
                      height: index === 0 ? 80 : index >= 5 ? 120 : 60,
                      justifyContent: 'center',
                      paddingVertical: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.border
                    }}>
                      <Text style={{ 
                        fontSize: 14, 
                        fontWeight: 'bold', 
                        color: colors.text 
                      }}>
                        {header}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Comparison Data */}
                {selectedTreatments.map((treatmentId) => {
                  const treatment = treatments.find(t => t.id === treatmentId);
                  if (!treatment) return null;

                  return (
                    <View key={treatmentId} style={{ width: 200, marginRight: 10 }}>
                      {/* Name */}
                      <View style={{ 
                        height: 80,
                        justifyContent: 'center',
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border,
                        backgroundColor: colors.surface
                      }}>
                        <Text style={{ 
                          fontSize: 14, 
                          fontWeight: 'bold', 
                          color: colors.text,
                          textAlign: 'center'
                        }}>
                          {treatment.icon} {treatment.name}
                        </Text>
                      </View>

                      {/* Effectiveness */}
                      <View style={{ 
                        height: 60,
                        justifyContent: 'center',
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border
                      }}>
                        <Text style={{ 
                          fontSize: 16, 
                          fontWeight: 'bold', 
                          color: colors.primary,
                          textAlign: 'center'
                        }}>
                          {treatment.effectiveness}%
                        </Text>
                      </View>

                      {/* Cost */}
                      <View style={{ 
                        height: 60,
                        justifyContent: 'center',
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border
                      }}>
                        <Text style={{ 
                          fontSize: 12, 
                          color: colors.text,
                          textAlign: 'center'
                        }}>
                          {formatCurrency(treatment.cost.min, treatment.cost.currency)}
                          {treatment.cost.min !== treatment.cost.max && (
                            <Text> - {formatCurrency(treatment.cost.max, treatment.cost.currency)}</Text>
                          )}
                        </Text>
                      </View>

                      {/* Risk */}
                      <View style={{ 
                        height: 60,
                        justifyContent: 'center',
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border
                      }}>
                        <Text style={{ 
                          fontSize: 14, 
                          fontWeight: 'bold', 
                          color: getRiskColor(treatment.riskLevel),
                          textAlign: 'center',
                          textTransform: 'capitalize'
                        }}>
                          {treatment.riskLevel}
                        </Text>
                      </View>

                      {/* Duration */}
                      <View style={{ 
                        height: 60,
                        justifyContent: 'center',
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border
                      }}>
                        <Text style={{ 
                          fontSize: 12, 
                          color: colors.text,
                          textAlign: 'center'
                        }}>
                          {treatment.duration}
                        </Text>
                      </View>

                      {/* Advantages */}
                      <View style={{ 
                        height: 120,
                        justifyContent: 'flex-start',
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border
                      }}>
                        {treatment.advantages.slice(0, 3).map((advantage, index) => (
                          <Text key={index} style={{ 
                            fontSize: 10, 
                            color: colors.text,
                            marginBottom: 3
                          }}>
                            • {advantage}
                          </Text>
                        ))}
                      </View>

                      {/* Disadvantages */}
                      <View style={{ 
                        height: 120,
                        justifyContent: 'flex-start',
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border
                      }}>
                        {treatment.disadvantages.slice(0, 3).map((disadvantage, index) => (
                          <Text key={index} style={{ 
                            fontSize: 10, 
                            color: colors.text,
                            marginBottom: 3
                          }}>
                            • {disadvantage}
                          </Text>
                        ))}
                      </View>

                      {/* Side Effects */}
                      <View style={{ 
                        height: 120,
                        justifyContent: 'flex-start',
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border
                      }}>
                        {treatment.sideEffects.slice(0, 3).map((effect, index) => (
                          <Text key={index} style={{ 
                            fontSize: 10, 
                            color: colors.text,
                            marginBottom: 3
                          }}>
                            • {effect}
                          </Text>
                        ))}
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>

            {/* Recommendation */}
            <View style={{ 
              backgroundColor: colors.primary + '20', 
              borderRadius: 20, 
              padding: 20, 
              marginTop: 20,
              borderWidth: 1,
              borderColor: colors.primary
            }}>
              <Text style={{ 
                fontSize: 16, 
                fontWeight: 'bold', 
                color: colors.primary, 
                marginBottom: 10 
              }}>
                💡 {language === 'sw' ? 'Mapendekezo' : 'Recommendation'}
              </Text>
              <Text style={{ 
                fontSize: 14, 
                color: colors.text, 
                lineHeight: 20 
              }}>
                {language === 'sw' 
                  ? 'Chaguo la bora la matibabu linategemea ukubwa wa cyst yako, umri, dalili, na malengo yako ya kitiba. Jadili chaguzi hizi na daktari wako kufanya uamuzi wa kibinadamu.'
                  : 'The best treatment choice depends on your cyst size, age, symptoms, and reproductive goals. Discuss these options with your healthcare provider to make an informed decision.'
                }
              </Text>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}