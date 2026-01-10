# Building Preview APK - Step by Step Guide

## ✅ What I've Done For You

1. ✅ Installed EAS CLI globally
2. ✅ Updated `app.json` with package name (`com.fhindi.palcity`)
3. ✅ Created `eas.json` with build profiles
4. ✅ You're already logged in as `fhindi`

---

## 🚀 Next Steps (You Need to Do These in Terminal)

The build process needs interactive input, so you'll need to run these commands in your terminal:

### Step 1: Open Terminal in Your Project

```bash
cd c:\project\palcity\pal-city
```

### Step 2: Create EAS Project (One-Time Setup)

```bash
npx eas-cli build:configure
```

When prompted:
- **"Would you like to automatically create an EAS project?"** → Press `Y` (Yes)

This will:
- Create a project on EAS servers
- Link it to your local project
- Add `extra.eas.projectId` to `app.json`

### Step 3: Build Preview APK

```bash
npx eas-cli build --platform android --profile preview
```

You'll be asked:
- **"Generate a new Android Keystore?"** → Press `Y` (Yes)

Then EAS will:
- Upload your code to EAS servers
- Build the APK in the cloud
- Give you a download link (~15-20 minutes)

### Step 4: Download and Install

After the build completes:
1. You'll get a **download link** 
2. Click it to download the APK
3. Transfer APK to your Android phone
4. Install and test!

---

## 📱 Alternative: Use Expo Dashboard

If terminal doesn't work, you can also trigger builds from the web:

1. **Go to**: https://expo.dev/accounts/fhindi/projects/pal-city
2. **Click**: "Create a new build"
3. **Select**: Android, Preview profile
4. **Click**: "Build"

---

## 🎯 Quick Commands Reference

```bash
# Check login status
npx eas-cli whoami

# Configure EAS (one-time)
npx eas-cli build:configure

# Build preview APK
npx eas-cli build --platform android --profile preview

# Check build status
npx eas-cli build:list

# View build details
npx eas-cli build:view <build-id>
```

---

## ⏱️ Build Timeline

```
Upload code: ~2-3 minutes
Build APK: ~10-15 minutes
Total: ~15-20 minutes
```

You'll receive:
- ✅ Progress updates in terminal
- ✅ Email when build completes
- ✅ Download link for APK

---

## 🔧 Troubleshooting

### "eas: command not found"
```bash
npm install -g eas-cli
```

### "Not logged in"
```bash
npx eas-cli login
# Username: fhindi
# Password: [your password]
```

### "Project not configured"
```bash
npx eas-cli build:configure
```

### Build failed
- Check your Firebase config
- Make sure all dependencies are installed
- Try: `npm install` and build again

---

## 📊 What Builds Look Like

### Preview Build (APK)
- **File**: `pal-city-preview.apk`
- **Size**: ~50-100 MB
- **Use**: Testing, sharing with team
- **Install**: Side-load on any Android phone

### Production Build
- **File**: `pal-city-production.aab`
- **Size**: ~30-60 MB
- **Use**: Google Play Store
- **Install**: Only through Play Store

---

## 💡 After Your First Build

Once you have the APK:

### Share with Testers
1. Upload APK to Google Drive, Dropbox, etc.
2. Share the link
3. They download and install

### Install on Your Phone
1. Enable "Install from Unknown Sources"
2. Download APK to phone
3. Tap to install
4. Open and test!

### Make Updates
```bash
# Make your code changes
# Then build again
npx eas-cli build --platform android --profile preview
```

---

## 🌐 Monitor Builds

Web Dashboard: https://expo.dev/accounts/fhindi/projects/pal-city/builds

You can:
- ✅ View all builds
- ✅ Download APKs
- ✅ Check build logs
- ✅ Cancel builds
- ✅ Trigger new builds

---

## 🎉 Next Steps After Preview

1. **Test the APK** on your phone
2. **Share with friends** for feedback
3. **Make improvements** based on feedback
4. **Build production** when ready for Play Store

---

## 📞 Need Help?

If you encounter issues:
1. Check the error message
2. Run `npx eas-cli build:view` to see logs
3. Visit: https://docs.expo.dev/build/introduction/

---

Ready to build? Open your terminal and run:

```bash
cd c:\project\palcity\pal-city
npx eas-cli build --platform android --profile preview
```

🚀 Good luck!
