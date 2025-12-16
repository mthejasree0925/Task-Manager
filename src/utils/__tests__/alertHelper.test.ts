import { Platform, Alert } from 'react-native';
import { showAlert } from '../alertHelper';

jest.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
  },
  Alert: {
    alert: jest.fn(),
  },
}));

describe('alertHelper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.window as any) = {
      alert: jest.fn(),
      confirm: jest.fn(),
    };
  });

  describe('showAlert', () => {
    it('should call Alert.alert on iOS', () => {
      (Platform.OS as any) = 'ios';
      showAlert('Test Title', 'Test Message');

      expect(Alert.alert).toHaveBeenCalledWith('Test Title', 'Test Message', undefined);
    });

    it('should call Alert.alert with buttons on iOS', () => {
      (Platform.OS as any) = 'ios';
      const buttons = [
        { text: 'Cancel', style: 'cancel' as const },
        { text: 'OK', onPress: jest.fn() },
      ];

      showAlert('Test Title', 'Test Message', buttons);

      expect(Alert.alert).toHaveBeenCalledWith('Test Title', 'Test Message', buttons);
    });

    it('should use window.alert on web', () => {
      (Platform.OS as any) = 'web';
      showAlert('Test Title', 'Test Message');

      expect((global.window as any).alert).toHaveBeenCalledWith('Test Title\n\nTest Message');
    });

    it('should use window.confirm on web with multiple buttons', () => {
      (Platform.OS as any) = 'web';
      const confirmButton = { text: 'OK', onPress: jest.fn(), style: 'destructive' as const };
      const cancelButton = { text: 'Cancel', style: 'cancel' as const, onPress: jest.fn() };
      (global.window as any).confirm.mockReturnValue(true);

      showAlert('Test Title', 'Test Message', [cancelButton, confirmButton]);

      expect((global.window as any).confirm).toHaveBeenCalledWith('Test Title\n\nTest Message');
      expect(confirmButton.onPress).toHaveBeenCalled();
    });

    it('should call cancel button on web when confirm returns false', () => {
      (Platform.OS as any) = 'web';
      const confirmButton = { text: 'OK', onPress: jest.fn(), style: 'destructive' as const };
      const cancelButton = { text: 'Cancel', style: 'cancel' as const, onPress: jest.fn() };
      (global.window as any).confirm.mockReturnValue(false);

      showAlert('Test Title', 'Test Message', [cancelButton, confirmButton]);

      expect(cancelButton.onPress).toHaveBeenCalled();
      expect(confirmButton.onPress).not.toHaveBeenCalled();
    });
  });
});

