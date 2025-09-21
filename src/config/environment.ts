import {Platform} from 'react-native';

// Get your local IP address by running: ipconfig getifaddr en0 (macOS) or ifconfig (Linux)
// Your current local IP address
const LOCAL_IP = '192.168.0.6';

// Determine the base URL based on the platform
const getBaseUrl = (): string => {
  if (__DEV__) {
    // In development mode
    if (Platform.OS === 'ios') {
      // For iOS simulator, localhost works fine
      // For physical device, we need the actual IP
      return `http://${LOCAL_IP}:8080`;
    } else if (Platform.OS === 'android') {
      // For Android emulator, use 10.0.2.2
      // For physical device, use the actual IP
      return `http://${LOCAL_IP}:8080`;
    }
  }

  // For production, use your production server URL
  return 'https://your-production-server.com';
};

const getWebSocketUrl = (): string => {
  if (__DEV__) {
    if (Platform.OS === 'ios') {
      return `ws://${LOCAL_IP}:8080/notifications`;
    } else if (Platform.OS === 'android') {
      return `ws://${LOCAL_IP}:8080/notifications`;
    }
  }

  // For production, use your production WebSocket URL
  return 'wss://your-production-server.com/notifications';
};

export const Config = {
  BASE_URL: getBaseUrl(),
  WEBSOCKET_URL: getWebSocketUrl(),
  LOCAL_IP,
};
