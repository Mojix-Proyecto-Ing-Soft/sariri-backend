import {
    IsDefined, IsInt
  } from 'class-validator';
import { Coords } from '../models/coords';


export class ValidCoords implements Coords {
    
    @IsDefined()
    bl_latitude: number;

    @IsDefined()
    bl_longitude: number;

    @IsDefined()
    tr_latitude: number;

    @IsDefined()
    tr_longitude: number;

    @IsInt()
    max_places: number = 10;

    constructor(bl_latitude: number, bl_longitude: number, tr_latitude: number, tr_longitude: number, max_places: number = 10) {
        this.bl_latitude = bl_latitude;
        this.bl_longitude = bl_longitude;
        this.tr_latitude = tr_latitude;
        this.tr_longitude = tr_longitude;
        this.max_places = max_places;
    }

}