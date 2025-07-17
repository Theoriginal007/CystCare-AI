import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Linking,
  Alert,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'book' | 'website' | 'research';
  url: string;
  author?: string;
  duration?: string;
  category: 'general' | 'symptoms' | 'treatment' | 'lifestyle' | 'support';
  icon: string;
  rating: number;
}

export default function ResourcesScreen() {
  const { t, language } = useLanguage();
  const { colors, isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const resources: Resource[] = [
    {
      id: '1',
      title: language === 'sw' ? 'Maelezo ya Ovarian Cysts - Mayo Clinic' : 'Ovarian Cysts Overview - Mayo Clinic',
      description: language === 'sw' ? 'Muhtasari wa kina wa aina za ovarian cysts, dalili, na matibabu' : 'Comprehensive overview of types, symptoms, and treatments of ovarian cysts',
      type: 'article',
      url: 'https://www.mayoclinic.org/diseases-conditions/ovarian-cysts/symptoms-causes/syc-20353405',
      category: 'general',
      icon: '📄',
      rating: 4.8
    },
    {
      id: '2',
      title: language === 'sw' ? 'Ovarian Cysts Explained - Johns Hopkins' : 'Ovarian Cysts Explained - Johns Hopkins',
      description: language === 'sw' ? 'Video ya kielimu kuhusu ovarian cysts kutoka Johns Hopkins' : 'Educational video about ovarian cysts from Johns Hopkins',
      type: 'video',
      url: 'https://www.youtube.com/watch?v=ovarian-cysts-explained',
      duration: '12 minutes',
      category: 'general',
      icon: '🎥',
      rating: 4.6
    },
    {
      id: '3',
      title: language === 'sw' ? 'Kuelewa Dalili za Ovarian Cysts' : 'Understanding Ovarian Cyst Symptoms',
      description: language === 'sw' ? 'Mwongozo wa kina wa dalili za ovarian cysts na ni lini kuona daktari' : 'Detailed guide on ovarian cyst symptoms and when to see a doctor',
      type: 'article',
      url: 'https://www.healthline.com/health/ovarian-cysts-symptoms',
      category: 'symptoms',
      icon: '🩺',
      rating: 4.5
    },
    {
      id: '4',
      title: language === 'sw' ? 'Chaguzi za Matibabu ya PCOS na Ovarian Cysts' : 'PCOS and Ovarian Cyst Treatment Options',
      description: language === 'sw' ? 'Muhtasari wa njia mbalimbali za matibabu kwa ovarian cysts' : 'Overview of different treatment approaches for ovarian cysts',
      type: 'article',
      url: 'https://www.webmd.com/women/understanding-ovarian-cysts-treatment',
      category: 'treatment',
      icon: '💊',
      rating: 4.4
    },
    {
      id: '5',
      title: language === 'sw' ? 'Lishe na Ovarian Cysts - Video ya Mtaalamu' : 'Diet and Ovarian Cysts - Expert Video',
      description: language === 'sw' ? 'Mtaalamu wa lishe anajadili jinsi chakula gani kinaweza kusaidia' : 'Nutrition expert discusses how diet can help manage ovarian cysts',
      type: 'video',
      url: 'https://www.youtube.com/watch?v=diet-ovarian-cysts',
      duration: '18 minutes',
      category: 'lifestyle',
      icon: '🥗',
      rating: 4.3
    },
    {
      id: '6',
      title: language === 'sw' ? 'Kitabu: "Afya ya Kike na PCOS"' : 'Book: "Women\'s Health and PCOS"',
      description: language === 'sw' ? 'Kitabu cha kina kuhusu kusimamia PCOS na ovarian cysts' : 'Comprehensive book about managing PCOS and ovarian cysts',
      type: 'book',
      url: 'https://www.amazon.com/womens-health-pcos-book',
      author: 'Dr. Sarah Johnson',
      category: 'general',
      icon: '📚',
      rating: 4.7
    },
    {
      id: '7',
      title: language === 'sw' ? 'Utafiti: Ovarian Cysts na Fertility' : 'Research: Ovarian Cysts and Fertility',
      description: language === 'sw' ? 'Utafiti wa hivi karibuni kuhusu athari za ovarian cysts kwa uzazi' : 'Recent research on the impact of ovarian cysts on fertility',
      type: 'research',
      url: 'https://pubmed.ncbi.nlm.nih.gov/ovarian-cysts-fertility',
      author: 'American Journal of Obstetrics',
      category: 'treatment',
      icon: '🔬',
      rating: 4.9
    },
    {
      id: '8',
      title: language === 'sw' ? 'Mazoezi Salama kwa Ovarian Cysts' : 'Safe Exercises for Ovarian Cysts',
      description: language === 'sw' ? 'Video ya mazoezi ya salama yanayofaa kwa wanawake wenye ovarian cysts' : 'Video guide to safe exercises for women with ovarian cysts',
      type: 'video',
      url: 'https://www.youtube.com/watch?v=safe-exercises-ovarian-cysts',
      duration: '25 minutes',
      category: 'lifestyle',
      icon: '🏃‍♀️',
      rating: 4.2
    },
    {
      id: '9',
      title: language === 'sw' ? 'Kikundi cha Msaada: PCOS Support Kenya' : 'Support Group: PCOS Support Kenya',
      description: language === 'sw' ? 'Kikundi cha online cha wanawake wenye PCOS na ovarian cysts nchini Kenya' : 'Online community for women with PCOS and ovarian cysts in Kenya',
      type: 'website',
      url: 'https://www.facebook.com/groups/pcossupportkenya',
      category: 'support',
      icon: '👥',
      rating: 4.6
    },
    {
      id: '10',
      title: language === 'sw' ? 'Jinsi ya Kukabiliana na Maumivu ya Ovarian Cysts' : 'How to Manage Ovarian Cyst Pain',
      description: language === 'sw' ? 'Mwongozo wa vitendo vya kukabiliana na maumivu ya ovarian cysts' : 'Practical guide to managing ovarian cyst pain naturally',
      type: 'article',
      url: 'https://www.healthline.com/health/womens-health/ovarian-cyst-pain-relief',
      category: 'symptoms',
      icon: '🩹',
      rating: 4.4
    }
  ];

  const categories = [
    { key: 'all', label: language === 'sw' ? 'Zote' : 'All', icon: '📚' },
    { key: 'general', label: language === 'sw' ? 'Jumla' : 'General', icon: '📄' },
    { key: 'symptoms', label: language === 'sw' ? 'Dalili' : 'Symptoms', icon: '🩺' },
    { key: 'treatment', label: language === 'sw' ? 'Matibabu' : 'Treatment', icon: '💊' },
    { key: 'lifestyle', label: language === 'sw' ? 'Maisha' : 'Lifestyle', icon: '🏃‍♀️' },
    { key: 'support', label: language === 'sw' ? 'Msaada' : 'Support', icon: '👥' }
  ];

  const resourceTypes = [
    { key: 'article', label: language === 'sw' ? 'Makala' : 'Articles', icon: '📄' },
    { key: 'video', label: language === 'sw' ? 'Video' : 'Videos', icon: '🎥' },
    { key: 'book', label: language === 'sw' ? 'Vitabu' : 'Books', icon: '📚' },
    { key: 'research', label: language === 'sw' ? 'Utafiti' : 'Research', icon: '🔬' },
    { key: 'website', label: language === 'sw' ? 'Tovuti' : 'Websites', icon: '🌐' }
  ];

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

  const openResource = (resource: Resource) => {
    Alert.alert(
      language === 'sw' ? 'Fungua Rasilimali' : 'Open Resource',
      language === 'sw' 
        ? `Je, ungependa kufungua "${resource.title}" katika kivinjari chako?`
        : `Would you like to open "${resource.title}" in your browser?`,
      [
        { text: language === 'sw' ? 'Ghairi' : 'Cancel', style: 'cancel' },
        { 
          text: language === 'sw' ? 'Fungua' : 'Open', 
          onPress: () => Linking.openURL(resource.url)
        }
      ]
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return '#4CAF50';
      case 'video': return '#FF5722';
      case 'book': return '#9C27B0';
      case 'research': return '#2196F3';
      case 'website': return '#FF9800';
      default: return colors.primary;
    }
  };

  const getRatingStars = (rating: number) => {
    const stars = Math.round(rating);
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
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
          📚 {language === 'sw' ? 'Maktaba ya Rasilimali' : 'Resource Library'}
        </Text>
        <Text style={{ 
          fontSize: 16, 
          color: 'rgba(255,255,255,0.8)' 
        }}>
          {language === 'sw' ? 'Makala, video na vitabu kuhusu ovarian cysts' : 'Articles, videos and books about ovarian cysts'}
        </Text>
      </LinearGradient>

      <View style={{ padding: 20 }}>
        {/* Category Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 20 }}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.key}
              onPress={() => setSelectedCategory(category.key)}
              style={{ 
                backgroundColor: selectedCategory === category.key ? colors.primary : colors.surface,
                borderRadius: 20, 
                paddingHorizontal: 15, 
                paddingVertical: 10, 
                marginRight: 10,
                borderWidth: 1,
                borderColor: selectedCategory === category.key ? colors.primary : colors.border
              }}
            >
              <Text style={{ 
                color: selectedCategory === category.key ? 'white' : colors.textSecondary,
                fontSize: 14,
                fontWeight: '500'
              }}>
                {category.icon} {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Resource Type Summary */}
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
            📊 {language === 'sw' ? 'Aina za Rasilimali' : 'Resource Types'}
          </Text>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {resourceTypes.map((type) => {
              const count = resources.filter(r => r.type === type.key).length;
              return (
                <View key={type.key} style={{ alignItems: 'center', marginBottom: 10, width: '30%' }}>
                  <Text style={{ fontSize: 24 }}>{type.icon}</Text>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text }}>{count}</Text>
                  <Text style={{ fontSize: 12, color: colors.textSecondary, textAlign: 'center' }}>{type.label}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Resources List */}
        <Text style={{ 
          fontSize: 20, 
          fontWeight: 'bold', 
          color: colors.text, 
          marginBottom: 20 
        }}>
          📖 {selectedCategory === 'all' 
            ? (language === 'sw' ? 'Rasilimali Zote' : 'All Resources')
            : categories.find(c => c.key === selectedCategory)?.label
          } ({filteredResources.length})
        </Text>

        {filteredResources.map((resource) => (
          <TouchableOpacity
            key={resource.id}
            onPress={() => openResource(resource)}
            style={{ 
              backgroundColor: colors.card, 
              borderRadius: 20, 
              padding: 20, 
              marginBottom: 15,
              borderWidth: 1,
              borderColor: colors.border
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 }}>
              <View style={{ 
                backgroundColor: getTypeColor(resource.type) + '20',
                borderRadius: 10,
                padding: 8,
                marginRight: 15
              }}>
                <Text style={{ fontSize: 20 }}>{resource.icon}</Text>
              </View>
              
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Text style={{ 
                    fontSize: 16, 
                    fontWeight: 'bold', 
                    color: colors.text,
                    flex: 1,
                    marginRight: 10
                  }}>
                    {resource.title}
                  </Text>
                  <View style={{ 
                    backgroundColor: getTypeColor(resource.type), 
                    borderRadius: 10, 
                    paddingHorizontal: 8, 
                    paddingVertical: 4 
                  }}>
                    <Text style={{ 
                      color: 'white', 
                      fontSize: 10, 
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}>
                      {resource.type}
                    </Text>
                  </View>
                </View>
                
                <Text style={{ 
                  fontSize: 14, 
                  color: colors.textSecondary,
                  marginTop: 5,
                  lineHeight: 20
                }}>
                  {resource.description}
                </Text>
              </View>
            </View>

            {(resource.author || resource.duration) && (
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                marginBottom: 10 
              }}>
                {resource.author && (
                  <Text style={{ 
                    fontSize: 12, 
                    color: colors.textSecondary 
                  }}>
                    👤 {resource.author}
                  </Text>
                )}
                {resource.duration && (
                  <Text style={{ 
                    fontSize: 12, 
                    color: colors.textSecondary 
                  }}>
                    🕐 {resource.duration}
                  </Text>
                )}
              </View>
            )}

            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              paddingTop: 10,
              borderTopWidth: 1,
              borderTopColor: colors.border
            }}>
              <Text style={{ 
                fontSize: 14, 
                color: '#ffa500' 
              }}>
                {getRatingStars(resource.rating)} {resource.rating}
              </Text>
              <View style={{ 
                backgroundColor: colors.primary + '20', 
                borderRadius: 10, 
                paddingHorizontal: 10, 
                paddingVertical: 5 
              }}>
                <Text style={{ 
                  fontSize: 12, 
                  color: colors.primary,
                  fontWeight: 'bold'
                }}>
                  🔗 {language === 'sw' ? 'Fungua' : 'Open'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {filteredResources.length === 0 && (
          <View style={{ 
            backgroundColor: colors.card, 
            borderRadius: 20, 
            padding: 40, 
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.border
          }}>
            <Text style={{ fontSize: 48, marginBottom: 15 }}>📚</Text>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: 'bold', 
              color: colors.text, 
              textAlign: 'center',
              marginBottom: 10
            }}>
              {language === 'sw' ? 'Hakuna Rasilimali' : 'No Resources Found'}
            </Text>
            <Text style={{ 
              fontSize: 14, 
              color: colors.textSecondary, 
              textAlign: 'center' 
            }}>
              {language === 'sw' 
                ? 'Jaribu kubadilisha kichujio chako au kurudi kwa "Zote".'
                : 'Try changing your filter or return to "All".'
              }
            </Text>
          </View>
        )}

        {/* Disclaimer */}
        <View style={{ 
          backgroundColor: '#ffa500' + '20', 
          borderRadius: 20, 
          padding: 20, 
          marginTop: 20,
          borderWidth: 1,
          borderColor: '#ffa500'
        }}>
          <Text style={{ 
            fontSize: 16, 
            fontWeight: 'bold', 
            color: '#ffa500', 
            marginBottom: 10 
          }}>
            ⚠️ {language === 'sw' ? 'Onyo Muhimu' : 'Important Disclaimer'}
          </Text>
          <Text style={{ 
            fontSize: 14, 
            color: colors.text, 
            lineHeight: 20 
          }}>
            {language === 'sw' 
              ? 'Rasilimali hizi ni kwa ajili ya elimu tu na hazibadilishi ushauri wa kimatibabu. Daima wasiliana na daktari wako kwa ushauri wa kibinafsi.'
              : 'These resources are for educational purposes only and do not replace professional medical advice. Always consult with your healthcare provider for personalized guidance.'
            }
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}