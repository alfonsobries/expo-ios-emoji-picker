# expo-ios-emoji-picker

[![npm version](https://img.shields.io/npm/v/expo-ios-emoji-picker.svg)](https://www.npmjs.com/package/expo-ios-emoji-picker)
[![CI](https://github.com/alfonsobries/expo-ios-emoji-picker/actions/workflows/ci.yml/badge.svg)](https://github.com/alfonsobries/expo-ios-emoji-picker/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/expo-ios-emoji-picker.svg)](./LICENSE)

Native iOS emoji picker for Expo and React Native. Opens the **system emoji keyboard** — the emoji-only panel Apple's Reminders uses, with Apple's own search and skin-tone selector — from any trigger, and resolves with the picked emoji.

- 🍎 **Real native keyboard** — Apple's emoji panel, not a JS re-implementation. Search, skin tones, and new emoji land with each iOS release, for free.
- 🌎 **Localized by default** — the keyboard, its search, and the dismiss button follow the device language automatically.
- 🎯 **Headless** — trigger it from any button, tile, or gesture; there's no UI to style.
- ⌨️ **Keyboard mode** — keep it open and stream picks live, backspace included.
- 🪶 **Zero dependencies.**

## Requirements

- iOS 16+
- Expo SDK 52+ with a [development build](https://docs.expo.dev/develop/development-builds/introduction/) or a bare React Native app with Expo Modules — this package includes native code, so it does **not** run in Expo Go.

On Android and web the helpers resolve `null` / `[]` so cross-platform code doesn't need guards.

## Installation

```sh
npx expo install expo-ios-emoji-picker
```

Then rebuild your development build (`npx expo run:ios` or an EAS build). If you manage OTA updates with a fixed `runtimeVersion`, adding this package is a native change — bump it.

## Usage

### Pick a single emoji

```tsx
import { pickEmoji } from 'expo-ios-emoji-picker';

const emoji = await pickEmoji();
if (emoji) {
  console.log(emoji); // "🦖" — null when dismissed without picking
}
```

### Keyboard mode — pick many in one session

The keyboard stays open: every tap streams through `onPick`, the keyboard's backspace fires `onDelete`, and dismissing it resolves with everything picked.

```tsx
import { pickEmojis } from 'expo-ios-emoji-picker';

const all = await pickEmojis({
  cancelLabel: 'Done',
  onPick: (emoji) => addReaction(emoji),
  onDelete: () => removeLastReaction(),
});
```

### Options

Both functions accept the same presentation options:

```tsx
await pickEmoji({
  cancelLabel: 'Close', // custom dismiss label (default: system Cancel, auto-localized)
  showCancelButton: true, // hide the dismiss button entirely with false
  backdropOpacity: 0.15, // dim behind the keyboard, 0–1
  dismissOnTapOutside: true, // tap on the dim cancels
});
```

## API

### `pickEmoji(options?): Promise<string | null>`

Opens the emoji keyboard and resolves with the tapped emoji, or `null` when dismissed without picking (Cancel, tap outside, or swipe).

### `pickEmojis(options?): Promise<string[]>`

Opens the emoji keyboard in keyboard mode and resolves with every picked emoji once dismissed. Accepts two extra callbacks:

| Option     | Type                      | Description                                              |
| ---------- | ------------------------- | -------------------------------------------------------- |
| `onPick`   | `(emoji: string) => void` | Fires live for each tap while the keyboard stays open.   |
| `onDelete` | `() => void`              | Fires when the keyboard's backspace removes the last pick. |

### `EmojiPickerOptions`

| Option                | Type      | Default            | Description                                                            |
| --------------------- | --------- | ------------------ | ---------------------------------------------------------------------- |
| `cancelLabel`         | `string`  | system Cancel item | Dismiss button label. The default is localized by iOS automatically.   |
| `showCancelButton`    | `boolean` | `true`             | Show the dismiss button above the keyboard.                            |
| `backdropOpacity`     | `number`  | `0.15`             | Opacity of the dim behind the keyboard, `0`–`1`.                       |
| `dismissOnTapOutside` | `boolean` | `true`             | Whether tapping the dim dismisses the picker.                          |

Skin tones (long-press) and ZWJ sequences (e.g. 👨‍👩‍👧‍👦) arrive as a single string.

## How it works

The module briefly attaches a hidden text field pinned to `UIKeyboardType(rawValue: 124)` — the undocumented emoji-only keyboard Apple uses in Reminders — and captures the input through the text field delegate. No text is ever inserted anywhere; the field exists only to summon the keyboard.

Because the keyboard type is undocumented, a future iOS release could change it; the field falls back to the default keyboard in that case rather than crashing.

## Example

The [`example`](./example) app demonstrates single pick, keyboard mode, and the presentation options:

```sh
cd example
npx expo run:ios
```

## Contributing

Issues and PRs are welcome. Commits follow [Conventional Commits](https://www.conventionalcommits.org) — releases and the changelog are generated from them.

```sh
npm install
npm run lint
npm test
npm run build
```

## License

[MIT](./LICENSE) © [Alfonso Bribiesca](https://alfonsobries.com)
