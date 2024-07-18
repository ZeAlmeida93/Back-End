import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.use(express.json());

interface IUser {
	id: number;
	name: string;
	email: string;
  password?: string;
}

let users: IUser[] = [
	{ id: 1, name: 'Pedro', email: 'pedro@sapo.pt' },
	{ id: 2, name: 'Ivan', email: 'ivan@mail.ru' },
    { id: 3, name: 'Alex', email: 'alex@gmail.com' }
];

// // Get all users
app.get('/users', (req: Request, res: Response) => {
	console.log('Request Method', req.method);
	console.log('Request URL', req.originalUrl);
	console.log('Query Parameters', req.query);

	if (users.length === 0) {
		res.statusMessage = 'No users found';
		res.sendStatus(204);
	} else {
		res.json(users);
	}
});

// // Get user by ID
app.get('/users/:id', (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.id);

  const foundUser = users.find(user => user.id === userId);

  if (!foundUser) {
    res.status(404).json({ error: 'User not found' });
  }

  res.json(foundUser);
});

// Create a new user
app.post('/users', (req: Request, res: Response) => {

  console.log('Request Body', req.body);

  const newUser: IUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

// Update an existing user

app.put('/users/:id', (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.id);

  const foundUser: IUser | undefined = users.find(user => user.id === userId);

  if (!foundUser) {
    res.status(404).json({ error: 'User not found' });
  } else {
    foundUser.name = req.body.name;
    foundUser.email = req.body.email;
    foundUser.password = req.body.password;
  }
  res.json(foundUser);
});

// Delete an existing user


app.delete('/users/:id', (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.id);

  const foundUser: IUser | undefined = users.find(user => user.id === userId);

  if (!foundUser) {
    res.status(404).json({ error: 'User not found' });
  } else {
    users = users.filter((user) => user.id !== userId);
  }
  res.json(foundUser);
});


// Get user by name - Minha tentativa sem jeito

// app.get(`/users/search?email=${email}`, (req, res) => {
//     const email = req.query.email as string;
//     if (!email) {
//       return res.status(400).send({ message: 'Email não encontrado' });
//     }
  
//     const user = users.find(user => user.email === email);
//     if (user) {
//       res.send(user.name);
//     } else {
//       res.status(404).send({ message: 'Teste' });
//     }
//   });


app.get('/users/search', (req, res) => {
    const email = req.query.email as string;  // Extract and assert the type of the email query parameter
    if (!email) {  // Check if the email parameter is provided
      return res.status(400).send({ message: 'Email não encontrado' });
    }
  
    const user = users.find(user => user.email === email);  // Search for the user by email
    if (user) {  // If user is found
      res.send(user.name);
    } else {  // If user is not found
      res.status(404).send({ message: 'Teste' });
    }
  });
  


const PORT: number = 3000; // Here the PORT is defined 

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
})