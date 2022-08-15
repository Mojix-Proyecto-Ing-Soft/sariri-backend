import {
    Length,
    IsEmail,
    IsPhoneNumber,
    IsDefined,
    IsOptional
  } from 'class-validator';
  import { NewUser, UpdateUser } from '../models/user';

  export class ValidUser implements NewUser {
    @IsDefined()
    @Length(1, 200)
    user_id: string;

    @IsDefined()
    @Length(3, 20)
    user_name: string;

    @IsDefined()
    @Length(3, 20)
    user_lastName: string;

    @IsDefined()
    @IsEmail()
    user_email: string;

    @IsDefined()
    @IsPhoneNumber()
    user_phone: string;

    constructor(user_id: string, user_name: string, user_lastName: string, user_email: string, user_phone: string) {
        this.user_id = user_id;
        this.user_name = user_name;
        this.user_lastName = user_lastName;
        this.user_email = user_email;
        this.user_phone = user_phone;
    }
  }

  export class UpdateValidUser implements UpdateUser {
    @IsOptional()
    @Length(3, 20)
    user_name?: string;

    @IsOptional()
    @Length(3, 20)
    user_lastName?: string;

    @IsOptional()
    @IsPhoneNumber()
    user_phone?: string;

    constructor(user_name: string, user_lastName: string, user_phone: string) {
        this.user_name = user_name;
        this.user_lastName = user_lastName;
        this.user_phone = user_phone;
    }
  }