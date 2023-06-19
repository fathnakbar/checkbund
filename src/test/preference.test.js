import { Preferences } from "@capacitor/preferences";


console.log(await Preferences.get({
    key: "session"
}))