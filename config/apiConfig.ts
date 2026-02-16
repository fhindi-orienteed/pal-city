/**
 * API Configuration
 * Central configuration for all API endpoints and base URL
 */

export const API_CONFIG = {
  BASE_URL: 'http://pal-city-api.orienteed.ps',
  TIMEOUT: 30000, // 30 seconds
} as const;

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    OTP_REQUEST: '/api/auth/otp/request',
    OTP_VERIFY: '/api/auth/otp/verify',
  },

  // Business
  BUSINESSES: {
    LIST: '/api/businesses',
    FEED: '/api/businesses/feed',
    BY_ID: (id: string) => `/api/businesses/${id}`,
    CREATE: '/api/businesses',
    UPDATE: (id: string) => `/api/businesses/${id}`,
    DELETE: (id: string) => `/api/businesses/${id}`,
  },

  // Events
  EVENTS: {
    LIST: '/api/events',
    FEED: '/api/events/feed',
    BY_ID: (id: string) => `/api/events/${id}`,
    CREATE: '/api/events',
    UPDATE: (id: string) => `/api/events/${id}`,
    DELETE: (id: string) => `/api/events/${id}`,
  },

  // Places
  PLACES: {
    LIST: '/api/places',
    FEED: '/api/places/feed',
    BY_ID: (id: string) => `/api/places/${id}`,
    CREATE: '/api/places',
    UPDATE: (id: string) => `/api/places/${id}`,
    DELETE: (id: string) => `/api/places/${id}`,
  },

  // News
  NEWS: {
    LIST: '/api/news',
    FEED: '/api/news/feed',
    BY_ID: (id: string) => `/api/news/${id}`,
    CREATE: '/api/news',
    UPDATE: (id: string) => `/api/news/${id}`,
    DELETE: (id: string) => `/api/news/${id}`,
  },

  // Offers
  OFFERS: {
    LIST: '/api/offers',
    FEED: '/api/offers/feed',
    BY_ID: (id: string) => `/api/offers/${id}`,
    CREATE: '/api/offers',
    UPDATE: (id: string) => `/api/offers/${id}`,
    DELETE: (id: string) => `/api/offers/${id}`,
  },

  // Categories
  CATEGORIES: {
    LIST: "/api/businesses/categories",
    FEED: "/api/businesses/categories/feed",
    BY_ID: (id: string) => `/api/categories/${id}`,
  },
} as const;
