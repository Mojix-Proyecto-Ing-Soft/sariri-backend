import {
    Length,
    IsDefined,
    IsLongitude,
    IsLatitude,
    IsUrl,
    IsNumber
  } from 'class-validator';
import { Hotel } from '../models/hotel';

  export class ValidHotel implements Hotel {
    @IsDefined()
    @Length(1, 200)
    location_id: string;

    @IsDefined()
    @Length(1, 200)
    hotel_name: string;

    @IsDefined()
    @Length(1, 200)
    @IsLatitude()
    hotel_lat: string;

    @IsDefined()
    @Length(1, 200)
    @IsLongitude()
    hotel_lng: string;

    @IsDefined()
    @Length(1, 200)
    @IsUrl()
    photo_url: string;

    @IsDefined()
    @IsNumber()
    hotel_price: number;


    constructor(location_id: string, hotel_name: string, hotel_lat: string, hotel_lng: string, photo_url: string, hotel_price: number) {
        this.location_id = location_id;
        this.hotel_name = hotel_name;
        this.hotel_lat = hotel_lat;
        this.hotel_lng = hotel_lng;
        this.photo_url = photo_url;
        this.hotel_price = hotel_price;
    }
  }