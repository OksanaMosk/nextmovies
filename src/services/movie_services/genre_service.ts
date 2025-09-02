import type {IGenre} from "@/models/IGenre.ts";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiKey =process.env.NEXT_PUBLIC_API_KEY;

export const getGenres = async (): Promise<IGenre[]> => {
    const url = `${baseUrl}/genre/movie/list?api_key=${apiKey}`;
    try {
        const response = await fetch(url, { next: { revalidate: 1 } });
        if (!response.ok) throw new Error("Failed to fetch genres");
        const data = await response.json();
        return data.genres;
    } catch (error) {
        return [];
    }
};
