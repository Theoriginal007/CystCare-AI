
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Language = 'en' | 'sw' | 'luo' | 'ki' | 'kam' | 'guz' | 'kal' | 'mas' | 'luy' | 'mer' | 'som';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  welcome: {
    en: 'Welcome',
    sw: 'Karibu',
    luo: 'Oyawore',
    ki: 'Wamũkirĩre',
    kam: 'Mwaisyo',
    guz: 'Bwaisibori',
    kal: 'Chamuge',
    mas: 'Karibu',
    luy: 'Mukhwana',
    mer: 'Wega',
    som: 'Soo dhawow'
  },
  patient: {
    en: 'Patient',
    sw: 'Mgonjwa',
    luo: 'Jatuo',
    ki: 'Mũrũaru',
    kam: 'Muvyu',
    guz: 'Omoare',
    kal: 'Chepyosok',
    mas: 'Oltumuren',
    luy: 'Omulemavu',
    mer: 'Murimaru',
    som: 'Bukaanka'
  },
  doctor: {
    en: 'Doctor',
    sw: 'Daktari',
    luo: 'Jadolo',
    ki: 'Daktari',
    kam: 'Daktari',
    guz: 'Daktari',
    kal: 'Daktari',
    mas: 'Daktari',
    luy: 'Daktari',
    mer: 'Daktari',
    som: 'Dhakhtarka'
  },
  cystGrowthPredictor: {
    en: 'Cyst Growth Predictor',
    sw: 'Kibashiri cha Ukuaji wa Uvimbe',
    luo: 'Ngʼeyo mar dongo mar tuo',
    ki: 'Mũtaũri wa gũkũra kwa ihũa',
    kam: 'Kiuoni kya kukula kwa mbua',
    guz: 'Ekerandi ke engoso',
    kal: 'Kokorutiet ne chukunot',
    mas: 'Enkishon oo inkiama',
    luy: 'Khubona khwa khukula',
    mer: 'Kiuone kia gukura',
    som: 'Wax ka horjoogta'
  },
  treatmentRecommendation: {
    en: 'Treatment Recommendation',
    sw: 'Mapendekezo ya Matibabu',
    luo: 'Puonj mar thieth',
    ki: 'Gũtaũra gwa ũgima',
    kam: 'Maendeezo ma mithenya',
    guz: 'Egesaku re omogaka',
    kal: 'Kenyantoyot ne keetiet',
    mas: 'Inkishon oo ilkiama',
    luy: 'Amalako ka obukhafu',
    mer: 'Gicaro kia ughima',
    som: 'Talooyinka daawaynta'
  },
  consultDoctor: {
    en: 'Consult Doctor',
    sw: 'Shauri na Daktari',
    luo: 'Penjruok gi jadolo',
    ki: 'Ciira na daktari',
    kam: 'Wikia na daktari',
    guz: 'Bwera na daktari',
    kal: 'Chamuren ak daktari',
    mas: 'Ayieu daktari',
    luy: 'Omanya daktari',
    mer: 'Aria na daktari',
    som: 'Latalinta dhakhtarka'
  },
  goodMorning: {
    en: 'Good Morning',
    sw: 'Habari za Asubuhi',
    luo: 'Oyawore',
    ki: 'Rũciinĩ rũrĩ rũega',
    kam: 'Mwema kyamuoo',
    guz: 'Bwairire',
    kal: 'Chamke',
    mas: 'Supai',
    luy: 'Mwacha manono',
    mer: 'Umunene',
    som: 'Subax wanaagsan'
  },
  goodAfternoon: {
    en: 'Good Afternoon',
    sw: 'Habari za Mchana',
    luo: 'Okinyi maber',
    ki: 'Mũthenya mwega',
    kam: 'Mwema kyaumini',
    guz: 'Bwairire',
    kal: 'Chamuriat',
    mas: 'Olosere',
    luy: 'Mwacha mashiru',
    mer: 'Umunene wa merigio',
    som: 'Galabnimo wanaagsan'
  },
  goodEvening: {
    en: 'Good Evening',
    sw: 'Habari za Jioni',
    luo: 'Oimore maber',
    ki: 'Hwaĩ-inĩ mwega',
    kam: 'Mwema kyoo',
    guz: 'Bwairire',
    kal: 'Chamkolong',
    mas: 'Olosere',
    luy: 'Mwacha makelela',
    mer: 'Umunene wa mukiri',
    som: 'Fiid wanaagsan'
  },
  howAreYou: {
    en: 'How are you feeling today?',
    sw: 'Unahisi vipi leo?',
    luo: 'Ere kaka iwinjo kawuono?',
    ki: 'Nĩũkũigua atĩa ũmũthĩ?',
    kam: 'Wilewa ata kyau?',
    guz: 'Wairere iga omooyo?',
    kal: 'Maiten chamuren raini?',
    mas: 'Keitonishore aaing?',
    luy: 'Ulola shira luno?',
    mer: 'Uuiga ata umundu?',
    som: 'Sidee dareentahay maanta?'
  },
  healthStatus: {
    en: 'Health Status',
    sw: 'Hali ya Afya',
    luo: 'Kit thieth',
    ki: 'Ũcio wa ũgima',
    kam: 'Kyalo kya ũvyu',
    guz: 'Ebogonsi',
    kal: 'Kunet ne keetiet',
    mas: 'Ilkuarakuan',
    luy: 'Embeera ya obukhafu',
    mer: 'Kithathi kia ughima',
    som: 'Xaalada caafimaadka'
  },
  quickActions: {
    en: 'Quick Actions',
    sw: 'Vitendo vya Haraka',
    luo: 'Tije mapiyo',
    ki: 'Ciĩko cia ihenya',
    kam: 'Maendo manini',
    guz: 'Abanto abamenya',
    kal: 'Tuguk che merur',
    mas: 'Inkishon che mesiringori',
    luy: 'Ebikolwa ebianguvu',
    mer: 'Maruthi ma ihenya',
    som: 'Ficillada degdega ah'
  },
  healthChat: {
    en: 'Health Chat',
    sw: 'Mazungumzo ya Afya',
    luo: 'Wuoyo mar thieth',
    ki: 'Njũgũma ya ũgima',
    kam: 'Mavoko ma ũvyu',
    guz: 'Echakero che omogaka',
    kal: 'Ngatokne keetiet',
    mas: 'Inkutaany oo ilmarisho',
    luy: 'Okhuvolana khu bukhafu',
    mer: 'Mbarania ya ughima',
    som: 'Wada hadlka caafimaadka'
  },
  findClinics: {
    en: 'Find Clinics',
    sw: 'Tafuta Kliniki',
    luo: 'Manyo kliniki',
    ki: 'Retha kiliniki',
    kam: 'Thaka syikliniki',
    guz: 'Sake gekliniki',
    kal: 'Ngeny klinik',
    mas: 'Inkuny enklinik',
    luy: 'Saka ekiliniki',
    mer: 'Retha kirimiti',
    som: 'Raadi cisbitaallo'
  },
  upcomingAppointments: {
    en: 'Upcoming Appointments',
    sw: 'Miadi ijayo',
    luo: 'Tuje ma wuok',
    ki: 'Ciama iria igũũka',
    kam: 'Mithenya mĩkũũka',
    guz: 'Egetuko ge gokoya',
    kal: 'Tuguk che keyie',
    mas: 'Enkutaany enye itaakaa',
    luy: 'Ebikaanilo ebyomulala',
    mer: 'Mathukumo maria makiuka',
    som: 'Ballamaha la rabaa'
  },
  dailyHealthTips: {
    en: 'Daily Health Tips',
    sw: 'Vidokezo vya Afya ya Kila Siku',
    luo: 'Puonj thieth pile pile',
    ki: 'Mataaro ma ũgima o mũthenya',
    kam: 'Maendeezo ma ũvyu ma kila syiku',
    guz: 'Amasaku ge bogonsi ga mongo mongo',
    kal: 'Ngalek ne keetiet ak betutiet',
    mas: 'Inkishon oo ilmarisho oo nkarne',
    luy: 'Amalako ka obukhafu ka tsisiku',
    mer: 'Mataaro ma ughima ma o kira',
    som: 'Talooyinka caafimaadka ee maalinlaha'
  },
  stayHydrated: {
    en: 'Stay Hydrated',
    sw: 'Endelea kunywa maji',
    luo: 'Sik imadho pi',
    ki: 'Nyua maaĩ mahiũ',
    kam: 'Nyuwa maaĩ maingi',
    guz: 'Chabwana amanche',
    kal: 'Nywech peek',
    mas: 'Nyoo entito',
    luy: 'Nywa amaatsi amingi',
    mer: 'Nyua maai maingi',
    som: 'Biyo cab'
  },
  regularExercise: {
    en: 'Regular Exercise',
    sw: 'Mazoezi ya Kawaida',
    luo: 'Tij dend',
    ki: 'Wĩra wa mwĩrĩ',
    kam: 'Wĩla wa mwĩĩlĩ',
    guz: 'Obokano bwe chinyomba',
    kal: 'Ngolong ne bik',
    mas: 'Inkishon oo ilmaasho',
    luy: 'Okukolela khubiri',
    mer: 'Wira wa mwiri',
    som: 'Jimicsi joogto ah'
  },
  healthyDiet: {
    en: 'Healthy Diet',
    sw: 'Mlaji wa Nafuu',
    luo: 'Chiemo maber',
    ki: 'Meciũ marĩa mega',
    kam: 'Kyakulya kinza',
    guz: 'Ebiriamo ebi magani',
    kal: 'Muren che betyo',
    mas: 'Inkishon oo olchoro',
    luy: 'Ebiryo ebi bulungi',
    mer: 'Kyakulia kinoru',
    som: 'Cunto caafimaad leh'
  },
  advancedHealthAnalytics: {
    en: 'Advanced Health Analytics',
    sw: 'Uchanganuzi wa Hali ya Juu wa Afya',
    luo: 'Nono mar thieth malalo',
    ki: 'Athimi ma ũgima ma igũrũ',
    kam: 'Utatũũzi wa kĩthatu wa ũvyu',
    guz: 'Ebetunyanyane ebie bogonsi',
    kal: 'Ngatuny ne keetiet ne kolyot',
    mas: 'Inkishon oo iltunyany oo iwuon',
    luy: 'Okhubiula khwa bukhafu khwa wuulu',
    mer: 'Kethimo kia ughima kia iguru',
    som: 'Falanqaynta caafimaadka oo horumarsan'
  },
  aiRiskAssessment: {
    en: 'AI Risk Assessment',
    sw: 'Tathmini ya Hatari ya AI',
    luo: 'Pim chandruok ma AI',
    ki: 'Gũthima ũgwati wa AI',
    kam: 'Kiuoni kya uvĩĩ wa AI',
    guz: 'Egetunyanyane gee buya bwa AI',
    kal: 'Ngatuny ne khama ne AI',
    mas: 'Inkishon oo iltunyany oo AI',
    luy: 'Okubiula obusigwa bwa AI',
    mer: 'Kethimo kia munyaka wa AI',
    som: 'Qiimaynta khatarta AI'
  },
  lowRisk: {
    en: 'Low Risk',
    sw: 'Hatari Kidogo',
    luo: 'Chandruok matin',
    ki: 'Ũgwati mũnini',
    kam: 'Uvĩĩ mũũmu',
    guz: 'Obuya obunini',
    kal: 'Khama asit',
    mas: 'Enkishon enkenya',
    luy: 'Obusigwa obuto',
    mer: 'Munyaka munini',
    som: 'Khatare yar'
  },
  runAdvancedAnalysis: {
    en: 'Run Advanced Analysis',
    sw: 'Fanya Uchanganuzi wa Hali ya Juu',
    luo: 'Tii nono malalo',
    ki: 'Thii athimi ma igũrũ',
    kam: 'Tuma utatũũzi wa kĩthatu',
    guz: 'Gokora ebetunyanyane ebie kinyene',
    kal: 'Tu ngatuny ne kolyot',
    mas: 'Itururen inkishon oo iwuon',
    luy: 'Kolela okubiula khwa wuulu',
    mer: 'Itumia kethimo kia iguru',
    som: 'Socodsii falanqaynta horumarsan'
  },
  healthTrends: {
    en: 'Health Trends & Insights',
    sw: 'Mienendo na Maarifa ya Afya',
    luo: 'Miler kod ngeyo mar thieth',
    ki: 'Mĩtugo na ũmenyi wa ũgima',
    kam: 'Mituuko na maũũĩ ma ũvyu',
    guz: 'Amabere na amasaku ge bogonsi',
    kal: 'Tugukik ak ngalechu ne keetiet',
    mas: 'Inkiama nabo iltunyany oo ilmarisho',
    luy: 'Embeera namalako ka bukhafu',
    mer: 'Miringi na maarifa ma ughima',
    som: 'Isbeddelka iyo aragtida caafimaadka'
  },
  viewAnalytics: {
    en: 'View Analytics Dashboard',
    sw: 'Ona Dashibodi ya Uchanganuzi',
    luo: 'Ne bao mar nono',
    ki: 'Ona kinya kĩa athimi',
    kam: 'Ona kinya kya utatũũzi',
    guz: 'Eerere riigi rie betunyanyane',
    kal: 'Ngeny komit ne ngatuny',
    mas: 'Ikeny olkiteba oo iltunyany',
    luy: 'Enya libawo lya okubiula',
    mer: 'Ona kinya kia kethimo',
    som: 'Eeg kombayutarka falanqaynta'
  },
  editProfile: {
    en: 'Edit Profile',
    sw: 'Hariri Wasifu',
    luo: 'Loso nonro',
    ki: 'Hindũra mũhiano',
    kam: 'Andĩka kĩvambo',
    guz: 'Andika ekirangasi',
    kal: 'Andich engatuny',
    mas: 'Itubik olparakuony',
    luy: 'Okhubika obukainyu',
    mer: 'Andika kinya',
    som: 'Tafatir astaanta'
  },
  exportData: {
    en: 'Export My Data',
    sw: 'Hamisha Data Yangu',
    luo: 'Gol keta maga',
    ki: 'Uma ũhoro wakwa',
    kam: 'Kĩĩtha makĩĩta makwa',
    guz: 'Gokera amataarifa gaitwa',
    kal: 'Um auti enginyek',
    mas: 'Intoroni auti aing',
    luy: 'Okhukhuunya amabaluwa kange',
    mer: 'Uma makithi makwa',
    som: 'Dhoofinta xogahaygaa'
  },
  appearance: {
    en: 'Appearance',
    sw: 'Mhitimu',
    luo: 'Kit nenore',
    ki: 'Mũhiano',
    kam: 'Kĩvambo',
    guz: 'Ekirangasi',
    kal: 'Ngatuny',
    mas: 'Olparakuony',
    luy: 'Obukainyu',
    mer: 'Kinya',
    som: 'Muuqaalka'
  },
  settings: {
    en: 'Settings',
    sw: 'Mipangilio',
    luo: 'Chenro',
    ki: 'Mĩtũũrire',
    kam: 'Maandĩku',
    guz: 'Amasetto',
    kal: 'Tugukik',
    mas: 'Inkiloriany',
    luy: 'Amakoreria',
    mer: 'Mathondoku',
    som: 'Goobaha'
  },
  languageRegion: {
    en: 'Language & Region',
    sw: 'Lugha na Eneo',
    luo: 'Dhok kod piny',
    ki: 'Rũthiomi na bũrũri',
    kam: 'Lũlimĩ na kĩvuko',
    guz: 'Obololi na egeterano',
    kal: 'Ngalek ak murenik',
    mas: 'Oltuny nabo oltukaa',
    luy: 'Olulimi nechalo',
    mer: 'Rurimi na gitonga',
    som: 'Luqadda iyo gobolka'
  },
  supportLegal: {
    en: 'Support & Legal',
    sw: 'Msaada na Sheria',
    luo: 'Kony kod chike',
    ki: 'Ũteithio na ciira',
    kam: 'Ũteithio na malavu',
    guz: 'Obokoni na amalagoso',
    kal: 'Kochei ak cheplagok',
    mas: 'Ilkokua nabo ilmagoso',
    luy: 'Obuyambi namateeka',
    mer: 'Undeithio na milabu',
    som: 'Taageero iyo sharciga'
  },
  dataManagement: {
    en: 'Data Management',
    sw: 'Usimamizi wa Data',
    luo: 'Rito keta',
    ki: 'Gũtongoria ũhoro',
    kam: 'Kũlongoria makĩĩta',
    guz: 'Oborangiri bwa amataarifa',
    kal: 'Telyanen auti',
    mas: 'Iltunyany oo auti',
    luy: 'Okhubika amabaluwa',
    mer: 'Kutongoria makithi',
    som: 'Maaraynta xogta'
  },
  signOut: {
    en: 'Sign Out',
    sw: 'Toka',
    luo: 'Wuogi',
    ki: 'Uma',
    kam: 'Kĩĩa',
    guz: 'Gokoba',
    kal: 'Kole',
    mas: 'Intorua',
    luy: 'Okhubakha',
    mer: 'Uka',
    som: 'Ka bax'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({} as LanguageContextType);

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) {
        setLanguageState(savedLanguage as Language);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem('language', lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
