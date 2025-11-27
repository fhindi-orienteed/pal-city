import { City } from '@/types/interface/City';

export const PALESTINIAN_CITIES: City[] = [
    // Popular Cities
    {
        id: 'jerusalem',
        name: 'Jerusalem',
        nameAr: 'القدس',
        region: 'Jerusalem',
        regionAr: 'القدس',
        icon: '🕌',
    },
    {
        id: 'ramallah',
        name: 'Ramallah',
        nameAr: 'رام الله',
        region: 'Ramallah and Al-Bireh',
        regionAr: 'رام الله والبيرة',
        icon: '🏛️',
    },
    {
        id: 'bethlehem',
        name: 'Bethlehem',
        nameAr: 'بيت لحم',
        region: 'Bethlehem',
        regionAr: 'بيت لحم',
        icon: '⛪',
    },
    {
        id: 'hebron',
        name: 'Hebron',
        nameAr: 'الخليل',
        region: 'Hebron',
        regionAr: 'الخليل',
        icon: '🕌',
    },
    {
        id: 'nablus',
        name: 'Nablus',
        nameAr: 'نابلس',
        region: 'Nablus',
        regionAr: 'نابلس',
        icon: '🏔️',
    },
    {
        id: 'gaza',
        name: 'Gaza',
        nameAr: 'غزة',
        region: 'Gaza',
        regionAr: 'غزة',
        icon: '🌊',
    },
    // Other Cities
    {
        id: 'jenin',
        name: 'Jenin',
        nameAr: 'جنين',
        region: 'Jenin',
        regionAr: 'جنين',
        icon: '🌾',
    },
    {
        id: 'tulkarm',
        name: 'Tulkarm',
        nameAr: 'طولكرم',
        region: 'Tulkarm',
        regionAr: 'طولكرم',
        icon: '🌳',
    },
    {
        id: 'qalqilya',
        name: 'Qalqilya',
        nameAr: 'قلقيلية',
        region: 'Qalqilya',
        regionAr: 'قلقيلية',
        icon: '🍊',
    },
    {
        id: 'salfit',
        name: 'Salfit',
        nameAr: 'سلفيت',
        region: 'Salfit',
        regionAr: 'سلفيت',
        icon: '🏞️',
    },
    {
        id: 'jericho',
        name: 'Jericho',
        nameAr: 'أريحا',
        region: 'Jericho',
        regionAr: 'أريحا',
        icon: '🌴',
    },
    {
        id: 'tubas',
        name: 'Tubas',
        nameAr: 'طوباس',
        region: 'Tubas',
        regionAr: 'طوباس',
        icon: '⛰️',
    },
    {
        id: 'khan-yunis',
        name: 'Khan Yunis',
        nameAr: 'خان يونس',
        region: 'Gaza',
        regionAr: 'غزة',
        icon: '🏖️',
    },
    {
        id: 'rafah',
        name: 'Rafah',
        nameAr: 'رفح',
        region: 'Gaza',
        regionAr: 'غزة',
        icon: '🌅',
    },
];

export const getPopularCities = (): City[] => {
    return PALESTINIAN_CITIES;
};

export const getCityById = (id: string): City | undefined => {
    return PALESTINIAN_CITIES.find(city => city.id === id);
};
