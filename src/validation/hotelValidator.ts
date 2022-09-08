import {
    Length,
    IsDefined,
    IsLongitude,
    IsLatitude,
    IsUrl,
    IsNumber,
    Min,
    Max,
    ValidateNested
  } from 'class-validator';
import { Award, Hotel, Service } from '../models/hotelModels';

  export class ValidHotel implements Hotel {
    @IsDefined()
    @Length(1, 20)
    location_id: string;

    @IsDefined()
    @Length(1, 45)
    hotel_name: string;

    @IsDefined()
    @Length(1, 45)
    @IsLatitude()
    hotel_lat: string;

    @IsDefined()
    @Length(1, 45)
    @IsLongitude()
    hotel_lng: string;

    @IsDefined()
    @Length(1, 200)
    @IsUrl()
    photo_url_large: string;

    @IsDefined()
    @Length(1, 200)
    @IsUrl()
    photo_url_original: string;

    @IsDefined()
    @IsNumber()
    num_reviews: number;

    @IsDefined()
    @Length(1, 200)
    hotel_ranking: string;

    @IsDefined()
    @Length(1, 45)
    contact_number: string;

    @IsDefined()
    @Length(1, 10)
    price_level: string;

    @IsDefined()
    @Length(1, 20)
    hotel_price: string;

    @IsDefined()
    @IsNumber()
    @Min(0)
    @Max(5)
    hotel_rating: number;

    @IsDefined()
    @Length(1, 200)
    hotel_address: string;

    @IsDefined()
    @ValidateNested()
    awards: number[] | Award[];

    @IsDefined()
    @ValidateNested()
    services: number[] | Service[];

    constructor(location_id: string, hotel_name: string, hotel_lat: string, hotel_lng: string, photo_url_large: string, photo_url_original: string, hotel_price: string, hotel_rating: number, hotel_address: string, num_reviews: number, hotel_ranking: string, contact_number: string, price_level: string, awards: number[], services: number[]) {
      this.location_id = location_id;
      this.hotel_name = hotel_name;
      this.hotel_lat = hotel_lat;
      this.hotel_lng = hotel_lng;
      this.photo_url_large = photo_url_large;
      this.photo_url_original = photo_url_original;
      this.hotel_price = hotel_price;
      this.hotel_rating = hotel_rating;
      this.hotel_address = hotel_address;
      this.num_reviews = num_reviews;
      this.hotel_ranking = hotel_ranking;
      this.contact_number = contact_number;
      this.price_level = price_level;
      this.awards = awards;
      this.services = services;
    }
  }

  export class ValidAward implements Award {
    @IsDefined()
    @Length(1, 20)
    award_id: string;

    @IsDefined()
    @Length(1, 45)
    display_name: string;

    @IsDefined()
    @Length(1, 200)
    @IsUrl()
    badge_url: string;

    constructor(award_id: string, display_name: string, badge_url: string) {
      this.award_id = award_id;
      this.display_name = display_name;
      this.badge_url = badge_url;
    }
  }

  export class ValidService implements Service {
    @IsDefined()
    @Length(1, 20)
    service_id: string;

    @IsDefined()
    @Length(1, 45)
    icon_name: string;

    @IsDefined()
    @Length(1, 45)
    service_name: string;

    constructor(service_id: string, icon_name: string, service_name: string) {
      this.service_id = service_id;
      this.icon_name = icon_name;
      this.service_name = service_name;
    }
  }