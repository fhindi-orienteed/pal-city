# Firebase Business Service - Usage Guide

This guide shows you how to fetch business data from Firebase Firestore in your React Native app.

## 📋 Table of Contents
1. [Setup](#setup)
2. [Basic Usage](#basic-usage)
3. [Using Hooks in Components](#using-hooks-in-components)
4. [Direct Service Calls](#direct-service-calls)
5. [Advanced Queries](#advanced-queries)

---

## 🚀 Setup

### Step 1: Install Dependencies
```bash
npm install firebase
```

### Step 2: Configure Firebase
The Firebase configuration is already set up in `config/firebaseConfig.ts`. Make sure your collection name in `services/businessService.ts` matches your Firestore collection name (default is 'businesses').

---

## 📖 Basic Usage

### Using the Custom Hook (Recommended)

```tsx
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useBusinesses } from '../hooks/useBusinesses';

export default function MyComponent() {
  const { businesses, loading, error } = useBusinesses();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <FlatList
      data={businesses}
      renderItem={({ item }) => (
        <Text>{item.name}</Text>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}
```

---

## 🎯 Using Hooks in Components

### 1. Fetch All Businesses
```tsx
import { useBusinesses } from '../hooks/useBusinesses';

const { businesses, loading, error } = useBusinesses();
```

### 2. Fetch Single Business by ID
```tsx
import { useBusiness } from '../hooks/useBusinesses';

const businessId = 'your-business-id';
const { business, loading, error } = useBusiness(businessId);
```

### 3. Fetch Businesses by Category
```tsx
import { useBusinessesByCategory } from '../hooks/useBusinesses';

const category = 'restaurant';
const { businesses, loading, error } = useBusinessesByCategory(category);
```

---

## 🔧 Direct Service Calls

### Fetch All Businesses
```tsx
import { getAllBusinesses } from '../services/businessService';

const fetchData = async () => {
  try {
    const businesses = await getAllBusinesses();
    console.log('All businesses:', businesses);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Fetch Business by ID
```tsx
import { getBusinessById } from '../services/businessService';

const fetchBusiness = async (id: string) => {
  try {
    const business = await getBusinessById(id);
    console.log('Business:', business);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Add New Business
```tsx
import { addBusiness } from '../services/businessService';

const createBusiness = async () => {
  try {
    const newBusinessId = await addBusiness({
      name: 'My New Business',
      description: 'A great business',
      category: 'restaurant',
      address: '123 Main St',
      rating: 4.5
    });
    console.log('Created business with ID:', newBusinessId);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Update Business
```tsx
import { updateBusiness } from '../services/businessService';

const updateExistingBusiness = async (id: string) => {
  try {
    await updateBusiness(id, {
      name: 'Updated Business Name',
      rating: 4.8
    });
    console.log('Business updated successfully');
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Delete Business
```tsx
import { deleteBusiness } from '../services/businessService';

const removeBusinesss = async (id: string) => {
  try {
    await deleteBusiness(id);
    console.log('Business deleted successfully');
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

## 🔍 Advanced Queries

### Fetch Top-Rated Businesses
```tsx
import { getTopRatedBusinesses } from '../services/businessService';

const fetchTopBusinesses = async () => {
  try {
    const topBusinesses = await getTopRatedBusinesses(5); // Get top 5
    console.log('Top businesses:', topBusinesses);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Search Businesses by Name
```tsx
import { searchBusinessesByName } from '../services/businessService';

const searchBusinesses = async (searchTerm: string) => {
  try {
    const results = await searchBusinessesByName(searchTerm);
    console.log('Search results:', results);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Custom Query with Filters
```tsx
import { getBusinessesByQuery } from '../services/businessService';
import { where, orderBy, limit } from 'firebase/firestore';

const fetchCustomBusinesses = async () => {
  try {
    const businesses = await getBusinessesByQuery([
      where('category', '==', 'restaurant'),
      where('rating', '>=', 4.0),
      orderBy('rating', 'desc'),
      limit(10)
    ]);
    console.log('Filtered businesses:', businesses);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

## 📝 Complete Example Component

```tsx
import React, { useState } from 'react';
import { View, Text, FlatList, Button, TextInput, StyleSheet } from 'react-native';
import { useBusinesses } from '../hooks/useBusinesses';
import { addBusiness, searchBusinessesByName } from '../services/businessService';

export default function BusinessManager() {
  const { businesses, loading, error } = useBusinesses();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    const results = await searchBusinessesByName(searchTerm);
    setSearchResults(results);
  };

  const handleAddBusiness = async () => {
    await addBusiness({
      name: 'New Business',
      category: 'retail',
      rating: 4.0
    });
    // Refresh the list
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search businesses..."
        style={styles.input}
      />
      <Button title="Search" onPress={handleSearch} />
      <Button title="Add Business" onPress={handleAddBusiness} />
      
      <FlatList
        data={searchResults.length > 0 ? searchResults : businesses}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.category}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  item: { padding: 15, borderBottomWidth: 1 },
  name: { fontSize: 18, fontWeight: 'bold' }
});
```

---

## 🎨 Customizing the Business Interface

Update the `Business` interface in `services/businessService.ts` to match your Firestore schema:

```typescript
export interface Business {
  id: string;
  name: string;
  description?: string;
  category?: string;
  // Add your custom fields here
  hours?: string;
  images?: string[];
  ownerName?: string;
  // etc.
}
```

---

## 🔥 Important Notes

1. **Collection Name**: Make sure to update `BUSINESS_COLLECTION` in `services/businessService.ts` to match your Firestore collection name.

2. **Security Rules**: Don't forget to set up proper Firestore security rules in the Firebase Console.

3. **Indexes**: For complex queries (multiple where clauses, orderBy with where), you may need to create indexes in Firestore.

4. **Error Handling**: Always wrap Firebase calls in try-catch blocks and handle errors appropriately.

5. **Real-time Updates**: If you need real-time data, consider using `onSnapshot` instead of `getDocs`.

---

## 🌐 Web Configuration

Note: While you have a `google-services.json` file (for Android), you might also need a web app configuration from Firebase Console if you're running on web. Get it from:
- Firebase Console → Project Settings → General → Your apps → Web app
