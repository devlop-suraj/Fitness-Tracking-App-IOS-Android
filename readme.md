# Fitness Tracking App

A beautiful and responsive fitness tracking application built with React Native and Expo, featuring daily activity monitoring, weekly statistics, and profile management.

## Features

- 📊 Daily activity tracking (steps, calories, distance)
- 📈 Weekly activity statistics with interactive charts
- 👤 User profile management
- 🎯 Customizable fitness goals
- 🌓 Dark mode support
- 📱 Responsive design for web and mobile

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/) (v9 or newer)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

## Getting Started (Method 1):
"""
✅ 0. Download this package
unzip and open terminal in Root folder

✅ 1. Install Dependencies
Run this in your terminal (in the root directory of the project):  
"npm install"   
This installs all dependencies listed in package.json.

✅ 2. Install Expo CLI (if not installed)
 If you haven't installed it globally:   
 "npm install -g expo-cli"

✅ 3. Start the Project:
   "npx expo start"    
   This will launch the Expo development server. You can then:


  Open it in your browser or it will show qr code in your terminal itself  ->  Scan the QR code in the Expo Go app (Android/iOS). -> Enjoy app


""""""""""""""""""
Method 2 (Pro wala tarika)

1. Clone the repository:
```bash
git clone <repository-url>
cd fitness-tracking-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open the app:
- 🌐 Web: Open [http://localhost:8081](http://localhost:8081) in your browser
- 📱 Mobile: Scan the QR code with the Expo Go app ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## Project Structure

```
fitness-tracking-app/
├── app/                    # Application routes
│   ├── (tabs)/            # Tab-based navigation
│   └── _layout.tsx        # Root layout configuration
├── components/            # Reusable components
├── constants/             # Theme and configuration
├── hooks/                # Custom hooks
└── types/                # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build:web` - Build the web version
- `npm run lint` - Run ESLint

## Technologies Used

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Native Chart Kit](https://github.com/indiespirit/react-native-chart-kit)
- [Lucide Icons](https://lucide.dev/)
