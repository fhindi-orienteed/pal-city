import { Event } from '@/types/interface';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

const EVENTS_COLLECTION = 'events';

/** Fetch all events and convert Firestore Timestamp fields to strings */
export const getAllEvents = async (): Promise<Event[]> => {
  try {
    const eventsCollection = collection(db, EVENTS_COLLECTION);
    const eventsSnapshot = await getDocs(eventsCollection);
    return eventsSnapshot.docs.map(docSnap => {
      const data = docSnap.data();
      // Helper to convert Timestamp to ISO date string (YYYY-MM-DD)
      const convertDate = (timestamp: any): string =>
        timestamp && typeof timestamp.seconds === 'number'
          ? new Date(timestamp.seconds * 1000).toISOString().split('T')[0]
          : timestamp;
      // Helper to convert Timestamp to time string (HH:MM)
      const convertTime = (timestamp: any): string =>
        timestamp && typeof timestamp.seconds === 'number'
          ? new Date(timestamp.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : timestamp;

      return {
        id: docSnap.id,
        name: data.name,
        date: convertDate(data.date),
        time: convertTime(data.time),
        location: data.location,
        price: data.price,
        description: data.description,
        organizer: data.organizer,
        image: data.image,
        images: data.images,
        isFavorite: data.isFavorite,
        category: data.category,
        createdAt: convertDate(data.createdAt),
      } as Event;
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

/** Fetch a single event by ID */
export const getEventById = async (eventId: string): Promise<Event | null> => {
  try {
    const eventDoc = doc(db, EVENTS_COLLECTION, eventId);
    const eventSnapshot = await getDoc(eventDoc);
    if (eventSnapshot.exists()) {
      const data = eventSnapshot.data();
      // Convert timestamps similarly as in getAllEvents
      const convertDate = (timestamp: any): string =>
        timestamp && typeof timestamp.seconds === 'number'
          ? new Date(timestamp.seconds * 1000).toISOString().split('T')[0]
          : timestamp;
      const convertTime = (timestamp: any): string =>
        timestamp && typeof timestamp.seconds === 'number'
          ? new Date(timestamp.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : timestamp;

      return {
        id: eventSnapshot.id,
        name: data.name,
        date: convertDate(data.date),
        time: convertTime(data.time),
        location: data.location,
        price: data.price,
        description: data.description,
        organizer: data.organizer,
        image: data.image,
        images: data.images,
        isFavorite: data.isFavorite,
        category: data.category,
        createdAt: convertDate(data.createdAt),
      } as Event;
    }
    return null;
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
};
