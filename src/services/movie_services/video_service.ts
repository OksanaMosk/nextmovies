import {IVideo} from "@/models/IVideo";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiKey =process.env.NEXT_PUBLIC_API_KEY;

export const allVideos = async (movieId: number): Promise<IVideo> => {
    const response = await fetch(`${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`);
    if (!response.ok) {
        throw new Error("Failed to fetch videos");
    }
    return response.json();
};
