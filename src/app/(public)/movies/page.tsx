import MoviesPartPageClientComponent from "@/components/movies-part-client-page-component/MoviesPartPageClientComponent";
import {getGenres} from "@/services/movie_services/genre_service";
import {
    getAllMovies,
    getFilteredMovies,
    searchMovies
} from "@/services/movie_services/movies-servise";

type Props = {
    searchParams: Promise<{
        sort?: string | undefined;
        genre?: string | undefined;
        query?: string | undefined;
        pg?: string | undefined;
    }>;
};

export default async function MoviesPage({searchParams}: Props) {


    const resolvedSearchParams = await searchParams;
    const {sort = "", genre, query = "", pg = "1"} = resolvedSearchParams;


    const page = Number(pg) || 1;
    const selectedGenreId = genre ? Number(genre) : null;

    const genres = await getGenres();

    let data;

    if (query) {
        data = await searchMovies(query, page);
    } else if (sort || genre) {
        data = await getFilteredMovies(sort, selectedGenreId, page);
    } else {
        data = await getAllMovies(page);
    }

    return (
        <MoviesPartPageClientComponent
            searchParams={resolvedSearchParams}
            selectedGenreId={selectedGenreId}
            selectedSort={sort}
            genres={genres}
            movies={data.results}
            totalPages={data.total_pages}
            currentPage={page}
        />
    );
}
