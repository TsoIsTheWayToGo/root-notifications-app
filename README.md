# Root React Native Notifications Take Home 

A modern notification system built with React Native that simulates real-time chat notifications. The application demonstrates efficient state management, optimized performance, and a clean, intuitive user interface.

## Features
- 🌓 Dark/Light theme with animated toggle
- 📱 Real-time notification generation
- 🔍 Filter notifications by type
- 💾 Persistent storage with AsyncStorage
- ⚡ Optimized performance with React.memo
- 📐 Responsive design for various screen sizes
- 👆 Gesture support for intuitive interaction
- 🔔 Multiple notification types:
  - 📣 Mentions with channel tags
  - 👥 Friend requests
  - 🌐 Community invites
  - 🏆 Achievements
- ✅ Mark notifications as read (individual and bulk)
- 📅 Grouped notifications by date

<div>
    <a href="https://www.loom.com/share/3ec035e5d8e848d286bd905183af08db">
      <p>UI Implementation of React Native Notifications feed 📱 - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/3ec035e5d8e848d286bd905183af08db">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/3ec035e5d8e848d286bd905183af08db-7a3ae922ae1e2bd9-full-play.gif">
    </a>
  </div>

## Technical Implementation

- Context API for state management
- Memoized components for optimal performance
- Efficient list rendering with FlatList
- Limit of 100 notifications for memory management
- Automated notification generation (15-second intervals)
- Persistent theme and notification storage

## Project Structure
The code structure organizes the project files into logical directories based on their purpose, promoting code reusability, maintainability, and ease of navigation.



```bash
src/
├── components/
│   ├── notifications/
│   │   ├── NotificationContent.js
│   │   ├── NotificationFilter.js
│   │   ├── NotificationIcon.js
│   │   ├── NotificationItem.js
│   │   └── NotificationModal.js
│   └── theme/
│       └── ThemeToggle.js
├── constants/
│   └── colors.js
├── context/
│   ├── NotificationContext.js
│   └── ThemeContext.js
├── screens/
│   └── NotificationScreen.js
└── utils/
    └── mockDataGenerator.js
```
## Prerequisites

- [Node.js](https://nodejs.org/) installed on your computer
- [Expo CLI](https://docs.expo.io/workflow/expo-cli/) installed globally (`npm install -g expo-cli`)
- iOS or Android device or simulator

## Getting Started

1. In Terminal, Clone the repository:
```
$ git clone https://github.com/TsoIsTheWayToGo/root-notifications-app.git
```
2. Navigate to the project directory:
```
$ cd root-notifications-app
```
3. Navigate to the project directory:
```
$ npm install
```
4. Start the Expo development server:
```
$ npx expo start
```
## Running on a Mobile Device Simulator

To run the app on a mobile device simulator:

- For iOS:
- Start the iPhone simulator on your computer
- In the terminal, press `i` to run the app on the iPhone simulator

- For Android:
- Start the Android simulator on your computer
- In the terminal, press `a` to run the app on the Android simulator

## Running on a Physical Device

To run the app on your physical device:

1. Download the Expo Go app:
- For iOS: [Download from the App Store](https://apps.apple.com/us/app/expo-go/id982107779)
- For Android: [Download from the Google Play Store](https://play.google.com/store/search?q=expo+go&c=apps&hl=en_US)

2. Open the Expo Go app on your device.

3. Scan the QR code displayed in the terminal using your device's camera.

4. The app should start running on your device.
## Tech Stack

- React Native
- Expo
- AsyncStorage
- React Navigation
- date-fns
- React Context API

## Troubleshooting

If you encounter any issues, make sure you have followed the steps correctly and have the necessary prerequisites installed. If the problem persists, please refer to the [Expo documentation](https://docs.expo.io/) or open an issue in the repository.


