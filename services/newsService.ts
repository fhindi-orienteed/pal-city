import { db } from '@/config/firebaseConfig';
import { News } from '@/types/interface';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';


const COLLECTION_NAME = 'news';

export class NewsService {
    public static async getLatestNews(): Promise<News[]> {
        try {
            const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as News));
        } catch (error) {
            console.error('Error fetching news:', error);
            throw new Error('Failed to fetch news');
        }
    }

    public static async getById(id: string): Promise<News | null> {
        try {
            const docRef = doc(db, COLLECTION_NAME, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return {
                    id: docSnap.id,
                    ...docSnap.data()
                } as News;
            }
            return null;
        } catch (error) {
            console.error('Error fetching news:', error);
            throw new Error('Failed to fetch news');
        }
    }
};
