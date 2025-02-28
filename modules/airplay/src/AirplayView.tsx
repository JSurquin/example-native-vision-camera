import { requireNativeView } from 'expo';
import * as React from 'react';

import { AirplayViewProps } from './Airplay.types';

const NativeView: React.ComponentType<AirplayViewProps> =
  requireNativeView('Airplay');

export default function AirplayView(props: AirplayViewProps) {
  return <NativeView {...props} />;
}
