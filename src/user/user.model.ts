import * as mongoose from 'mongoose';

export const UserSchemas = new mongoose.Schema({
  username: String,
  password: String,
  name: String
},{
  timestamps:{
    createdAt: 'ctime',
    updatedAt: 'utime'
  }
})

export interface User {
  id: string,
  name: string,
  username: string,
  password: string,
  ctime: string,
  utime: string
}

export class UserDto {
  id: string;
  name: string;
  username: string;
  password: string;
  ctime: string;
  utime: string;
}