const appConfig = {
    businessList: {
        pageSize: 10
    },
    businessCategories: {
        healthAndMedical: [
            { enabled: true, key: 'pharmacies', icon: 'pill.fill' },
            { enabled: true, key: 'medicalClinics', icon: 'pill.fill' },
            { enabled: true, key: 'dentalClinics', icon: 'pill.fill' },
            { enabled: true, key: 'medicalLaboratories', icon: 'pill.fill' },
            { enabled: true, key: 'hospitals', icon: 'pill.fill' },
            { enabled: true, key: 'doctors', icon: 'pill.fill' },
        ],
        education: [
            { enabled: true, key: 'universities', icon: 'book.fill' },
            { enabled: true, key: 'schools', icon: 'car.fill' },
            { enabled: true, key: 'colleges', icon: 'car.fill' },
            { enabled: true, key: 'trainingCenters', icon: 'car.fill' },
        ],
        automotive: [
            { enabled: true, key: 'carDealerships', icon: 'car.fill' },
            { enabled: true, key: 'tireFixingCenters', icon: 'car.fill' },
            { enabled: true, key: 'carWashes', icon: 'car.fill' },
            { enabled: true, key: 'carRentals', icon: 'car.fill' },
        ],
        commercialAndIndustrial: [
            { enabled: true, key: 'warehouses', icon: 'car.fill' },
            { enabled: true, key: 'factories', icon: 'car.fill' },
            { enabled: true, key: 'offices', icon: 'car.fill' },
            { enabled: true, key: 'companies', icon: 'car.fill' },
        ],
        retail: [
            { enabled: true, key: 'supermarkets', icon: 'car.fill' },
        ],
        financial: [
            { enabled: true, key: 'banks', icon: 'car.fill' },
        ],
        market: [
            { enabled: true, key: 'markets', icon: 'car.fill' },
        ],
        food: [
            { enabled: true, key: 'restaurants', icon: 'car.fill' },
        ],
        businessServices: [
            { enabled: true, key: 'lawyers', icon: 'car.fill' },
            { enabled: true, key: 'accountants', icon: 'car.fill' },
            { enabled: true, key: 'insurances', icon: 'car.fill' },
            { enabled: true, key: 'realEstates', icon: 'car.fill' },
        ],
        beautyAndPersonalCare: [
            { enabled: true, key: 'beautySalons', icon: 'car.fill' },
            { enabled: true, key: 'hairSalons', icon: 'car.fill' },
            { enabled: true, key: 'spas', icon: 'car.fill' },
            { enabled: true, key: 'massages', icon: 'car.fill' },
        ],
        logisticsService: [
            { enabled: true, key: 'deliveryCompanies', icon: 'car.fill' },
            { enabled: true, key: 'shippingCompanies', icon: 'car.fill' },
        ],
    },
    events: {
        pageSize: 10
    },
    countries: {
        "PS": {
            cities: [
                { id: '1', key: 'nablus', enabled: true },
                { id: '2', key: 'jerusalem', enabled: true },
                { id: '3', key: 'hebron', enabled: true },
                { id: '4', key: 'ramallah', enabled: true },
                { id: '5', key: 'bethlehem', enabled: true },
                { id: '6', key: 'qalqilya', enabled: true },
                { id: '7', key: 'jenin', enabled: true },
                { id: '8', key: 'tubas', enabled: true },
                { id: '9', key: 'tulkarm', enabled: true },
            ],
        },
    },
}

export default appConfig
