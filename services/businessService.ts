import { Business } from '@/types/interface';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryConstraint,
  where
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

// Collection name - change this to match your Firestore collection name
const BUSINESS_COLLECTION = 'businesses';

/**
 * Fetch all businesses from Firestore
 */
export const getAllBusinesses = async (): Promise<Business[]> => {
  try {
    const businessCollection = collection(db, BUSINESS_COLLECTION);
    const businessSnapshot = await getDocs(businessCollection);
    const businessList = businessSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Business[];

    return businessList;
  } catch (error) {
    console.error('Error fetching businesses:', error);
    throw error;
  }
};

/**
 * Fetch a single business by ID
 */
export const getBusinessById = async (businessId: string): Promise<Business | null> => {
  try {
    const businessDoc = doc(db, BUSINESS_COLLECTION, businessId);
    const businessSnapshot = await getDoc(businessDoc);

    if (businessSnapshot.exists()) {
      return {
        id: businessSnapshot.id,
        ...businessSnapshot.data()
      } as Business;
    } else {
      console.log('No such business found!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching business:', error);
    throw error;
  }
};

/**
 * Fetch businesses with filters
 * Example: getBusinessesByQuery([where('category', '==', 'restaurant')])
 */
export const getBusinessesByQuery = async (
  constraints: QueryConstraint[]
): Promise<Business[]> => {
  try {
    const businessCollection = collection(db, BUSINESS_COLLECTION);
    const q = query(businessCollection, ...constraints);
    const businessSnapshot = await getDocs(q);

    const businessList = businessSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Business[];

    return businessList;
  } catch (error) {
    console.error('Error fetching filtered businesses:', error);
    throw error;
  }
};

/**
 * Fetch businesses by category
 */
export const getBusinessesByCategory = async (category: string): Promise<Business[]> => {
  try {
    return await getBusinessesByQuery([
      where('category', '==', category)
    ]);
  } catch (error) {
    console.error('Error fetching businesses by category:', error);
    throw error;
  }
};

/**
 * Fetch top-rated businesses
 */
export const getTopRatedBusinesses = async (limitCount: number = 10): Promise<Business[]> => {
  try {
    return await getBusinessesByQuery([
      orderBy('rating', 'desc'),
      limit(limitCount)
    ]);
  } catch (error) {
    console.error('Error fetching top-rated businesses:', error);
    throw error;
  }
};

/**
 * Search businesses by name
 */
export const searchBusinessesByName = async (searchTerm: string): Promise<Business[]> => {
  try {
    // Note: Firestore doesn't support full-text search natively
    // This is a simple implementation. For better search, consider using Algolia or similar
    const businesses = await getAllBusinesses();
    return businesses.filter(business =>
      business.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching businesses:', error);
    throw error;
  }
};
