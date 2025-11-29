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

export class BusinessService {
  private static readonly BUSINESS_COLLECTION = 'businesses';

  /**
   * Fetch businesses list
   */
  public static async getBusinessesList(page: number, pageSize: number, filters?: any, sortFiled?: string): Promise<Business[]> {
    try {
      const businessCollection = collection(db, BusinessService.BUSINESS_COLLECTION);
      const constraints: QueryConstraint[] = [];

      constraints.push(limit(pageSize));

      if (sortFiled) {
        constraints.push(orderBy(sortFiled, 'asc'));
      }

      if (filters && filters.length > 0) {
        Object.entries(filters).forEach(([key, value]) => {
          constraints.push(where(key, '==', value));
        });
      }

      const q = query(businessCollection, ...constraints);
      const snapshot = await getDocs(q);

      const businessList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Business[];

      return businessList;
    } catch (error) {
      console.error('Error fetching businesses:', error);
      throw error;
    }
  }

  /**
   * Fetch business by ID
   */
  public static async getBusinessById(businessId: string): Promise<Business | null> {
    try {
      const businessDoc = doc(db, BusinessService.BUSINESS_COLLECTION, businessId);
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
  }
}
