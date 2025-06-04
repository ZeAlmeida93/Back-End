import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import userService from '../services/userService.js';
import IUser from '../interfaces/userInterface.js';

class UserController {
  async register(req: Request, res: Response) {
    try {
      const avatar = req.files?.avatar as UploadedFile | undefined;
      const userData = req.body as IUser;
      const created = await userService.register(userData, avatar);
      res.status(201).json(created);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await userService.login(email, password);
      if (!result) return res.status(404).json({ error: 'Invalid credentials' });
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  async getAll(req: Request, res: Response) {
    const users = await userService.getAll();
    res.json(users);
  }

  async update(req: Request, res: Response) {
    const updated = await userService.update(req.params.id, req.body);
    res.json(updated);
  }

  async delete(req: Request, res: Response) {
    const deleted = await userService.delete(req.params.id);
    res.json(deleted);
  }
}

export default new UserController();
