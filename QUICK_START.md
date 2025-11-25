# 🔥 Quick Start: Fetching Business Data from Firebase

## ✅ What's Already Done
- ✅ Firebase installed (`npm install firebase`)
- ✅ Firebase configuration created (`config/firebaseConfig.ts`)
- ✅ Business service with all CRUD operations (`services/businessService.ts`)
- ✅ Custom React hooks for easy data fetching (`hooks/useBusinesses.ts`)
- ✅ Example component showing businesses (`components/BusinessList.tsx`)

---

## 🚀 Quick Start (3 Steps)

### Step 1: Update Your Firestore Collection Name

Open `services/businessService.ts` and update line 23 to match your collection name:

```typescript
const BUSINESS_COLLECTION = 'businesses'; // ← Change this to your collection name
```

### Step 2: Use in Any Component

```tsx
import { useBusinesses } from '@/hooks/useBusinesses';

export default function MyScreen() {
  const { businesses, loading, error } = useBusinesses();
  
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;
  
  return (
    <FlatList
      data={businesses}
      renderItem={({ item }) => <Text>{item.name}</Text>}
      keyExtractor={(item) => item.id}
    />
  );
}
```

### Step 3: That's it! 🎉

Your app is now fetching business data from Firebase Firestore!

---

## 📱 Quick Examples

### Fetch All Businesses
```tsx
import { useBusinesses } from '@/hooks/useBusinesses';
const { businesses, loading, error } = useBusinesses();
```

### Fetch Single Business
```tsx
import { useBusiness } from '@/hooks/useBusinesses';
const { business, loading, error } = useBusiness('business-id');
```

### Fetch by Category
```tsx
import { useBusinessesByCategory } from '@/hooks/useBusinesses';
const { businesses, loading, error } = useBusinessesByCategory('restaurant');
```

### Add New Business
```tsx
import { addBusiness } from '@/services/businessService';

const newBusinessId = await addBusiness({
  name: 'Coffee Shop',
  category: 'cafe',
  rating: 4.5
});
```

---

## 🎨 Customize Business Fields

Edit the `Business` interface in `services/businessService.ts`:

```typescript
export interface Business {
  id: string;
  name: string;
  // Add your custom fields here:
  description?: string;
  category?: string;
  address?: string;
  phone?: string;
  rating?: number;
}
```

---

## 📖 Full Documentation

See `FIREBASE_USAGE_GUIDE.md` for complete documentation with all features.

---

## ⚠️ Important Notes

1. **Collection Name**: Update `BUSINESS_COLLECTION` in `services/businessService.ts`
2. **Firestore Rules**: Set up security rules in Firebase Console
3. **Web Config**: If running on web, you may need to add a web app in Firebase Console

---

## 🔧 Troubleshooting

**Error: "Collection not found"**
- Make sure the collection name in `businessService.ts` matches your Firestore collection

**Error: "Permission denied"**
- Check your Firestore security rules in Firebase Console

**No data showing?**
- Verify you have data in your Firestore collection
- Check the console for error messages

---

## 📁 Files Created

- `config/firebaseConfig.ts` - Firebase initialization
- `services/businessService.ts` - All business operations
- `hooks/useBusinesses.ts` - React hooks for easy use
- `components/BusinessList.tsx` - Example component
- `FIREBASE_USAGE_GUIDE.md` - Full documentation

---

## 🎯 Next Steps

1. Update the collection name to match yours
2. Try the example component: `<BusinessList />`
3. Customize the Business interface with your fields
4. Start building your features!

Happy coding! 🚀
