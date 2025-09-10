# Coaching_Guru

A cross-platform Learning Management App built with React Native & Expo — featuring interactive courses, chapter tracking, and real-time progress.


## 🚀 Features

- **User Authentication**: Secure sign-up and sign-in with Firebase Authentication
- **Course Management**: Create, view, and manage educational courses
- **Chapter System**: Organize course content into manageable chapters with completion tracking
- **Progress Tracking**: Monitor learning progress and completed chapters across all courses
- **Cross-Platform Support**: Works seamlessly on Android, iOS, and Web platforms
- **Real-time Data**: Firebase Firestore integration for real-time course updates
- **Responsive Design**: Optimized UI for both mobile and web experiences

## 🛠️ Tech Stack

- **Frontend**: React Native with Expo Router
- **Backend**: Firebase (Authentication & Firestore Database)
- **Navigation**: Expo Router with tab-based navigation
- **UI Framework**: React Native components with custom styling
- **Icons**: Expo Vector Icons (Ionicons)
- **State Management**: React Context API
- **Cross-Platform Notifications**: Platform-specific alerts and toasts


## 📁 Project Structure

```
Coaching_Guru/
├── 📱 app/                           # Application screens & routing (Expo Router)
│   ├── 🔐 (auth)/                   # Authentication flow group
│   │   ├── signIn.jsx               # User login screen
│   │   ├── signUp.jsx               # User registration screen
│   │   └── _layout.jsx              # Auth layout wrapper
│   ├── 📊 (tabs)/                   # Main app tab navigation group
│   │   ├── home.jsx                 # Dashboard & course overview
│   │   ├── progress.jsx             # User progress tracking
│   │   ├── profile.jsx              # User profile management
│   │   └── _layout.jsx              # Tab navigation configuration
│   ├── 📚 courseView/               # Course management screens
│   │   ├── [courseId].jsx           # Dynamic course detail pages
│   │   └── index.jsx                # Course listing screen
│   ├── 📄 chapterView/              # Chapter content screens
│   │   ├── [chapterId].jsx          # Individual chapter viewer
│   │   └── index.jsx                # Chapter navigation
│   ├── 🔧 create-course/            # Course creation flow
│   │   ├── index.jsx                # Course creation form
│   │   └── chapters.jsx             # Chapter management
│   ├── 💳 subscriptionWall/         # Subscription & payment
│   │   └── index.jsx                # Subscription plans
│   ├── _layout.jsx                  # Root layout configuration
│   └── index.jsx                    # App entry point
├── 🧩 components/                   # Reusable UI components
│   ├── CourseView/                  # Course-specific components
│   │   ├── Chapters.jsx             # Chapter listing with progress
│   │   ├── CourseHeader.jsx         # Course information header
│   │   └── VideoPlayer.jsx          # Video content player
│   ├── Shared/                      # Global shared components
│   │   ├── CourseProgressCard.jsx   # Course progress display card
│   │   ├── LoadingSpinner.jsx       # Loading indicator
│   │   ├── CustomButton.jsx         # Reusable button component
│   │   └── EmptyState.jsx           # Empty state placeholder
│   └── Forms/                       # Form-related components
│       ├── InputField.jsx           # Custom text input
│       └── FormValidation.jsx       # Form validation helpers
├── ⚙️ config/                       # Configuration files
│   ├── firebaseConfig.js            # Firebase initialization & setup
│   └── appConfig.js                 # App-wide configuration constants
├── 🎨 constant/                     # Design system & constants
│   ├── Colors.js                    # App color palette
│   ├── Fonts.js                     # Typography definitions
│   ├── Dimensions.js                # Screen size constants
│   └── Styles.js                    # Global style definitions
├── 🔄 context/                      # React Context providers
│   ├── UserDetailContext.js         # User authentication & profile state
│   ├── CourseContext.js             # Course data management
│   └── ThemeContext.js              # App theme & appearance
├── 🛠️ services/                     # External service integrations
│   ├── firebaseService.js           # Firebase database operations
│   ├── authService.js               # Authentication service
│   └── storageService.js            # File upload & storage
├── 🔧 utils/                        # Utility functions & helpers
│   ├── validation.js                # Input validation functions
│   ├── formatters.js                # Data formatting utilities
│   └── permissions.js               # Device permissions handling
├── 🖼️ assets/                       # Static resources
│   ├── images/                      # App imagery & icons
│   │   ├── logo.png                 # App logo
│   │   ├── wave.png                 # Background graphics
│   │   └── icons/                   # Custom icon set
│   ├── fonts/                       # Custom font files
│   │   ├── outfit-regular.ttf       # Regular font weight
│   │   └── outfit-bold.ttf          # Bold font weight
│   └── videos/                      # Sample video content
├── 📝 docs/                         # Project documentation
│   ├── API.md                       # API documentation
│   ├── CONTRIBUTING.md              # Contribution guidelines
│   └── DEPLOYMENT.md                # Deployment instructions
├── 🧪 __tests__/                    # Test files
│   ├── components/                  # Component tests
│   ├── services/                    # Service tests
│   └── utils/                       # Utility function tests
├── 📦 package.json                  # Project dependencies & scripts
├── 🔧 app.json                      # Expo app configuration
├── 🎯 expo.json                     # Expo project settings
├── 🔒 .env                          # Environment variables (not in repo)
├── 🚫 .gitignore                    # Git ignore rules
├── 📄 LICENSE                       # Project license
└── 📖 README.md                     # Project documentation
```

