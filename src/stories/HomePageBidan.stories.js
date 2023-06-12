import Page from "../pages/HomepageBidan.svelte";
import App from "../App.svelte"

export default {
  title: 'Page/Home Page Bidan',
  component: Page,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/svelte/writing-docs/autodocs
  tags: ['autodocs'],
  // decorators: [
  //   (Story) => <App><Story /></App>
  // ],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/svelte/configure/story-layout
    layout: 'fullscreen',
  },
};

export const Default = {}
