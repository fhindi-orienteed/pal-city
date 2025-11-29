/**
 * Firebase Connection Test
 * 
 * This is a simple test script to verify your Firebase connection.
 * Import and call this function in any component to test the connection.
 */

import { BusinessService } from '../services';

/**
 * Test Firebase connection and operations
 */
export const testFirebaseConnection = async () => {
  console.log('🔥 Testing Firebase connection...\n');

  try {
    // Test 1: Fetch all businesses
    console.log('Test 1: Fetching all businesses...');
    const businesses = await BusinessService.getBusinessesList();
    console.log(`✅ Success! Found ${businesses.length} businesses`);

    if (businesses.length > 0) {
      console.log('Sample business:', businesses[0]);
    } else {
      console.log('⚠️ No businesses found in collection. Consider adding test data.');
    }

    console.log('\n---\n');

    // Test 2: Try adding a test business (optional - comment out if you don't want to add data)
    // console.log('Test 2: Adding a test business...');
    // const testBusiness = {
    //   name: 'Test Business - Firebase Connection',
    //   category: 'test',
    //   description: 'This is a test business created to verify Firebase connection',
    //   rating: 5.0,
    // };
    // const newId = await addBusiness(testBusiness);
    // console.log('✅ Test business added with ID:', newId);

    console.log('\n🎉 All tests passed! Firebase is connected and working.\n');

    return {
      success: true,
      businessCount: businesses.length,
      businesses: businesses
    };

  } catch (error: any) {
    console.error('❌ Firebase connection test failed!');
    console.error('Error details:', error.message);

    // Common error diagnostics
    if (error.code === 'permission-denied') {
      console.log('\n💡 Tip: Check your Firestore security rules in Firebase Console');
    } else if (error.code === 'unavailable') {
      console.log('\n💡 Tip: Check your internet connection and Firebase configuration');
    } else if (error.message.includes('apiKey')) {
      console.log('\n💡 Tip: Verify your Firebase config in config/firebaseConfig.ts');
    }

    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Quick test function - use this in your component
 */
export const quickTest = () => {
  console.log('Running quick Firebase test...');
  testFirebaseConnection().then(result => {
    if (result.success) {
      console.log(`✅ Firebase working! ${result.businessCount} businesses found`);
    } else {
      console.log('❌ Firebase test failed:', result.error);
    }
  });
};

/**
 * Example usage in a React component:
 * 
 * import { testFirebaseConnection } from '@/tests/firebaseTest';
 * 
 * function MyComponent() {
 *   useEffect(() => {
 *     testFirebaseConnection();
 *   }, []);
 *   
 *   return <View>...</View>;
 * }
 */

export default testFirebaseConnection;
