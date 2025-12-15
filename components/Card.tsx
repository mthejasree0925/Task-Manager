import React from 'react';
import { View, StyleSheet } from 'react-native';


// Define a generic type for props
type CardProps<T = unknown> = {
  children: React.ReactNode;
 data?: T; // optional generic prop
};

// Use the generic type parameter on the React.FC
export const Card = <T,>({ children }: CardProps<T>) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: { padding: 10, marginTop: 8,marginRight:2,marginLeft:2,marginBottom:8, borderRadius: 8, backgroundColor: 'white', shadowColor: '#000', shadowOpacity: 0.1}
});

