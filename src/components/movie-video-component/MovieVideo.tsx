"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { LoaderComponent } from "@/components/loader-component/LoaderComponent";
import { allVideos } from "@/services/movie_services/video_service";
import styles from "./MovieVideo.module.css";
import {IResults} from "@/models/IVideo";

type MovieVideoProps = {
    movieId: number;
    onCloseAction: () => void;
};

export const MovieVideo = ({ movieId, onCloseAction }: MovieVideoProps) => {
    const [trailerKey, setTrailerKey] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchTrailer = async () => {
            try {
                const data = await allVideos(movieId);
                const trailer = data.results?.find(
                    (v:IResults) => v.type === "Trailer" && v.site === "YouTube"
                );
                if (trailer) {
                    setTrailerKey(trailer.key);
                } else {
                    setTrailerKey(null);
                }
            } catch (err) {
                console.error("Error fetching trailer", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchTrailer();
    }, [movieId]);

    if (loading) {
        return (
            <div className={styles.loaderContainer}>
                <LoaderComponent />
            </div>
        );
    }

    if (error || !trailerKey) {
        return (
            <div className={styles.noTrailerContainer}>
                <Image
                    src='/images/novideo.webp'
                    alt="No trailer"
                    width={300}
                    height={200}
                    className={styles.noTrailerImage}
                />
                <span className={styles.noTrailerText}>No TRAILER available</span>
            </div>
        );
    }

    return (
        <div className={styles.trailerWrapper}>
            <iframe
                className={styles.iframeVideo}
                src={`https://www.youtube.com/embed/${trailerKey}?rel=0&modestbranding=1&disablekb=1`}
                title="Movie Trailer"
                allowFullScreen
            />
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onCloseAction();
                }}
                className={styles.hideButton}
            >
                Hide Trailer
            </button>
        </div>
    );
};
