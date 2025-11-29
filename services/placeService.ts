import { db } from '@/config/firebaseConfig';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export interface Place {
    id: string;
    name: string;
    description: string;
    category: string;
    address: string;
    images: string[];
    rating?: number;
    reviewCount?: number;
    openingHours?: string;
    phone?: string;
    website?: string;
    latitude?: number;
    longitude?: number;
    isFeatured?: boolean;
}

const COLLECTION_NAME = 'places';

export const placeService = {
    async getAll(): Promise<Place[]> {
        try {
            const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Place));
        } catch (error) {
            console.error('Error fetching places:', error);
            throw new Error('Failed to fetch places');
        }
    },

    async getById(id: string): Promise<Place | null> {
        try {
            const docRef = doc(db, COLLECTION_NAME, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return {
                    id: docSnap.id,
                    ...docSnap.data()
                } as Place;
            }
            return null;
        } catch (error) {
            console.error('Error fetching place:', error);
            throw new Error('Failed to fetch place');
        }
    },

    async getFeatured(): Promise<Place[]> {
        try {
            const places = await this.getAll();
            return places.filter(place => place.isFeatured);
        } catch (error) {
            console.error('Error fetching featured places:', error);
            throw new Error('Failed to fetch featured places');
        }
    },
};
