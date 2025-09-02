"use client"

import { useRouter } from "next/navigation";
import { SortComponent } from "@/components/sort-component/SortComponent";
import { SearchComponent } from "@/components/search-component/SearchComponent";
import { GenreComponent } from "@/components/genre-component/GenreComponent";
import { MovieListComponent } from "@/components/movie-list-сomponent/MovieListComponent";
import { ScrollTopButtonComponent } from "@/components/scroll-top-button-component/ScrollTopButtonComponent";
import { updateSearchParams } from "@/utils/updateSearchParams";
import styles from './MoviesPartPageClientComponent.module.css';
import type { IGenre } from "@/models/IGenre";
import type { IMovie } from "@/models/IMovie";

type Props = {
    searchParams: {
        sort?: string;
        genre?: string;
        query?: string;
        pg?: string;
    };
    selectedGenreId: number | null;
    selectedSort: string;
    genres: IGenre[];
    movies: IMovie[];
    totalPages: number;
    currentPage: number;
};

export default function MoviesPartPageClientComponent({
                                                          searchParams,
                                                          selectedGenreId,
                                                          selectedSort,
                                                          genres,
                                                          movies,
                                                          totalPages,
                                                          currentPage
                                                      }: Props) {
    const router = useRouter();
    const sort = selectedSort || "";
    const genreId = selectedGenreId;
    const query = searchParams.query || "";

    const handleSortChange = (value: string) => {
        updateSearchParams("sort", value, router);
    };

    const handleGenreChange = (newGenreId: number | null) => {
        const value = newGenreId !== null ? newGenreId.toString() : null;
        updateSearchParams("genre", value, router);
    };

    const onGenreClick = (id: number) => {
        handleGenreChange(id);
    };

    return (
        <div className={styles.container}>
            <SearchComponent />
            {!query.trim() && (
                <div>
                    <SortComponent value={sort} onChangeAction={handleSortChange} />
                    <GenreComponent
                        value={genreId}
                        onChangeAction={handleGenreChange}
                        genres={genres}
                    />
                </div>
            )}

            <MovieListComponent
                genres={genres}
                selectedGenreId={genreId}
                movies={movies}
                onGenreClickAction={onGenreClick}
                totalPages={totalPages}
                currentPage={currentPage}
                disableGenreFilter={!!query.trim()}
            />
            <ScrollTopButtonComponent />
        </div>
    );
}
