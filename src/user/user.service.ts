import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as Bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User> ){}

  async GetUser() {
    return await this.UserModel.find().exec()
  }

  async GetOneUser(id: string) {
    const data = await this.UserModel.findById(id).exec()
    if(!data) throw new HttpException('user not found', 404)
    return data
  }

  async PostUser(username: string, password: string, name: string) {
    const pwd = Bcrypt.hashSync(password)
    const data = new this.UserModel({username, password:pwd, name})
    return await data.save()
  }

  async PutUser(id: string, password: string, name: string) {
    const pwd = Bcrypt.hashSync(password)
    const data = await this.UserModel.findOneAndUpdate({ _id: id },{ name, password:pwd }).exec()
    if(!data) throw new HttpException('user not found', 404)
    return data
  }

  async DelUser(id: string) {
    const data = await this.UserModel.findOneAndDelete({ _id: id }).exec()
    return data
  }

  async FindOneByUsername(username: string) {
    const user = await this.UserModel.findOne({ username }).exec()
    return user
  }

}
