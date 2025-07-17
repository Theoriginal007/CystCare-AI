
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
    som: 'Wax ka horjoogta"'
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
