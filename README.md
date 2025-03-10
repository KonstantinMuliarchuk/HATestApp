# React Native Rewards App

## Overview

This is a **React Native** application that fetches and displays rewards from an API. Users can collect rewards, and the app includes optimizations for performance and smooth infinite scrolling.

## Technologies Used

- **React Native 0.78** (Community CLI, not Expo)
- **TypeScript**
- **Redux Toolkit** for state management
- **Reselect** for optimized state selection
- **React Navigation** for screen transitions
- **Axios** for API calls
- **Clean Architecture** for maintainability and scalability

## Features & Optimizations

### 🛠️ **State Management**

- **Redux Toolkit** with `createSlice` for handling rewards and collected rewards.
- **Memoized selectors using Reselect** to prevent unnecessary re-renders.

### 🔄 **Efficient Infinite Scrolling**

- Uses **pagination API**: `https://staging.helloagain.at/api/v1/clients/5189/bounties/?limit=5&page={page}`.
- **Redux manages pagination state** (`currentPage`, `hasNextPage`).
- **`fetchNextRewards`** handles pagination inside Redux.
- Prevents redundant API calls when `hasNextPage === false`.

### ⚡ **Performance Optimizations**

- **FlatList with `getItemLayout`**: Enables efficient scrolling.
- **Memoized `RewardItem` component**: Prevents unnecessary re-renders.
- **Lazy fetching with `onEndReached`**: Loads new rewards only when reaching the bottom.
- **ListFooterComponent**: Shows a loading indicator only when fetching new data.

### 🏗 **Clean Architecture Implementation**

The app follows **Clean Architecture**, ensuring:

- **Separation of concerns**: UI, business logic, and data layers are decoupled.
- **Scalability**: Easy to extend and maintain.
- **Testability**: Business logic is isolated for unit testing.

### 🖥️ **Screens**

1. **RewardsScreen** - Displays a list of rewards with a "Collect" button.
2. **CollectedRewardsScreen** - Displays only collected rewards.

## Setup & Installation

1. **Clone the repository**

   ```sh
   git clone <repo-url>
   cd react-native-rewards
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Install React Navigation dependencies**

   ```sh
   npm install @react-navigation/native @react-navigation/native-stack
   npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons
   ```

4. **Start the development server**

   ```sh
   npm start --reset-cache
   ```

5. **Run the app** (for iOS or Android)
   ```sh
   npx react-native run-android  # For Android
   npx react-native run-ios      # For iOS
   ```

## API Endpoint

- Fetches rewards from: `https://staging.helloagain.at/api/v1/clients/5189/bounties/?limit=5&page={page}`

## Future Improvements

- Add filtering and sorting for rewards.
- Implement persistent storage for collected rewards.
- Improve UI design with animations and better styling.

🚀 **This app is fully optimized for performance and scalability!**
