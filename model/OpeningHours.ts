import { IOpeningHours } from "@/types/interface";

export default class OpeningHours {
    friday: string;
    monday: string;
    sunday: string;
    tuesday: string;
    saturday: string;
    thursday: string;
    wednesday: string;

    constructor(data: IOpeningHours) {
        this.friday = data.friday;
        this.monday = data.monday;
        this.sunday = data.sunday;
        this.tuesday = data.tuesday;
        this.saturday = data.saturday;
        this.thursday = data.thursday;
        this.wednesday = data.wednesday;
    }
}