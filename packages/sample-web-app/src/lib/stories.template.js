const fs = require('fs');

const content = (pagename) => {
  return `
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ${pagename} from '../../routes/${pagename}';

import trackingData from './../../../tracking.json'

export default {
  title: 'Pages/${pagename}',
  component: ${pagename},
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ${pagename}>;

const Template: ComponentStory<typeof ${pagename}> = (args) => <${pagename} {...args} />;

export const ${pagename}View = Template.bind({});

const [data] = trackingData.filter(page => page.path === "${pagename}.tsx")

${pagename}View.args = {
  ...data.components
    };

  `
}

const generate = (pagename) => {
  const generateTargetDirectory = `${__dirname}/../stories/pages/`
  if (!fs.existsSync(generateTargetDirectory)) {
    fs.mkdirSync(generateTargetDirectory, { recursive: true });
  }
  const file = fs.writeFileSync(`${__dirname}/../stories/pages/${pagename}.stories.tsx`, content(pagename))
  console.log(`Done generating ${pagename}.stories.tsx`)
}

module.exports = {
  generate
};

