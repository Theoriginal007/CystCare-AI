import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatScreen() {
  const { t, language } = useLanguage();
  const { colors, isDark } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: language === 'sw' ? 'Hujambo! Mimi ni msaidizi wako wa AI wa ovarian cysts. Ninaweza kukusaidia na maswali yoyote kuhusu uvimbe wa ovari, dalili, matibabu, na zaidi. Je, una swali lolote?' : 'Hello! I\'m your AI assistant specializing in ovarian cysts. I can help you with questions about symptoms, treatments, diagnosis, and prevention. What would you like to know?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const quickQuestions = [
    'What are ovarian cysts?',
    'What symptoms should I watch for?',
    'When should I see a doctor?',
    'Are ovarian cysts cancerous?',
    'How are cysts diagnosed?',
    'What foods should I avoid?',
    'Can exercise help?',
    'Treatment options available?'
  ];

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('what are') || lowerMessage.includes('define') || lowerMessage.includes('ovarian cyst')) {
      return language === 'sw' 
        ? 'Uvimbe wa ovari ni mifuko yenye maji au vitu vingine ndani ya ovari. Wengi ni wa kawaida na hawaharibu, lakini baadhi yanaweza kuongezeka au kusababisha matatizo. Kuna aina nyingi: functional cysts (za kawaida), dermoid cysts, cystadenomas, na endometriomas.'
        : 'Ovarian cysts are fluid-filled sacs that develop on or inside an ovary. Most are harmless and resolve on their own, but some may grow or cause complications. There are several types: functional cysts (most common), dermoid cysts, cystadenomas, and endometriomas. They can occur at any age but are most common during reproductive years.';
    }
    
    if (lowerMessage.includes('symptom') || lowerMessage.includes('signs') || lowerMessage.includes('feel')) {
      return language === 'sw'
        ? 'Dalili za uvimbe wa ovari ni: maumivu ya tumbo (hasa upande mmoja), mfupisho wa tumbo, hedhi isiyofuata ratiba, maumivu wakati wa mahusiano, maumivu wa mgongo wa chini, na hisia ya ujazuo wa haraka wakati wa kula. Dalili kali ni maumivu makali ya ghafla, homa, na kutapika.'
        : 'Common symptoms include: pelvic pain (especially on one side), bloating, irregular periods, pain during intercourse, lower back pain, and feeling full quickly when eating. Severe symptoms requiring immediate attention: sudden severe pain, fever, vomiting, or rapid heartbeat.';
    }
    
    if (lowerMessage.includes('doctor') || lowerMessage.includes('see') || lowerMessage.includes('when')) {
      return language === 'sw'
        ? 'Muone daktari ikiwa: mna maumivu makali ya tumbo, homa juu ya 38°C, kutapika kwa mfululizo, maumivu yanayozidi badala ya kupungua, au hedhi zilizopotea kwa miezi 3+. Pia ikiwa uvimbe ni mkubwa zaidi ya 5cm au una historia ya familia ya saratani ya ovari.'
        : 'See a doctor immediately if you have: severe pelvic pain, fever above 100.4°F, persistent vomiting, worsening rather than improving pain, or missed periods for 3+ months. Also if cysts are larger than 5cm, you have family history of ovarian cancer, or you\'re postmenopausal with new cysts.';
    }
    
    if (lowerMessage.includes('cancer') || lowerMessage.includes('malignant') || lowerMessage.includes('dangerous')) {
      return language === 'sw'
        ? 'Uvimbe mwingi wa ovari (zaidi ya 95%) si wa saratani, hasa kwa wanawake wa umri wa kuzaa. Hata hivyo, uwezekano wa saratani unaongezeka na umri, hasa baada ya menopause. Dalili za wasiwasi ni uvimbe mkubwa (>10cm), mchanganyiko wa vipengele, na kuongezeka kwa haraka.'
        : 'Most ovarian cysts (over 95%) are benign, especially in reproductive-age women. However, cancer risk increases with age, particularly after menopause. Warning signs include: large size (>10cm), complex features on ultrasound, rapid growth, or elevated tumor markers like CA-125.';
    }
    
    if (lowerMessage.includes('diagnosis') || lowerMessage.includes('test') || lowerMessage.includes('scan')) {
      return language === 'sw'
        ? 'Utambuzi unafanywa kwa: ultrasound ya tumbo (njia ya kwanza), CT scan au MRI kwa maelezo zaidi, vipimo vya damu (kama CA-125), na wakati mwingine laparoscopy kwa uchunguzi wa moja kwa moja. Ultrasound ni salama na haina mionzi hatari.'
        : 'Diagnosis involves: pelvic ultrasound (first-line), CT or MRI for detailed imaging, blood tests (like CA-125 tumor marker), and sometimes laparoscopy for direct visualization. Ultrasound is safe and uses no harmful radiation. Regular monitoring helps track changes over time.';
    }
    
    if (lowerMessage.includes('food') || lowerMessage.includes('diet') || lowerMessage.includes('eat')) {
      return language === 'sw'
        ? 'Lishe nzuri inasaidia: kula mboga nyingi za majani, matunda, nafaka kamili, na protini za ubora. Epuka: chakula chenye sukari nyingi, chakula cha processed, alkohol nyingi, na caffeine nyingi. Omega-3 (kama samaki) na antioxidants zinasaidia kupunguza uvimbe.'
        : 'Helpful dietary choices: plenty of leafy greens, fruits, whole grains, and lean proteins. Avoid: high sugar foods, processed foods, excessive alcohol, and too much caffeine. Omega-3 fatty acids (fish, flaxseed) and antioxidants may help reduce inflammation and support hormonal balance.';
    }
    
    if (lowerMessage.includes('exercise') || lowerMessage.includes('activity') || lowerMessage.includes('physical')) {
      return language === 'sw'
        ? 'Mazoezi ya kawaida yanasaidia: kutembea, kuogelea, yoga ya upole, na mazoezi ya kupumua. Epuka mazoezi makali wakati wa maumivu. Mazoezi yanasaidia kuboresha mzunguko wa damu, kupunguza stress, na kuongeza hali ya afya ya jumla.'
        : 'Regular gentle exercise helps: walking, swimming, gentle yoga, and breathing exercises. Avoid high-impact activities during painful episodes. Exercise improves circulation, reduces stress hormones, and supports overall health. Always listen to your body and stop if pain increases.';
    }
    
    if (lowerMessage.includes('treatment') || lowerMessage.includes('cure') || lowerMessage.includes('therapy')) {
      return language === 'sw'
        ? 'Matibabu yanajumuisha: 1) Kufuatilia tu (kwa vidogo visivyo na hatari), 2) Dawa za hormone (vidonge vya kuzuia mimba), 3) Upasuaji (laparoscopy kwa makubwa/magumu), 4) Matibabu ya dalili (pain relievers). Chaguo linategemea ukubwa, aina, na dalili.'
        : 'Treatment options include: 1) Watchful waiting (for small, benign cysts), 2) Hormonal therapy (birth control pills), 3) Surgery (laparoscopy for large/complex cysts), 4) Symptom management (pain relief). Choice depends on size, type, symptoms, and your age/reproductive plans.';
    }
    
    if (lowerMessage.includes('prevent') || lowerMessage.includes('avoid') || lowerMessage.includes('stop')) {
      return language === 'sw'
        ? 'Njia za kuzuia: tumia vidonge vya kuzuia mimba (kupunguza functional cysts), fuata lishe nzuri, fanya mazoezi ya kawaida, punguza stress, na fanya uchunguzi wa kawaida. Hata hivyo, baadhi ya aina za uvimbe haziwezi kuzuiliwa.'
        : 'Prevention strategies: use hormonal contraceptives (reduces functional cysts), maintain healthy diet, exercise regularly, manage stress, and have regular gynecological exams. However, some types of cysts cannot be completely prevented due to genetic factors.';
    }
    
    if (lowerMessage.includes('pain') || lowerMessage.includes('hurt') || lowerMessage.includes('relief')) {
      return language === 'sw'
        ? 'Njia za kupunguza maumivu: tumia mfuko wa joto au baridi, ongeza joto la mwanga, fanya mazoezi ya upole ya kupumua, tumia over-the-counter pain relievers (ibuprofen au acetaminophen), na pumzika vya kutosha. Ikiwa maumivu yanazidi, wasiliana na daktari.'
        : 'Pain relief methods: apply heat or cold packs, take warm baths, practice gentle breathing exercises, use over-the-counter pain relievers (ibuprofen or acetaminophen), and get adequate rest. If pain worsens or becomes severe, contact your doctor immediately.';
    }
    
    if (lowerMessage.includes('size') || lowerMessage.includes('big') || lowerMessage.includes('large') || lowerMessage.includes('small')) {
      return language === 'sw'
        ? 'Ukubwa wa uvimbe: Wadogo (<5cm) - kufuatilia tu, Wa kati (5-10cm) - kufuatilia kwa karibu au matibabu, Wakubwa (>10cm) - upasuaji unaweza kuhitajika. Ukubwa pekee hauamuzi matibabu - aina na dalili pia ni muhimu.'
        : 'Cyst sizes: Small (<5cm) - usually monitored, Medium (5-10cm) - close monitoring or treatment, Large (>10cm) - may require surgery. Size alone doesn\'t determine treatment - type, symptoms, and growth rate are also important factors in decision-making.';
    }
    
    if (lowerMessage.includes('pregnancy') || lowerMessage.includes('pregnant') || lowerMessage.includes('fertility')) {
      return language === 'sw'
        ? 'Uvimbe na uzazi: Wengi wa uvimbe hauathiri uzazi, lakini baadhi (kama endometriomas) yanaweza kuathiri. Uvimbe wakati wa ujauzito ni wa kawaida na wengi hutoweka. Wasiliana na daktari kwa ushauri wa kibinafsi kuhusu fertility.'
        : 'Cysts and fertility: Most cysts don\'t affect fertility, but some types (like endometriomas) may impact conception. Cysts during pregnancy are common and most resolve naturally. Consult your doctor for personalized advice about fertility planning and cyst management.';
    }
    
    return language === 'sw'
      ? 'Asante kwa swali lako kuhusu ovarian cysts. Kwa maelezo zaidi mahususi, ni bora kuongea na daktari wako. Je, una swali lingine kuhusu dalili, matibabu, au kuzuia uvimbe wa ovari?'
      : 'Thank you for your question about ovarian cysts. For more specific medical advice, it\'s best to consult with your healthcare provider. Do you have any other questions about symptoms, treatments, or prevention of ovarian cysts?';
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <LinearGradient
        colors={['#F4D3E5', '#A3327A']}
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
          🤖 Ovarian Cyst AI Assistant
        </Text>
        <Text style={{ 
          fontSize: 16, 
          color: '#A3327A' 
        }}>
          Ask me anything about ovarian cysts, symptoms & treatments
        </Text>
      </LinearGradient>

      {/* Quick Questions */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={{ 
          padding: 15, 
          maxHeight: 80 
        }}
      >
        {quickQuestions.map((question, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setInputText(question)}
            style={{ 
              backgroundColor: colors.card, 
              borderRadius: 20, 
              paddingHorizontal: 15, 
              paddingVertical: 10, 
              marginRight: 10,
              borderWidth: 1,
              borderColor: colors.border
            }}
          >
            <Text style={{ 
              color: colors.primary, 
              fontSize: 13,
              fontWeight: '500'
            }}>
              {question}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={{ flex: 1, padding: 20 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={{
              alignSelf: message.isUser ? 'flex-end' : 'flex-start',
              backgroundColor: message.isUser ? colors.primary : colors.card,
              borderRadius: 20,
              borderBottomRightRadius: message.isUser ? 5 : 20,
              borderBottomLeftRadius: message.isUser ? 20 : 5,
              padding: 15,
              marginBottom: 10,
              maxWidth: '85%',
              borderWidth: message.isUser ? 0 : 1,
              borderColor: colors.border
            }}
          >
            <Text style={{
              color: message.isUser ? 'white' : colors.text,
              fontSize: 16,
              lineHeight: 22
            }}>
              {message.text}
            </Text>
            <Text style={{
              color: message.isUser ? 'rgba(255,255,255,0.7)' : colors.textSecondary,
              fontSize: 12,
              marginTop: 5
            }}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        ))}

        {isTyping && (
          <View style={{
            alignSelf: 'flex-start',
            backgroundColor: colors.card,
            borderRadius: 20,
            borderBottomLeftRadius: 5,
            padding: 15,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: colors.border
          }}>
            <Text style={{ color: colors.textSecondary }}>AI is typing...</Text>
          </View>
        )}
      </ScrollView>

      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flexDirection: 'row',
          padding: 20,
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border
        }}
      >
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask about ovarian cysts, symptoms, treatments..."
          placeholderTextColor={colors.textSecondary}
          multiline
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 25,
            paddingHorizontal: 15,
            paddingVertical: 10,
            fontSize: 16,
            maxHeight: 100,
            backgroundColor: colors.card,
            color: colors.text
          }}
        />
        <TouchableOpacity
          onPress={sendMessage}
          disabled={!inputText.trim()}
          style={{
            backgroundColor: inputText.trim() ? colors.primary : colors.border,
            borderRadius: 25,
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10
          }}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>📤</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
