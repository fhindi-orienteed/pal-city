# Firebase Business Service - Project Structure

## 📁 Project Structure

```
pal-city/
├── config/
│   └── firebaseConfig.ts          # Firebase initialization & config
│
├── services/
│   └── businessService.ts         # All Firebase business operations
│
├── hooks/
│   └── useBusinesses.ts           # React hooks for business data
│
├── components/
│   └── BusinessList.tsx           # Example component using hooks
│
├── app/
│   └── (tabs)/
│       └── business-example.tsx   # Example screen integration
│
├── google-services.json           # Your Firebase Android config
├── QUICK_START.md                 # Quick reference guide
└── FIREBASE_USAGE_GUIDE.md        # Detailed documentation
```

---

## 🔄 Data Flow

```
Firebase Firestore (Cloud)
        ↓
config/firebaseConfig.ts (Initialize connection)
        ↓
services/businessService.ts (Fetch/Update data)
        ↓
hooks/useBusinesses.ts (React hooks with state management)
        ↓
Your Components (Display data)
```

---

## 🛠️ Available Functions

### From `services/businessService.ts`:
- `getAllBusinesses()` - Get all businesses
- `getBusinessById(id)` - Get single business
- `getBusinessesByQuery(constraints)` - Custom queries
- `getBusinessesByCategory(category)` - Filter by category
- `getTopRatedBusinesses(limit)` - Get top-rated
- `searchBusinessesByName(searchTerm)` - Search by name
- `addBusiness(data)` - Create new business
- `updateBusiness(id, data)` - Update existing
- `deleteBusiness(id)` - Delete business

### From `hooks/useBusinesses.ts`:
- `useBusinesses()` - Hook for all businesses
- `useBusiness(id)` - Hook for single business
- `useBusinessesByCategory(category)` - Hook for category filter

---

## 💡 Usage Patterns

### Pattern 1: Use Hooks (Recommended)
```tsx
import { useBusinesses } from '@/hooks/useBusinesses';

function MyComponent() {
  const { businesses, loading, error } = useBusinesses();
  // Use businesses, loading, error states
}
```

### Pattern 2: Direct Service Calls
```tsx
import { getAllBusinesses } from '@/services/businessService';

async function fetchData() {
  const businesses = await getAllBusinesses();
  // Use businesses
}
```

### Pattern 3: Use Pre-built Component
```tsx
import BusinessList from '@/components/BusinessList';

function MyScreen() {
  return <BusinessList />;
}
```

---

## ⚙️ Configuration Checklist

- [x] Firebase installed via npm
- [x] Firebase config file created
- [x] Business service functions created
- [x] React hooks created
- [x] Example components created
- [ ] Update collection name in businessService.ts
- [ ] Test connection to Firestore
- [ ] Set up Firestore security rules (in Firebase Console)

---

## 🔐 Firebase Console Tasks

To complete the setup, you may need to:

1. **Add a Web App** (if running on web):
   - Go to Firebase Console → Project Settings
   - Under "Your apps", add a Web app
   - Copy the config and update `firebaseConfig.ts`

2. **Set Firestore Rules**:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /businesses/{business} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

3. **Create Your Collection**:
   - Go to Firestore Database in Firebase Console
   - Create a collection named "businesses" (or your preferred name)
   - Add sample documents

---

## 📊 Sample Firestore Document Structure

```json
{
  "name": "Coffee Paradise",
  "description": "Best coffee in town",
  "category": "cafe",
  "address": "123 Main St, City",
  "phone": "+1234567890",
  "email": "info@coffeeparadise.com",
  "website": "https://coffeeparadise.com",
  "imageUrl": "https://example.com/image.jpg",
  "rating": 4.5,
  "createdAt": Timestamp
}
```

---

## 🎨 Customization Guide

### Change Collection Name
Edit `services/businessService.ts`, line 23:
```typescript
const BUSINESS_COLLECTION = 'your-collection-name';
```

### Add Custom Fields
Edit the `Business` interface in `services/businessService.ts`:
```typescript
export interface Business {
  id: string;
  name: string;
  // Your custom fields:
  customField1?: string;
  customField2?: number;
}
```

### Modify Queries
Add new functions in `services/businessService.ts`:
```typescript
export const getBusinessesByCustomField = async (value: string) => {
  return await getBusinessesByQuery([
    where('customField', '==', value)
  ]);
};
```

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Permission denied" | Check Firestore security rules |
| "Collection not found" | Verify collection name matches |
| No data displayed | Check console for errors, verify Firestore has data |
| Type errors | Update Business interface with your fields |
| Web app not working | Add web app config in Firebase Console |

---

## 📚 Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Queries](https://firebase.google.com/docs/firestore/query-data/queries)
- [React Native Firebase](https://rnfirebase.io/)
- [Expo Firebase](https://docs.expo.dev/guides/using-firebase/)

---

## ✅ Testing Your Setup

1. **Test Connection**:
   ```tsx
   import { getAllBusinesses } from '@/services/businessService';
   
   const testConnection = async () => {
     try {
       const businesses = await getAllBusinesses();
       console.log('Connected! Businesses:', businesses);
     } catch (error) {
       console.error('Connection failed:', error);
     }
   };
   ```

2. **Test in Component**:
   - Use the `BusinessList` component in any screen
   - Check console for any errors

---

Ready to start fetching business data! 🚀
