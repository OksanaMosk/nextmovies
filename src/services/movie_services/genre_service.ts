import type {IGenre} from "@/models/IGenre.ts";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiKey =process.env.NEXT_PUBLIC_API_KEY;

export const getGenres = async (): Promise<IGenre[]> => {

    console.log("API KEY:", process.env.NEXT_PUBLIC_API_KEY);

    const url = `${baseUrl}/genre/movie/list?api_key=${apiKey}`;
    console.log("Fetching genres from URL:", url);  // <-- тут виводимо URL

    try {
        const response = await fetch(url, { next: { revalidate: 1 } });
        if (!response.ok) throw new Error("Failed to fetch genres");
        const data = await response.json();
        console.log(data);
        return data.genres;
    } catch (error) {
        console.error("Error fetching genres:", error);
        return [];
    }
};
