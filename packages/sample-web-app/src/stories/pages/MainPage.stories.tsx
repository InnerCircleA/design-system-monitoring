
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MainPage from '../../routes/MainPage';

import trackingData from './../../../tracking.json'

export default {
  title: 'Pages/MainPage',
  component: MainPage,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof MainPage>;

const Template: ComponentStory<typeof MainPage> = (args) => <MainPage {...args} />;

export const MainPageView = Template.bind({});

const [data] = trackingData.filter(page => page.path === "MainPage.tsx")

MainPageView.args = {
  ...data.components
    };

  