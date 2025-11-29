import { Event } from '@/types/interface';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export class EventService {
  private static readonly EVENTS_COLLECTION = 'events';

  public static async getLatestUpcomingEvents(): Promise<Event[]> {
    try {
      const eventsCollection = collection(db, EventService.EVENTS_COLLECTION);
      const eventsSnapshot = await getDocs(eventsCollection);

      const eventsList = eventsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Event[];

      return eventsList;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  public static async getEventById(eventId: string): Promise<Event | null> {
    try {
      const eventDoc = doc(db, EventService.EVENTS_COLLECTION, eventId);
      const eventSnapshot = await getDoc(eventDoc);
      if (eventSnapshot.exists()) {
        return {
          id: eventSnapshot.id,
          ...eventSnapshot.data()
        } as Event;
      } else {
        console.log('No such event found!');
        return null;
      }
    } catch (error) {
      console.error('Error fetching event:', error);
      throw error;
    }
  }
}
