// utils/alertHelper.ts
import { Platform, Alert } from 'react-native';

interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

export const showAlert = (
  title: string,
  message?: string,
  buttons?: AlertButton[]
) => {
  if (Platform.OS === 'web') {
    // Simulate confirm/cancel dialogs on web
    if (buttons && buttons.length > 1) {
      const confirmButton = buttons.find(b => b.style === 'destructive' || b.text.toLowerCase().includes('ok') || b.text.toLowerCase().includes('sign out'));
      const cancelButton = buttons.find(b => b.style === 'cancel');
      const result = window.confirm(`${title}\n\n${message ?? ''}`);

      if (result) confirmButton?.onPress?.();
      else cancelButton?.onPress?.();
    } else {
      window.alert(`${title}\n\n${message ?? ''}`);
      buttons?.[0]?.onPress?.();
    }
  } else {
    Alert.alert(title, message, buttons);
  }
};
