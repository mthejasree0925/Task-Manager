import React from 'react';
import MyButton from '../../components/Button';
import { View } from 'react-native';

export default {
  titleBuuton: 'MyButton',
  component: MyButton,
};

export const Default = () => (
  <View style={{ padding: 16 }}>
    <MyButton title="Click Me" onPress={() => alert('Button pressed!')} />
  </View>
);

export const Loading = () => (
  <View style={{ padding: 16 }}>
    <MyButton title="Loading..." loading onPress={() => {}} />
  </View>
);

export const Disabled = () => (
  <View style={{ padding: 16 }}>
    <MyButton title="Disabled" disabled onPress={() => {}} />
  </View>
);
