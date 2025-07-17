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
import { router } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  clinic: string;
  date: string;
  time: string;
  type: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
  symptoms?: string[];
  cost?: string;
  duration?: string;
}

export default function AppointmentsScreen() {
  const { t, language } = useLanguage();
  const { colors, isDark } = useTheme();
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'completed'>('upcoming');

  const appointments: Appointment[] = [
    {
      id: '1',
      doctor: language === 'sw' ? 'Dk. Sarah Johnson' : 'Dr. Sarah Johnson',
      specialty: language === 'sw' ? 'Mzazi' : 'Gynecologist',
      clinic: language === 'sw' ? 'Hospitali ya Nairobi' : 'Nairobi Hospital',
      date: '2024-03-15',
      time: '10:30 AM',
      type: language === 'sw' ? 'Ufuatiliaji' : 'Follow-up',
      status: 'upcoming',
      notes: language === 'sw' ? 'Uchunguzi wa ultrasound wa ovarian cyst' : 'Ultrasound examination for ovarian cyst monitoring',
      symptoms: [
        language === 'sw' ? 'Maumivu ya tumbo' : 'Pelvic pain',
        language === 'sw' ? 'Mvimbo' : 'Bloating'
      ],
      cost: 'KES 3,500',
      duration: '45 minutes'
    },
    {
      id: '2',
      doctor: language === 'sw' ? 'Dk. Michael Chen' : 'Dr. Michael Chen',
      specialty: language === 'sw' ? 'Mtaalamu wa Picha za Ndani' : 'Radiologist',
      clinic: language === 'sw' ? 'Hospitali ya Aga Khan' : 'Aga Khan Hospital',
      date: '2024-03-22',
      time: '2:00 PM',
      type: 'Ultrasound',
      status: 'upcoming',
      notes: language === 'sw' ? 'Ultrasound ya kufuatilia ukuaji wa cyst' : 'Follow-up ultrasound to monitor cyst growth',
      cost: 'KES 4,200',
      duration: '30 minutes'
    },
    {
      id: '3',
      doctor: language === 'sw' ? 'Dk. Emily Rodriguez' : 'Dr. Emily Rodriguez',
      specialty: language === 'sw' ? 'Mzazi' : 'Gynecologist',
      clinic: language === 'sw' ? 'Kliniki ya MP Shah' : 'MP Shah Hospital',
      date: '2024-02-28',
      time: '11:00 AM',
      type: language === 'sw' ? 'Uchunguzi wa Kwanza' : 'Initial Consultation',
      status: 'completed',
      notes: language === 'sw' ? 'Uchunguzi wa kwanza, cyst imegunduliwa na utaratibu wa kufuatilia umeanzishwa' : 'Initial examination, cyst detected and monitoring protocol established',
      symptoms: [
        language === 'sw' ? 'Hedhi zisizo za kawaida' : 'Irregular periods',
        language === 'sw' ? 'Maumivu ya tumbo' : 'Pelvic discomfort'
      ],
      cost: 'KES 2,800',
      duration: '60 minutes'
    },
    {
      id: '4',
      doctor: language === 'sw' ? 'Dk. James Wilson' : 'Dr. James Wilson',
      specialty: language === 'sw' ? 'Mzazi' : 'Gynecologist',
      clinic: language === 'sw' ? 'Hospitali ya Kenyatta' : 'Kenyatta National Hospital',
      date: '2024-02-15',
      time: '9:30 AM',
      type: language === 'sw' ? 'Ufuatiliaji' : 'Follow-up',
      status: 'completed',
      notes: language === 'sw' ? 'Matokeo ya vipimo vya damu yamerekodiwa, cyst iko stable' : 'Blood test results reviewed, cyst remains stable',
      cost: 'KES 3,200',
      duration: '30 minutes'
    }
  ];

  const upcomingAppointments = appointments.filter(apt => apt.status === 'upcoming');
  const completedAppointments = appointments.filter(apt => apt.status === 'completed');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return '#4CAF50';
      case 'completed': return '#2196F3';
      case 'cancelled': return '#F44336';
      default: return colors.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return language === 'sw' ? 'Inakuja' : 'Upcoming';
      case 'completed': return language === 'sw' ? 'Imekamilika' : 'Completed';
      case 'cancelled': return language === 'sw' ? 'Imeghairiwa' : 'Cancelled';
      default: return status;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === 'sw' ? 'sw-KE' : 'en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const rescheduleAppointment = (appointment: Appointment) => {
    Alert.alert(
      language === 'sw' ? 'Badilisha Muda' : 'Reschedule Appointment',
      language === 'sw' 
        ? `Je, ungependa kubadilisha muda wa miadi yako na ${appointment.doctor}?`
        : `Would you like to reschedule your appointment with ${appointment.doctor}?`,
      [
        { text: language === 'sw' ? 'Ghairi' : 'Cancel', style: 'cancel' },
        { 
          text: language === 'sw' ? 'Badilisha' : 'Reschedule', 
          onPress: () => Alert.alert(
            language === 'sw' ? 'Imebadilishwa' : 'Rescheduled',
            language === 'sw' ? 'Miadi yako imebadilishwa. Utapokea ujumbe wa uthibitisho.' : 'Your appointment has been rescheduled. You will receive a confirmation message.'
          )
        }
      ]
    );
  };

  const cancelAppointment = (appointment: Appointment) => {
    Alert.alert(
      language === 'sw' ? 'Ghairi Miadi' : 'Cancel Appointment',
      language === 'sw' 
        ? `Je, una uhakika ungependa kughairi miadi yako na ${appointment.doctor}?`
        : `Are you sure you want to cancel your appointment with ${appointment.doctor}?`,
      [
        { text: language === 'sw' ? 'Hapana' : 'No', style: 'cancel' },
        { 
          text: language === 'sw' ? 'Ndio, Ghairi' : 'Yes, Cancel', 
          style: 'destructive',
          onPress: () => Alert.alert(
            language === 'sw' ? 'Imeghairiwa' : 'Cancelled',
            language === 'sw' ? 'Miadi yako imeghairiwa.' : 'Your appointment has been cancelled.'
          )
        }
      ]
    );
  };

  const renderAppointment = (appointment: Appointment) => (
    <View
      key={appointment.id}
      style={{ 
        backgroundColor: colors.card, 
        borderRadius: 20, 
        padding: 20, 
        marginBottom: 15,
        borderWidth: 1,
        borderColor: colors.border
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: 'bold', 
            color: colors.text,
            marginBottom: 5
          }}>
            {appointment.doctor}
          </Text>
          <Text style={{ 
            fontSize: 14, 
            color: colors.textSecondary,
            marginBottom: 3
          }}>
            {appointment.specialty} • {appointment.clinic}
          </Text>
          <Text style={{ 
            fontSize: 14, 
            color: colors.primary,
            fontWeight: 'bold'
          }}>
            {appointment.type}
          </Text>
        </View>
        <View style={{ 
          backgroundColor: getStatusColor(appointment.status), 
          borderRadius: 15, 
          paddingHorizontal: 10, 
          paddingVertical: 5 
        }}>
          <Text style={{ 
            color: 'white', 
            fontSize: 12, 
            fontWeight: 'bold' 
          }}>
            {getStatusText(appointment.status)}
          </Text>
        </View>
      </View>

      <View style={{ 
        backgroundColor: colors.surface, 
        borderRadius: 15, 
        padding: 15, 
        marginBottom: 15 
      }}>
        <Text style={{ 
          fontSize: 16, 
          fontWeight: 'bold', 
          color: colors.text,
          marginBottom: 10
        }}>
          📅 {language === 'sw' ? 'Tarehe na Muda' : 'Date & Time'}
        </Text>
        <Text style={{ 
          fontSize: 15, 
          color: colors.text,
          marginBottom: 5
        }}>
          📆 {formatDate(appointment.date)}
        </Text>
        <Text style={{ 
          fontSize: 15, 
          color: colors.text,
          marginBottom: 5
        }}>
          🕐 {appointment.time}
        </Text>
        {appointment.duration && (
          <Text style={{ 
            fontSize: 14, 
            color: colors.textSecondary
          }}>
            ⏱️ {language === 'sw' ? 'Muda:' : 'Duration:'} {appointment.duration}
          </Text>
        )}
      </View>

      {appointment.notes && (
        <View style={{ marginBottom: 15 }}>
          <Text style={{ 
            fontSize: 14, 
            fontWeight: 'bold', 
            color: colors.text,
            marginBottom: 8
          }}>
            📝 {language === 'sw' ? 'Maelezo:' : 'Notes:'}
          </Text>
          <Text style={{ 
            fontSize: 14, 
            color: colors.textSecondary,
            lineHeight: 20
          }}>
            {appointment.notes}
          </Text>
        </View>
      )}

      {appointment.symptoms && appointment.symptoms.length > 0 && (
        <View style={{ marginBottom: 15 }}>
          <Text style={{ 
            fontSize: 14, 
            fontWeight: 'bold', 
            color: colors.text,
            marginBottom: 8
          }}>
            🩺 {language === 'sw' ? 'Dalili:' : 'Symptoms:'}
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {appointment.symptoms.map((symptom, index) => (
              <View
                key={index}
                style={{ 
                  backgroundColor: colors.primary + '20', 
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
                  {symptom}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {appointment.cost && (
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          marginBottom: 15,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: colors.border
        }}>
          <Text style={{ 
            fontSize: 14, 
            fontWeight: 'bold', 
            color: colors.text 
          }}>
            💰 {language === 'sw' ? 'Bei:' : 'Cost:'}
          </Text>
          <Text style={{ 
            fontSize: 14, 
            fontWeight: 'bold', 
            color: colors.primary 
          }}>
            {appointment.cost}
          </Text>
        </View>
      )}

      {appointment.status === 'upcoming' && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={() => rescheduleAppointment(appointment)}
            style={{ 
              backgroundColor: '#FFA500', 
              borderRadius: 15, 
              padding: 12, 
              flex: 0.45,
              alignItems: 'center'
            }}
          >
            <Text style={{ 
              color: 'white', 
              fontSize: 14, 
              fontWeight: 'bold' 
            }}>
              📅 {language === 'sw' ? 'Badilisha' : 'Reschedule'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => cancelAppointment(appointment)}
            style={{ 
              backgroundColor: '#F44336', 
              borderRadius: 15, 
              padding: 12, 
              flex: 0.45,
              alignItems: 'center'
            }}
          >
            <Text style={{ 
              color: 'white', 
              fontSize: 14, 
              fontWeight: 'bold' 
            }}>
              ❌ {language === 'sw' ? 'Ghairi' : 'Cancel'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {appointment.status === 'completed' && (
        <TouchableOpacity
          onPress={() => Alert.alert(
            language === 'sw' ? 'Taarifa za Miadi' : 'Appointment Report',
            language === 'sw' ? 'Taarifa kamili ya miadi hii inakuja hivi karibuni!' : 'Detailed appointment report coming soon!'
          )}
          style={{ 
            backgroundColor: colors.primary, 
            borderRadius: 15, 
            padding: 12, 
            alignItems: 'center'
          }}
        >
          <Text style={{ 
            color: 'white', 
            fontSize: 14, 
            fontWeight: 'bold' 
          }}>
            📋 {language === 'sw' ? 'Angalia Taarifa' : 'View Report'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

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
          📅 {language === 'sw' ? 'Miadi Yangu' : 'My Appointments'}
        </Text>
        <Text style={{ 
          fontSize: 16, 
          color: 'rgba(255,255,255,0.8)' 
        }}>
          {language === 'sw' ? 'Simamia miadi yako yote ya kimatibabu' : 'Manage all your medical appointments'}
        </Text>
      </LinearGradient>

      <View style={{ padding: 20 }}>
        {/* Tab Navigation */}
        <View style={{ 
          flexDirection: 'row', 
          backgroundColor: colors.surface, 
          borderRadius: 15, 
          padding: 5,
          marginBottom: 20
        }}>
          <TouchableOpacity
            onPress={() => setSelectedTab('upcoming')}
            style={{ 
              flex: 1,
              backgroundColor: selectedTab === 'upcoming' ? colors.primary : 'transparent',
              borderRadius: 10,
              padding: 12,
              alignItems: 'center'
            }}
          >
            <Text style={{ 
              color: selectedTab === 'upcoming' ? 'white' : colors.textSecondary,
              fontWeight: 'bold'
            }}>
              {language === 'sw' ? 'Zinakuja' : 'Upcoming'} ({upcomingAppointments.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedTab('completed')}
            style={{ 
              flex: 1,
              backgroundColor: selectedTab === 'completed' ? colors.primary : 'transparent',
              borderRadius: 10,
              padding: 12,
              alignItems: 'center'
            }}
          >
            <Text style={{ 
              color: selectedTab === 'completed' ? 'white' : colors.textSecondary,
              fontWeight: 'bold'
            }}>
              {language === 'sw' ? 'Zilizokamilika' : 'Completed'} ({completedAppointments.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Appointments List */}
        {selectedTab === 'upcoming' ? (
          upcomingAppointments.length > 0 ? (
            upcomingAppointments.map(renderAppointment)
          ) : (
            <View style={{ 
              backgroundColor: colors.card, 
              borderRadius: 20, 
              padding: 40, 
              alignItems: 'center',
              borderWidth: 1,
              borderColor: colors.border
            }}>
              <Text style={{ fontSize: 48, marginBottom: 15 }}>📅</Text>
              <Text style={{ 
                fontSize: 18, 
                fontWeight: 'bold', 
                color: colors.text, 
                textAlign: 'center',
                marginBottom: 10
              }}>
                {language === 'sw' ? 'Hakuna Miadi Inayokuja' : 'No Upcoming Appointments'}
              </Text>
              <Text style={{ 
                fontSize: 14, 
                color: colors.textSecondary, 
                textAlign: 'center' 
              }}>
                {language === 'sw' 
                  ? 'Ratiba miadi yako ya ifuatayu kuona madaktari wako.'
                  : 'Schedule your next appointment to see your doctors.'
                }
              </Text>
            </View>
          )
        ) : (
          completedAppointments.length > 0 ? (
            completedAppointments.map(renderAppointment)
          ) : (
            <View style={{ 
              backgroundColor: colors.card, 
              borderRadius: 20, 
              padding: 40, 
              alignItems: 'center',
              borderWidth: 1,
              borderColor: colors.border
            }}>
              <Text style={{ fontSize: 48, marginBottom: 15 }}>📋</Text>
              <Text style={{ 
                fontSize: 18, 
                fontWeight: 'bold', 
                color: colors.text, 
                textAlign: 'center' 
              }}>
                {language === 'sw' ? 'Hakuna Miadi Iliyokamilika' : 'No Completed Appointments'}
              </Text>
            </View>
          )
        )}

        {/* Schedule New Appointment */}
        <TouchableOpacity
          onPress={() => router.push('/(patient)/clinics')}
          style={{ 
            backgroundColor: colors.primary, 
            borderRadius: 20, 
            padding: 20, 
            alignItems: 'center',
            marginTop: 20
          }}
        >
          <Text style={{ 
            color: 'white', 
            fontSize: 18, 
            fontWeight: 'bold' 
          }}>
            ➕ {language === 'sw' ? 'Ratiba Miadi Mpya' : 'Schedule New Appointment'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}