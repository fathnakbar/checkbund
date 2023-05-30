## Checkbund

This app was created using [`@capacitor/create-app`](https://github.com/ionic-team/create-capacitor-app),
and comes with a very minimal shell for building an app.

### Setup

To setup project, run this command.
```bash
git clone https://github.com/fathnakbar/checkbund.git
cd checkbund
npm install
```

### Build the app

To build the app, build the webapp with vite then run the capacitor command.
```bash
npm run build
npx cap sync
```

After finished syncing, you can open the android folder with android studio.

### Preview components with storybook

To preview components and pages, adjust the stories under the src/storybook folder.
Find out more about storybook on https://storybook.js.org.

To run the preview.
```bash
npm run storybook
```

### Run capacitor commnads

To run the provided example, you can use `npm start` command.

```bash
npm start
```
