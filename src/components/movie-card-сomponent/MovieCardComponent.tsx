
"use client";

import { useRouter } from "next/navigation";
import { type FC, useState } from "react";
import { VoteAverageComponent } from "@/components/vote-average-component/VoteAverageComponent";
import {MovieVideo} from "@/components/movie-video-component/MovieVideo";
import Image from "next/image";
import styles from "./MovieCardComponent.module.css"
import type { IMovie } from "@/models/IMovie";
import type { IGenre } from "@/models/IGenre";

type MoviesCardProps = {
    movie: IMovie;
    genres: IGenre[];
    onGenreClickAction?: (genreId: number) => void;
    disableGenreFilter?: boolean;
};

export const MovieCardComponent: FC<MoviesCardProps> = ({ movie, genres,  onGenreClickAction, disableGenreFilter }) => {
    const [show, setShow] = useState(false);
    const [hovered, setHovered] = useState(false);
    const router = useRouter();

    const genreNames = movie.genre_ids
        ?.map((id) => genres.find((g) => g.id === id)?.name)
        .filter(Boolean) as string[];

    const handleClick = () => {
        if (!show) {
            router.push(`/movies/${movie.id}`);
        }
    };

    const formatDate = (d: string) => {
        const date = new Date(d);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString().slice(-2);
        return `${day}-${month}-${year}`;
    };


    const truncateTitle = (title: string, maxLength: number = 45): string => {
        if (title.length > maxLength) {
            return title.slice(0, maxLength) + '...';
        }
        return title;
    };
    return (
        <div
            className={styles.movieCardWrapper}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
                setHovered(false);
                setShow(false);
            }}
        >    <VoteAverageComponent vote_average={movie.vote_average} />
            <div onClick={handleClick} className={`movieItem ${styles.movieItem}`}>

                {movie.poster_path ? (
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.original_title}
                        width={300}
                        height={450}
                        loading="lazy"
                        className={styles.moviePoster}
                    />
                ) : (
                    <div className={styles.moviePosterPlaceholder}>
                        <Image
                            src='/images/placeholder.webp'
                            alt="No poster"
                            width={300}
                            height={450}
                            loading="lazy"
                            className={styles.noImage}
                        />
                        <span className={styles.noImageText}>No POSTER available</span>
                    </div>
                )}
                {hovered && !show && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShow(true);
                        }}
                        className={styles.playButton}
                    >  <Image
                        src='/images/play.webp'
                        alt="Play"
                        width={80}
                        height={80}
                        className={styles.playButtonIcon}
                    />

                    </button>
                )}
                {show && (
                    <div className={styles.movieVideoOverlay}>
                        <MovieVideo movieId={movie.id} onCloseAction={() => setShow(false)} />
                    </div>
                )}
            </div>
            <div className={`movieInfoWrapper ${styles.movieInfoWrapper}`}>
                <div className={styles.movieInfo}>
                    <h1 className={`movieTitle ${styles.movieTitle}`}>
                        {truncateTitle(movie.original_title)}
                    </h1>
                    <div className="flex gap-2">
                        {movie.release_date ? (
                            <p>
                                <strong>Release: </strong> {formatDate(movie.release_date)}
                            </p>
                        ) : (
                            <p>
                                <strong>Release: </strong>No date
                            </p>
                        )}
                        <p>
                            <strong>Popularity: </strong> {Math.round(movie.popularity)}
                        </p>
                    </div>
                    <div className={styles.movieGenres}>
                        {genreNames && genreNames.length > 0 ? (
                            genreNames.map((genreName) => {
                                const matchedGenre = genres.find((g) => g.name === genreName.trim());
                                return (
                                    <span
                                        key={matchedGenre!.id}
                                        className={`${styles.tag} ${disableGenreFilter ? styles.disabled : styles.enabled}`}
                                        title={disableGenreFilter ? "Clear the search" : ""}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (matchedGenre && onGenreClickAction && !disableGenreFilter) {
                                                onGenreClickAction(matchedGenre.id);
                                            }
                                        }}
                                    >
                                        {genreName.trim()}
                                    </span>
                                );
                            })
                        ) : (
                            <span className="text-[#FFD700]">No genres</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
