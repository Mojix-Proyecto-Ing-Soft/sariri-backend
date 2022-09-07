import {
    IsDefined,
    IsLongitude,
    IsLatitude,
  } from 'class-validator';
import { Coords } from '../models/coords';


export class ValidCoords implements Coords {
    
    @IsDefined()
    @IsLatitude()
    bl_latitude: number;

    @IsDefined()
    @IsLongitude()
    bl_longitude: number;

    @IsDefined()
    @IsLatitude()
    tr_latitude: number;

    @IsDefined()
    @IsLongitude()
    tr_longitude: number;

    constructor(bl_latitude: number, bl_longitude: number, tr_latitude: number, tr_longitude: number) {
        this.bl_latitude = bl_latitude;
        this.bl_longitude = bl_longitude;
        this.tr_latitude = tr_latitude;
        this.tr_longitude = tr_longitude;
    }

}