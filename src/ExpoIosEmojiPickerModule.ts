import { NativeModule, requireNativeModule } from 'expo';

import { ExpoIosEmojiPickerModuleEvents } from './ExpoIosEmojiPicker.types';

declare class ExpoIosEmojiPickerModule extends NativeModule<ExpoIosEmojiPickerModuleEvents> {
  setValueAsync(value: string): Promise<void>;
}

export default requireNativeModule<ExpoIosEmojiPickerModule>('ExpoIosEmojiPicker');
