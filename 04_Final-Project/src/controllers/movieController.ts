import { channel } from 'diagnostics_channel';
import {Request, Response, NextFunction} from 'express';
import IMovie from '../interfaces/movieInterface.js';
import movieService from '../services/movieService.js';

class MovieController {
    async getAll(req: Request, res: Response, next: NextFunction) {}
    async getOne(req: Request, res: Response, next: NextFunction) {}
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const {title, releaseDate, trailerLink, posterUrl, genres} = req.body;
            const poster = req.files?.poster;

            const movieData = {
                title,
                releaseDate, 
                trailerLink,
                posterUrl,
                genres
            }as IMovie;


            const createdMovie = await movieService.create(movieData, poster);

            res.status(201).json(createdMovie);

        }catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    }
    async update(req: Request, res: Response, next: NextFunction) {}
    async delete(req: Request, res: Response, next: NextFunction) {}
}



export default new MovieController();

