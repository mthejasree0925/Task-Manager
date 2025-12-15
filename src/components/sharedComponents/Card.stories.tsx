import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from './Card';
import type { Meta, StoryObj } from '@storybook/react-native';
import { StorybookProviders } from '../StorybookProviders';
import { ThemedText } from './ThemedText';
import { Button } from './Button';

// Create a wrapper component that provides all necessary contexts
const CardWithProviders = (props: any) => (
  <StorybookProviders>
    <Card {...props} />
  </StorybookProviders>
);

const meta: Meta<typeof CardWithProviders> = {
  title: 'Components/Card',
  component: CardWithProviders,
  decorators: [
    (Story) => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CardWithProviders>;

export const Default: Story = {
  render: (args) => (
    <CardWithProviders {...args}>
      <ThemedText size="lg" weight="semibold">
        Default Card
      </ThemedText>
      <ThemedText variant="secondary">
        This is a basic card component with default styling.
      </ThemedText>
    </CardWithProviders>
  ),
};

export const WithButtons: Story = {
  render: (args) => (
    <CardWithProviders {...args}>
      <ThemedText size="lg" weight="semibold">
        Card with Actions
      </ThemedText>
      <ThemedText variant="secondary">
        This card contains interactive elements like buttons.
      </ThemedText>
      <View style={styles.buttonContainer}>
        <Button
          title="Primary Action"
          onPress={() => console.log('Primary action')}
          variant="primary"
          style={styles.button}
        />
        <Button
          title="Secondary Action"
          onPress={() => console.log('Secondary action')}
          variant="secondary"
          style={styles.button}
        />
      </View>
    </CardWithProviders>
  ),
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  button: {
    flex: 1,
  },
});