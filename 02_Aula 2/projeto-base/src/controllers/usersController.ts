import express, { Request, Response } from 'express';
import { IProduct, IUser } from '../interfaces/interfaces.js';
import jsonFileReader from '../utils/jsonFileReader.js';

const UsersFilePath = './src/data/users.json';



class UserController {
        static getAll(arg0: string, getAll: any) {
          throw new Error('Method not implemented.');
        }

// private readUsers(): IUsers[] {
//     console.log(jsonFileReader.read(UsersFilePath));
//             return jsonFileReader.read(UsersFilePath);
//         }
    
//         private writeUsers(user: IUser[]):void {
    
//             return jsonFileReader.write(UsersFilePath, user);
//         }



        getAll(req: Request, res: Response) {
 
            const users: IUser[] = jsonFileReader.read(UsersFilePath);
            res.json(users);
        
        
        }


        getOne(req: Request, res: Response) {


            const userId: number = parseInt(req.params.id);
            const users: IUser[] = jsonFileReader.read(UsersFilePath);
        
            console.log(req.params.id)
          
            const foundUser: IUser | undefined = users.find(user => user.id === userId);
          
            if (!foundUser) {
              res.status(404).json({ error: 'User not found' });
            }
          
            res.json(foundUser);
        
        
        }
        create(req: Request, res: Response) {}
        update(req: Request, res: Response) {}
        delete(req: Request, res: Response) {}
        
        }



    

    export default UserController;