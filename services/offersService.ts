
export interface Offer {
    id: string;
    title: string;
    businessName: string;
    discount: string;
    image: string;
    expiresIn: string;
}

const COLLECTION_NAME = 'offers';

// Mock data to use if Firebase is empty or for fallback
const MOCK_OFFERS: Offer[] = [
    {
        id: '1',
        title: '50% Off Lunch',
        businessName: 'Lucha Restaurant',
        discount: '50% OFF',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=60', // placeholder
        expiresIn: '2 days left',
    },
    {
        id: '2',
        title: 'Buy 1 Get 1 Free',
        businessName: 'City Cinema',
        discount: 'BOGO',
        image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=60', // placeholder
        expiresIn: '5 hours left',
    },
];

export const offersService = {
    async getAll(): Promise<Offer[]> {
        try {
            // For now, let's return mock data to ensure the UI works immediately
            // In a real scenario, we would uncomment the Firebase code below

            /*
            const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
            if (!querySnapshot.empty) {
                return querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Offer));
            }
            */

            // Return mock data for development
            return new Promise((resolve) => {
                setTimeout(() => resolve(MOCK_OFFERS), 500);
            });

        } catch (error) {
            console.error('Error fetching offers:', error);
            throw new Error('Failed to fetch offers');
        }
    },

    async getById(id: string): Promise<Offer | undefined> {
        return MOCK_OFFERS.find(o => o.id === id);
    }
};
