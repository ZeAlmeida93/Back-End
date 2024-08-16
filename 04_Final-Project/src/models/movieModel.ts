import IMovie from "../interfaces/movieInterface.js";
import mongoose from "mongoose";

const MoviesSchema = new mongoose.Schema<IMovie>({

    title: {
        type: String,
        required: true
    },

    releaseDate: {
        type: Date,
        required: true
    },

    trailerLink: {
        type: String,
        required: true
    },

    posterUrl: {
        type: String,
        required: true
    },

    genres: {
        type: [String],
        required: true
    }




});

const MovieModel = mongoose.model<IMovie>('movie' , MoviesSchema);
export default MovieModel;


