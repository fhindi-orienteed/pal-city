export default class SocialLinks {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    website?: string;

    constructor(data: any) {
        this.facebook = data.facebook;
        this.twitter = data.twitter;
        this.instagram = data.instagram;
        this.youtube = data.youtube;
        this.website = data.website;
    }
}