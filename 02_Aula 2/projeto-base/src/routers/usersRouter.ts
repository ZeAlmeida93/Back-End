import express, { Express, Request, Response, Router } from 'express';
import { readFileSync } from 'fs';
import { IUser } from '../interfaces/interfaces.js';


const router: Router = Router();

import UserController from '../controllers/usersController.js';

let users: IUser[] = JSON.parse(readFileSync('./src/data/users.json', 'utf-8'));

// // // Get all users
// router.get('/users', (req: Request, res: Response) => {
// 	// console.log('Request Method', req.method);
// 	// console.log('Request URL', req.originalUrl);
// 	// console.log('Query Parameters', req.query);

// 	if (users.length === 0) {
// 		res.statusMessage = 'No users found';
// 		res.sendStatus(204);
// 	} else {
// 		res.json(users);
// 	}
// });

// Get all User thtough User Controller 

router.get('/users', UserController.getAll);


// // Create a new user
// router.post('/users', (req: Request, res: Response) => {

//   console.log('Request Body', req.body);

//   const newUser: IUser = {
//     id: users.length + 1,
//     name: req.body.name,
//     email: req.body.email
//   };

//   users.push(newUser);

//   res.status(201).json(newUser);
// });

// // Update an existing user

// router.put('/users/:id', (req: Request, res: Response) => {
//   const userId: number = parseInt(req.params.id);

//   const foundUser: IUser | undefined = users.find(user => user.id === userId);

//   if (!foundUser) {
//     res.status(404).json({ error: 'User not found' });
//   } else {
//     foundUser.name = req.body.name;
//     foundUser.email = req.body.email;
//     foundUser.password = req.body.password;
//   }
//   res.json(foundUser);
// });

// // Delete an existing user


// router.delete('/users/:id', (req: Request, res: Response) => {
//   const userId: number = parseInt(req.params.id);

//   const foundUser: IUser | undefined = users.find(user => user.id === userId);

//   if (!foundUser) {
//     res.status(404).json({ error: 'User not found' });
//   } else {
//     users = users.filter((user) => user.id !== userId);
//   }
//   res.json(foundUser);
// });


// router.get('/users/search', (req, res) => {
//     const email = req.query.email as string;  // Extract and assert the type of the email query parameter
//     if (!email) {  // Check if the email parameter is provided
//       return res.status(400).send({ message: 'Email não encontrado' });
      
//     }
//     console.log(email)

//     const user = users.find(user => user.email === email);  // Search for the user by email
//     console.log(user)
//     if (user) {  // If user is found
//       res.send(user.name);
//     } else {  // If user is not found
//       res.status(404).send({ message: 'Teste' });
//     }
//   });

  
//   // // Get user by ID
// router.get('/users/:id', (req: Request, res: Response) => {
//     const userId: number = parseInt(req.params.id);

//     console.log(req.params)
  
//     const foundUser = users.find(user => user.id === userId);
  
//     if (!foundUser) {
//       res.status(404).json({ error: 'User not found' });
//     }
  
//     res.json(foundUser);
//   });


export default router; // ao colocar default quer dizer que podemos mudar o nome