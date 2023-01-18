import React from 'react';
import Button from './Button';
import { UsecaseTable } from '../util/UsecaseTable';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'components/button',
  component: Button,
};

const Template = (args: any) => <Button {...args} />;

export const button: ComponentStory<typeof Button> = Template.bind({});

button.args = {
  theme: 'primary',
  children: '확인',
};

button.story = {
  name: 'Default',
};

export const primaryButton: ComponentStory<typeof Button> = () => (
  <Button theme="primary">확인</Button>
);

export const secondaryButton: ComponentStory<typeof Button> = () => (
  <Button theme="secondary">확인</Button>
);

export const usecase = () => {
  return <UsecaseTable componentName={Button.name} />;
};
