# Google OAuth with Golang (Backend) & React Native (Frontend)

This repository demonstrates a full-stack implementation of **Google OAuth** using:

- ⚙️ **Gin** (Golang) for the backend
- 📱 **React Native** for the frontend

It enables users to sign in with Google securely and integrates both the OAuth flow and user information retrieval.

---

## 🗂 Project Structure
```
google_oauth/
│
├── backend/ # Gin server to handle OAuth token exchange
│ ├── controllers/
│ │ └── oauth_controller.go
│ ├── routes/
│ │ └── router.go
│ ├── utils/
│ │ └── oauth_config.go
│ └── main.go
│
└── frontend/ # React Native app with Google Sign-In
└── src/
├── screens/
│ └── Login.tsx
└── services/
└── authService.ts

```
---

## 🛠 Backend Setup (Gin)

1. Navigate to the backend directory:
   ```bash
   cd backend
2. Run the following command to download dependencies:
   ```bash
   go mod tidy
3. Create a .env file inside the backend root with the following variables:
   ```
   GOOGLE_CLIENT_ID=your-google-oauth-web-client-id
   GOOGLE_CLIENT_SECRET=your-google-oauth-web-client-secret
   GOOGLE_REDIRECT_URL=your-google-redirect-url
4. Run the backend:
   ```bash
   cd backend
   go run main.go

---

## 🛠 Frontend Setup (React Native)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
2. Install project dependencies:
   ```bash
   npm install
   # or if you're using yarn:
   yarn install
3. Create a .env file in the frontend root and add your web client ID:
   ```bash
   WEBCLIENT_ID=your-google-web-client-id
4. Get your SHA1 key for Google authentication:
   ```bash
   cd frontend/android
   keytool -list -v -keystore debug.keystore -alias androiddebugkey -storepass android -keypass android
5. Run the app:
   ```bash
   cd frontend
   npx react-native run-android
   # or for iOS (if using macOS):
   npx react-native run-ios

---

🧪 OAuth Flow Summary

  - User clicks Continue with Google in the React Native app.
  - Google returns an authorization code.
  - The code is sent to the backend (/oauth/token endpoint).
  - Backend exchanges the code for tokens and fetches user info.
  - The user is authenticated successfully.


