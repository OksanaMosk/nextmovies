"use client";

import { MovieCardComponent } from "@/components/movie-card-сomponent/MovieCardComponent";
import { PaginationComponent } from "@/components/pagination-component/PaginationComponent";
import styles from "./MovieListComponent.module.css";
import { IMovie } from "@/models/IMovie";
import { IGenre } from "@/models/IGenre";

type Props = {
    genres: IGenre[];
    selectedGenreId: number | null;
    movies: IMovie[];
    onGenreClickAction?: (genreId: number) => void;
    totalPages: number;
    currentPage: number;
    disableGenreFilter?: boolean;
};

export const MovieListComponent = ({
                                       genres,
                                       movies,
                                       onGenreClickAction,
                                       totalPages,
                                       currentPage,
                                       disableGenreFilter = false,
                                   }: Props) => {
    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(window.location.search);
        params.set("pg", newPage.toString());
        window.history.pushState({}, "", `?${params.toString()}`);
        window.dispatchEvent(new Event("popstate"));
    };

    const getOffsetClass = (i: number) => {
        if (i % 4 === 1 || i % 4 === 3) return 'xl:mt-20';
        return 'xl:mt-0';
    };

    if (movies.length === 0) {
        return <p className={`noResults ${styles.noResults}`}>No results found.</p>;
    }

    return (
        <>
            <div className={styles.movieListContainer}>
                <ul className={styles.list}>
                    {movies.map((movie, i) => (
                        <li key={movie.id} className={getOffsetClass(i)}>
                            <MovieCardComponent
                                movie={movie}
                                genres={genres}
                                onGenreClickAction={onGenreClickAction}
                                disableGenreFilter={disableGenreFilter}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <PaginationComponent
                totalPages={totalPages}
                onPageChangeAction={handlePageChange}
                currentPage={currentPage}
            />
        </>
    );
};
