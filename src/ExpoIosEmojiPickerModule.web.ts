import { registerWebModule, NativeModule } from 'expo';

import { EmojiPickerOptions, ExpoIosEmojiPickerModuleEvents } from './ExpoIosEmojiPicker.types';

// The native emoji keyboard is iOS-only; on web the picker resolves empty.
class ExpoIosEmojiPickerModule extends NativeModule<ExpoIosEmojiPickerModuleEvents> {
  async presentAsync(
    options: EmojiPickerOptions & { multiple?: boolean }
  ): Promise<string | string[] | null> {
    return options.multiple ? [] : null;
  }
}

export default registerWebModule(ExpoIosEmojiPickerModule, 'ExpoIosEmojiPickerModule');
