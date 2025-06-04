import { UploadedFile } from "express-fileupload";
import { Request, Response } from 'express';
import IMovie from '../interfaces/movieInterface.js';
import movieService from '../services/movieService.js';

class MovieController {
  async getAll(req: Request, res: Response) {
    const movies = await movieService.getAll();
    res.json(movies);
  }

  async getOne(req: Request, res: Response) {
    const movie = await movieService.getOne(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Not found' });
    res.json(movie);
  }

  async search(req: Request, res: Response) {
    const movies = await movieService.search(req.query as Record<string, string>);
    res.json(movies);
  }

  async create(req: Request, res: Response) {
    try {
      const poster = req.files?.poster as UploadedFile;
      const createdMovie = await movieService.create(req.body as IMovie, poster);
      res.status(201).json(createdMovie);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const poster = req.files?.poster as UploadedFile;
      const updated = await movieService.update(req.params.id, req.body, poster);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    const deleted = await movieService.delete(req.params.id);
    res.json(deleted);
  }
}

export default new MovieController();
