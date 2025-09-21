# Technical Challenge

## Overview

This React Native application can be run on both **iOS simulators** and **physical devices**. The app includes dynamic network configuration that automatically adapts to different environments, supporting both local development and physical device testing.

## Decisions and Trade-offs

Due to time constraints, I made the following decisions:

- **MMKV Library:** Implemented an earlier version of MMKV that supports debugging with Chrome, avoiding the need to configure Flipper.
- **Android Testing:** The app was **not** tested on Android devices or simulators.
- **App Icons:** No custom icons were implemented for the app.

### **Additional Features**

- **React Navigation:** Integrated the `react-navigation` library to allow navigation to a notifications screen, where users can view all notifications.
- **MMKV for Offline Support:** Added the `MMKV` library to provide offline support. This allows users to view the latest documents and notifications even when there is no connection to the server or if the device is offline.

- **date-fns Library:** Integrated `date-fns` to handle relative time display for document creation dates, making it easier for users to understand when documents were created.

## Running the Project

### **Requirements**

- macOS with Xcode installed
- Node.js and npm
- React Native CLI installed globally (`npm install -g react-native-cli`)
- Go server for backend functionality

### **Server Setup**

- Important: To run this project successfully, you will need to run a local server that provides the necessary WebSocket and API endpoints.

- The server code is provided as part of the original technical challenge and was not developed by me. You can find it here:

[Local server](https://github.com/DamianIanni/Challange_server)

### **Setup**

1. Install dependencies:

   ```sh
   npm install
   ```

2. **Server Setup:**

   The app requires a Go server running on port 8080. The server configuration depends on your target platform:

   **For iOS Simulator:**

   ```sh
   go run server.go -addr localhost:8080
   ```

   **For Physical Device:**

   ```sh
   go run server.go -addr 0.0.0.0:8080
   ```

   The `-addr 0.0.0.0:8080` flag allows the server to accept connections from any device on your network, which is necessary for physical devices to connect.

3. **Running the App:**

   **Option 1: Single Command (Recommended)**

   ```sh
   npm run ios
   ```

   **Option 2: Separate Commands**

   ```sh
   # Terminal 1 - Start Metro Bundler
   npm start

   # Terminal 2 - Run the app
   npm run ios
   ```

### **Running on Physical Device**

To run the app on a physical iOS device:

1. **Ensure Network Connectivity:**
   - Your iPhone and Mac must be on the same WiFi network
   - Your current network IP is configured as `192.168.0.6` in `src/config/environment.ts`

2. **Start the Server for Physical Device:**
   ```sh
   go run server.go -addr 0.0.0.0:8080
   ```

3. **Run on Physical Device:**
   ```sh
   npm run ios -- --device
   ```

   Or select your device from Xcode and run the project.

4. **Troubleshooting Network Issues:**

   If your IP address changes (different WiFi network), update the `LOCAL_IP` constant in `src/config/environment.ts`:

   ```sh
   # Get your current IP address
   ipconfig getifaddr en0
   ```

   Then update the file:

   ```typescript
   const LOCAL_IP = 'YOUR_NEW_IP_ADDRESS';
   ```

### **Network Configuration**

The app uses dynamic network configuration:

- **iOS Simulator**: Connects to your local IP address
- **Physical Device**: Connects to your local IP address
- **Production**: Ready for production server URLs

The configuration automatically adapts based on the platform and development environment.

## Running Tests

To execute the test, run:

```sh
npm run test:requests
```

## Notes

This project was developed within a limited time frame, prioritizing functionality over additional optimizations and configurations.

### **How the App Works**

Upon mounting, the component makes an API call to fetch documents from the server. If there is already data in local storage, the newly fetched data is concatenated with the existing data. If the storage is empty, the new data is simply added to the storage.

A similar approach is used for notification storage, but with a few additional rules. If the notification array reaches 99 items, the oldest notification is removed whenever a new one is received, and the new notification is added to the array. To manage excessive notifications from the server, a buffer has been implemented, with a time delay to control when notifications are processed.

When a new document is created, it is added to the existing array in local storage. The component’s useEffect dependencies are updated to trigger a re-render, displaying the newly added document. As feedback for the user, a toast notification is shown, displaying the title of the newly added document.
