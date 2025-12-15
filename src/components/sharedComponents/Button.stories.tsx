import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from './Button';
import type { Meta, StoryObj } from '@storybook/react-native';
import { StorybookProviders } from '../StorybookProviders';

// Create a wrapper component that provides all necessary contexts
const ButtonWithProviders = (props: any) => (
  <StorybookProviders>
    <Button {...props} />
  </StorybookProviders>
);

const meta: Meta<typeof ButtonWithProviders> = {
  title: 'Components/Button',
  component: ButtonWithProviders,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    onPress: { action: 'pressed' },
  },
  decorators: [
    (Story) => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ButtonWithProviders>;

export const Primary: Story = {
  args: {
    title: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    title: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled Button',
    disabled: true,
  },
};

export const PrimaryDisabled: Story = {
  args: {
    title: 'Primary Disabled',
    variant: 'primary',
    disabled: true,
  },
};

export const LongText: Story = {
  args: {
    title: 'Button with very long text that might wrap',
    variant: 'primary',
  },
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: '100%',
  },
});