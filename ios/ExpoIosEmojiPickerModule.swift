import ExpoModulesCore

public class ExpoIosEmojiPickerModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoIosEmojiPicker")

    Events("onChange")

    AsyncFunction("setValueAsync") { (value: String) in
      self.sendEvent("onChange", [
        "value": value
      ])
    }
  }
}
