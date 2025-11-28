const appConfig = {
    businessList: {
        pageSize: 10
    },
    businessCategories: {
        healthAndMedical: [
            { enabled: true, key: 'pharmacy', icon: 'pill.fill' },
            { enabled: true, key: 'medicalClinics', icon: 'pill.fill' },
            { enabled: true, key: 'dentalClinics', icon: 'pill.fill' },
            { enabled: true, key: 'medicalLaboratories', icon: 'pill.fill' },
            { enabled: true, key: 'hospital', icon: 'pill.fill' },
        ],
        education: [
            { enabled: true, key: 'university', icon: 'book.fill' },
            { enabled: true, key: 'school', icon: 'car.fill' },
            { enabled: true, key: 'college', icon: 'car.fill' },
            { enabled: true, key: 'trainingCenter', icon: 'car.fill' },
        ],
        automotive: [
            { enabled: true, key: 'carDealership', icon: 'car.fill' },
            { enabled: true, key: 'tireFixingCenter', icon: 'car.fill' },
            { enabled: true, key: 'carWash', icon: 'car.fill' },
            { enabled: true, key: 'carRental', icon: 'car.fill' },
        ],
        commercialAndIndustrial: [
            { enabled: true, key: 'warehouse', icon: 'car.fill' },
            { enabled: true, key: 'factory', icon: 'car.fill' },
            { enabled: true, key: 'office', icon: 'car.fill' },
            { enabled: true, key: 'companies', icon: 'car.fill' },
        ],
        retail: [
            { enabled: true, key: 'supermarket', icon: 'car.fill' },
        ],
        financial: [
            { enabled: true, key: 'bank', icon: 'car.fill' },
        ],
        market: [
            { enabled: true, key: 'market', icon: 'car.fill' },
        ],
        food: [
            { enabled: true, key: 'restaurant', icon: 'car.fill' },
        ],
        businessServices: [
            { enabled: true, key: 'lawyer', icon: 'car.fill' },
            { enabled: true, key: 'accountant', icon: 'car.fill' },
            { enabled: true, key: 'insurance', icon: 'car.fill' },
            { enabled: true, key: 'realEstate', icon: 'car.fill' },
        ],
        beautyAndPersonalCare: [
            { enabled: true, key: 'beautySalon', icon: 'car.fill' },
            { enabled: true, key: 'hairSalon', icon: 'car.fill' },
            { enabled: true, key: 'spa', icon: 'car.fill' },
            { enabled: true, key: 'massage', icon: 'car.fill' },
        ],
        logisticsService: [
            { enabled: true, key: 'deliveryCompany', icon: 'car.fill' },
            { enabled: true, key: 'shippingCompany', icon: 'car.fill' },
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
