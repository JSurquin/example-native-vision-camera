import { NativeModule, requireNativeModule } from 'expo';

import { AirplayModuleEvents } from './Airplay.types';

declare class AirplayModule extends NativeModule<AirplayModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<AirplayModule>('Airplay');
