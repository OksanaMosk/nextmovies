"use client";

import React, { FC } from "react";
import {IGenre} from "@/models/IGenre";
import styles from "./GenreComponent.module.css";


type GenreProps = {
    onChangeAction: (genreId: number | null) => void;
    value?: number | null;
    genres: IGenre[];
};

export const GenreComponent: FC<GenreProps> = ({ onChangeAction, value, genres }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        onChangeAction(val ? Number(val) : null);
    };

    return (
        <div className={styles.container}>
            <label htmlFor="genreSelect" className={`sort-label ${styles.label}`}>
                Choose genre
            </label>
            <select
                id="genreSelect"
                value={value ?? ""}
                onChange={handleChange}
                className={`sort-select ${styles.select}`}
            >
                <option value="">All genres</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                        {genre.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
