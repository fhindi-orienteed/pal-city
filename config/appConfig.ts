const appConfig = {
    businessList: {
        pageSize: 10
    },
    businessCategories: [
        { id: '1', enabled: false, key: 'pharmacy', icon: 'pill.fill' },
        { id: '2', enabled: true, key: 'bank', icon: 'car.fill' },
        { id: '3', enabled: false, key: 'university', icon: 'book.fill' },
        { id: '4', enabled: false, key: 'hospital', icon: 'car.fill' },
        { id: '5', enabled: false, key: 'hotel', icon: 'car.fill' },
        { id: '6', enabled: false, key: 'restaurant', icon: 'car.fill' },
        { id: '7', enabled: false, key: 'supermarket', icon: 'car.fill' },
        { id: '8', enabled: false, key: 'event', icon: 'calendar' },
        { id: '9', enabled: false, key: 'school', icon: 'car.fill' },
        { id: '10', enabled: false, key: 'taxi', icon: 'car.fill' },
    ],
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
            ],
        },
    },
}

export default appConfig
