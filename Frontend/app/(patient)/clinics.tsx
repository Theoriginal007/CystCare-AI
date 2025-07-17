import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  Linking,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import * as Location from 'expo-location';

const { width } = Dimensions.get('window');

interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance: number;
  rating: number;
  specialties: string[];
  openHours: string;
  emergency: boolean;
  latitude: number;
  longitude: number;
}

export default function ClinicsScreen() {
  const { t, language } = useLanguage();
  const { colors, isDark } = useTheme();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(false);

  const mockClinics: Clinic[] = [
    {
      id: '1',
      name: language === 'sw' ? 'Hospitali ya Kenyatta' : 'Kenyatta National Hospital',
      address: language === 'sw' ? 'Ngara, Nairobi' : 'Ngara, Nairobi',
      phone: '+254-20-2726300',
      distance: 2.1,
      rating: 4.2,
      specialties: [
        language === 'sw' ? 'Gynecology' : 'Gynecology',
        language === 'sw' ? 'Oncology' : 'Oncology'
      ],
      openHours: '24/7',
      emergency: true,
      latitude: -1.3013,
      longitude: 36.8073
    },
    {
      id: '2',
      name: language === 'sw' ? 'Hospitali ya Aga Khan' : 'Aga Khan University Hospital',
      address: language === 'sw' ? 'Parklands, Nairobi' : 'Parklands, Nairobi',
      phone: '+254-20-3740000',
      distance: 3.8,
      rating: 4.8,
      specialties: [
        language === 'sw' ? 'Womens Health' : 'Women\'s Health',
        language === 'sw' ? 'Radiology' : 'Radiology'
      ],
      openHours: '24/7',
      emergency: true,
      latitude: -1.2574,
      longitude: 36.8108
    },
    {
      id: '3',
      name: language === 'sw' ? 'Kliniki ya Nairobi' : 'Nairobi Hospital',
      address: language === 'sw' ? 'Upper Hill, Nairobi' : 'Upper Hill, Nairobi',
      phone: '+254-20-2845000',
      distance: 1.5,
      rating: 4.5,
      specialties: [
        language === 'sw' ? 'Gynecology' : 'Gynecology',
        language === 'sw' ? 'Endocrinology' : 'Endocrinology'
      ],
      openHours: '6:00 AM - 10:00 PM',
      emergency: false,
      latitude: -1.2921,
      longitude: 36.8219
    },
    {
      id: '4',
      name: language === 'sw' ? 'Kituo cha MP Shah' : 'MP Shah Hospital',
      address: language === 'sw' ? 'Parklands, Nairobi' : 'Parklands, Nairobi',
      phone: '+254-20-4280000',
      distance: 4.2,
      rating: 4.3,
      specialties: [
        language === 'sw' ? 'Reproductive Health' : 'Reproductive Health',
        language === 'sw' ? 'Surgery' : 'Surgery'
      ],
      openHours: '24/7',
      emergency: true,
      latitude: -1.2632,
      longitude: 36.8109
    },
    {
      id: '5',
      name: language === 'sw' ? 'Gertrudes Childrens Hospital' : 'Gertrude\'s Children\'s Hospital',
      address: language === 'sw' ? 'Muthaiga, Nairobi' : 'Muthaiga, Nairobi',
      phone: '+254-20-2095000',
      distance: 5.1,
      rating: 4.6,
      specialties: [
        language === 'sw' ? 'Pediatric Gynecology' : 'Pediatric Gynecology',
        language === 'sw' ? 'Adolescent Health' : 'Adolescent Health'
      ],
      openHours: '24/7',
      emergency: true,
      latitude: -1.2456,
      longitude: 36.8123
    }
  ];

  const requestLocationPermission = async () => {
    try {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          language === 'sw' ? 'Ruhusa ya Eneo' : 'Location Permission',
          language === 'sw' ? 'Tunahitaji ruhusa ya eneo ili kukuonyesha kliniki zilizo karibu nawe.' : 'We need location permission to show you nearby clinics.',
          [{ text: 'OK' }]
        );
        setLoading(false);
        return;
      }

      setPermissionGranted(true);
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      
      // Sort clinics by distance (mock calculation)
      const sortedClinics = mockClinics.sort((a, b) => a.distance - b.distance);
      setClinics(sortedClinics);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert(
        language === 'sw' ? 'Kosa' : 'Error',
        language === 'sw' ? 'Imeshindwa kupata eneo lako. Tafadhali jaribu tena.' : 'Failed to get your location. Please try again.'
      );
    }
  };

  const callClinic = (phone: string) => {
    Alert.alert(
      language === 'sw' ? 'Piga Simu' : 'Call Clinic',
      language === 'sw' ? `Je, ungependa kupiga simu ${phone}?` : `Would you like to call ${phone}?`,
      [
        { text: language === 'sw' ? 'Ghairi' : 'Cancel', style: 'cancel' },
        { text: language === 'sw' ? 'Piga Simu' : 'Call', onPress: () => Linking.openURL(`tel:${phone}`) }
      ]
    );
  };

  const openDirections = (clinic: Clinic) => {
    const url = `https://maps.google.com/?q=${clinic.latitude},${clinic.longitude}`;
    Linking.openURL(url);
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

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
          🏥 {language === 'sw' ? 'Kliniki Karibu' : 'Nearby Clinics'}
        </Text>
        <Text style={{ 
          fontSize: 16, 
          color: 'rgba(255,255,255,0.8)' 
        }}>
          {language === 'sw' ? 'Pata hospitali na kliniki karibu nawe' : 'Find hospitals and clinics near you'}
        </Text>
      </LinearGradient>

      <View style={{ padding: 20 }}>
        {!permissionGranted ? (
          <View style={{ 
            backgroundColor: colors.card, 
            borderRadius: 20, 
            padding: 20, 
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.border
          }}>
            <Text style={{ fontSize: 48, marginBottom: 15 }}>📍</Text>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: 'bold', 
              color: colors.text, 
              textAlign: 'center', 
              marginBottom: 10 
            }}>
              {language === 'sw' ? 'Ruhusu Eneo' : 'Allow Location Access'}
            </Text>
            <Text style={{ 
              fontSize: 14, 
              color: colors.textSecondary, 
              textAlign: 'center', 
              marginBottom: 20 
            }}>
              {language === 'sw' 
                ? 'Tunahitaji ruhusa ya eneo ili kukuonyesha kliniki zilizo karibu nawe.'
                : 'We need access to your location to show nearby healthcare facilities.'
              }
            </Text>
            <TouchableOpacity
              onPress={requestLocationPermission}
              disabled={loading}
              style={{ 
                backgroundColor: colors.primary, 
                borderRadius: 15, 
                padding: 15, 
                paddingHorizontal: 30 
              }}
            >
              <Text style={{ 
                color: 'white', 
                fontWeight: 'bold' 
              }}>
                {loading 
                  ? (language === 'sw' ? 'Inapata Eneo...' : 'Getting Location...')
                  : (language === 'sw' ? 'Ruhusu Eneo' : 'Grant Permission')
                }
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={{ 
              fontSize: 20, 
              fontWeight: 'bold', 
              color: colors.text, 
              marginBottom: 20 
            }}>
              📍 {language === 'sw' ? 'Kliniki Karibu Nawe' : 'Clinics Near You'}
            </Text>

            {clinics.map((clinic) => (
              <View
                key={clinic.id}
                style={{ 
                  backgroundColor: colors.card, 
                  borderRadius: 20, 
                  padding: 20, 
                  marginBottom: 15,
                  borderWidth: 1,
                  borderColor: colors.border
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ 
                      fontSize: 18, 
                      fontWeight: 'bold', 
                      color: colors.text,
                      marginBottom: 5
                    }}>
                      {clinic.name}
                    </Text>
                    <Text style={{ 
                      fontSize: 14, 
                      color: colors.textSecondary 
                    }}>
                      📍 {clinic.address}
                    </Text>
                  </View>
                  {clinic.emergency && (
                    <View style={{ 
                      backgroundColor: '#ff6b6b', 
                      borderRadius: 15, 
                      paddingHorizontal: 8, 
                      paddingVertical: 4 
                    }}>
                      <Text style={{ 
                        color: 'white', 
                        fontSize: 10, 
                        fontWeight: 'bold' 
                      }}>
                        24/7
                      </Text>
                    </View>
                  )}
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                  <Text style={{ 
                    fontSize: 14, 
                    color: '#ffa500', 
                    marginRight: 10 
                  }}>
                    {getRatingStars(clinic.rating)} {clinic.rating}
                  </Text>
                  <Text style={{ 
                    fontSize: 14, 
                    color: colors.primary,
                    fontWeight: 'bold'
                  }}>
                    {clinic.distance}km {language === 'sw' ? 'mbali' : 'away'}
                  </Text>
                </View>

                <View style={{ marginBottom: 15 }}>
                  <Text style={{ 
                    fontSize: 14, 
                    color: colors.text,
                    fontWeight: 'bold',
                    marginBottom: 5
                  }}>
                    {language === 'sw' ? 'Utaalamu:' : 'Specialties:'}
                  </Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {clinic.specialties.map((specialty, index) => (
                      <View
                        key={index}
                        style={{ 
                          backgroundColor: colors.surface, 
                          borderRadius: 10, 
                          paddingHorizontal: 10, 
                          paddingVertical: 5, 
                          marginRight: 8, 
                          marginBottom: 5 
                        }}
                      >
                        <Text style={{ 
                          fontSize: 12, 
                          color: colors.primary 
                        }}>
                          {specialty}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>

                <Text style={{ 
                  fontSize: 14, 
                  color: colors.textSecondary,
                  marginBottom: 15
                }}>
                  🕒 {language === 'sw' ? 'Saa za Kufungua:' : 'Open Hours:'} {clinic.openHours}
                </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity
                    onPress={() => callClinic(clinic.phone)}
                    style={{ 
                      backgroundColor: '#28a745', 
                      borderRadius: 15, 
                      padding: 12, 
                      flex: 0.3,
                      alignItems: 'center'
                    }}
                  >
                    <Text style={{ 
                      color: 'white', 
                      fontSize: 12, 
                      fontWeight: 'bold' 
                    }}>
                      📞 {language === 'sw' ? 'Piga Simu' : 'Call'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => openDirections(clinic)}
                    style={{ 
                      backgroundColor: '#007bff', 
                      borderRadius: 15, 
                      padding: 12, 
                      flex: 0.3,
                      alignItems: 'center'
                    }}
                  >
                    <Text style={{ 
                      color: 'white', 
                      fontSize: 12, 
                      fontWeight: 'bold' 
                    }}>
                      🗺️ {language === 'sw' ? 'Mwelekeo' : 'Directions'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => Alert.alert(
                      language === 'sw' ? 'Ratiba Miadi' : 'Book Appointment',
                      language === 'sw' ? 'Kipengele hiki kinakuja hivi karibuni!' : 'This feature is coming soon!'
                    )}
                    style={{ 
                      backgroundColor: colors.primary, 
                      borderRadius: 15, 
                      padding: 12, 
                      flex: 0.3,
                      alignItems: 'center'
                    }}
                  >
                    <Text style={{ 
                      color: 'white', 
                      fontSize: 12, 
                      fontWeight: 'bold' 
                    }}>
                      📅 {language === 'sw' ? 'Ratiba' : 'Book'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <TouchableOpacity
              onPress={requestLocationPermission}
              style={{ 
                backgroundColor: colors.surface, 
                borderRadius: 15, 
                padding: 15, 
                alignItems: 'center',
                marginTop: 10,
                borderWidth: 1,
                borderColor: colors.border
              }}
            >
              <Text style={{ 
                color: colors.primary, 
                fontWeight: 'bold' 
              }}>
                🔄 {language === 'sw' ? 'Sasisha Eneo' : 'Refresh Location'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
}