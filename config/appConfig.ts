const appConfig = {
    businessList: {
        pageSize: 10
    },
    businessCategories: [
        { id: '1', key: 'pharmacy', icon: 'pill.fill' },
        { id: '2', key: 'bank', icon: 'car.fill' },
        { id: '3', key: 'university', icon: 'book.fill' },
        { id: '4', key: 'hospital', icon: 'car.fill' },
        { id: '5', key: 'hotel', icon: 'car.fill' },
        { id: '6', key: 'restaurant', icon: 'car.fill' },
        { id: '7', key: 'supermarket', icon: 'car.fill' },
        { id: '8', key: 'event', icon: 'calendar' },
        { id: '9', key: 'school', icon: 'car.fill' },
        { id: '10', key: 'taxi', icon: 'car.fill' },
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
