import IUser from '../interfaces/userInterface.js';
import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import fileService from '../utils/fileService.js';
import { UploadedFile } from 'express-fileupload';

dotenv.config();

class UserService {
  async register(userData: IUser, avatar?: UploadedFile) {
    const existing = await UserModel.findOne({ email: userData.email });
    if (existing) {
      throw new Error('User already exists');
    }
    if (avatar) {
      const avatarName = fileService.save(avatar);
      userData.avatar = avatarName;
    }
    userData.password = await bcrypt.hash(userData.password, 10);
    const created = await UserModel.create(userData);
    return created;
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });
    if (!user) return null;
    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;
    if (!process.env.SECRET_KEY) throw new Error('Missing secret');
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.SECRET_KEY
    );
    return { user, accessToken: token };
  }

  async getAll() {
    return UserModel.find();
  }

  async update(id: string, data: Partial<IUser>) {
    return UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return UserModel.findByIdAndDelete(id);
  }
}

export default new UserService();
