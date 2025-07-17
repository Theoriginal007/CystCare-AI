
// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconSymbolName = 
  | 'house.fill'
  | 'paperplane.fill'
  | 'chevron.left.forwardslash.chevron.right'
  | 'chevron.right'
  | 'chart.line.uptrend.xyaxis'
  | 'pills.fill'
  | 'message.circle.fill'
  | 'person.fill'
  | 'calendar'
  | 'ellipsis';

/**
 * Add your SF Symbols to Material Icons mappings here.
 */
const MAPPING: Record<IconSymbolName, ComponentProps<typeof MaterialIcons>['name']> = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'chart.line.uptrend.xyaxis': 'trending-up',
  'pills.fill': 'medication',
  'message.circle.fill': 'chat',
  'person.fill': 'person',
  'calendar': 'event',
  'ellipsis': 'more-horiz',
};

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
