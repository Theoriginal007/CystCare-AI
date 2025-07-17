
import React from 'react';
import { Switch as RNSwitch, SwitchProps } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

interface CustomSwitchProps extends SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export function Switch({ value, onValueChange, ...props }: CustomSwitchProps) {
  const colorScheme = useColorScheme();
  
  return (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ 
        false: colorScheme === 'dark' ? '#374151' : '#d1d5db', 
        true: colorScheme === 'dark' ? '#3b82f6' : '#2563eb' 
      }}
      thumbColor={value ? '#ffffff' : '#ffffff'}
      ios_backgroundColor={colorScheme === 'dark' ? '#374151' : '#d1d5db'}
      {...props}
    />
  );
}
