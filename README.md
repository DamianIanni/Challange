# Technical Challenge

## Overview

This technical challenge was developed to be executed on an **iOS simulator**, not a physical device. This decision was made due to issues connecting to the local WebSocket server when using a physical device. Given the limited time available for this challenge, I opted for the simulator to ensure a smooth development process.

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
- Node.js and Yarn (or npm)
- React Native CLI installed globally (`npm install -g react-native-cli`)

### **Server Setup**

- Important: To run this project successfully, you will need to run a local server that provides the necessary WebSocket and API endpoints.

- The server code is provided as part of the original technical challenge and was not developed by me. You can find it here:

[Local server](https://github.com/DamianIanni/Challange_server)

### **Setup**

1. Install dependencies:

   ```sh
   yarn install
   ```

   or

   ```sh
   npm install
   ```

2. Start the Metro Bundler:

   ```sh
   yarn start
   ```

   or

   ```sh
   npm run start
   ```

3. Run the iOS simulator:
   ```sh
   npm run ios
   ```
   or
   ```sh
   npx react-native run-ios
   ```

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
