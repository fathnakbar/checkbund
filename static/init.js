import { App } from '@capacitor/app';
import { PREFERENCE_KEYS } from "../src/lib/client"
import { Preferences } from '@capacitor/preferences';

// App.addListener('appStateChange', ({ isActive }) => {
//   console.log('App state changed. Is active?', isActive);
// });

App.addListener('appUrlOpen', async (data) => {

    // Redirect url to /confirmed to post user_data
  const {value} = await Preferences.get({
    key: PREFERENCE_KEYS.HAS_SIGNUP
  });

  if (value) {
    goto("/confirmed")
  }
});

// App.addListener('appRestoredResult', data => {
//   console.log('Restored state:', data);
// });

// const checkAppLaunchUrl = async () => {
//   const { url } = await App.getLaunchUrl();

//   console.log('App opened with URL: ' + url);
// };