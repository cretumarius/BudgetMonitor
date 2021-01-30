import { showMessage, MessageOptions } from 'react-native-flash-message';

export function showError(message: string, description?: string, duration: number = 5000) {
  let options: MessageOptions = {
    message: message,
    type: 'danger',
    icon: 'warning',
    color: 'white',
    backgroundColor: '#E64415',
    floating: true,
    titleStyle: { paddingRight: 5 },
  };
  options = description ? { ...options, description } : options;
  options = duration ? { ...options, duration } : options;
  showMessage(options);
}

export function showSuccess(message: string, description?: string, duration: number = 5000) {
  let options: MessageOptions = {
    message: message,
    type: 'success',
    icon: 'success',
    color: 'white',
    floating: true,
  };
  options = description ? { ...options, description } : options;
  options = duration ? { ...options, duration } : options;
  showMessage(options);
}
