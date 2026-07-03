import { registerWebModule, NativeModule } from 'expo';

import { ExpoIosEmojiPickerModuleEvents } from './ExpoIosEmojiPicker.types';

class ExpoIosEmojiPickerModule extends NativeModule<ExpoIosEmojiPickerModuleEvents> {
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
}

export default registerWebModule(ExpoIosEmojiPickerModule, 'ExpoIosEmojiPickerModule');
