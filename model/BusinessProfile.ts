import { IBusinessProfile } from "@/types/interface";
import Location from "./Location";
import OpeningHours from "./OpeningHours";
import SocialLinks from "./SocialLinks";

export default class BusinessProfile {
    phone?: string;
    mobile?: string;
    email?: string;
    address?: string;
    city?: string;
    country?: string;
    zipCode?: string;
    images?: string[];
    location?: Location;
    openingHours?: OpeningHours;
    socialLinks?: SocialLinks;

    constructor(data: IBusinessProfile) {
        this.phone = data.phone;
        this.mobile = data.mobile;
        this.email = data.email;
        this.address = data.address;
        this.city = data.city;
        this.country = data.country;
        this.zipCode = data.zipCode;
        this.images = data.images;

        if (data.location) {
            this.location = new Location(data.location);
        }
        if (data.openingHours) {
            this.openingHours = new OpeningHours(data.openingHours);
        }
        if (data) {
            this.socialLinks = new SocialLinks(data);
        }
    }
}