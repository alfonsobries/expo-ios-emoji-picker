import { EmojiPickerOptions, PickEmojisOptions } from './ExpoIosEmojiPicker.types';
import ExpoIosEmojiPickerModule from './ExpoIosEmojiPickerModule';

export type { EmojiPickerOptions, PickEmojisOptions } from './ExpoIosEmojiPicker.types';

/**
 * Opens the native iOS emoji keyboard (the emoji-only panel Reminders uses)
 * and resolves with the picked emoji, or null when dismissed without picking.
 * Trigger it from any UI — the picker itself is headless. Resolves null on
 * platforms without the native implementation.
 */
export async function pickEmoji(options: EmojiPickerOptions = {}): Promise<string | null> {
  if (!ExpoIosEmojiPickerModule) {
    return null;
  }
  const result = await ExpoIosEmojiPickerModule.presentAsync(options);
  return typeof result === 'string' ? result : null;
}

/**
 * Keyboard-like multi pick: stays open streaming every tap through `onPick`
 * (backspace triggers `onDelete`), then resolves with all picked emoji once
 * the keyboard is dismissed. Resolves empty on platforms without the native
 * implementation.
 */
export async function pickEmojis(options: PickEmojisOptions = {}): Promise<string[]> {
  const { onPick, onDelete, ...rest } = options;
  if (!ExpoIosEmojiPickerModule) {
    return [];
  }

  const pickSubscription = onPick
    ? ExpoIosEmojiPickerModule.addListener('onPick', (event) => onPick(event.emoji))
    : null;
  const deleteSubscription = onDelete
    ? ExpoIosEmojiPickerModule.addListener('onDelete', onDelete)
    : null;

  try {
    const result = await ExpoIosEmojiPickerModule.presentAsync({ ...rest, multiple: true });
    return Array.isArray(result) ? result : [];
  } finally {
    pickSubscription?.remove();
    deleteSubscription?.remove();
  }
}
