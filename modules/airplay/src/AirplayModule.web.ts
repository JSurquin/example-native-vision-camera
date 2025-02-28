import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './Airplay.types';

type AirplayModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class AirplayModule extends NativeModule<AirplayModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(AirplayModule);