### Key Directory Explanations

#### 📱 **App Directory (`/app`)**
Uses Expo Router's file-based routing system:
- **(auth)**: Authentication screens grouped together
- **(tabs)**: Main app navigation with tab layout
- **[dynamic]**: Dynamic routes for course/chapter IDs
- **_layout.jsx**: Layout components for route groups

#### 🧩 **Components Directory (`/components`)**
Organized by feature and reusability:
- **CourseView/**: Components specific to course functionality
- **Shared/**: Reusable components across the app
- **Forms/**: Form-related UI components

#### ⚙️ **Config Directory (`/config`)**
Centralized configuration management:
- Firebase setup and initialization
- App-wide constants and settings

#### 🔄 **Context Directory (`/context`)**
React Context for global state management:
- User authentication and profile data
- Course and progress information
- App theme and preferences

#### 🛠️ **Services Directory (`/services`)**
External API and service integrations:
- Firebase database operations
- Authentication management
- File storage and retrieval

#### 🔧 **Utils Directory (`/utils`)**
Helper functions and utilities:
- Data validation and formatting
- Device capability checks
- Common utility functions

## 📋 Prerequisites

Before running this project, ensure you have:

- Node.js (v16 or higher)
- npm or yarn package manager
- Expo CLI (`npm install -g @expo/cli`)
- Firebase project with Authentication and Firestore enabled
- Git for version control

## ⚡ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [repository-url]
   cd Coaching_Guru
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Firebase Configuration:**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Add your Firebase configuration to `config/firebaseConfig.js`

4. **Start the development server:**
   ```bash
   npx expo start
   ```

5. **Run on specific platforms:**
   ```bash
   # For web
   npx expo start --web

   # For Android
   npx expo start --android

   # For iOS
   npx expo start --ios
   ```

## 👥 Development Team

We are a collaborative team developing the **Coaching Guru** app to enhance learning through efficient teamwork and continuous improvement.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔧 Development Guidelines

- Follow React Native best practices
- Use TypeScript for type safety (when applicable)
- Maintain consistent code formatting
- Write meaningful commit messages
- Test on multiple platforms before submitting

## 📱 Platform Support

- ✅ **Android**: Full native support
- ✅ **iOS**: Full native support  
- ✅ **Web**: Responsive web application

## 🐛 Known Issues

- Web platform uses Alert dialogs instead of native toasts
- Route navigation requires platform-specific path handling

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, bug reports, or feature requests:
- Create an issue in the repository
- Contact the development team
- Check existing documentation


---

**Built with ❤️ by the Coaching Guru Team**
