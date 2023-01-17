import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DetailPage from '../../routes/DetailPage';
import trackingData from './../../../tracking.json'

export default {
  title: 'Pages/DetailPage',
  component: DetailPage,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof DetailPage>;


const Template: ComponentStory<typeof DetailPage> = (args) => <DetailPage {...args} />;

export const DetailPageView = Template.bind({});

const [data] = trackingData.filter(page => page.path === "DetailPage.tsx")

DetailPageView.args = {
  ...data.components
};