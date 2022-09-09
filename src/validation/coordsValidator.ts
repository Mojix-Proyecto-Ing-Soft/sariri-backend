import {
    IsDefined
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

    constructor(bl_latitude: number, bl_longitude: number, tr_latitude: number, tr_longitude: number) {
        this.bl_latitude = bl_latitude;
        this.bl_longitude = bl_longitude;
        this.tr_latitude = tr_latitude;
        this.tr_longitude = tr_longitude;
    }

}