import { ILocation } from "@/types/interface";

export default class Location {
    latitude: string;
    longitude: string;

    constructor(data: ILocation) {
        this.latitude = data.lat;
        this.longitude = data.lng;
    }
}