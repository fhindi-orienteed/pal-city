export interface User {
    id: string;
    phoneNumber: string;
    name?: string;
    email?: string;
    dateOfBirth?: string;
    gender?: 'male' | 'female' | 'other';
    city?: string;
    address?: string;
    profileImage?: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserProfile {
    name: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other' | '';
    city: string;
    address: string;
}
