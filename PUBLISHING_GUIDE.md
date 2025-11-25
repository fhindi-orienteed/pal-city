# Publishing PalCity to Expo - Complete Guide

## ✅ Current Status
- Logged in as: `fhindi`
- App name: `pal-city`
- Version: `1.0.0`

---

## 📱 Publishing Options

### Option 1: Expo Publish (Quick Preview) 🚀
**Best for**: Sharing with testers, quick previews
**Platform**: Works on Expo Go app
**Time**: ~2 minutes

### Option 2: EAS Build (Production App) 📦
**Best for**: App stores (Google Play, Apple App Store)
**Platform**: Standalone apps (APK, AAB, IPA)
**Time**: ~10-30 minutes

---

## 🚀 Option 1: Expo Publish (Recommended for Testing)

### What You Get
- QR code to scan with Expo Go app
- Shareable link to send to testers
- Instant updates without rebuilding

### Steps

#### 1. Publish Your App
```bash
npx expo publish
```

This will:
- Bundle your JavaScript code
- Upload to Expo servers
- Generate a QR code and link

#### 2. Share with Testers
After publishing, you'll get:
- **QR Code**: Scan with Expo Go app
- **Link**: `exp://exp.host/@fhindi/pal-city`
- **Web**: `https://exp.host/@fhindi/pal-city`

#### 3. Test on Your Phone
1. Install **Expo Go** app:
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
2. Open Expo Go
3. Scan the QR code or enter the URL

---

## 📦 Option 2: EAS Build (Production Builds)

### Prerequisites
Install EAS CLI:
```bash
npm install -g eas-cli
```

### Login to EAS
```bash
eas login
```

### One-Time Setup
Initialize EAS in your project:
```bash
eas build:configure
```

This creates `eas.json` with build configurations.

### Build for Android
```bash
# Development build (for testing)
eas build --platform android --profile development

# Preview build (standalone APK)
eas build --platform android --profile preview

# Production build (for Google Play)
eas build --platform android --profile production
```

### Build for iOS
```bash
# Preview build
eas build --platform ios --profile preview

# Production build (for App Store)
eas build --platform ios --profile production
```

**Note**: iOS builds require Apple Developer account ($99/year)

---

## 🎯 Recommended Workflow

### For Testing (Right Now)
```bash
# Quick publish for testing
npx expo publish
```

### For Internal Testing
```bash
# Build Android APK
eas build --platform android --profile preview
```

### For App Stores
```bash
# Build production versions
eas build --platform android --profile production
eas build --platform ios --profile production
```

---

## 📝 Before Publishing Checklist

### ✅ Update app.json
Make sure these are set:
- [x] `name`: "pal-city" ✓
- [x] `slug`: "pal-city" ✓
- [x] `version`: "1.0.0" ✓
- [ ] `description`: Add app description
- [ ] `privacy`: "public" or "unlisted"

### ✅ Icons & Assets
- [x] App icon ✓
- [x] Splash screen ✓
- [x] Adaptive icon (Android) ✓

### ✅ App Store Info (For Production)
- [ ] Bundle identifier (iOS)
- [ ] Package name (Android)
- [ ] Privacy policy URL
- [ ] App description
- [ ] Screenshots

---

## 🔧 Common Issues & Solutions

### Issue: "Not logged in"
```bash
npx expo login
# Enter username: fhindi
# Enter password: [your password]
```

### Issue: "Build failed"
- Check that all dependencies are installed
- Run `npm install` first
- Clear cache: `npx expo start -c`

### Issue: "Firebase not working on published app"
- Make sure Firebase config is correct
- Check Firestore security rules
- Add your app's domain to Firebase authorized domains

---

## 🌐 After Publishing

### Expo Publish URL Format
```
https://exp.host/@fhindi/pal-city
```

### Share with Testers
Send them:
1. **QR Code** (they scan in Expo Go)
2. **Direct link** (opens in Expo Go)
3. **APK file** (if you built with EAS)

### Update Your App
To push updates:
```bash
# Make your changes
# Then publish again
npx expo publish
```

Users will get the update automatically next time they open the app!

---

## 📊 Publish vs Build Comparison

| Feature | Expo Publish | EAS Build |
|---------|-------------|-----------|
| **Speed** | ~2 minutes | ~10-30 minutes |
| **Requires** | Expo Go app | Standalone app |
| **Updates** | Instant OTA | Need new build |
| **App Stores** | No | Yes |
| **Native Code** | Limited | Full access |
| **Cost** | Free | Free (limited) |

---

## 🎉 Quick Start Commands

### Just want to test?
```bash
npx expo publish
```

### Want an APK to share?
```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile preview
```

### Want to submit to stores?
```bash
eas build --platform android --profile production
eas submit --platform android
```

---

## 💡 Tips

### For Development
- Use `npx expo publish` for quick updates
- Share the QR code with your team
- Update as often as you want

### For Production
- Use EAS Build for app stores
- Test thoroughly before submitting
- Follow platform guidelines

### Updates
- Expo Publish: Instant updates
- EAS Build: Need to publish new build for native changes

---

## 🔗 Useful Links

- **Expo Dashboard**: https://expo.dev/accounts/fhindi/projects/pal-city
- **Expo Go App (iOS)**: https://apps.apple.com/app/expo-go/id982107779
- **Expo Go App (Android)**: https://play.google.com/store/apps/details?id=host.exp.exponent
- **EAS Build Docs**: https://docs.expo.dev/build/introduction/
- **Submit to Stores**: https://docs.expo.dev/submit/introduction/

---

Ready to publish? Let me know which option you'd like to use! 🚀
