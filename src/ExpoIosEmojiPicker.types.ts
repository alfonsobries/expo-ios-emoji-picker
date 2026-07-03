export type EmojiPickerOptions = {
  /**
   * Label for the dismiss button above the keyboard. Defaults to the system
   * Cancel item, which iOS localizes to the device language automatically.
   */
  cancelLabel?: string;
  /** Whether to show the dismiss button above the keyboard. Defaults to true. */
  showCancelButton?: boolean;
  /** Opacity of the dim behind the keyboard, 0–1. Defaults to 0.15. */
  backdropOpacity?: number;
  /** Whether tapping outside the keyboard dismisses the picker. Defaults to true. */
  dismissOnTapOutside?: boolean;
};

export type PickEmojisOptions = EmojiPickerOptions & {
  /** Fires live for each emoji tapped while the keyboard stays open. */
  onPick?: (emoji: string) => void;
  /** Fires when the keyboard's backspace removes the last picked emoji. */
  onDelete?: () => void;
};

export type ExpoIosEmojiPickerModuleEvents = {
  onPick: (event: { emoji: string }) => void;
  onDelete: () => void;
};
