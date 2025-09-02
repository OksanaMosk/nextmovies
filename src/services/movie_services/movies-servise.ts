import {IMovieResponse} from "@/models/IMovieResponse";
import {IMovieDetails} from "@/models/IMovieDetails";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiKey =process.env.NEXT_PUBLIC_API_KEY;

export const getAllMovies= async (page: number): Promise<IMovieResponse> => {
        const response = await fetch(`${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}`);
        if (!response.ok) {
            throw new Error("Failed to fetch movies");
        }
        return await response.json();
    };

export const getByIdMovie = async (id: string): Promise<IMovieDetails> => {
    const response = await fetch(`${baseUrl}/movie/${id}?api_key=${apiKey}`);
    if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData?.status_message || "Unknown error occurred";
        throw new Error(`Failed to fetch movie details: ${errorMessage}`);
    }
    return await response.json();

};

export const searchMovies = async (query: string, page: number = 1): Promise<IMovieResponse> => {
    const url = `${baseUrl}/search/movie?api_key=${apiKey}&query=${query}&sort_by=popularity.desc,release_date.desc,vote_average.desc&page=${page}&include_adult=false`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return await response.json();
};

export const getFilteredMovies = async (
    sortBy: string,
    genreId: number | null,
    page: number = 1
): Promise<IMovieResponse> => {
    let url = `${baseUrl}/discover/movie?api_key=${apiKey}&sort_by=${sortBy}&page=${page}&include_adult=false`;
    if (genreId != null) {
        url += `&with_genres=${genreId}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch movies");
    }
    return await response.json();
};


export const getPopularMovies = async (page: number = 1): Promise<IMovieResponse> => {
    const response = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}&page=${page}`, {
        cache: "no-store"
    });

    if (!response.ok) {
        throw new Error("Failed to fetch popular movies");
    }

    return await response.json();
};
