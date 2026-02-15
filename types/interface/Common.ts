export interface IGlobalProperties {
  id: string;
  name: string;
  description: string;
  image: string;
  category_id: string; // for connecting with category
}
export interface ILocation {
  lat: string;
  lng: string;
  address: string;
}

export interface IOpeningHours {
  friday: string;
  monday: string;
  sunday: string;
  tuesday: string;
  saturday: string;
  thursday: string;
  wednesday: string;
}
// Defining the basic entity that encompasses all of the above
export interface IBaseEntity extends IGlobalProperties {
  location: ILocation;
  opening_hours: IOpeningHours;
}
