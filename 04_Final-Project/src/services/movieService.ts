import IMovie from '../interfaces/movieInterface.js';
import MovieModel from '../models/movieModel.js';
import fileService from '../utils/fileService.js';
import { UploadedFile } from 'express-fileupload';
import { SortOrder } from 'mongoose';

class MovieService {
  async getAll() {
    return MovieModel.find();
  }

  async getOne(id: string) {
    return MovieModel.findById(id);
  }

  async create(movieData: IMovie, poster?: UploadedFile) {
    if (poster) {
      const posterUrl = fileService.save(poster);
      movieData.posterUrl = posterUrl;
    }
    const newMovie = new MovieModel(movieData);
    return newMovie.save();
  }

  async update(id: string, movieData: Partial<IMovie>, poster?: UploadedFile) {
    if (poster) {
      const posterUrl = fileService.save(poster);
      movieData.posterUrl = posterUrl;
    }
    return MovieModel.findByIdAndUpdate(id, movieData, { new: true });
  }

  async delete(id: string) {
    const movie = await MovieModel.findByIdAndDelete(id);
    if (movie && movie.posterUrl) {
      fileService.delete(movie.posterUrl);
    }
    return movie;
  }

  async search(query: Record<string, string>) {
    const filter: Record<string, unknown> = {};
    if (query.year) {
      const start = new Date(`${query.year}-01-01`);
      const end = new Date(`${query.year}-12-31`);
      filter.releaseDate = { $gte: start, $lte: end };
    }
    if (query.title) {
      filter.title = { $regex: query.title, $options: 'i' };
    }
    if (query.genre) {
      filter.genres = { $in: [query.genre] };
    }
    const sort: Record<string, SortOrder> = {};
    if (query.sortBy === 'releaseDate') {
      sort.releaseDate = 1;
    }
    return MovieModel.find(filter).sort(sort);
  }
}

export default new MovieService();
