import { IUser } from '../models/userModel.js';
import { v4 as uuidv4 } from 'uuid';
import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import fileService from '../utils/fileService.js';

dotenv.config();

class UserService {
  getAll = async (): Promise<IUser[]> => {
    try {
      return await UserModel.find();
    } catch (error) {
      throw new Error('Failed to get all users');
    }
  }

  getUserById = async (userId: string): Promise<IUser | null> => {
    try {
      const foundUser: IUser | null = await UserModel.findById(userId);

      return foundUser;
    } catch (error) {
      throw new Error('Failed to get user by ID');
    }
  }

  register = async (newUser: IUser, avatar:any ): Promise<IUser> => {
    try {
      const foundUser = await UserModel.findOne({ email: newUser.email });

      if (foundUser) {
        throw new Error('user already exists');

      }
      console.log(newUser.password);

      let avatarName = "default.jpg";

      if (avatar) {

        avatarName = fileService.save(avatar);

      }

      newUser.avatar = avatarName;

      const hashedPassword = await bcrypt.hash(newUser.password, 10 ); /* este valor numerico define o nr de vezes que vai encriptar*/

      newUser.password = hashedPassword;
      const createdUser = await UserModel.create(newUser);
      //console.log(createdUser)
      return createdUser;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create user');
    }
  }

  login = async (email: string, password: string):

    Promise<{ user: IUser, accessToken: string } | null> => {
    try {
      const foundUser = await UserModel.findOne({ email: email });

      if (!foundUser) {
        return null;

      }

      if (!await bcrypt.compare(password, foundUser.password)) {
        return null

      }

      let token = "";


      if (process.env.SECRET_KEY) {

        token = jwt.sign({

          id: foundUser.id,
          email: foundUser.email,
          role: foundUser.role

        }, process.env.SECRET_KEY);
      } else {

        throw new Error('cannot get secret key');
      }


      return { user: foundUser, accessToken: token }
    } catch (error) {
      throw new Error('No user Found');
    }
  }

  update = async (userId: string, user: IUser): Promise<IUser | null> => {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(userId, user, { new: true });

      return updatedUser;
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }
  delete = async (userId: string): Promise<IUser | null> => {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(userId); // Delete user
      return deletedUser;
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  }
}

export default new UserService();